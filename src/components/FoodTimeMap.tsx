// src/components/FoodTimeMap.tsx

import React, { useEffect, useRef, useState } from 'react';

interface Restaurant {
  name: string;
  address: string;
  location: string; // "lng,lat"
  type: string;
}

const restaurantData: Restaurant[] = [
     {"type":"北京菜","name":"同兴楼","address":"福州路435号","location":"121.481986,31.233629"},
      {"type":"北京菜","name":"悦宾楼","address":"湖北路215号","location":"121.480302,31.233912"},
      {"type":"北京菜","name":"会宾楼","address":"福州路419号","location":"121.482369,31.234044"},
      {"type":"北京菜","name":"致美楼","address":"福州路519号","location":"121.480605,31.233343"},
      {"type":"天津菜","name":"六合局","address":"广西路福祥里隔壁","location":"121.477614,31.233638"},
      {"type":"天津菜","name":"三和楼","address":"云南南路13号","location":"121.479738,31.228803"},
      {"type":"天津菜","name":"青萍园","address":"云南南路305号","location":"121.48256,31.225227"},
      {"type":"四川菜","name":"成都川菜馆","address":"宁海西路22号","location":"121.472966,31.224718"},
      {"type":"四川菜","name":"南海花园","address":"南京西路830号","location":"121.467247,31.231172"},
      {"type":"四川菜","name":"蜀腴川菜馆","address":"广西北路295号","location":"121.477167,31.234549"},
      {"type":"四川菜","name":"聚丰园川菜馆","address":"广西北路234号","location":"121.477722,31.233137"},
      {"type":"四川菜","name":"洁而精川菜馆","address":"兴安路135号","location":"121.471016,31.220962"},
      {"type":"四川菜","name":"锦江川菜馆","address":"宁海西路31号","location":"121.472966,31.224718"},
      {"type":"广东菜","name":"一家春","address":"福州路266号","location":"121.485223,31.234628"},
      {"type":"广东菜","name":"大三元","address":"南京路677号","location":"121.470773,31.232453"},
      {"type":"广东菜","name":"大东酒楼","address":"南京路625号","location":"121.470708,31.232439"},
      {"type":"广东菜","name":"杏花楼","address":"福州路343号","location":"121.484144,31.234114"},
      {"type":"广东菜","name":"金门大酒店","address":"南京西路104号","location":"121.472522,31.234147"},
      {"type":"广东菜","name":"京华酒楼","address":"福州路623号","location":"121.478925,31.232289"},
      {"type":"广东菜","name":"东亚又一楼","address":"南京东路先施公司","location":"121.477072,31.234663"},
      {"type":"广东菜","name":"南国酒楼","address":"云南路366号","location":"121.482646,31.224314"},
      {"type":"广东菜","name":"南华酒楼","address":"南京东路715号","location":"121.477072,31.234663"},
      {"type":"广东菜","name":"美心酒楼","address":"陕西南路304号","location":"121.461798,31.207557"},
      {"type":"广东菜","name":"美华酒楼","address":"南京西路吴江路15号","location":"121.463883,31.230694"},
      {"type":"广东菜","name":"万寿山","address":"西藏中路220号","location":"121.475371,31.232186"},
      {"type":"广东菜","name":"新新酒楼","address":"南京东路720号","location":"121.477072,31.234663"},
      {"type":"广东菜","name":"新雅酒楼","address":"南京东路719号","location":"121.477072,31.234663"},
      {"type":"广东菜","name":"醉乐园","address":"金陵东路376号","location":"121.482316,31.228086"},
      {"type":"广东菜","name":"乐园酒楼","address":"凤阳路366号","location":"121.469042,31.233327"},
      {"type":"徽州菜","name":"大中国菜馆","address":"大连路469号","location":"121.513564,31.258713"},
      {"type":"徽州菜","name":"大有利菜馆","address":"安福路39号","location":"121.44732,31.214834"},
      {"type":"徽州菜","name":"大富贵菜馆","address":"常德路706号","location":"121.44388,31.232218"},
      {"type":"徽州菜","name":"大新楼菜馆","address":"西藏中路485号","location":"121.474491,31.235636"},
      {"type":"徽州菜","name":"海华楼","address":"浙江北路270号","location":"121.47524,31.246245"},
      {"type":"宁波菜","name":"又二屯","address":"南京西路304号","location":"121.47031,31.232358"},
      {"type":"宁波菜","name":"大陆正興馆","address":"西藏中路67号","location":"121.478013,31.22964"},
      {"type":"宁波菜","name":"茹长兴","address":"长沙路93号","location":"121.470626,31.236079"},
      {"type":"宁波菜","name":"老同华楼","address":"九江路364号","location":"121.483129,31.235948"},
  {"type":"宁波菜","name":"状元楼","address":"天津路441号","location":"121.478825,31.236413"},
  {"type":"宁波菜","name":"甬江状元楼","address":"九江路529号","location":"121.480068,31.235024"},
  {"type":"宁波菜","name":"集贤楼","address":"广东路374号","location":"121.484251,31.232643"},
  {"type":"宁波菜","name":"复兴园","address":"广东路374号","location":"121.484251,31.232643"},
  {"type":"宁波菜","name":"宁波沁社","address":"西藏中路142号","location":"121.477716,31.230761"},
  {"type":"上海菜","name":"大名春楼菜馆","address":"浙江中路394号","location":"121.478014,31.236127"},
  {"type":"上海菜","name":"上海老正兴","address":"九江路566号","location":"121.479381,31.234817"},
  {"type":"上海菜","name":"正和馆","address":"安庆路481号","location":"121.475796,31.247401"},
  {"type":"上海菜","name":"正兴菜馆","address":"河南中路565号","location":"121.483932,31.239984"},
  {"type":"上海菜","name":"同华楼","address":"九江路281号","location":"121.484677,31.236393"},
  {"type":"上海菜","name":"状元老正兴","address":"福州路680号","location":"121.478345,31.231843"},
  {"type":"上海菜","name":"老正和菜馆","address":"广西北路207号","location":"121.477938,31.233011"},
  {"type":"上海菜","name":"老正兴源记","address":"九江路300号","location":"121.484316,31.236306"},
  {"type":"上海菜","name":"老正兴东记","address":"山东中路330号","location":"121.48409,31.236632"},
  {"type":"上海菜","name":"老正兴馆","address":"福州路721号","location":"121.477335,31.231846"},
  {"type":"上海菜","name":"梁园老正兴","address":"广西北路332号","location":"121.477042,31.235018"},
  {"type":"素菜","name":"功德林斋食处","address":"黄河路41号","location":"121.470911,31.233874"},
{"type":"素菜","name":"春风松月楼","address":"湖北路193号","location":"121.480558,31.233647"},
{"type":"素菜","name":"素春楼","address":"厦门路102号","location":"121.476476,31.239673"},
{"type":"素菜","name":"聚源斋","address":"湖北路90号","location":"121.481441,31.232135"},
{"type":"素菜","name":"龙兴斋","address":"芝罘路159号","location":"121.474438,31.237671"},
{"type":"素菜","name":"觉林","address":"林森中路254号","location":"121.016158,30.888288"},
{"type":"西菜","name":"华懋饭店","address":"南京路外滩沙逊房子内","location":"121.483723,31.238521"},
{"type":"西菜","name":"都城饭店","address":"江西路福州路角","location":"121.482468,31.233819"},
{"type":"西菜","name":"沧州饭店","address":"南京西路1225号","location":"121.454122,31.226639"},
{"type":"西菜","name":"汇中饭店","address":"南京东路3号","location":"121.477072,31.234663"},
{"type":"西菜","name":"礼查饭店","address":"中正东一路7号","location":"121.287296,31.114386"},
{"type":"西菜","name":"麦瑞饭店","address":"南京东路102号","location":"121.477072,31.234663"},
{"type":"西菜","name":"国际饭店","address":"南京西路跑马厅旁","location":"121.455774,31.227623"},
{"type":"西菜","name":"沙利文饭店","address":"南京东路107号","location":"121.477072,31.234663"},
{"type":"中国西菜","name":"水上饭店","address":"中山东一路北京东路口","location":"121.490243,31.240637"},
{"type":"中国西菜","name":"一品香大旅社","address":"西藏中路270号","location":"121.474916,31.233072"},
{"type":"中国西菜","name":"一家春番菜社","address":"福州路266号","location":"121.485223,31.234628"},
{"type":"中国西菜","name":"上海西菜社","address":"广东路150号","location":"121.488322,31.233513"},
{"type":"中国西菜","name":"大西洋西菜社","address":"福州路701号","location":"121.477544,31.231892"},
{"type":"中国西菜","name":"大西洋饭店","address":"北京西路1182号","location":"121.452719,31.229429"},
{"type":"中国西菜","name":"大来饭店","address":"南京西路1257号","location":"121.455759,31.227014"},
{"type":"中国西菜","name":"中央西菜社","address":"福州路730号","location":"121.477097,31.23214"},
{"type":"中国西菜","name":"印度吖喱饭店","address":"福州路711号","location":"121.477444,31.231872"},
{"type":"中国西菜","name":"东亚酒楼","address":"南京东路690号","location":"121.477072,31.234663"},
{"type":"中国西菜","name":"晋隆西菜社","address":"西藏中路400号","location":"121.474982,31.235651"},
{"type":"中国西菜","name":"新利查番菜社","address":"广西北路164号","location":"121.479489,31.232254"},
{"type":"中国西菜","name":"荣康中西菜社","address":"华山路1号","location":"121.444849,31.223637"},
{"type":"中国西菜","name":"福来犹太咖喱鸡饭店","address":"广西北路159号","location":"121.479675,31.232196"},
];

