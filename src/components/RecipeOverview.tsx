import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Users, Filter, Grid, List, ChevronRight } from 'lucide-react';
import { mockRecipes } from '../data/mockData';

interface RecipeOverviewProps {
  onNavigate: (page: string) => void;
  onRecipeClick: (recipeId: string) => void;
}

const RecipeOverview: React.FC<RecipeOverviewProps> = ({ onNavigate, onRecipeClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popularity' | 'date' | 'era'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 主题推荐标签
  const themeTags = [
    { label: '探秘总统府的餐桌', type: 'weekly' },
    { label: '粤', type: 'cuisine' },
    { label: '川', type: 'cuisine' },
    { label: '鲁', type: 'cuisine' },
    { label: '苏', type: 'cuisine' },
    { label: '随园食单', type: 'source' },
    { label: '秋日蟹宴', type: 'seasonal' }
  ];

  // 地区数据
  const regions = [
    { id: 'sichuan', name: '四川', cuisine: '川菜', count: 12, color: 'bg-red-500' },
    { id: 'guangdong', name: '广东', cuisine: '粤菜', count: 8, color: 'bg-orange-500' },
    { id: 'jiangsu', name: '江苏', cuisine: '苏菜', count: 15, color: 'bg-yellow-500' },
    { id: 'shandong', name: '山东', cuisine: '鲁菜', count: 6, color: 'bg-blue-500' },
    { id: 'zhejiang', name: '浙江', cuisine: '浙菜', count: 10, color: 'bg-green-500' }
  ];

  // 筛选菜谱
  const filteredRecipes = useMemo(() => {
    let filtered = [...mockRecipes];

    // 搜索筛选
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 地区筛选
    if (selectedRegion) {
      filtered = filtered.filter(recipe => recipe.region === selectedRegion);
    }

    // 菜系筛选
    if (selectedCuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCuisine);
    }

    // 排序
    switch (sortBy) {
      case 'popularity':
        return filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      case 'date':
        return filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      case 'era':
        return filtered.sort((a, b) => (b.era || 0) - (a.era || 0));
      default:
        return filtered;
    }
  }, [searchQuery, selectedRegion, selectedCuisine, sortBy]);

  const handleTagClick = (tag: string, type: string) => {
    if (type === 'cuisine') {
      setSelectedCuisine(tag);
    } else {
      setSearchQuery(tag);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* 顶部标题区 */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">寻味大观</h1>
          <p className="text-red-200 text-lg">探索民国饮食文化的味觉地图</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧筛选区 */}
          <div className="lg:col-span-1">
            {/* 交互式地图 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-red-600" />
                按地区筛选
              </h3>
              <div className="space-y-3">
                {regions.map(region => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedRegion === region.id
                        ? 'bg-red-100 border-red-300 border'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{region.name}</span>
                        <span className="text-sm text-gray-500 ml-2">{region.cuisine}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs text-white ${region.color}`}>
                        {region.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 菜系筛选 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-red-600" />
                按菜系筛选
              </h3>
              <div className="space-y-2">
                {['川菜', '粤菜', '苏菜', '鲁菜', '浙菜', '闽菜', '湘菜', '徽菜'].map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)}
                    className={`w-full text-left p-2 rounded transition-colors ${
                      selectedCuisine === cuisine
                        ? 'bg-red-100 text-red-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="lg:col-span-3">
            {/* 智能检索区 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="搜索菜名、食材或《随园食单》等典籍..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* 主题推荐标签 */}
              <div className="flex flex-wrap gap-2">
                {themeTags.map(tag => (
                  <button
                    key={tag.label}
                    onClick={() => handleTagClick(tag.label, tag.type)}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 排序和视图控制 */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                共找到 {filteredRecipes.length} 道菜谱
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="popularity">按热度</option>
                  <option value="date">按收录时间</option>
                  <option value="era">按原文年代</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 菜谱卡片流 */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => onRecipeClick(`recipe-detail/${recipe.id}`)}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-48 h-32' : 'h-48'}>
                    <img
                      src={recipe.imageUrl || '/placeholder.svg'}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {recipe.description || `${recipe.name} - 民国经典菜肴，传承百年美味`}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                        #{recipe.cuisine || '经典'}
                      </span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                        #{recipe.difficulty || '传统'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>源自：{recipe.source}</span>
                      <div className="flex items-center">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">暂无匹配的菜谱</div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion(null);
                    setSelectedCuisine(null);
                  }}
                  className="text-red-600 hover:text-red-700 underline"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeOverview;