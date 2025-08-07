import React, { useState } from 'react';
import { Users, ArrowRight, MapPin, Book, ChefHat } from 'lucide-react';
import { mockEntities } from '../data/mockData';

interface KnowledgeGraphProps {
  onNavigate: (page: string) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onNavigate }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [centerNode, setCenterNode] = useState<string>('谭延闿');

  const nodes = [
    { id: '谭延闿', type: 'person', x: 250, y: 200, connections: ['组庵菜', '湘菜', '太史蛇羹'] },
    { id: '组庵菜', type: 'dish', x: 150, y: 100, connections: ['谭延闿', '湘菜'] },
    { id: '湘菜', type: 'cuisine', x: 350, y: 100, connections: ['谭延闿', '组庵菜', '辣椒'] },
    { id: '太史蛇羹', type: 'dish', x: 150, y: 300, connections: ['谭延闿', '广东菜', '五芳斋'] },
    { id: '五芳斋', type: 'restaurant', x: 350, y: 300, connections: ['太史蛇羹', '上海', '张爱玲'] },
    { id: '张爱玲', type: 'person', x: 450, y: 200, connections: ['五芳斋', '上海', '排骨年糕'] },
    { id: '排骨年糕', type: 'dish', x: 450, y: 350, connections: ['张爱玲', '五芳斋', '上海'] },
    { id: '上海', type: 'place', x: 550, y: 250, connections: ['张爱玲', '五芳斋', '排骨年糕'] },
    { id: '广东菜', type: 'cuisine', x: 50, y: 250, connections: ['太史蛇羹'] },
    { id: '辣椒', type: 'ingredient', x: 400, y: 50, connections: ['湘菜'] },
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'person':
        return <Users className="h-5 w-5" />;
      case 'dish':
        return <ChefHat className="h-5 w-5" />;
      case 'restaurant':
        return <MapPin className="h-5 w-5" />;
      case 'place':
        return <MapPin className="h-5 w-5" />;
      case 'cuisine':
        return <Book className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'person':
        return 'bg-blue-500';
      case 'dish':
        return 'bg-green-500';
      case 'restaurant':
        return 'bg-red-500';
      case 'place':
        return 'bg-purple-500';
      case 'cuisine':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getNodeDescription = (nodeId: string) => {
    const descriptions: { [key: string]: string } = {
      '谭延闿': '民国政治家，组庵菜创始人',
      '组庵菜': '湘菜的重要分支，精工细作',
      '湘菜': '中国八大菜系之一，以辣著称',
      '太史蛇羹': '广东名菜，汤清味鲜',
      '五芳斋': '上海知名餐厅，以排骨年糕闻名',
      '张爱玲': '著名作家，美食爱好者',
      '排骨年糕': '上海经典小吃',
      '上海': '民国时期重要商业城市',
      '广东菜': '粤菜，注重食材的鲜美',
      '辣椒': '湘菜的重要调料',
    };
    return descriptions[nodeId] || '暂无描述';
  };

  const renderConnections = () => {
    const connections = [];
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          connections.push(
            <line
              key={`${node.id}-${targetId}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="transition-all duration-300 hover:stroke-red-400"
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">知识图谱</h1>
          <p className="text-gray-700">探索民国饮食文化的关系网络</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Knowledge Graph */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">饮食文化关系网络</h3>
                <p className="text-gray-600">点击节点探索相关知识</p>
              </div>
              
              <div className="relative">
                <svg width="600" height="400" className="border rounded-lg bg-gray-50">
                  {renderConnections()}
                  
                  {nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        className={`${getNodeColor(node.type)} ${
                          selectedNode === node.id ? 'opacity-100' : 'opacity-80'
                        } cursor-pointer hover:opacity-100 transition-all duration-300`}
                        onClick={() => setSelectedNode(node.id)}
                      />
                      <foreignObject
                        x={node.x - 12}
                        y={node.y - 12}
                        width="24"
                        height="24"
                        className="pointer-events-none"
                      >
                        <div className="text-white flex items-center justify-center">
                          {getNodeIcon(node.type)}
                        </div>
                      </foreignObject>
                      <text
                        x={node.x}
                        y={node.y + 40}
                        textAnchor="middle"
                        className="text-sm font-medium fill-gray-700"
                      >
                        {node.id}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">人物</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">菜品</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">餐厅</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">地点</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">菜系</span>
                </div>
              </div>
            </div>
          </div>

          {/* Node Details */}
          <div className="space-y-6">
            {selectedNode && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 ${getNodeColor(nodes.find(n => n.id === selectedNode)?.type || 'default')} rounded-full flex items-center justify-center text-white`}>
                    {getNodeIcon(nodes.find(n => n.id === selectedNode)?.type || 'default')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedNode}</h3>
                </div>
                
                <p className="text-gray-700 mb-4">{getNodeDescription(selectedNode)}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">关联节点</h4>
                  <div className="space-y-2">
                    {nodes.find(n => n.id === selectedNode)?.connections.map((connection, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedNode(connection)}
                        className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="text-gray-700">{connection}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onNavigate('reader')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    阅读相关文献
                  </button>
                  <button
                    onClick={() => onNavigate('map')}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    地图定位
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">快速操作</h4>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('reader')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Book className="h-5 w-5" />
                  <span>互动阅读</span>
                </button>
                <button
                  onClick={() => onNavigate('map')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  <span>食光地图</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">搜索知识</h4>
              <input
                type="text"
                placeholder="搜索人物、菜品、餐厅..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;