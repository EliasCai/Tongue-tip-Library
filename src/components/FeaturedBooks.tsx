import React from 'react';
import { BookOpen, Clock, User } from 'lucide-react';
import { mockBooks } from '../data/mockData';

interface FeaturedBooksProps {
  onNavigate: (page: string) => void;
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-900 mb-12">
            精选民国饮食书籍
          </h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={book.id === '1' ? '/book_covers/01.jpeg' : book.id === '2' ? '/book_covers/02.jpeg' : book.coverImage}
                    alt={`${book.title}封面`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-red-900 mb-2">{book.title}</h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{book.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{book.year}</span>
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 flex-grow">{book.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => onNavigate(`book-detail/${book.id}`)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  查看详情
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedBooks;