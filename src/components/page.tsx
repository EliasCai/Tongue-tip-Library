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
    rating: 4.7,
    reviews: [
      {
        user: "《大公报》1948年书评",
        rating: 5,
        comment: "十一大类五百余肴馔，囊括南北风味，实为家庭主妇之良友！",
      },
      {
        user: "北平读者王太太",
        rating: 4,
        comment: "按书中方法制作的酱牛肉，味道醇厚，家人赞不绝口。",
      },
      {
        user: "现代烹饪研究者张教授",
        rating: 5,
        comment: "民国时期的烹饪技艺在此书中得到系统保存，对研究传统饮食文化具有重要价值。",
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
    title: "美味烹调食谱秘典",
    author: "李克明",
    year: "1948",
    cover: "public/book_covers/04.jpeg",
    category: "民国食谱 · 家常烹饪 · 传统技艺 · 中西融合 · 饮食文化",
    publisher: "上海大方书局",
    pages: "141页",
    description: "民国三十七年再版的家常烹饪全书，收录炒、蒸、熏煨、炸烤、煮、酱、糟、糖、酒、腌、西菜等十一大类500余道菜肴与食品加工秘方，兼具实用性与历史价值。",
    interpretation: {
      background:
          "《美味烹调食谱秘典》由民国烹饪家李克明编撰，1948年2月上海大方书局再版。全书共141页，以\"经济实用、家常必备\"为宗旨，系统记录了民国时期的烹饪技艺与饮食风貌。",
      content:
        "内容涵盖炒部、蒸部、熏煨部、炸烤部、煮部、酱部、糟部、糖部、酒部、腌部及西菜部，详细阐述每道菜肴的原料配比、火候掌控、调味技巧及保存方法，既适合家庭厨房操作，也可供酒楼菜业参考。其语言古朴，术语传统，是研究民国饮食文化及传统烹饪技艺的重要文献。",
      cultural:
        "书中体现了民国时期中西饮食文化交融的特点，既保留了传统中式烹饪的精髓，又融入了西式烹饪技法，反映了当时社会的饮食变迁。",
      influence:
        "该书是研究民国时期家庭饮食文化的重要文献，对现代家庭烹饪教育仍有重要参考价值。其收录的500余道菜肴配方为研究民国时期的饮食生活提供了珍贵资料。",
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
    title: "美味烹调食谱秘典",
    author: "李克明",
    year: "民国三十七年（1948年）二月再版",
    cover: "public/book_covers/04.jpeg",
    category: "中华传统烹饪 / 家常菜系 / 民国食谱",
    publisher: "上海大方书局",
    pages: "141页",
    description: "《美味烹调食谱秘典》是民国时期广为流传的家庭厨艺指南，由李克明先生编撰，上海大方书局印行。全书以\"经济实用、家常必备\"为宗旨，系统收录炒、蒸、熏煨、炸烤、煮、酱、糟、糖、酒、腌、西菜等十一大类共计500余道传统与改良菜肴的制作秘诀。内容涵盖南北风味，兼采中西技法，是研究民国饮食文化及传统烹饪技艺的重要文献。",
    interpretation: {
      background:
        "由民国烹饪家李克明编撰，1948年上海大方书局再版，强调经济实用的家庭烹饪理念。",
      content:
        "涵盖炒、蒸、熏煨、炸烤、煮、酱、糟、糖、酒、腌、西菜等十一大类500余道菜肴，详细记录原料配比和制作技巧。",
      cultural:
        "融合传统中式烹饪与西式技法，体现民国时期中西饮食文化交融的特色，保存了珍贵的民间烹饪技艺。",
      influence:
        "作为研究民国家庭饮食文化的重要文献，对现代烹饪教育仍具参考价值。",
    },
    rating: 4.7,
    reviews: [
      {
        user: "老上海食客",
        rating: 5,
        comment: "这本书是我奶奶的嫁妆，里面的炒蛋蟹和糟鸭做法，现在吃来还是小时候的味道。",
      },
      {
        user: "文化研究者",
        rating: 4.8,
        comment: "不只是食谱，更是生活史。每一页都透着旧时人家的烟火气。",
      },
      {
        user: "家庭主厨",
        rating: 4.9,
        comment: "步骤写得极细，连火候'二透''三透'都标得清清楚楚，照着做不会错。"
      },
    ],
  },
  '4': {
    title: "随园食单",
    author: "袁枚（清）",
    year: "1792 年（乾隆壬子镌）",
    cover: "public/book_covers/06.jpeg",
    category: "江南菜系 / 饮食文化",
    publisher: "民国书局（影印本）",
    pages: "268页",
    description: "清代\"食神\"袁枚用 326 道菜谱写成的\"生活美学圣经\"，至今仍被名厨奉为案头秘笈。",
    interpretation: {
      background:
          "乾隆年间，随园主人袁枚以四十年口腹交游所得，撰成 14 卷《随园食单》。全书从\"须知单\"\"戒单\"入手，先讲选材、火候、器具、礼仪，再分门别类收录江鲜、海鲜、特牲、杂牲、羽族、水族、素食、点心、茶酒等 326 种做法。",
      content:
        "文字清雅如小品，方法详尽如教科书，既写\"味\"，也写\"道\"，被誉为\"中国最早的饮食百科全书\"。",

      cultural:
        "提出\"食不厌精，脍不厌细\"的实践标准，奠定江南菜\"清鲜平和\"的审美基调，开启\"文人写食\"传统。",

      influence:
        "书中\"火候论\"\"搭配论\"仍被各大烹饪院校列为必修课；纪录片《舌尖》《风味人间》多次引用其观点。",

    },
    rating: 4.8,
    reviews: [
      {
        user: "清河鱼",
        rating: 5,
        comment: "看完才知道，古人涮火锅、吃刺身、做分子料理一样没落下！",
      },
      {
        user: "米果",
        rating: 4,
        comment: "最打动我的是'戒单'：戒耳餐、戒目食、戒暴殄——原来美食家首先是生活家。",
      },
      {
        user: "厨房学徒",
        rating: 5,
        comment: "按图索骥做了'芙蓉肉''蜜火腿'，真的零失败！268 页里全是干货。",
      },
    ],
  },
  '5': {
    title: "本心斋蔬食谱及其他二种",
    author: "陈达叟 / 林洪 / 贾铭",
    year: "1936",
    cover: "public/book_covers/05.jpeg",
    category: "古籍影印 · 素食文化 · 山居饮食 · 食疗养生",
    publisher: "商务印书馆",
    pages: "156页",
    description: `商务印书馆"丛书集成初编"影印本，系统收录宋代《本心斋蔬食谱》《山家清供》与元代《饮食须知》三部饮食古籍，融合素食烹饪、山居清供与食材养生智慧，兼具文化、实用与养生价值`,
    interpretation: {
      background:
        `本书成书于1936年，正值商务印书馆"丛书集成初编"大规模影印古籍时期。编者精选宋、元三部饮食经典，既为保存古代饮食文化精华，亦应当时社会对素食养生、传统食疗的关注。三部著作跨越宋元两朝，反映了中国古代饮食文化的传承与发展`,
      content:
        `第一编《本心斋蔬食谱》宋代陈达叟编撰，精选20品清雅素食，每品配以四字赞语，从选材到烹制尽显文人雅趣，如"玉延""银齑"等雅称，体现宋代士大夫素食美学；第二编《山家清供》宋代林洪山居饮食随笔，记录山野食材的采集与烹制，兼载茶点药膳，如"山家三脆""碧涧羹"等，体现隐逸生活的饮食美学；第三编《饮食须知》元代贾铭系统总结食材性味、相宜相克、禁忌解毒之法，传承中医食疗养生精髓，如"食物相反""解诸毒"等实用知识`,
      cultural:
        "三部著作共同构建了中国古代素食文化的完整体系：《本心斋蔬食谱》代表文人雅士的素食美学，《山家清供》体现隐逸文化的饮食智慧，《饮食须知》传承中医食疗养生理念。书中对食材性味、相宜相克的系统总结，至今仍有实用价值；对素食烹饪技法的详细记录，为现代素食开发提供历史借鉴。",
      influence:
        "该书是研究中国古代素食文化、山居饮食及食疗养生的重要文献，对现代素食烹饪、中医食疗、传统文化研究均有重要参考价值。其影印出版为保存和传播中国古代饮食文化做出了重要贡献。",
    },
    rating: 4.8,
    reviews: [
      {
        user: "古籍研究学者",
        rating: 5,
        comment: "三部饮食古籍的完美结合，影印质量精良，保存了古籍原貌。对研究宋元饮食文化具有重要史料价值。",
      },
      {
        user: "素食文化推广者",
        rating: 5,
        comment: "《本心斋蔬食谱》的20品素食制作精美，文辞优雅，为现代素食烹饪提供了古典范本。",
      },
      {
        user: "中医食疗专家",
        rating: 4.5,
        comment: "《饮食须知》对食材性味、相宜相克的总结系统全面，至今仍是中医食疗的重要参考。",
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
          
        </div>
      </div>
    </div>
  )
}
