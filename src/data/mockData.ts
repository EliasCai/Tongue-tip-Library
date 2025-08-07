import { Recipe, FoodEntity, Document, MapLocation, Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '烹饪一斑',
    author: '钱寿卢',
    year: '1935',
    description: '民国时期系统烹饪教材，融合传统中式技艺与早期西餐制法，收录326种菜式、女性私房秘方及罕见民国食品成分表。',
    coverImage: 'https://img1.doubanio.com/view/subject/s/public/s29875942.jpg',
    tags: ['民国教材', '中西融合', '女性秘方', '营养学', '江南菜系'],
    content: '全书八章：首章论食物与人体健康；二三章述蔬菜、果实腌、糟、酱、干诸法；四章专讲海参、鱼翅等海味烹制；五章为实验菜谱，含苏州沈慧梅茶烧肉、福建蒋揖兰醉朱蚶等女性家传方；六章介绍牛排、牛肉蛋卷等西餐制法；七章食器选择与保养；八章附民国营养成分分析表。'
  },
  {
    id: '2',
    title: '随园食单',
    author: '袁枚',
    year: '1935',
    description: '民国时期重刊的清代饮食经典，记录了326种南北菜肴和点心做法',
    coverImage: 'https://img2.doubanio.com/view/subject/s/public/s29875943.jpg',
    tags: ['江南菜', '烹饪技法', '清代'],
    content: '...'
  },
  {
    id: '3',
    title: '调鼎集',
    author: '佚名',
    year: '1930',
    description: '民国时期发现的清代饮食手稿，收录2000余种菜肴配方',
    coverImage: 'https://img3.doubanio.com/view/subject/s/public/s29875944.jpg',
    tags: ['清代', '手稿', '综合'],
    content: '...'
  },
  {
    id: '4',
    title: '家庭食谱大全',
    author: '李公朴',
    year: '1928',
    description: '民国时期流行的家庭烹饪指南，包含中西各式菜肴做法',
    coverImage: 'https://img4.doubanio.com/view/subject/s/public/s29875945.jpg',
    tags: ['家庭烹饪', '中西结合', '实用'],
    content: '...'
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: '樱桃肉',
    description: '色泽红亮，入口即化，乃淮扬菜之精品',
    ingredients: ['猪肉', '樱桃', '料酒', '生抽', '冰糖'],
    method: '选用五花肉，切成方块，先用料酒腌制，再以冰糖调色，慢火焖煮至软糯',
    source: '《家庭食谱大全》',
    era: '民国二十三年',
    region: '江苏',
  },
  {
    id: '2',
    name: '太史蛇羹',
    description: '广东名菜，汤清味鲜，营养丰富',
    ingredients: ['蛇肉', '冬菇', '冬笋', '火腿', '鸡蛋'],
    method: '蛇肉切丝，与冬菇、冬笋同煮，调味后勾芡',
    source: '《随园食单》',
    era: '民国时期',
    region: '广东',
  },
];

export const mockEntities: FoodEntity[] = [
  {
    id: '1',
    name: '五芳斋',
    type: 'restaurant',
    description: '创始于清朝，民国时期以排骨年糕闻名上海滩',
    stories: ['张爱玲曾在此品尝排骨年糕', '鲁迅先生也是常客'],
    relatedEntities: ['排骨年糕', '张爱玲', '上海美食'],
    location: {
      lat: 31.2304,
      lng: 121.4737,
      city: '上海',
    },
  },
  {
    id: '2',
    name: '谭延闿',
    type: 'person',
    description: '民国政治家，组庵菜创始人，对湘菜发展贡献巨大',
    stories: ['创立组庵菜系', '精通烹饪技艺'],
    relatedEntities: ['组庵菜', '湘菜', '太史蛇羹'],
  },
];

export const mockDocument: Document = {
  id: '1',
  title: '民国上海美食纪事',
  content: `民国时期的上海，乃是中西文化交汇之地，饮食文化尤为繁盛。彼时，五芳斋的排骨年糕名噪一时，食客络绎不绝。店主精选上等排骨，配以优质年糕，烹制而成的美味令人难忘。

据载，文豪张爱玲亦是此店常客，每每路过必要品尝一番。她曾在文章中写道："排骨年糕，是上海人的记忆，也是时代的味道。"

除了五芳斋，当时的上海还有诸多名店。如太史蛇羹，此菜源于广东，但在上海亦有独特做法。谭延闿先生对此菜颇有研究，曾亲自下厨烹制，其技艺之精湛，令人叹为观止。

民国的上海，就是这样一个美食的天堂，各地名菜在此汇聚，形成了独特的海派饮食文化。`,
  author: '李明轩',
  year: 1935,
  source: '《上海食话》',
  entities: mockEntities,
};

export const mockMapLocations: MapLocation[] = [
  {
    id: '1',
    name: '五芳斋',
    coordinates: [121.4737, 31.2304],
    type: 'restaurant',
    description: '民国时期上海著名餐厅，以排骨年糕闻名',
    dishes: ['排骨年糕', '小笼包', '生煎包'],
    stories: ['张爱玲的最爱', '鲁迅也常来此用餐'],
  },
  {
    id: '2',
    name: '太史蛇羹楼',
    coordinates: [113.2644, 23.1291],
    type: 'restaurant',
    description: '广州知名酒楼，太史蛇羹的发源地',
    dishes: ['太史蛇羹', '白切鸡', '叉烧'],
    stories: ['谭延闿曾在此品尝', '文人雅士聚集之地'],
  },
];