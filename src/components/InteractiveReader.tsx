import React, { useState } from 'react';
import { Camera, BookOpen, MapPin, Clock, User } from 'lucide-react';
import { mockDocument } from '../data/mockData';
import { FoodEntity } from '../types';

interface InteractiveReaderProps {
  onNavigate: (page: string) => void;
}

const InteractiveReader: React.FC<InteractiveReaderProps> = ({ onNavigate }) => {
  const [selectedEntity, setSelectedEntity] = useState<FoodEntity | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleEntityClick = (entity: FoodEntity) => {
    setSelectedEntity(entity);
  };

  const handleGenerateImage = async (entityName: string) => {
    setGeneratingImage(true);
    setGeneratedImage(null);
    
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated image URL
    setGeneratedImage(`https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400`);
    setGeneratingImage(false);
  };

  const highlightEntities = (text: string, entities: FoodEntity[]) => {
    let highlightedText = text;
    
    entities.forEach((entity) => {
      const regex = new RegExp(`(${entity.name})`, 'g');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="entity-highlight cursor-pointer bg-yellow-200 hover:bg-yellow-300 px-1 py-0.5 rounded transition-colors duration-200" data-entity="${entity.name}">$1</span>`
      );
    });
    
    return highlightedText;
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <MapPin className="h-5 w-5 text-red-600" />;
      case 'person':
        return <User className="h-5 w-5 text-blue-600" />;
      case 'dish':
        return <BookOpen className="h-5 w-5 text-green-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">{mockDocument.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <span className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{mockDocument.author}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{mockDocument.year}年</span>
            </span>
            <span className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{mockDocument.source}</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Reading Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div
                className="text-lg leading-relaxed text-gray-800 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: highlightEntities(mockDocument.content, mockDocument.entities)
                }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains('entity-highlight')) {
                    const entityName = target.getAttribute('data-entity');
                    const entity = mockDocument.entities.find(e => e.name === entityName);
                    if (entity) {
                      handleEntityClick(entity);
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Knowledge Exploration Panel */}
          <div className="space-y-6">
            {selectedEntity && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getEntityIcon(selectedEntity.type)}
                    <h3 className="text-xl font-bold text-gray-900">{selectedEntity.name}</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {selectedEntity.type === 'restaurant' ? '餐厅' : 
                     selectedEntity.type === 'person' ? '人物' : 
                     selectedEntity.type === 'dish' ? '菜品' : '其他'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{selectedEntity.description}</p>
                
                {selectedEntity.stories.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">相关故事</h4>
                    <ul className="space-y-2">
                      {selectedEntity.stories.map((story, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>{story}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedEntity.type === 'dish' && (
                  <div className="border-t pt-4">
                    <button
                      onClick={() => handleGenerateImage(selectedEntity.name)}
                      disabled={generatingImage}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Camera className="h-5 w-5" />
                      <span>
                        {generatingImage ? '正在生成民国影像...' : '生成民国影像'}
                      </span>
                    </button>
                  </div>
                )}
                
                {selectedEntity.location && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">位置信息</h4>
                    <p className="text-sm text-gray-600">{selectedEntity.location.city}</p>
                    <button
                      onClick={() => onNavigate('map')}
                      className="text-red-600 hover:text-red-700 text-sm font-medium mt-2"
                    >
                      在地图中查看 →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Image Generation Result */}
            {generatingImage && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-700">正在穿越回民国厨房，为您烹制'{selectedEntity?.name}'影像...</p>
                </div>
              </div>
            )}

            {generatedImage && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-3">AI生成的民国影像</h4>
                <img
                  src={generatedImage}
                  alt={`${selectedEntity?.name} 的民国风味影像`}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <p className="text-sm text-gray-600 mb-3">
                  源自《{mockDocument.source}》'{selectedEntity?.name}'章节
                </p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    保存至我的食光集
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    分享
                  </button>
                </div>
              </div>
            )}

            {/* Reading Guide */}
            <div className="bg-yellow-50 rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">阅读指南</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>点击文中<span className="bg-yellow-200 px-1 rounded">高亮词汇</span>查看详细信息</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>菜品名称可生成AI复原图像</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span>餐厅和地点可在地图中查看</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveReader;