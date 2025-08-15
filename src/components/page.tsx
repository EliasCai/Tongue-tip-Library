import React from 'react';
import { Star, BookOpen, Calendar, User, ArrowLeft } from "lucide-react"



const bookData: Record<string, any> = {
  '1': {
    title: "烹饪一斑",
    author: "钱寿卢",
    year: "1935",
    cover: "public/book_covers/01.jpeg",
    category: "民国烹饪教材 / 饮食文化",
    publisher: "中华书局",
    pages: "268页",
    description: "民国时期系统烹饪教材，融合传统中式技艺与早期西餐制法，收录326种菜式、女性私房秘方及罕见民国食品成分表。",
    interpretation: {
      background:
        "本书诞生于民国饮食文化转型期，既承袭江南'食不厌精'的传统，又引入早期西餐技法，是近代中国首批系统烹饪教材之一。编者钱寿卢以'民以食为天'为纲，将传统庖厨经验科学化、条理化。",
      content:
        "首章从营养学角度论证食物与体温、体力的关系；第二章收录腌姜、糟韭、酱瓜等326种传统腌渍配方；第四章专述海参、鱼翅等海味烹制法；第六章收录牛排、牛肉蛋卷等8道早期西餐菜谱；第八章附民国罕见《日用食品成分分析表》。",
      cultural:
        "首次将女性烹饪家经验纳入教材，打破'君子远庖厨'传统；保存了民国江浙沪地区即将失传的糟醉技法；营养成分表反映早期中国食物营养研究水平。",
      influence:
        "该书是研究民国时期中西饮食文化交流的重要文献，对现代烹饪教育仍有参考价值。",
    },
    rating: 4.9,
    reviews: [
      {
        user: "《申报》1936年书评",
        rating: 5,
        comment: "书中所载'醉朱蚶'法，竟能使蚶壳自开，酒味透骨，真奇技也！",
      },
      {
        user: "上海读者周梅卿",
        rating: 5,
        comment: "腌芥头九揉九晒之法，按图操作，竟得先祖母风味。",
      },
      {
        user: "现代饮食文化研究者李研",
        rating: 5,
        comment: "西餐章之牛排火候表，比之今日米其林亦不遑多让。",
      },
    ],
  },
  'family-cookbook': {
      title: "家庭食谱烹调法",
      author: "李于明",
      year: "1935",
      cover: "public/book_covers/02.jpeg",
    category: "家常菜系 · 家庭烹饪指南",
    publisher: "大新书店",
    pages: "312页",
    description: "系统化梳理家庭日常烹饪技法，涵盖主食、荤素菜肴、汤品、点心等七大类，兼具操作指导与饮食健康理念，是民国时期家庭主妇的必备烹饪宝典。",
    interpretation: {
      background:
        "成书于20世纪30年代，正值中国近代家庭生活变革期。作者李于明为知名家政教育学者，主张'科学烹饪'与'家庭营养'，反映当时新式家庭对健康饮食的追求。",
      content:
        "结构创新：首创'编-类-谱'三级体系，从理论（食材选择、卫生贮藏）到实践（326道家常菜谱）逻辑清晰。文化融合：既保留江浙菜系的精致（如八宝豆腐、醉蟹），又融入北方面食技法（炸酱面、油酥饺），体现南北饮食交融。女性视角：特设'女子与烹饪'章节，强调主妇技能对家庭健康的核心作用，具有时代社会学意义。",
      cultural:
        "书中'经济性'原则（边角料利用、贮藏法）与当代可持续饮食理念高度契合；对豆腐、杂粮的创意烹调（素火腿、菜饭），为现代素食开发提供灵感。",
      influence:
        "该书是研究民国时期家庭饮食文化的重要文献，对现代家庭烹饪教育仍有重要参考价值。",
    },
    rating: 4.7,
    reviews: [
      {
        user: "主妇实践派",
        rating: 5,
        comment: "照着做红烧肉和酒酿圆子零失败！'火候口诀'和'食材替代方案'特别实用，厨房小白也能进阶。",
      },
      {
        user: "饮食文化研究者",
        rating: 4.5,
        comment: "对比《随园食单》的文人雅趣，此书更贴近平民餐桌。'食物贮藏法'章节是研究民国民生的重要史料。",
      },
      {
        user: "传统味道追寻者",
        rating: 4.8,
        comment: "复刻了失传的禾花雀做法，祖母尝后直呼是童年味道！建议搭配地方志阅读，理解菜谱背后的风物变迁。",
      },
    ],
  },
  '2': {
    title: "随园食单",
    author: "袁枚",
    year: "1792",
    cover: "https://img2.doubanio.com/view/subject/s/public/s29875943.jpg",
    category: "江南菜系",
    publisher: "民国书局",
    pages: "268页",
    description: "《随园食单》是清代著名文学家袁枚的饮食文化经典之作。全书详细记述了江南地区的各种美食制作方法，不仅是一部菜谱，更是一部饮食文化的百科全书。",
    interpretation: {
      background:
        "袁枚（1716-1797），字子才，号简斋，晚号随园老人，是清代著名的文学家、美食家。《随园食单》成书于乾隆五十七年（1792年），是袁枚晚年对其一生饮食经验的总结。",
      content:
        "全书分为须知单、戒单、海鲜单、江鲜单、特牲单、杂牲单、羽族单、水族有鳞单、水族无鳞单、杂素单、小菜单、点心单、饭粥单和茶酒单等十四个部分，共收录了326种南北菜肴的制作方法.",
      cultural:
        '《随园食单》不仅记录了菜肴的制作方法，更重要的是体现了中国传统饮食文化中"食不厌精，脍不厌细"的理念。',
      influence:
        "该书对后世的饮食文化产生了深远影响，被誉为中国古代饮食文化的经典之作。",
    },
    rating: 4.8,
    reviews: [
      {
        user: "文化爱好者",
        rating: 5,
        comment: "袁枚的文笔优美，将美食描述得栩栩如生，是了解清代饮食文化的绝佳读物。",
      },
      { user: "美食研究者", rating: 5, comment: "书中的菜谱制作方法详细，文化内涵丰富。" },
    ],
  },
  '3': {
    title: "调鼎集",
    author: "佚名",
    year: "1930",
    cover: "https://img3.doubanio.com/view/subject/s/public/s29875944.jpg",
    category: "清代",
    publisher: "手稿",
    pages: "500页",
    description: "民国时期发现的清代饮食手稿，收录2000余种菜肴配方，是研究清代饮食文化的重要文献。",
    interpretation: {
      background:
        "《调鼎集》是清代饮食文化的集大成之作，内容极为丰富，涵盖了南北各地的菜系和烹饪技法。",
      content:
        "全书收录了2000余种菜肴配方，包括各种烹饪技法、食材处理、调味方法等，堪称清代饮食百科全书。",
      cultural:
        "反映了清代饮食文化的繁荣景象，保存了大量即将失传的古代烹饪技艺。",
      influence:
        "对研究中国古代饮食文化具有重要价值，为现代烹饪提供了宝贵的历史资料。",
    },
    rating: 4.7,
    reviews: [
      {
        user: "历史学者",
        rating: 5,
        comment: "内容详实，是研究清代饮食文化的重要史料。",
      },
    ],
  },
  '4': {
    title: "家庭食谱大全",
    author: "李公朴",
    year: "1928",
    cover: "https://img4.doubanio.com/view/subject/s/public/s29875945.jpg",
    category: "家庭烹饪",
    publisher: "商务印书馆",
    pages: "320页",
    description: "民国时期流行的家庭烹饪指南，包含中西各式菜肴做法，适合家庭日常使用。",
    interpretation: {
      background:
        "本书是民国时期为适应现代家庭生活需要而编写的实用烹饪指南，融合了中西烹饪技法。",
      content:
        "收录了适合家庭制作的各类菜肴，包括中式传统菜、西式简餐、点心制作等，图文并茂。",
      cultural:
        "体现了民国时期中西文化交融的特点，反映了现代家庭对饮食的新需求。",
      influence:
        "对现代家庭烹饪产生了深远影响，许多做法至今仍在使用。",
    },
    rating: 4.6,
    reviews: [
      {
        user: "家庭主妇",
        rating: 5,
        comment: "非常实用的家庭烹饪指南，做法详细易懂。",
      },
    ],
  },
}

