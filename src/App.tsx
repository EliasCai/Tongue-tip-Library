import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import InteractiveReader from './components/InteractiveReader';
import ReadingInterface from './components/ReadingInterface';
import FoodTimeMap from './components/FoodTimeMap';
import KnowledgeGraph from './components/KnowledgeGraph';
import FeaturedBooks from './components/FeaturedBooks';
import BookDetailPage from './components/page';
import RecipeDetail from './components/RecipeDetail';
import RecipeOverview from './components/RecipeOverview';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    if (currentPage.startsWith('book-detail/')) {
      const bookId = currentPage.split('book-detail/')[1];
      return <BookDetailPage bookId={bookId} onNavigate={handleNavigate} />;
    }
    
    if (currentPage.startsWith('reader/')) {
      const bookId = currentPage.split('reader/')[1];
      return <ReadingInterface bookId={bookId} onNavigate={handleNavigate} />;
    }

    if (currentPage.startsWith('recipe-detail/')) {
      const recipeId = currentPage.split('recipe-detail/')[1];
      return <RecipeDetail recipeId={recipeId} onNavigate={handleNavigate} />;
    }
    
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'reader':
        return <InteractiveReader onNavigate={handleNavigate} />;
      case 'map':
        return <FoodTimeMap onNavigate={handleNavigate} />;
      case 'knowledge':
        return <KnowledgeGraph onNavigate={handleNavigate} />;
      case 'featured-books':
        return <FeaturedBooks onNavigate={handleNavigate} />;
      case 'recipes':
        return <RecipeOverview onNavigate={handleNavigate} onRecipeClick={handleNavigate} />;
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;