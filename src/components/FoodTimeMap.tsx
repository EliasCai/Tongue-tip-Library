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
      {"type":"天津菜","name":"六合局","address":"广西路福祥里隔壁","location":"121.477614,31.233638"},
      {"type":"四川菜","name":"成都川菜馆","address":"宁海西路22号","location":"121.472966,31.224718"},
      {"type":"广东菜","name":"一家春","address":"福州路266号","location":"121.485223,31.234628"},
      {"type":"徽州菜","name":"大中国菜馆","address":"大连路469号","location":"121.513564,31.258713"},
      {"type":"宁波菜","name":"又二屯","address":"南京西路304号","location":"121.47031,31.232358"},
      {"type":"上海菜","name":"大名春楼菜馆","address":"浙江中路394号","location":"121.478014,31.236127"},
      {"type":"素菜","name":"功德林斋食处","address":"黄河路41号","location":"121.470911,31.233874"},
      {"type":"西菜","name":"华懋饭店","address":"南京路外滩沙逊房子内","location":"121.483723,31.238521"},
      {"type":"中国西菜","name":"水上饭店","address":"中山东一路北京东路口","location":"121.490243,31.240637"},
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
  // 不再需要 map 和 selectedRestaurant 的 state，因为地图实例由 useEffect 内部管理
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('全部');

  useEffect(() => {
    console.log('FoodTimeMap useEffect 执行');
    
    let mapInstance: any = null; // 在 useEffect 作用域内定义 mapInstance
    let isMounted = true; // 用于防止在组件卸载后继续执行异步操作

    const initMap = async () => {
      // 1. 确保 DOM 容器存在
      if (!mapRef.current) {
        console.error("地图容器 ref 为空，终止初始化");
        return;
      }

      try {
        setMapLoading(true);
        setMapError(null);

        // 2. 动态加载高德地图API
        if (!window.AMap) {
          console.log('开始加载高德地图API...');
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            // 注意：请确保这个 Key 是有效的
            script.src = 'https://webapi.amap.com/maps?v=2.0&key=ab678d92b941d5e6d4b232fa148c9a70&plugin=AMap.InfoWindow';
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => {
              console.log('高德地图API加载成功');
              resolve();
            };
            script.onerror = () => {
              console.error('高德地图API加载失败');
              reject(new Error('地图API加载失败'));
            };
          });
        }

        if (!isMounted) return; // 加载过程中组件可能已经卸载

        // 3. 初始化地图
        console.log('开始初始化地图实例...');
        mapInstance = new window.AMap.Map(mapRef.current, {
          center: [121.473701, 31.230416], // 上海市中心坐标
          zoom: 13,
          resizeEnable: true,
        });
        console.log('地图实例创建成功');
        
        // 清除之前的标记
        mapInstance.clearMap();

        // 4. 创建信息窗口
        const infoWindow = new window.AMap.InfoWindow({
          offset: new window.AMap.Pixel(0, -30),
          // 点击地图空白处关闭信息窗
          isCustom: false, 
        });

        // 5. 添加餐馆标记
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

            mapInstance.add(marker);
          });
        
        // 点击地图空白处时关闭信息窗口
        mapInstance.on('click', () => {
          infoWindow.close();
        });

        console.log('所有标记添加完毕');
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

    // 6. 定义并返回清理函数
    return () => {
      console.log('FoodTimeMap useEffect 清理函数执行');
      isMounted = false;
      if (mapInstance) {
        console.log('销毁地图实例...');
        mapInstance.destroy();
        mapInstance = null; // 确保垃圾回收
      }
    };
  }, [selectedType]); // 依赖 selectedType，当菜系选择变化时重新执行

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      {mapLoading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>地图加载中...</div>}
      {mapError && <div style={{color: 'red'}}>错误: {mapError}</div>}
      {/* 这里和原来的HTML版本保持一致，将图例抽离为独立div，而非在地图初始化时动态添加。
        如果需要动态添加，可以在React组件的JSX中直接渲染。
      */}
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '100%' }}
      ></div>
      <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '6px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxHeight: '400px',
          overflowY: 'auto'
      }}>
          <h4 style={{marginTop: 0, marginBottom: '8px'}}>菜系图例</h4>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '6px' }}>
              <input
                type="radio"
                name="restaurantType"
                value="全部"
                checked={selectedType === '全部'}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{ marginRight: '6px' }}
              />
              <span>全部菜系</span>
            </label>
          </div>
          {Object.entries(typeIcons).map(([type, iconUrl]) => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '6px' }}>
              <input
                type="radio"
                name="restaurantType"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{ marginRight: '6px' }}
              />
              <img src={iconUrl} alt={type} style={{ width: '20px', height: '20px', marginRight: '6px' }} />
              <span>{type}</span>
            </label>
          ))}
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