interface BookDetailPageProps {
  bookId?: string;
  onNavigate: (page: string) => void;
}

export default function BookDetailPage({ bookId, onNavigate }: BookDetailPageProps) {
  const id = bookId || '';
  const book = bookData[id as keyof typeof bookData]

  if (!book) {
    return <div>书籍未找到</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-red-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-xl font-bold">舌尖上的图书馆</h1>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 px-4 py-2 text-white hover:text-amber-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>返回首页</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              <span className="inline-block bg-red-900 text-white px-3 py-1 rounded-full text-sm mb-4">{book.category}</span>
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">作者</span>
                  <span className="font-medium">{book.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">年份</span>
                  <span className="font-medium">{book.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">页数</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">评分</span>
                  <span className="font-medium">{book.rating}/5.0</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{book.description}</p>
              <button
                onClick={() => onNavigate(`reader/${id}`)}
                className="w-full bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-md transition-colors"
              >
                开始阅读
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">快速导航</h3>
              <div className="space-y-2">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => onNavigate('home')}
                >
                  ← 返回首页
                </button>
              </div>
            </div>
          </div>

          {/* Interpretation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-red-900">专业解读</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3 text-lg">历史背景</h3>
                  <p className="text-gray-700 leading-relaxed">{book.interpretation.background}</p>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="font-bold mb-3 text-lg">内容概述</h3>
                  <p className="text-gray-700 leading-relaxed">{book.interpretation.content}</p>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="font-bold mb-3 text-lg">文化价值</h3>
                  <p className="text-gray-700 leading-relaxed">{book.interpretation.cultural}</p>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="font-bold mb-3 text-lg">现代影响</h3>
                  <p className="text-gray-700 leading-relaxed">{book.interpretation.influence}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold mb-6 text-red-900">用户评价</h2>
              <div className="space-y-4">
                {book.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reading Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                window.location.href = `/reader/family-cookbook?pdf=/pdf_resources/02.pdf&ocr=/ocr_pages/02/page-1.md&page=2`;
              }}
              className="bg-red-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
            >
              开始阅读
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
