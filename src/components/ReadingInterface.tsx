import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Copy, MessageCircle, Image as ImageIcon, X, Menu, BookOpen, Settings } from 'lucide-react';

interface ReadingInterfaceProps {
  bookId: string;
  onNavigate: (page: string) => void;
}

interface AIResponse {
  type: 'text' | 'image';
  content: string;
  timestamp: Date;
}

const ReadingInterface: React.FC<ReadingInterfaceProps> = ({ bookId, onNavigate }) => {
  const [mode, setMode] = useState<'dual' | 'triple'>('dual');
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [searchText, setSearchText] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [aiMessages, setAiMessages] = useState<AIResponse[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
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

  // AI助手功能
  const handleSendToAI = () => {
    if (!aiInput.trim()) return;
    
    const newMessage: AIResponse = {
      type: 'text',
      content: aiInput,
      timestamp: new Date()
    };
    
    setAiMessages(prev => [...prev, newMessage]);
    setAiInput('');
    
    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: AIResponse = {
        type: 'text',
        content: `根据《民国烹饪一斑》第${currentPage}页的内容，${aiInput}的相关信息如下：这道菜在民国时期是京城聚丰堂的招牌菜，采用传统工艺制作，体现了宫廷烹饪的精髓。`,
        timestamp: new Date()
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleGenerateImage = () => {
    setIsGeneratingImage(true);
    
    setTimeout(() => {
      const newImage: AIResponse = {
        type: 'image',
        content: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        timestamp: new Date()
      };
      setAiMessages(prev => [...prev, newImage]);
      setIsGeneratingImage(false);
    }, 3000);
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
        case 'Escape':
          if (mode === 'triple') setMode('dual');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, totalPages]);

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
            onClick={() => setMode(mode === 'dual' ? 'triple' : 'dual')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              mode === 'triple'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <MessageCircle className="h-4 w-4 inline mr-1" />
            AI助手
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
          {/* 左侧 - 原始竖版繁体字 */}
          <div className="flex-1 bg-white border-r overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b bg-gray-50 shrink-0">
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

          {/* 中间 - OCR文本 */}
          <div className="flex-1 bg-white border-r overflow-hidden flex flex-col">
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

          {/* 右侧 - AI助手 */}
          <div className="w-96 bg-white flex flex-col border-l">
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">AI助手</h3>
              <button
                onClick={() => setMode('dual')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">向AI助手提问关于这本书的任何问题</p>
                </div>
              )}

              {aiMessages.map((message, index) => (
                <div key={index} className={`space-y-2 ${message.type === 'text' ? '' : ''}`}>
                  {message.type === 'text' ? (
                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                      {message.content}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <img
                        src={message.content}
                        alt="AI生成的图像"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-xs text-gray-500">AI根据文本生成的民国风味图像</p>
                    </div>
                  )}
                </div>
              ))}

              {isGeneratingImage && (
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">正在生成图像...</p>
                </div>
              )}
            </div>

            <div className="border-t p-4">
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="询问关于这本书的问题..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendToAI()}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={handleSendToAI}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                  >
                    发送
                  </button>
                </div>
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50"
                >
                  <ImageIcon className="h-4 w-4 inline mr-1" />
                  生成相关图像
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 设置面板 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">阅读设置</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">同步滚动</span>
                <input
                  type="checkbox"
                  checked={syncScroll}
                  onChange={(e) => setSyncScroll(e.target.checked)}
                  className="rounded"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">显示页码</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">夜间模式</span>
                <input type="checkbox" className="rounded" />
              </label>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingInterface;