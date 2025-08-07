import React, { useState } from 'react';
import { MapPin, Star, Book, Clock } from 'lucide-react';
import { mockMapLocations } from '../data/mockData';
import { MapLocation } from '../types';

interface FoodTimeMapProps {
  onNavigate: (page: string) => void;
}

const FoodTimeMap: React.FC<FoodTimeMapProps> = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = [
    { id: 'all', name: '全部城市', coordinates: [116.4074, 39.9042] },
    { id: 'shanghai', name: '上海', coordinates: [121.4737, 31.2304] },
    { id: 'guangzhou', name: '广州', coordinates: [113.2644, 23.1291] },
    { id: 'beijing', name: '北京', coordinates: [116.4074, 39.9042] },
    { id: 'nanjing', name: '南京', coordinates: [118.7969, 32.0603] },
  ];

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return '🍽️';
      case 'market':
        return '🏪';
      case 'landmark':
        return '🏛️';
      default:
        return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">食光地图</h1>
          <p className="text-gray-700">探索民国时期各地的饮食文化地标</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* City Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">选择城市</h3>
              <div className="space-y-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedCity === city.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Location List */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">美食地标</h3>
              <div className="space-y-3">
                {mockMapLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getLocationIcon(location.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {location.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Mock Map */}
              <div className="relative h-96 bg-gradient-to-br from-amber-100 to-red-100">
                <div className="absolute inset-0 bg-opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22/%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%223%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-red-900 mb-2">民国中华美食地图</h3>
                    <p className="text-gray-700 mb-6">点击左侧地标了解详情</p>
                    
                    {/* Mock Map Points */}
                    <div className="relative inline-block">
                      <div className="w-80 h-60 bg-yellow-50 rounded-lg border-2 border-red-200 relative">
                        {mockMapLocations.map((location, index) => (
                          <button
                            key={location.id}
                            onClick={() => handleLocationClick(location)}
                            className="absolute w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-red-700 transition-colors duration-200 hover:scale-110 transform"
                            style={{
                              left: `${20 + index * 60}px`,
                              top: `${50 + index * 30}px`
                            }}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              {selectedLocation && (
                <div className="p-6 border-t">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getLocationIcon(selectedLocation.type)}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h3>
                        <p className="text-gray-600">{selectedLocation.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>招牌菜品</span>
                      </h4>
                      <ul className="space-y-2">
                        {selectedLocation.dishes.map((dish, index) => (
                          <li key={index} className="text-gray-700 flex items-center space-x-2">
                            <span className="text-red-600">•</span>
                            <span>{dish}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <Book className="h-5 w-5 text-blue-500" />
                        <span>历史故事</span>
                      </h4>
                      <ul className="space-y-2">
                        {selectedLocation.stories.map((story, index) => (
                          <li key={index} className="text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{story}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <button
                      onClick={() => onNavigate('reader')}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 mr-4"
                    >
                      阅读相关文献
                    </button>
                    <button
                      onClick={() => onNavigate('knowledge')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                      查看关联知识
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTimeMap;