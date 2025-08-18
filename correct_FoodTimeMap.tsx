// src/components/FoodTimeMap.tsx

import React, a{ useEffect, useRef, useState } from 'react';

// ... (接口 Restaurant, restaurantData, typeIcons, typeColors 保持不变) ...

// ErrorBoundary 组件也保持不变

function FoodTimeMapContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  // 不再需要 map 和 selectedRestaurant 的 state，因为地图实例由 useEffect 内部管理
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

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

        // 4. 创建信息窗口
        const infoWindow = new window.AMap.InfoWindow({
          offset: new window.AMap.Pixel(0, -30),
          // 点击地图空白处关闭信息窗
          isCustom: false, 
        });

        // 5. 添加餐馆标记
        restaurantData.forEach(restaurant => {
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
  }, []); // 空依赖数组，确保 effect 只在挂载和卸载时运行一次

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
          zIndex: 1000
      }}>
          <h4 style={{marginTop: 0, marginBottom: '8px'}}>菜系图例</h4>
          {Object.entries(typeIcons).map(([type, iconUrl]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
              <img src={iconUrl} alt={type} style={{ width: '20px', height: '20px', marginRight: '6px' }} />
              <span>{type}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

// ... (声明 declare global 和导出 FoodTimeMap 保持不变) ...

export default function FoodTimeMap() {
  return (
      <ErrorBoundary>
        <FoodTimeMapContent />
      </ErrorBoundary>
  );
}