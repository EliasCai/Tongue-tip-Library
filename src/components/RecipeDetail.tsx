import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, BookOpen, MapPin, Calendar, ChefHat, ArrowLeft } from 'lucide-react';
import { mockRecipes } from '../data/mockData';

interface RecipeDetailProps {
  recipeId: string;
  onNavigate: (page: string) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId, onNavigate }) => {
  // 从mockRecipes中查找对应的菜谱
  const recipe = mockRecipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">菜谱未找到</h1>
          <button
            onClick={() => onNavigate('home')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 特殊菜谱处理
  const isDanGu = recipe.name === '蛋菰法';
  const isFuJiang = recipe.name === '伏姜';
  const isZaoJiang = recipe.name === '糟姜';
  const isWuWeiJiang = recipe.name === '五味姜';
  const isQianBiCai = recipe.name === '乾闭菜';
  
  const danGuRecipe = {
    name: '蛋菰法',
    description: '民国时期经典西式蛋类料理，融合中西烹饪技艺的精致菜品',
    ingredients: [
      '主料：鸡蛋',
      '辅料：牛酪（黄油）、熏肉、荷兰芹'
    ],
    method: '将蛋破开，倒入涂有牛酪的磁皿或陶器中，调和后挂于炉上，直至蛋白凝结、蛋黄半熟时取下。另有制作方法是将熏肉切成薄片并捣碎与牛酪混合，加置蛋中，食用前可加少许荷兰芹，味道更佳。',
    source: '《民国食谱精选》',
    era: '民国二十五年',
    region: '上海租界',
    originalText: '将蛋破开，倒入涂有牛酪的磁皿或陶器中，调和后挂于炉上，直至蛋白凝结、蛋黄半熟时取下。另有制作方法是将熏肉切成薄片并捣碎与牛酪混合，加置蛋中，食用前可加少许荷兰芹，味道更佳。'
  };

  const fuJiangRecipe = {
    name: '伏姜',
    description: '中国传统节气药膳珍品，巧妙利用三伏天炽热阳光进行天然日晒发酵的传统工艺。这道江南药膳不仅具有温中散寒、健脾暖胃的养生功效，更承载着深厚的节气文化内涵，体现了古人"天人合一"的智慧结晶。',
    ingredients: [
      '主料：新鲜生姜四斤（选用肉质饱满、辛香浓郁的优质姜）',
      '辅料：纯正白糖一斤、古法酿造酱油二斤',
      '香料：官桂二两、大香二两、陈年陈皮二两、紫苏叶二两（均为地道药材）'
    ],
    method: [
      '精选生姜：挑选新鲜饱满、无病虫害的优质生姜，确保原料品质',
      '精细处理：将生姜仔细刮去粗皮，用清水洗净，置于通风处自然晒干表面水分',
      '容器准备：选用透气性好、洁净的瓷盆，确保发酵过程卫生安全',
      '调味配制：按比例加入白糖、酱油，官桂、大香、陈皮、紫苏叶切细后均匀混入',
      '充分拌匀：确保所有食材充分混合，让每一片姜都均匀裹上调味料',
      '节气晒制：从初伏第一天开始，选择阳光充足、通风良好的地方进行晒制',
      '持续发酵：整个三伏期间每日翻动，让姜充分吸收阳光精华和药材香气',
      '完成收藏：三伏结束后，待姜体呈现深褐色、香气浓郁时，密封保存待用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    originalText: '伏姜 每姜四斤，刮去粗皮，洗净晒干，置瓷盆中，加入白糖一斤，酱油二斤，官桂、大香、陈皮、紫苏叶各二两，切细后加入拌匀。自初伏晒起，至三伏止，制成收藏，可以治病时用。'
  };

  const zaoJiangRecipe = {
    name: '糟姜',
    description: '江南传统腌制技艺珍品，巧妙运用核桃与栗子改善姜的口感，体现古人智慧结晶的时令小菜。这道古法腌姜不仅口感独特，更蕴含着深厚的传统饮食文化智慧。',
    ingredients: [
      '主料：嫩姜（选用新鲜饱满、质地脆嫩的子姜）',
      '腌料：优质海盐、传统酒糟',
      '辅料：核桃仁（去衣切碎）、小熟栗（研磨成粉）',
      '调味：纯正砂糖（用于又法）'
    ],
    method: [
      '选姜处理：天晴时选取新鲜嫩姜，置于阴凉通风处阴干五日，待表面水分自然蒸发',
      '去皮清洁：用干净软布轻轻拭去姜表面红皮，保持姜肉完整',
      '初次腌制：每斤嫩姜配海盐二两、酒糟三斤，充分拌匀后密封腌制七日',
      '二次处理：取出腌姜，用干净纱布拭净表面杂质',
      '深度腌制：再用海盐二两、酒糟五斤拌匀，确保每片姜都均匀裹上糟料',
      '容器准备：选用洁净瓷罐，底部先铺核桃仁碎末，形成天然隔层',
      '装罐密封：将处理好的姜片整齐装入罐中，覆盖酒糟至表面平整',
      '最终调味：撒小熟栗粉于表面，形成保护层，严密封口保存',
      '又法制作：嫩姜用酒糟拌匀直接装罐，加入砂糖一块，紧封罐口，七日即可食用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    originalText: '糟姜：天晴时探取嫩姜阴干五日，拭去红皮，每一斤用盐二两，糟三斤，七日取出，拭净，别用盐二两，糟五斤，拌匀，取瓷罐一，先以核桃二枚碎置罐底，然后以姜盛入，再以姜置糟内令平，复以小熟栗为末渗于面，如法封之。桃可使姜不辣，栗可使姜无筋也。'
  };

  const shaoSuERecipe = {
    name: '烧素鹅',
    description: '一道经典的素菜荤做的菜品，以山药和豆腐皮模仿鹅肉的形态和风味，色泽红亮、风味浓郁，展现传统素菜精湛的仿荤技艺。这道菜品体现了中国素菜文化中"素菜荤做"的高超技艺，通过巧妙的食材搭配和烹饪手法，创造出令人惊艳的味觉体验。',
    ingredients: [
      '主料：新鲜山药（选用质地细腻、口感绵密的优质山药）',
      '包裹：优质豆腐皮（要求薄如蝉翼、韧性十足）',
      '调味：传统秋油（上等酱油）、绍兴黄酒',
      '辅料：纯正白糖、秘制酱瓜酱',
      '香料：新鲜嫩姜（切丝备用）'
    ],
    method: [
      '山药处理：选取新鲜山药，洗净后放入锅中煮至软烂，用筷子能轻松插入即可',
      '去皮切段：将煮好的山药取出，待稍凉后轻轻剥去外皮，切成一寸左右的均匀段状',
      '豆腐皮准备：选用优质豆腐皮，用温水稍微浸泡使其软化，便于包裹',
      '造型包裹：用豆腐皮将山药段仔细包裹，形成类似鹅肉的形状，注意包裹要紧实',
      '煎制定型：锅中倒入适量食用油，烧至六成热，将包裹好的山药段放入锅中煎制',
      '煎制技巧：中小火慢煎，不断翻动，使豆腐皮表面呈现金黄色，形成脆皮',
      '调味烧制：加入秋油、黄酒、白糖、酱瓜酱和姜丝等调料，用量要恰到好处',
      '收汁上色：用中小火慢慢烧煮，让山药充分吸收调料的味道，同时让菜品呈现红亮的色泽',
      '完成检验：待汤汁收浓，菜品呈现诱人的红亮色泽时即可出锅装盘'
    ],
    source: '《烹饪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    originalText: '烧素鹅 山药煮烂去皮，切为寸段，包以豆腐皮，入油煎之，加秋油、酒、糖、酱瓜酱、姜等尽烧，以色红为度。'
  };

  const wuWeiJiangRecipe = {
    name: '五味姜',
    description: '民国传统腌制小菜珍品，巧妙融合白梅酸香与檀香独特芬芳，展现古人调味智慧。这道古法腌姜以嫩姜为主料，经过晾晒、腌制、调和等多重工序，口感层次丰富，是极具特色的时令佳品。檀香的运用在现代中式烹饪中极为罕见，体现了传统调味的独特魅力。',
    ingredients: [
      '主料：嫩姜一斤（选用新鲜饱满、质地脆嫩的子姜）',
      '酸料：白梅半斤（优质白梅，打碎后去仁）',
      '调味：炒盐二两（传统炒制，提鲜增味）',
      '香料：甘草五钱（道地甘草，研磨成末）',
      '珍品：檀香二钱（天然檀香，现代罕见调料）'
    ],
    method: [
      '选姜处理：精选新鲜嫩姜一斤，洗净后切成薄片，厚薄均匀适中',
      '梅料制备：取优质白梅半斤，仔细打碎后去除果仁，保留果肉和汁液',
      '初腌晾晒：将姜片与白梅充分混合，加入炒盐二两拌匀，置于通风处晾晒三日',
      '香料调和：甘草五钱、檀香二钱分别研磨成极细末，确保质地细腻',
      '二次腌制：将晒好的姜片与香料末充分拌匀，使每片姜都均匀裹上香料',
      '静置发酵：将处理好的姜片放置二至三日，让香料充分渗透入味',
      '容器准备：选用洁净干燥的瓷器，确保无油无水',
      '密封保存：将五味姜装入瓷器中，密封保存，随取随用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    originalText: '五味姜：嫩姜一斤，切成薄片，用白梅半斤打碎去仁，加炒盐二两拌匀，将姜放入晒三日，取出，复用甘草五钱，檀香二钱为末拌匀，放入二三日，盛瓷器中收贮。'
  };

  const qianBiCaiRecipe = {
    name: '乾闭菜',
    description: '民国传统腌菜工艺巅峰之作，采用极其繁复的九次揉搓换卤工艺，历时数月精心制作。这道古法腌白菜不仅融合了香花椒的独特芬芳，更体现了旧时匠人精益求精的精神。每一道工序都经过精心设计，九次处理确保口感完美，是传统腌菜工艺的珍贵遗产。',
    ingredients: [
      '主料：新鲜大白菜十斤（选用饱满紧实、叶片完整的优质白菜）',
      '腌制：炒盐四十两（传统炒制，提鲜增味）',
      '香料：香花椒末适量（选用优质花椒，研磨细腻）',
      '原卤：盐卤三碗（每次处理后的珍贵原卤）'
    ],
    method: [
      '选菜处理：精选新鲜大白菜十斤，去除外层老叶，保留完整菜心',
      '初次腌制：将白菜逐层放入缸中，每层菜撒炒盐一层，确保均匀覆盖',
      '静置发酵：密封缸口，静置三日，让盐分充分渗透',
      '首次处理：三日后将菜搬入盆中，仔细揉搓一次，使菜质更加紧实',
      '卤水收集：将缸中析出的盐卤小心倾出，另器保存，此为珍贵原卤',
      '循环处理：将处理好的菜重新放入缸中，重复上述过程',
      '九次精修：如此反复九次，每次间隔三日，共计二十七日精心处理',
      '香料准备：选用优质香花椒，研磨成极细末，确保香气充分释放',
      '最终装坛：将九次处理后的菜置于竹匾（叠）中，菜一层撒香花椒末一层',
      '层层压实：层层装满后用力按实，确保菜与香料充分结合',
      '原卤注入：将之前保存的珍贵原卤三碗均匀倾入坛中',
      '密封陈化：用传统泥封工艺严密封口，静待来年开封取食'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0104.png',
    originalText: '乾闭菜 白菜十斤，炒盐四十两，入缸置菜一层，撒盐一层。三日后，日搬入盆内揉过一次，将缸中盐卤倾出另贮。然后搬菜还入，过三日又搬又揉，又倾出盐卤还菜入缸。如是九次后，乃置菜于叠，菜一层撒香花椒末一层，层层装满，按至紧实，倾入原卤三碗，用泥固封，来年取食最妙。'
  };

  const yuFuTuoRecipe = {
    name: '芋傅托',
    description: '一道古朴典雅的芋头传统点心，完美诠释了"化腐朽为神奇"的烹饪智慧。通过独特的制作工艺，将平凡的芋头转化为口感层次丰富的精致点心。从坚硬如铁到软滑如绸的奇妙转变，不仅展现了芋头食材的无限可塑性，更体现了传统烹饪技艺的深厚底蕴。',
    ingredients: [
      '主料：大芋（芋头） - 需选用个大饱满、质地细嫩的优质芋头',
      '辅料：豆粉（绿豆粉或黄豆粉） - 作为天然粘合剂，增加韧性和口感',
      '工具：夏布 - 传统洁净布料，用于包裹过滤，确保芋泥纯净无渣'
    ],
    method: [
      '精选芋头：挑选个大饱满、无病虫害的新鲜大芋，确保品质上乘',
      '清洗处理：将芋头彻底清洗干净，去除表面泥沙和杂质',
      '煮熟去皮：将洗净的芋头放入锅中，加足量清水煮至完全熟透，取出后趁热去皮',
      '捣泥处理：将熟芋肉放入传统擂钵中，用擂杵仔细擂碎捣烂，直至成为细腻芋泥',
      '过滤去渣：用洁净的夏布包裹芋泥，用力绞压，挤出纯净芋汁，去除粗纤维和渣滓',
      '混合揉制：将处理好的芋泥与适量豆粉充分混合，反复揉捏至面团均匀光滑',
      '擀片成型：将混合好的面团放在案板上，用擀面杖擀成厚薄均匀的薄片',
      '切制处理：根据喜好将薄片切成粗细随意的条状或菱形状，大小均匀',
      '煮制准备：锅中加入足量清水，大火烧开，准备煮制芋傅托',
      '下锅煮制：将切好的芋傅托生坯轻轻放入沸水中，用勺背轻推防止粘连',
      '火候掌控：初沸时芋傅托质地坚硬如铁，需耐心等待，持续煮至百沸',
      '质地转变：观察芋傅托逐渐由硬转软，最终变得极为软滑，富有弹性',
      '出锅装盘：将煮好的芋傅托连汤盛出，保持完整形状，即可享用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0106.png',
    originalText: '芋傅托 大芋洗净，煮熟去皮，擂烂包夏布中，绞去渣滓，和豆粉为擀薄，切碎粗细随意，下锅煮之。初沸时其坚如铁，至百沸则极为软滑，并汤食之。'
  };

  const ganShuJingRecipe = {
    name: '甘藷粳',
    description: '一道融合发酵工艺与节粮智慧的经典传统食品，堪称传统烹饪技艺的巅峰之作。通过糯米长达六七日的自然发酵，与新鲜甘藷浆的巧妙结合，经过搓团、煮制、晾晒等复杂工序，最终制成质地肥嫩、口感独特的干状食品。这道菜品不仅体现了"化腐朽为神奇"的烹饪智慧，更展现了传统节粮技法的精妙运用，是珍贵的非物质文化遗产。',
    ingredients: [
      '主料：糯米 - 需选用优质糯米，经过六至七日自然发酵',
      '辅料：甘藷（红薯） - 新鲜红薯，提供天然香甜与独特色泽',
      '调和：生水 - 用于调和发酵后的糯粉',
      '清洗：清水 - 用于糯米淘洗',
      '工具：木杖 - 传统搅拌工具，用于搅拌成粥状',
      '容器：瓶 - 传统发酵容器，确保发酵过程纯净'
    ],
    method: [
      '精选糯米：挑选颗粒饱满、色泽洁白的优质糯米，去除杂质',
      '浸泡发酵：将糯米浸泡于清水中六至七日，以米酸为度，期间每日换水',
      '清洗处理：发酵完成后，用大量清水反复淘洗，去除酸味',
      '干燥处理：将洗净的糯米摊开在竹席上，置于阳光下充分晒干',
      '研磨成粉：将晒干的糯米用石臼捣成极细的粉末，过筛备用',
      '团子制作：选择晴朗天气，用生水和糯粉搓成酒杯口大小的团子',
      '甘藷处理：挑选新鲜甘藷，去皮后彻底洗净，用石磨磨成极细的浆液',
      '关键控制：甘藷浆必须纯净，不可掺入任何水分，保持原汁原味',
      '煮制团子：将搓好的糯米团子放入沸水中煮熟，捞出沥干水分',
      '搅拌成糊：将煮熟的团子趁热放入瓶中，用木杖用力搅拌成粥状',
      '温度控制：等待温度降至可以入手时，方可进行下一步操作',
      '混合比例：按照糯粉三斗配甘藷浆一斤的精确比例进行调配',
      '充分揉制：将甘藷浆倒入糯米糊中，充分搅揉至极均匀状态',
      '擀片成型：按照传统擀面法，将混合物擀成约一分厚的均匀薄片',
      '初步晾晒：将擀好的薄片置于通风处，晒至半干状态',
      '切制成型：将半干的薄片切成大小均匀的立方小块',
      '最终晾晒：将切好的小块继续晾晒，直至完全干燥',
      '品质检验：成品应质地肥嫩，色泽金黄，称为"肥嫩者"方为上品',
      '储存方法：完全干燥的甘藷粳可长期储存，随取随用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0107.png',
    originalText: '甘藷粳：糯米浸水中六七日，以米酸为度。清水淘净晒干，捣成细粉。于天气晴明日，用生水和糯粉搓作团子，如酒杯口大。将甘藷去皮洗净，磨为细浆，不可掺水。将糯团煮熟，捞入瓶中，用木杖力搅如粥状。俟温度稍低，可以入手时，即倾藷浆于内，每糯粉三斗入藷浆一斤，搅揉极匀。再如擀面法，擀成分许厚之片子，晒半干，切为立方小块，晒至极干，是名肥嫩者方好。'
  };

  const shiXiangGuaRecipe = {
    name: '十香瓜',
    description: '一道融合发酵工艺与复合调味的传统瓜类料理，以黄豆发酵制豉为基础，配以多种香料与瓜类腌制发酵，展现传统复合调味与保存工艺的精湛技艺。风味融合豆香、酒香及辛香料，层次丰富，具传统保存食品特色。',
    ingredients: [
      '黄豆 - 一斗，制作黄豉主料',
      '面粉 - 四斤，用于黄豉制作',
      '瓜 - 二十一斤，主材，时令瓜类',
      '盐 - 二斤，腌制瓜片用',
      '丝 - 二三斤，可能指丝瓜或丝状食材',
      '陈皮丝 - 半斤，增香调味',
      '去皮杏仁 - 二斤，增香添口感',
      '黄豉 - 一升，已制成的发酵豆豉',
      '瓜水 - 三碗，瓜类腌制液',
      '好酒 - 一瓶，增香防腐',
      '花椒 - 四两，主要香料',
      '大茴香 - 二两，增香调味',
      '小茴香 - 二两，辅助香料',
      '甘松 - 半两，特殊香料',
      '三奈 - 半两，去腥增香',
      '白芷 - 半两，增香添味',
      '桂皮 - 半两，主要香料'
    ],
    method: [
      '黄豆一斗煮熟去汤，加入面粉四斤拌匀',
      '将拌匀的豆面铺在干净芦席上，约二寸厚',
      '用蒲包盖好，静置发酵旬日（约10天）',
      '发酵完成后取出晒干，制成黄豉备用',
      '选取新鲜瓜类二十一斤，洗净切片',
      '用二斤盐腌制瓜片，静置一宿',
      '取出腌制好的瓜片，晾干表面水分',
      '准备丝二三斤、陈皮丝半斤、去皮杏仁二斤',
      '将黄豉一升、瓜水三碗、好酒一瓶准备好',
      '将所有配料与瓜片充分拌匀',
      '将花椒四两、大小茴香各二两研磨',
      '加入甘松、三奈、白芷、桂皮各半两为末',
      '将所有香料末充分混合至极匀',
      '将香料末加入瓜料中，充分拌匀',
      '装入干净容器中，密封贮藏，可长期保存'
    ],
    source: '《烹饪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0109.png',
    originalText: '十香瓜 先以黄豆一斗，煮烂去汤，用面四斤拌匀，铺干净芦席上，约二寸厚，用蒲包盖好。旬日后取出晒干，即成黄豉，听用。瓜出时，取瓜二十一斤，切片，用盐二斤，一宿取出晾干。加丝二三斤，陈皮丝半斤，去皮杏仁二斤，黄豉一升，瓜水三碗，好酒一瓶，入瓜拌匀。再以花椒四两，大小茴香各二两，甘松、三奈、白芷、桂皮各半两为末，拌入极匀，满贮。'
  };

  const isShaoSuE = recipe.name === '烧素鹅';
  const isYuFuTuo = recipe.name === '芋傅托';
  const isGanShuJing = recipe.name === '甘藷粳';
  const isShiXiangGua = recipe.name === '十香瓜';
  const isJiaShanZhaBing = recipe.name === '假山楂饼';

  const jiaShanZhaBingRecipe = {
    name: '假山楂饼',
    description: '一道有趣的"仿制菜"，用南瓜模仿山楂的口感和颜色，体现了厨师的巧思。以老南瓜为基料仿制山楂饼，调入乌梅、红花与白糖，形成酸甜红润风味，口感软糯似山楂饼，体现素食材仿制传统果脯的巧思。',
    ingredients: [
      '老南瓜 - 适量，去皮切片',
      '乌梅汤 - 适量，调味上色',
      '红花汤 - 适量，调色增香',
      '白糖 - 适量，调味',
      '水 - 适量，煮制用'
    ],
    method: [
      '老南瓜去皮，切成薄片',
      '将南瓜片放入锅中，加入适量清水',
      '用大火煮开后转小火，煮至南瓜极熟软烂',
      '将煮熟的南瓜用勺子或工具搅烂成糜状',
      '加入乌梅汤，快速搅拌均匀',
      '再加入红花汤，继续快速搅拌',
      '撒入少量盐（或"白"指盐），快速拌匀',
      '待南瓜糜煮熟后，加入适量白糖',
      '持续快速搅拌，使糖完全溶解并均匀混合',
      '观察火候，待混合物浓稠适中',
      '将煮好的南瓜糊倾入干净的瓷盆中',
      '静置冷却，待其自然凝固',
      '凝固后取出，切成薄片',
      '切片后的假山楂饼与真正的山楂饼无异，即可食用'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0112.png',
    originalText: '假山楂饼：老南瓜去皮，切片，和水煮极熟，搅烂如糜。加入乌梅汤急搅，又加红花汤急搅，又加白少许急搅。熟后，再取白糖加入，仍急搅不已。火候既到，倾入瓷盆，冷凝切片，与山楂饼无异。'
  };

  const zhiShanYuFenRecipe = {
    name: '製鳝魚粉法',
    description: '以鳝鱼丝与米粉为主料，先炒后煮再炒拌，融合甜酒、酱油、花椒、大蒜等调味，汤汁鲜美，软滑适口，展现传统素食仿荤的精细工艺与复合调味精髓。',
    ingredients: [
      '猪油 - 三四勺',
      '鳝鱼丝 - 适量',
      '甜酒 - 少许',
      '酱油 - 少许',
      '原汤（或鸡鸭汤） - 适量',
      '花椒丝 - 适量',
      '大蒜花 - 适量',
      '胡椒 - 少许',
      '米粉 - 适量',
      '食盐 - 少许'
    ],
    method: [
      '取猪油三四勺入锅，加热至锅微红',
      '加入鳝鱼丝翻炒五六下，随即加入少量甜酒和酱油，继续炒五六下',
      '倒入原汤（或鸡鸭汤）、花椒丝、大蒜花，煮沸后加胡椒调味，取出鳝鱼丝备用',
      '另起锅煮清水，将米粉煮至软熟后捞出',
      '重新加热三四勺猪油，将米粉炒热',
      '倒入已煨好的鳝鱼丝及汤，加入食盐、酱油、胡椒和适量沸水，拌匀后起锅'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0115.png',
    originalText: '製鳝魚粉法 将猪油三四勺放于锅中熬至锅微红，以鳝鱼丝放入炒之。炒五六下，即加入甜酒、酱油少许，再炒五六下。以前原汤及花椒丝、大蒜花加入，至水沸，略加胡椒取起。再以清水沸，将米粉放入锅中煮软，取出。仍用猪油三四勺熬热，以粉放入炒之。炒已，即将煨好之鳝鱼及汤一并倾入，略加食盐、酱油、胡椒及沸水，即可起锅。其味甚美。'
  };

  const zuiZhuHanRecipe = {
    name: '醉朱蚶法',
    description: '福建蒋揖兰女士之制法，以海潮涨落原理醉制花蛤，利用竹筒引流让酱酒自然渗透，借自然力使食材吸味入壳，体现古法结合生态智慧的独到工艺。',
    ingredients: [
      '朱蚶（花蛤） - 适量',
      '酱油 - 顶好酱油',
      '绍兴酒 - 适量',
      '麻油 - 少许'
    ],
    method: [
      '洗净朱蚶外壳的泥沙',
      '将无底竹筒置于瓷盆中央，四周摆放朱蚶',
      '在海潮涨潮时，将优质酱油、绍兴酒和少量麻油从竹筒顶部注入',
      '利用海潮涨落的自然规律，使酱酒通过竹筒渗透至朱蚶，促其壳开合吸味'
    ],
    source: '《烹飪一斑》',
    era: '民国',
    region: '福建',
    imageUrl: '/recipe/0116.png',
    originalText: '醉朱蚶法：此系福建蒋揖兰女士之制法。朱蚶之壳随海潮涨落而开合。醉之之法，先将壳泥洗净，以无底竹筒一个立于瓷盆中央，次以朱蚶满置筒之四周。乘潮流涨时，以顶好酱油和绍兴酒及麻油少许，自竹筒之上口注下。时正开，酱酒自下涨上，如潮之初至，则每'
  };

  const fengXianHuaGengRecipe = {
    name: '凤仙花梗',
    description: '凤仙花梗经焯水盐制晒干可久存，新制时可多元食用，兼具茶点、炒菜、豆腐搭配功能，根部不可食，凸显食材处理的分寸与创意运用',
    ingredients: [
      '凤仙花梗 - 适量',
      '盐 - 少许',
      '芝麻 - 适量',
      '茶 - 适量',
      '筋（韭菜或香菜） - 适量',
      '豆腐 - 适量'
    ],
    method: [
      '将凤仙花梗用沸水焯熟后捞出',
      '用少量盐拌匀腌制（微盐过）',
      '晾晒至完全干燥，可保存一年以上',
      '食用时可拌入芝麻调味',
      '新鲜花梗可直接入茶、拌筋炒食或搭配豆腐食用'
    ],
    source: '《烹飪一斑》',
    era: '民国',
    region: '江南',
    imageUrl: '/recipe/0119.png',
    originalText: '凤仙花梗，汤焯，微盐过，晒乾，可留年余。以芝麻拌食，新者可入茶，可拌筋炒食，可豆腐。其根则绝对不可食，食则闷损。'
  };

  const zaoDiLiRecipe = {
    name: '糟地梨',
    description: '以水梨入酒糟腌制，借糟香渗透取其风味，风干处理保留脆质，酸香解腻，体现传统果脯类腌制与酒香入味的古法技艺。',
    ingredients: [
      '水梨（地梨） - 适量',
      '酒糟 - 适量'
    ],
    method: [
      '选取水梨（地梨），去除表面泥沙及外皮',
      '剥去梨头，切成适口大小，清洗干净',
      '将处理好的梨放入酒糟中密封腌制二至三日',
      '腌制完成后可直接佐酒食用'
    ],
    source: '《烹飪一斑》',
    era: '民国',
    region: '江南',
    imageUrl: '/recipe/0120.png',
    originalText: '糟地梨，地梨一名藏带泥，风干，剥皮去头，使净，藏置糟中二三日，可以下酒。'
  };

  const fuYiBaoRouRecipe = {
    name: '腐衣包肉法',
    description: '以腐衣包裹调香肉馅蒸制，不用百叶替代，通过精细切肉与调味工艺，突出软嫩鲜香，蒸法避水煮，体现传统素荤结合的烹饪智慧。',
    ingredients: [
      '猪蹄后成块之肉 - 约半斤',
      '腐衣（豆腐皮） - 适量',
      '酒 - 一杯',
      '酱油 - 一杯',
      '盐 - 少许',
      '笋片 - 可选，蒸制时添加'
    ],
    method: [
      '选用猪蹄后部位的肉，去薄皮后将筋和脂肪切得极细',
      '将切碎的肉盛入碗中，加入酒、酱油各一杯，盐少许，拌匀腌制约一小时',
      '取腐衣包裹肉馅，制成约二十包',
      '在饭锅中微加水，将腐衣包肉放入蒸熟',
      '蒸制时可添加笋片提升风味',
      '避免用水煮或直接煮熟，以保持口感鲜美'
    ],
    source: '《烹飪一斑》',
    era: '民国二十五年',
    region: '江南地区',
    imageUrl: '/recipe/0114.png',
    originalText: '腐衣包肉法 百叶包肉味颇寻常，若配合得法亦殊可口。吾家烹此物不用百叶，而用腐衣。切胎之肉亦非纯用精肉，用猪身蹄后成块之肉约半斤，去薄皮，其筋及脂肪部均切之极细，盛于碗中，加酒酱油各一杯，盐末各少许，拌和之。约俟一小时，乃取出腐衣包好，置大盆中。半斤肉约分为二十包。微加水于饭锅上蒸熟食之。蒸时或加笋片亦可。若用水入锅中熟者，味便不美，中煮熟者味便不美。'
  };

  const displayRecipe = isDanGu ? {
    ...danGuRecipe,
    method: [
      '将蛋破开，倒入涂有牛酪的磁皿或陶器中',
      '调和均匀后挂于炉上',
      '待蛋白凝结、蛋黄半熟时取下',
      '熏肉切成薄片并捣碎与牛酪混合',
      '将混合好的熏肉牛酪加入蛋中',
      '食用前可加少许荷兰芹提味'
    ]
  } : isJiaShanZhaBing ? {
    ...jiaShanZhaBingRecipe
  } : isFuJiang ? {
    ...fuJiangRecipe
  } : isZaoJiang ? {
    ...zaoJiangRecipe
  } : isWuWeiJiang ? {
    ...wuWeiJiangRecipe
  } : isQianBiCai ? {
    ...qianBiCaiRecipe
  } : isShaoSuE ? {
    ...shaoSuERecipe
  } : isYuFuTuo ? {
    ...yuFuTuoRecipe
  } : isGanShuJing ? {
    ...ganShuJingRecipe
  } : isShiXiangGua ? {
    ...shiXiangGuaRecipe
  } : recipe.name === '腐衣包肉法' ? {
    ...fuYiBaoRouRecipe
  } : recipe.name === '製鳝魚粉法' ? {
    ...zhiShanYuFenRecipe
  } : recipe.name === '醉朱蚶法' ? {
    ...zuiZhuHanRecipe
  } : recipe.name === '凤仙花梗' ? {
    ...fengXianHuaGengRecipe
  } : recipe.name === '糟地梨' ? {
    ...zaoDiLiRecipe
  } : {
    ...recipe,
    method: typeof recipe.method === 'string' ? recipe.method.split('。').filter(s => s.trim()) : recipe.method
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('recipes')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>返回菜谱</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">菜谱详情</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* 头部横幅区域 */}
      <div className="relative">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
            <div className="text-white text-center">
              <BookOpen className="h-20 w-20 mx-auto mb-4" />
              <p className="text-3xl font-semibold">{displayRecipe.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 基本信息 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{displayRecipe.name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{displayRecipe.description}</p>
        </div>

        {/* 元信息卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">时代</p>
              <p className="font-semibold">{displayRecipe.era}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">地域</p>
              <p className="font-semibold">{displayRecipe.region}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
            <BookOpen className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">来源</p>
              <p className="font-semibold">{displayRecipe.source}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 食材清单 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              食材清单
            </h2>
            <div className="bg-orange-50 rounded-xl p-6">
              <ul className="space-y-2">
                {displayRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 制作步骤 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              制作步骤
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ol className="space-y-3">
                {displayRecipe.method.map((step, index) => (
                  <li key={index} className="flex space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* 历史背景 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">历史背景</h2>
          <div className="bg-amber-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">
              这道菜源自{displayRecipe.region}地区，在{displayRecipe.era}时期被详细记录在{displayRecipe.source}中。
              作为民国饮食文化的重要组成部分，它不仅体现了当时精湛的烹饪技艺，
              更承载着深厚的历史文化内涵。在那个中西文化交融的特殊年代，
              这样的传统菜肴既是味蕾的享受，也是文化的传承。
            </p>
          </div>
        </div>

        {/* 文化意义 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">文化意义</h2>
          <div className="bg-blue-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">
              每一道民国菜谱都是一个时代的见证。它们记录了那个特殊历史时期的生活方式、
              审美情趣和文化交融。通过复原这些菜肴，我们不仅能够品味历史，
              更能感受到中华饮食文化的博大精深和源远流长。
            </p>
          </div>
        </div>

        {/* 原文对照 */}
        {displayRecipe.originalText && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <ChefHat className="h-6 w-6 mr-2" />
              原文对照
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed font-serif">
                {displayRecipe.originalText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;