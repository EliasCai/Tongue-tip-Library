import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Copy, MessageCircle, Image as ImageIcon, X, Menu, BookOpen, Settings } from 'lucide-react';

interface ReadingInterfaceProps {
  bookId: string;
  onNavigate: (page: string) => void;
}

const ReadingInterface: React.FC<ReadingInterfaceProps> = ({ bookId, onNavigate }) => {
  const [mode, setMode] = useState<'dual' | 'triple'>('dual');
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [searchText, setSearchText] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [syncScroll, setSyncScroll] = useState(true);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pdfText, setPdfText] = useState<string[]>([]);
  const [ocrPages, setOcrPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  
  const originalRef = useRef<HTMLDivElement>(null);
  const ocrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // PDF加载和处理 - 使用PDF.js CDN
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        
        // 动态加载PDF.js库
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        const workerScript = document.createElement('script');
        workerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        workerScript.async = true;
        document.head.appendChild(workerScript);
        
        await new Promise<void>((resolve) => {
          script.onload = () => {
            // 设置PDF.js worker
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
          };
        });
        
        // 加载PDF文档
        const pdfjsLib = (window as any).pdfjsLib;
        const loadingTask = pdfjsLib.getDocument('/pdf_resources/烹飪一斑.pdf');
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        
        // 提取所有页面的文本
        const texts: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          try {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(' ');
            texts.push(pageText || `第${i}页内容`);
          } catch (pageError) {
            console.warn(`第${i}页文本提取失败:`, pageError);
            texts.push(`第${i}页`);
          }
        }
        setPdfText(texts);
        setLoading(false);
        
        // 加载OCR文本
        loadOCRPages();
        
      } catch (error) {
        console.error('加载PDF失败:', error);
        
        // 回退到文本模式
        const fallbackContent = [
          "第一章　民国饮食之源\n\n饮食之道，自古为民生之本。民国建立，百业更新，而烹饪之术，亦随时代而变迁。昔日满清遗风，宫廷珍馐，流传民间；西洋新法，东渐华夏，融合创新。\n\n京城之地，王公贵族，宴会频繁。熊掌猩唇，视为常品；燕窝鱼翅，列作珍馐。然民国新风所至，此等奢靡，渐为世所非。",
          "第一节　宫廷遗风\n\n满清覆灭，御厨四散。有王永兴者，原任内廷尚膳监，今设肆于前门外，号曰「聚丰堂」。其所制清炖熊掌，仍守旧法。"
        ];
        setPdfText(fallbackContent);
        setLoading(false);
        
        // 回退时也加载OCR文本
        loadOCRPages();
      }
    };

    loadPDF();
  }, []);

  // 加载OCR文本
  const loadOCRPages = async () => {
    try {
      const ocrTexts: string[] = [];
      for (let i = 0; i < 70; i++) { // 假设最多70页
        try {
          const response = await fetch(`/ocr_pages/01/page-${i}.md`);
          if (response.ok) {
            const text = await response.text();
            ocrTexts[i] = text || `第${i + 1}页内容`;
          } else {
            ocrTexts[i] = `第${i + 1}页内容`;
          }
        } catch (error) {
          console.warn(`加载第${i}页OCR文本失败:`, error);
          ocrTexts[i] = `第${i + 1}页内容`;
        }
      }
      setOcrPages(ocrTexts);
    } catch (error) {
      console.error('加载OCR文本失败:', error);
      // 回退到使用PDF文本
      setOcrPages(pdfText);
    }
  };

  // 渲染PDF页面
  const renderPDFPage = async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      const pdfjsLib = (window as any).pdfjsLib;
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) return;

      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error('渲染PDF页面失败:', error);
    }
  };

  // 监听页面变化和缩放变化，重新渲染PDF
  useEffect(() => {
    if (pdfDoc && canvasRef.current) {
      renderPDFPage(currentPage);
    }
  }, [currentPage, pdfDoc, scale]);

  const originalPages = pdfText;
  const totalPages = Math.max(pdfDoc ? pdfDoc.numPages : 0, ocrPages.length > 0 ? ocrPages.length : pdfText.length);

  // 同步滚动
  const handleOriginalScroll = () => {
    if (!syncScroll || !originalRef.current || !ocrRef.current) return;
    const scrollRatio = originalRef.current.scrollTop / originalRef.current.scrollHeight;
    ocrRef.current.scrollTop = scrollRatio * ocrRef.current.scrollHeight;
  };

  const handleOcrScroll = () => {
    if (!syncScroll || !originalRef.current || !ocrRef.current) return;
    const scrollRatio = ocrRef.current.scrollTop / ocrRef.current.scrollHeight;
    originalRef.current.scrollTop = scrollRatio * originalRef.current.scrollHeight;
  };

  // 页面导航
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  // 确保currentPage在有效范围内
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // 文本搜索
  const handleSearch = () => {
    if (!searchText.trim()) return;
    // 实现搜索逻辑
    console.log('搜索:', searchText);
  };

  // 复制文本
  const handleCopyText = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
    }
  };

  // 切换AI助手显示模式
  const toggleAIAssistant = () => {
    if (mode === 'dual') {
      setMode('triple');
      loadDifyInPanel();
    } else {
      setMode('dual');
    }
  };

  // 在三分屏右侧加载Dify聊天机器人
  const loadDifyInPanel = () => {
    setTimeout(() => {
      const aiContainer = document.getElementById('ai-chat-container');
      if (!aiContainer) return;

      // 如果已经加载iframe，直接返回
      if (aiContainer.querySelector('iframe')) return;

      // 创建iframe加载Dify聊天界面
      const iframe = document.createElement('iframe');
      iframe.src = `https://udify.app/chatbot/f4q7tp0OTSNvOxr2`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      iframe.allow = 'microphone';
      
      aiContainer.appendChild(iframe);
    }, 100);
  };

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return; // 避免在输入框中触发
      
      switch(e.key) {
        case 'ArrowLeft':
          goToPrevPage();
          break;
        case 'ArrowRight':
          goToNextPage();
          break;
        case 'PageUp':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'PageDown':
          e.preventDefault();
          goToNextPage();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentPage(1);
          break;
        case 'End':
          e.preventDefault();
          setCurrentPage(totalPages);
          break;

      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, totalPages]);

  // 当页面变化时更新Dify配置
  useEffect(() => {
    if ((window as any).difyChatbotConfig) {
      (window as any).difyChatbotConfig.systemVariables = {
        book_context: `《民国烹饪一斑》第${currentPage}页`,
        book_title: '民国烹饪一斑',
        current_page: currentPage.toString()
      };
    }
  }, [currentPage]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* 顶部工具栏 */}
      <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('book-detail/' + bookId)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">民国烹饪一斑</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAIAssistant}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              mode === 'triple' 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <MessageCircle className="h-4 w-4 inline mr-1" />
            {mode === 'triple' ? '关闭AI助手' : 'AI助手'}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* PDF控制面板 */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="上一页 (Page Up)"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      const page = parseInt(input.value);
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }
                  }}
                  className="w-12 px-1 py-0.5 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  / {totalPages}
                </span>
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                title="下一页 (Page Down)"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 border-l pl-4">
              <button
                onClick={() => setScale(prev => Math.max(0.5, prev - 0.25))}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="缩小"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm text-gray-700 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(prev => Math.min(3, prev + 0.25))}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="放大"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 max-w-xs">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-sm bg-transparent outline-none border-b border-transparent focus:border-gray-300 px-1"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">正在加载《烹饪一斑》PDF...</p>
          </div>
        </div>
      )}

      {/* 两分屏模式 */}
      {!loading && mode === 'dual' && (
        <div className="flex-1 flex overflow-hidden">
          {/* 原始文献区域 */}
          <div className="flex-1 bg-white border-r overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b shrink-0">
              <h3 className="text-sm font-medium text-gray-700">原始文献（竖版繁体）</h3>
            </div>
            <div 
              ref={originalRef}
              onScroll={handleOriginalScroll}
              className="flex-1 p-6 overflow-y-auto bg-gray-50 flex items-center justify-center min-h-0"
            >
              {pdfDoc ? (
                <canvas 
                  ref={canvasRef}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <div className="max-w-2xl mx-auto">
                  <pre className="text-sm leading-relaxed font-serif whitespace-pre-wrap">
                    {originalPages[currentPage - 1]}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* OCR文本区域 */}
          <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between shrink-0">
              <h3 className="text-sm font-medium text-gray-700">现代文本（简体横排）</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyText}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="复制文本"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div 
              ref={ocrRef}
              onScroll={handleOcrScroll}
              className="flex-1 p-6 overflow-y-auto min-h-0"
            >
              <div className="max-w-2xl mx-auto">
                <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                  {ocrPages[currentPage - 1]}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 三分屏模式 */}
      {!loading && mode === 'triple' && (
        <div className="flex-1 flex overflow-hidden">
          {/* 原始文献区域 */}
          <div className="w-1/3 bg-white border-r overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b shrink-0">
              <h3 className="text-sm font-medium text-gray-700">原始文献（竖版繁体）</h3>
            </div>
            <div 
              ref={originalRef}
              onScroll={handleOriginalScroll}
              className="flex-1 p-4 overflow-y-auto bg-gray-50 flex items-center justify-center min-h-0"
            >
              {pdfDoc ? (
                <canvas 
                  ref={canvasRef}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <div className="max-w-full mx-auto">
                  <pre className="text-xs leading-relaxed font-serif whitespace-pre-wrap">
                    {originalPages[currentPage - 1]}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* OCR文本区域 */}
          <div className="w-1/3 bg-white border-r overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between shrink-0">
              <h3 className="text-sm font-medium text-gray-700">现代文本（简体横排）</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyText}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  title="复制文本"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div 
              ref={ocrRef}
              onScroll={handleOcrScroll}
              className="flex-1 p-4 overflow-y-auto min-h-0"
            >
              <div className="max-w-full mx-auto">
                <pre className="text-xs leading-relaxed whitespace-pre-wrap">
                  {ocrPages[currentPage - 1]}
                </pre>
              </div>
            </div>
          </div>

          {/* AI助手区域 */}
          <div className="w-1/3 bg-white overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between shrink-0">
              <h3 className="text-sm font-medium text-gray-700">AI助手</h3>
              <div className="text-xs text-gray-500">
                第{currentPage}页
              </div>
            </div>
            <div 
              id="ai-chat-container"
              className="flex-1 p-2 overflow-hidden min-h-0"
            >
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">正在加载AI助手...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 设置面板 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">设置</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">同步滚动</label>
                <button
                  onClick={() => setSyncScroll(!syncScroll)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    syncScroll ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      syncScroll ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingInterface;