import React, { useEffect, useRef, useState } from 'react';

interface Restaurant {
  name: string;
  address: string;
  type: string;
  location: [number, number];
}

const restaurantData: Restaurant[] = [
  { name: "老正兴菜馆", address: "上海市黄浦区福州路556号", type: "上海菜", location: [121.485, 31.237] },
  { name: "德兴馆", address: "上海市黄浦区广东路471号", type: "上海菜", location: [121.487, 31.235] },
  { name: "王宝和酒家", address: "上海市黄浦区福州路603号", type: "上海菜", location: [121.484, 31.238] },
  { name: "老半斋", address: "上海市黄浦区福州路600号", type: "淮扬菜", location: [121.484, 31.238] },
  { name: "杏花楼", address: "上海市黄浦区福州路343号", type: "广东菜", location: [121.488, 31.234] },
  { name: "新雅粤菜馆", address: "上海市黄浦区南京东路719号", type: "广东菜", location: [121.481, 31.239] },
  { name: "梅龙镇酒家", address: "上海市静安区南京西路1081弄22号", type: "四川菜", location: [121.459, 31.229] },
  { name: "绿波廊", address: "上海市黄浦区豫园路131号", type: "上海菜", location: [121.493, 31.227] },
  { name: "上海老饭店", address: "上海市黄浦区福佑路242号", type: "上海菜", location: [121.493, 31.227] },
  { name: "功德林素菜馆", address: "上海市黄浦区南京西路445号", type: "素菜", location: [121.461, 31.231] },
  { name: "红房子西菜馆", address: "上海市黄浦区淮海中路845号", type: "西菜", location: [121.464, 31.221] },
  { name: "德大西菜社", address: "上海市黄浦区四川中路359号", type: "西菜", location: [121.487, 31.243] }
];

const typeIcons: { [key: string]: string } = {
  "上海菜": "/icons/上海菜.png",
  "淮扬菜": "/icons/天津菜.png",
  "广东菜": "/icons/广东菜.png",
  "四川菜": "/icons/四川菜.png",
  "素菜": "/icons/素菜.png",
  "西菜": "/icons/西菜.png"
};

