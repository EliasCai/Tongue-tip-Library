import React from 'react';
import { Sparkles, BookOpen, Map, Users, Camera } from 'lucide-react';
import { mockRecipes } from '../data/mockData';
import { Recipe } from '../types';

interface HomepageProps {
  onNavigate: (page: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6 leading-tight">
              穿越百年时光
              <br />
              <span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                品味民国美食
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              通过AI技术重现民国时期的饮食文化，让古籍中的美味佳肴在现代重新焕发生机。
              探索那个时代的人间烟火，感受历史的温度。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('featured-books')}
                className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                开始阅读之旅
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                探索食光地图
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-red-900 mb-12">
            三大核心功能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-900 mb-4">AI菜谱视觉再现</h3>
              <p className="text-gray-700 leading-relaxed">
                将古籍中的文字菜谱转化为生动的视觉图像，让您"看见"百年前的美食风貌。
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-900 mb-4">多维互动阅读</h3>
              <p className="text-gray-700 leading-relaxed">
                智能识别文中实体，提供丰富的背景知识和关联故事，让阅读变成探索。
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Map className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-900 mb-4">食光地图</h3>
              <p className="text-gray-700 leading-relaxed">
                以地理空间为载体，系统性地展示民国时期各地的饮食文化和知识网络。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900 to-red-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            精选民国菜谱
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-red-900">{recipe.name}</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    {recipe.region}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{recipe.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>{recipe.source}</span> • <span>{recipe.era}</span>
                  </div>
                  <button 
                    onClick={() => onNavigate(`recipe-detail/${recipe.id}`)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 px-4 bg-yellow-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            开启您的民国美食探索之旅
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            加入我们，一起发现隐藏在历史深处的美味故事，让古老的菜谱在现代重新焕发光彩。
          </p>
          <button
            onClick={() => onNavigate('reader')}
            className="bg-white hover:bg-gray-100 text-yellow-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            立即开始探索
          </button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;