const typeIcons: Record<string, string> = {
  '北京菜': 'https://ai-studio-static-online.cdn.bcebos.com/e226f0a3dd604ecf89b47ec3311d01ce8072b4084aaa4ab5872ede1726def944',
    '天津菜': 'https://ai-studio-static-online.cdn.bcebos.com/e21c4f50170b42f78d18294cb5825c4123f0898c91b14ea4af22f78e42e732f0',
    '四川菜': 'https://ai-studio-static-online.cdn.bcebos.com/20082100695540b59ef948ea1e1230ff6750e05d5dfd471e877742f242fd8419',
    '广东菜': 'https://ai-studio-static-online.cdn.bcebos.com/eace9ecb10014aae8403105c539f651c485f80f371b64dfdba5fbe9100ddcfac',
    '徽州菜': 'https://ai-studio-static-online.cdn.bcebos.com/35c104af833f45fbbe11b53d1126443b5137a3c5c4594605a24510c4138789d3',
    '宁波菜': 'https://ai-studio-static-online.cdn.bcebos.com/1f4e4642282f4c79a3ab7a7a3562048291d1a448e52943f982e05551a441621c',
    '上海菜': 'https://ai-studio-static-online.cdn.bcebos.com/e8f7ecd86f284fb5b82e88910d0dbe631b74dc50b9fb46b0b7029481eac74d5c',
    '西菜': 'https://ai-studio-static-online.cdn.bcebos.com/4236f8bd291c4f2bb66348b3e310efdf53ba239db5054bf6bb1eea520354b358',
    '素菜': 'https://ai-studio-static-online.cdn.bcebos.com/ebb4e758d42c4a45947db093e8232519b2fe101fbfdc490ab6a57f252e6b7e65',
    '中国西菜': 'https://ai-studio-static-online.cdn.bcebos.com/93f35084f140491690936f0ae6b087818c4658b056ee42abbe083a7b5d6c803c'
};