const typeColors: { [key: string]: string } = {
  "上海菜": "#FF6B35",
  "淮扬菜": "#4ECDC4",
  "广东菜": "#45B7D1",
  "四川菜": "#E74C3C",
  "素菜": "#27AE60",
  "西菜": "#9B59B6"
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">出错了</h2>
            <p className="text-gray-700 mb-4">{this.state.error?.message || '未知错误'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function FoodTimeMapContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    console.log('FoodTimeMap组件挂载，开始检查地图API...');
    
    // 防抖：确保只初始化一次
    let isMounted = true;
    let mapInstance: any = null;
    let markers: any[] = [];

    const initMap = async () => {
          console.log('检查地图容器:', mapRef.current);
          console.log('地图容器DOM检查:', {
            mapRefCurrent: mapRef.current,
            documentContains: mapRef.current ? document.contains(mapRef.current) : false,
            offsetHeight: mapRef.current ? mapRef.current.offsetHeight : 'N/A',
            offsetWidth: mapRef.current ? mapRef.current.offsetWidth : 'N/A',
            readyState: document.readyState
          });
          
          if (!mapRef.current) {
            console.error('地图容器未找到，等待DOM加载...');
            
            // 如果DOM还未完全加载，等待
            if (document.readyState !== 'complete') {
              console.log('DOM未完全加载，等待...');
              window.addEventListener('load', () => {
                if (isMounted && mapRef.current) {
                  console.log('DOM加载完成，重新初始化...');
                  initMap();
                }
              });
              return;
            }
            
            // 如果容器仍然未找到，延迟重试
            setTimeout(() => {
              if (isMounted && mapRef.current) {
                console.log('地图容器已找到，重新初始化...');
                initMap();
              } else {
                console.error('地图容器仍然未找到');
                setMapError('地图容器未找到，请确保页面已完全加载');
                setMapLoading(false);
              }
            }, 1000);
            return;
          }

          if (!isMounted || !document.contains(mapRef.current)) return;

          try {
            setMapLoading(true);
            setMapError(null);

            // 如果高德地图API尚未加载，则动态加载
            if (!window.AMap) {
              console.log('开始加载高德地图API...');
              await new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                // 使用一个有效的高德地图API密钥
                script.src = 'https://webapi.amap.com/maps?v=2.0&key=ab678d92b941d5e6d4b232fa148c9a70&plugin=AMap.InfoWindow';
                script.async = true;
                script.onload = () => {
                  console.log('高德地图API加载成功');
                  resolve();
                };
                script.onerror = () => {
                  console.error('高德地图API加载失败');
                  reject(new Error('地图API加载失败'));
                };
                document.head.appendChild(script);
                setTimeout(() => {
                  console.error('高德地图API加载超时');
                  reject(new Error('地图API加载超时'));
                }, 10000);
              });
            } else {
              console.log('高德地图API已存在，跳过加载');
            }

            console.log('检查地图初始化条件:', {
              isMounted,
              mapRefExists: !!mapRef.current,
              mapRefInDOM: mapRef.current ? document.contains(mapRef.current) : false
            });

            if (!isMounted || !document.contains(mapRef.current)) {
              console.error('地图初始化条件不满足，取消初始化');
              return;
            }

            console.log('开始初始化地图...');
            try {
              mapInstance = new window.AMap.Map(mapRef.current, {
                center: [121.473667, 31.230525],
                zoom: 12,
                resizeEnable: true
              });
              console.log('地图初始化成功');
            
            // 检查容器尺寸
            const container = mapRef.current;
            if (container) {
              console.log('地图容器尺寸:', {
                width: container.offsetWidth,
                height: container.offsetHeight,
                clientWidth: container.clientWidth,
                clientHeight: container.clientHeight
              });
            }
            
            // 添加一个测试标记来验证地图是否正常工作
            const testMarker = new window.AMap.Marker({
              position: [121.473667, 31.230525],
              title: '测试标记 - 上海人民广场',
              label: {
                content: '测试',
                offset: new window.AMap.Pixel(10, 0)
              }
            });
            mapInstance.add(testMarker);
            console.log('测试标记已添加');
            
          } catch (error) {
            console.error('地图初始化失败:', error);
            setMapError('地图初始化失败: ' + (error as Error).message);
            setMapLoading(false);
            return;
          }

        // 添加餐馆标记
        console.log('开始添加餐馆标记，总数:', restaurantData.length);
        restaurantData.forEach((restaurant, index) => {
          if (!isMounted) return;
          try {
            console.log(`添加第${index + 1}个标记:`, restaurant.name, restaurant.location);
            const marker = new window.AMap.Marker({
              position: restaurant.location,
              title: restaurant.name,
              icon: new window.AMap.Icon({
                size: new window.AMap.Size(32, 32),
                image: typeIcons[restaurant.type] || "/icons/上海菜.png",
                imageSize: new window.AMap.Size(32, 32)
              })
            });

          const infoWindow = new window.AMap.InfoWindow({
            content: `
              <div style="padding: 10px; font-size: 14px;">
                <h4 style="margin: 0 0 5px 0; color: ${typeColors[restaurant.type] || '#333'}">${restaurant.name}</h4>
                <p style="margin: 3px 0; color: #666">地址：${restaurant.address}</p>
                <p style="margin: 3px 0; color: #666">类型：${restaurant.type}</p>
              </div>
            `,
            offset: new window.AMap.Pixel(0, -30)
          });

          marker.on('click', () => {
            if (!isMounted || !mapInstance || !document.contains(mapRef.current)) return;
            infoWindow.open(mapInstance, marker.getPosition());
            setSelectedRestaurant(restaurant);
          });

          mapInstance.add(marker);
          markers.push(marker);
        } catch (markerError) {
          console.error(`添加第${index + 1}个标记失败:`, markerError);
        }
        });

        // 设置地图中心点和缩放级别
        if (restaurantData.length > 0 && isMounted) {
          try {
            console.log('设置地图边界，包含所有餐馆标记');
            const bounds = new window.AMap.Bounds();
            restaurantData.forEach(restaurant => {
              bounds.extend(restaurant.location);
            });
            mapInstance.setBounds(bounds);
            console.log('地图边界设置完成');
          } catch (boundsError) {
            console.error('设置地图边界失败:', boundsError);
            // 如果设置边界失败，使用默认中心点
            mapInstance.setCenter([121.473667, 31.230525]);
          }
        }

        if (isMounted) {
          setMap(mapInstance);
          setMapLoading(false);
          setMapError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('地图初始化失败:', error);
          setMapError('地图初始化失败: ' + (error as Error).message);
          setMapLoading(false);
        }
      }
    };

    // 延迟500ms执行，确保DOM完全加载
    const timeoutId = setTimeout(initMap, 500);

    return () => {
      console.log('FoodTimeMap组件卸载，开始清理...');
      isMounted = false;
      clearTimeout(timeoutId);
      
      try {
        // 清理所有标记
        markers.forEach(marker => {
          if (marker && typeof marker.remove === 'function') {
            try {
              marker.remove();
            } catch (error) {
              console.warn('移除标记时出错:', error);
            }
          }
        });
        markers.length = 0; // 清空数组
        
        // 销毁地图实例 - 增加更严格的检查
        if (mapInstance && typeof mapInstance.destroy === 'function') {
          try {
            // 检查地图容器是否还存在
            if (mapRef.current && document.contains(mapRef.current)) {
              mapInstance.destroy();
            }
            mapInstance = null;
          } catch (error) {
            console.warn('销毁地图实例时出错:', error);
          }
        }
        
        // 清理所有信息窗口 - 使用更安全的清理方式
        try {
          const infoWindows = document.querySelectorAll('.amap-info');
          infoWindows.forEach(infoWindow => {
            if (infoWindow && infoWindow.parentNode) {
              // 检查节点是否还在DOM中
              if (document.body && document.body.contains(infoWindow)) {
                try {
                  infoWindow.parentNode.removeChild(infoWindow);
                } catch (error) {
                  console.warn('清理信息窗口失败:', error);
                }
              }
            }
          });
        } catch (error) {
          console.warn('清理信息窗口时出错:', error);
        }
        
        // 清理地图容器引用
        if (mapRef.current) {
          try {
            mapRef.current.innerHTML = '';
          } catch (error) {
            console.warn('清理地图容器失败:', error);
          }
          mapRef.current = null;
        }
        
        setMap(null);
        setSelectedRestaurant(null);
      } catch (error) {
        console.warn('清理地图资源时出错:', error);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">民国上海美食地图</h1>
          <p className="text-lg text-gray-600">探索老上海的经典美食记忆</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 地图区域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div 
                ref={mapRef} 
                id="food-time-map-container"
                className="w-full h-96 lg:h-[500px] rounded-lg bg-gray-100"
                style={{ 
                  border: '1px solid #e5e7eb',
                  height: '500px',
                  position: 'relative',
                  minHeight: '500px'
                }}
              >
                {mapLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                    <p>地图加载中...</p>
                  </div>
                )}
                {mapError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="font-semibold mb-2">{mapError}</p>
                    <p className="text-sm mb-4">请检查网络连接或刷新页面重试</p>
                    <button 
                      onClick={() => {
                        console.log('手动重新初始化地图...');
                        setMapError(null);
                        setMapLoading(true);
                        setTimeout(initMap, 100);
                      }}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                    >
                      重新加载地图
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 图例和餐馆列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">菜系图例</h3>
              <div className="space-y-3 mb-6">
                {Object.entries(typeIcons).map(([type, icon]) => (
                  <div key={type} className="flex items-center">
                    <img 
                      src={icon} 
                      alt={type} 
                      className="w-6 h-6 mr-2"
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: typeColors[type] }}
                    >
                      {type}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">餐馆列表</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {restaurantData.map((restaurant) => (
                  <div
                    key={restaurant.name}
                    className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedRestaurant?.name === restaurant.name 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      if (map) {
                        map.setCenter(restaurant.location);
                        map.setZoom(15);
                      }
                    }}
                  >
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {restaurant.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {restaurant.address}
                    </p>
                    <span 
                      className="inline-block text-xs px-2 py-1 rounded-full mt-2"
                      style={{ 
                        backgroundColor: typeColors[restaurant.type] + '20',
                        color: typeColors[restaurant.type]
                      }}
                    >
                      {restaurant.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 选中餐馆详情 */}
        {selectedRestaurant && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedRestaurant.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{selectedRestaurant.address}</p>
                </div>
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">类型：</span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm ml-2"
                    style={{ 
                      backgroundColor: typeColors[selectedRestaurant.type] + '20',
                      color: typeColors[selectedRestaurant.type]
                    }}
                  >
                    {selectedRestaurant.type}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">坐标：</span>
                  <span className="text-gray-600 ml-2">
                    {selectedRestaurant.location[0].toFixed(3)}, {selectedRestaurant.location[1].toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 添加高德地图类型声明
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