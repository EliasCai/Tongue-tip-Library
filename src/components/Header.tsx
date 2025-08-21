import React from 'react';
import { BookOpen, Map, Users, Search, ChefHat } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold">舌尖上的图书馆</h1>
              <p className="text-sm text-red-200">民国饮食文化数字化平台</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-red-700 text-white'
                  : 'text-red-200 hover:text-white hover:bg-red-700'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>首页</span>
            </button>
            
            <button
              onClick={() => onNavigate('reader')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'reader'
                  ? 'bg-red-700 text-white'
                  : 'text-red-200 hover:text-white hover:bg-red-700'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>互动阅读</span>
            </button>
            
            <button
              onClick={() => onNavigate('map')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'map'
                  ? 'bg-red-700 text-white'
                  : 'text-red-200 hover:text-white hover:bg-red-700'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>食光地图</span>
            </button>
            
            <button
              onClick={() => onNavigate('recipes')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'recipes'
                  ? 'bg-red-700 text-white'
                  : 'text-red-200 hover:text-white hover:bg-red-700'
              }`}
            >
              <ChefHat className="h-5 w-5" />
              <span>寻味菜谱</span>
            </button>
            

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;