const typeColors: Record<string, string> = {
  '上海菜': '#FF6B6B',
  '广东菜': '#4ECDC4',
  '四川菜': '#45B7D1',
  '素菜': '#96CEB4',
  '徽菜': '#FECA57',
  '中国西菜': '#FF9FF3',
  '北京菜': '#54A0FF',
  '天津菜': '#5F27CD',
  '宁波菜': '#00D2D3',
};

// ErrorBoundary 组件保持不变
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FoodTimeMap Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          <h2>地图加载出错</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            重试
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function FoodTimeMapContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const currentMarkersRef = useRef<any[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [introData, setIntroData] = useState<Record<string, string>>({});
  const [currentIntro, setCurrentIntro] = useState<string>('');

  useEffect(() => {
    // 加载intro.json数据
    fetch('/intro.json')
      .then(response => response.json())
      .then(data => {
        setIntroData(data);
        setCurrentIntro(data['全部菜系'] || '加载中...');
      })
      .catch(error => {
        console.error('加载intro.json失败:', error);
        setCurrentIntro('《大上海指南》（1947，王昌年著）以珍贵文献视角，揭示彼时上海作为"味觉联合国"的独特地位');
      });
  }, []);

  useEffect(() => {
    // 根据选择的菜系更新文本内容
    if (introData && Object.keys(introData).length > 0) {
      const introText = introData[selectedType === '全部' ? '全部菜系' : selectedType];
      setCurrentIntro(introText || '暂无相关介绍');
    }
  }, [selectedType, introData]);

  useEffect(() => {
    let mapInstance: any = null;
    let isMounted = true;

    const initMap = async () => {
      if (!mapRef.current) {
        console.error("地图容器 ref 为空，终止初始化");
        return;
      }

      try {
        setMapLoading(true);
        setMapError(null);

        if (!window.AMap) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://webapi.amap.com/maps?v=2.0&key=ab678d92b941d5e6d4b232fa148c9a70&plugin=AMap.InfoWindow';
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('地图API加载失败'));
          });
        }

        if (!isMounted) return;

        // 获取容器尺寸
        const container = mapRef.current;
        const width = container.clientWidth || 1366;
        const height = container.clientHeight || 768;
        
        mapInstance = new window.AMap.Map(container, {
          center: [121.473701, 31.230416],
          zoom: 13,
          resizeEnable: true,
          zoomEnable: true,
          scrollWheel: true,
          animateEnable: false, // 禁用动画提升性能
          jogEnable: false, // 禁用缓动效果
          dragEnable: true,
          isHotspot: false, // 禁用热点
          defaultCursor: 'default',
          keyboardEnable: false, // 禁用键盘操作
          touchZoom: true,
          doubleClickZoom: true,
          viewMode: '2D',
        });
        
        // 确保地图正确居中 - 使用更可靠的居中方式
        setTimeout(() => {
          if (mapInstance) {
            // 强制重新计算地图尺寸
            mapInstance.plugin(['AMap.MapType'], () => {
              mapInstance.setCenter([121.473701, 31.230416]);
              mapInstance.setZoom(13);
              mapInstance.setFitView(null, false, [50, 50, 50, 50]);
            });
            
            // 确保地图完全加载后重新居中
            mapInstance.on('complete', () => {
              mapInstance.setCenter([121.473701, 31.230416]);
              mapInstance.setZoom(13);
            });
          }
        }, 300);
        
        // 监听窗口大小变化，确保地图正确居中
        const handleResize = () => {
          if (mapInstance) {
            mapInstance.setCenter([121.473701, 31.230416]);
            mapInstance.setZoom(13);
          }
        };
        window.addEventListener('resize', handleResize);
        
        // 将handleResize存储到window对象，以便清理函数访问
        (window as any)._mapResizeHandler = handleResize;
        
        mapInstance.clearMap();

        const infoWindow = new window.AMap.InfoWindow({
          offset: new window.AMap.Pixel(0, -30),
          isCustom: false,
        });

        const newMarkers: any[] = [];
        restaurantData
          .filter(restaurant => selectedType === '全部' || restaurant.type === selectedType)
          .forEach(restaurant => {
            const [lng, lat] = restaurant.location.split(',').map(Number);
            const marker = new window.AMap.Marker({
              position: [lng, lat],
              icon: new window.AMap.Icon({
                size: new window.AMap.Size(32, 32),
                image: typeIcons[restaurant.type] || typeIcons['上海菜'],
                imageSize: new window.AMap.Size(32, 32),
              }),
            });

            marker.on('click', () => {
              infoWindow.setContent(`
                <div style="font-family: 'Microsoft YaHei', sans-serif; padding: 5px;">
                  <h4 style="margin: 0 0 8px 0; font-size: 16px;">${restaurant.name}</h4>
                  <p style="margin: 0 0 4px 0;"><strong>地址：</strong> ${restaurant.address}</p>
                  <p style="margin: 0;"><strong>菜系：</strong> ${restaurant.type}</p>
                </div>
              `);
              infoWindow.open(mapInstance, marker.getPosition());
            });

            newMarkers.push(marker);
            mapInstance.add(marker);
          });
        
        mapInstance.on('click', () => {
          infoWindow.close();
        });

        setMapLoading(false);

      } catch (error: any) {
        if (isMounted) {
          console.error('地图初始化过程中发生错误:', error);
          setMapError(error.message || '未知地图错误');
          setMapLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
      }
      // 清理resize事件监听
      if ((window as any)._mapResizeHandler) {
        window.removeEventListener('resize', (window as any)._mapResizeHandler);
        delete (window as any)._mapResizeHandler;
      }
    };
  }, [selectedType]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [labelData, setLabelData] = useState<Record<string, string>>({});
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    'page-001.png', 'page-129.png', 'page-130.png', 'page-131.png', 'page-132.png',
    'page-133.png', 'page-134.png', 'page-135.png', 'page-136.png', 'page-137.png',
    'page-138.png', 'page-139.png', 'page-140.png', 'page-141.png', 'page-142.png'
  ];

  // 加载label.json数据
  useEffect(() => {
    fetch('/label.json')
      .then(res => res.json())
      .then(data => setLabelData(data))
      .catch(err => console.error('加载label.json失败:', err));
  }, []);

  // 根据菜系选择高亮对应图片
  useEffect(() => {
    if (Object.keys(labelData).length === 0) return;

    const typeKey = selectedType === '全部' ? '全部菜系' : selectedType;
    const targetImage = labelData[typeKey];
    
    if (targetImage) {
      const imageName = targetImage.split('/').pop() || '';
      const index = galleryImages.findIndex(img => img === imageName);
      
      if (index !== -1) {
        setCurrentImageIndex(index);
        // 滚动到对应图片
        if (galleryRef.current) {
          const imageElements = galleryRef.current.querySelectorAll('img');
          if (imageElements[index]) {
            imageElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }
  }, [selectedType, labelData, galleryImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowLeft') showPreviousImage();
      else if (e.key === 'ArrowRight') showNextImage();
      else if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex]);

  const handleImageClick = (image: string) => {
    const index = galleryImages.indexOf(image);
    setCurrentImageIndex(index);
    setSelectedImage(image);
    setIsModalOpen(true);
    setScale(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setScale(1);
  };

  const showPreviousImage = () => {
    const newIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
    setScale(1);
  };

  const showNextImage = () => {
    const newIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
    setScale(1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prevScale => Math.max(0.5, Math.min(3, prevScale + delta)));
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* 文本框 */}
      <div style={{
        padding: '12px 20px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        borderBottom: '1px solid #dee2e6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        flexShrink: 0,
        zIndex: 10
      }}>
        <p style={{ margin: 0, fontSize: '16px', color: '#333', lineHeight: '1.5' }}>
          {currentIntro}
        </p>
      </div>

      {/* 地图和相册容器 */}
      <div style={{ position: 'relative', width: '100%', flexGrow: 1, display: 'flex', minHeight: 0 }}>
        {/* 地图容器 - Flex子项 */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0, minHeight: 0 }}>
          {mapLoading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000}}>地图加载中...</div>}
          {mapError && <div style={{color: 'red', padding: '20px'}}>错误: {mapError}</div>}
          <div 
            ref={mapRef} 
            style={{ width: '100%', height: '100%', minHeight: '400px', maxHeight: '768px' }}
          ></div>
        </div>

        {/* 菜系图例 - 绝对定位 */}
        <div style={{
            position: 'absolute', top: '10px', left: '10px',
            background: 'rgba(255,255,255,0.9)', borderRadius: '6px',
            padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000, maxHeight: '400px', overflowY: 'auto'
        }}>
            <h4 style={{marginTop: 0, marginBottom: '8px'}}>菜系图例</h4>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '6px' }}>
                <input
                  type="radio" name="restaurantType" value="全部"
                  checked={selectedType === '全部'} onChange={(e) => setSelectedType(e.target.value)}
                  style={{ marginRight: '6px' }} />
                <span>全部菜系</span>
              </label>
            </div>
            {Object.entries(typeIcons).map(([type, iconUrl]) => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '6px' }}>
                <input
                  type="radio" name="restaurantType" value={type}
                  checked={selectedType === type} onChange={(e) => setSelectedType(e.target.value)}
                  style={{ marginRight: '6px' }} />
                <img src={iconUrl} alt={type} style={{ width: '20px', height: '20px', marginRight: '6px' }} />
                <span>{type}</span>
              </label>
            ))}
        </div>
        
        {/* 右侧竖排相册 - Flex子项 */}
        <div 
          ref={galleryRef}
          style={{
            width: '300px',
            backgroundColor: '#f5f5f5',
            borderLeft: '1px solid #ddd',
            overflowY: 'auto', // 内容超出时，自动显示滚动条
            padding: '10px'
            // 移除了 height: '100%'
          }}>
          <h4 style={{ marginTop: 0, marginBottom: '10px', textAlign: 'center' }}>图片相册</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={`/ocr_pages/09/${image}`}
                alt={`图片 ${index + 1}`}
                style={{
                  width: '100%', height: 'auto', cursor: 'pointer',
                  borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease, border 0.2s ease',
                  border: currentImageIndex === index ? '3px solid #007bff' : '3px solid transparent',
                  transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (currentImageIndex !== index) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentImageIndex !== index) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* 图片放大模态框 */}
        {isModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            zIndex: 9999, cursor: 'pointer'
          }} onClick={closeModal}>
            <div style={{
              position: 'relative', maxWidth: '80%', maxHeight: '80%',
              backgroundColor: 'white', borderRadius: '8px', padding: '20px',
              cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} onClick={(e) => e.stopPropagation()} onWheel={handleWheel}>
              
              <button onClick={showPreviousImage} style={{
                  position: 'absolute', left: '-50px', top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', border: 'none',
                  borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
                  fontSize: '20px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 10001
                }}>‹</button>

              <button onClick={showNextImage} style={{
                  position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#333', border: 'none',
                  borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
                  fontSize: '20px', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 10001
                }}>›</button>

              <button onClick={closeModal} style={{
                  position: 'absolute', top: '-15px', right: '-15px',
                  backgroundColor: '#ff4757', color: 'white', border: 'none',
                  borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer',
                  fontSize: '16px', fontWeight: 'bold', zIndex: 10001
                }}>×</button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
                {selectedImage && (
                  <img
                    src={`/ocr_pages/09/${selectedImage}`}
                    alt={`图片 ${currentImageIndex + 1}`}
                    style={{
                      maxWidth: '100%', maxHeight: '70vh', width: 'auto', height: 'auto',
                      borderRadius: '4px', transform: `scale(${scale})`,
                      transition: 'transform 0.2s ease', cursor: 'grab'
                    }}
                    draggable={false}
                  />
                )}
              </div>

              <div style={{
                position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px 15px',
                borderRadius: '15px', fontSize: '14px'
              }}>{currentImageIndex + 1} / {galleryImages.length}</div>

              <div style={{
                position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '5px 15px',
                borderRadius: '15px', fontSize: '12px'
              }}>使用滚轮缩放 ({Math.round(scale * 100)}%)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 声明高德地图的全局变量
declare global {
  interface Window {
    AMap: any;
  }
}

export default function FoodTimeMap() {
  return (
      <ErrorBoundary>
        <FoodTimeMapContent />
      </ErrorBoundary>
  );
}