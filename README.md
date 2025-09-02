# 舌尖上的图书馆 - Tongue-tip Library

一个基于现代Web技术构建的中华传统饮食文化数字图书馆，专注于民国时期及古代烹饪文献的数字化展示与交互式阅读体验。

## 🏮 项目简介

舌尖上的图书馆是一个集古籍数字化、食谱展示、知识图谱、交互式阅读于一体的综合性中华饮食文化平台。项目收录了多部珍贵的民国及古代烹饪典籍，通过现代化的Web技术为用户呈现沉浸式的阅读体验。

## ✨ 核心功能

### 📚 古籍数字化阅读
- **高清PDF阅读器**：支持缩放、翻页、搜索等完整阅读功能
- **智能Dify AI助手**：为每本古籍配置专属AI助手，提供智能问答服务
- **响应式设计**：自适应各种屏幕尺寸，支持移动端阅读

### 🍜 食谱数据库
- **分类食谱展示**：按菜系、时代、难度等多维度分类
- **详细制作步骤**：每道菜谱包含完整配料表和制作流程
- **历史文化背景**：每道菜背后的历史故事和文化内涵

### 🗺️ 美食地图
- **时空美食地图**：展示不同时代、地域的特色美食分布
- **交互式探索**：点击地图上的标记查看详细信息
- **菜系分类**：按上海菜、川菜、粤菜等菜系筛选

### 🕸️ 知识图谱
- **食材关联网络**：展示食材、菜谱、烹饪技法之间的关系
- **可视化探索**：通过图形化界面探索中华饮食文化的深层联系

### 🏠 首页展示
- **精选书籍**：轮播展示珍贵烹饪典籍
- **热门食谱**：推荐最受欢迎的复古菜谱
- **文化专栏**：介绍中华饮食文化的历史渊源

## 🛠️ 技术栈

### 前端框架
- **React 18.3.1** - 现代化UI库
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速构建工具

### UI与样式
- **Tailwind CSS** - 实用优先的CSS框架
- **Lucide React** - 优雅的图标库
- **CSS3** - 现代样式技术

### 文档处理
- **PDF.js** - 浏览器端PDF渲染引擎
- **Dify AI** - 智能对话系统集成

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS预处理
- **TypeScript ESLint** - TypeScript代码规范

## 📁 项目结构

```
tongue-tip-library/
├── public/                    # 静态资源
│   ├── book_covers/          # 书籍封面图片
│   ├── icons/               # 菜系图标
│   ├── ocr_pages/           # OCR识别文本
│   ├── pdf_resources/       # PDF原始文件
│   ├── pdf_resources_compressed/ # 压缩版PDF
│   ├── recipe/              # 食谱图片
│   ├── intro.json           # 介绍数据
│   ├── label.json           # 标签数据
│   └── 餐馆信息.csv         # 餐厅信息
├── src/                     # 源代码
│   ├── components/          # React组件
│   │   ├── Homepage.tsx     # 首页组件
│   │   ├── ReadingInterface.tsx # 阅读界面
│   │   ├── InteractiveReader.tsx # 交互式阅读器
│   │   ├── FoodTimeMap.tsx  # 美食地图
│   │   ├── KnowledgeGraph.tsx # 知识图谱
│   │   ├── RecipeDetail.tsx # 食谱详情
│   │   └── ...
│   ├── data/               # 数据文件
│   │   └── mockData.ts     # 模拟数据
│   ├── types/              # TypeScript类型定义
│   ├── lib/                # 工具函数
│   └── index.css           # 全局样式
├── package.json            # 项目配置
├── tailwind.config.js      # Tailwind配置
├── vite.config.ts          # Vite配置
└── tsconfig.json           # TypeScript配置
```

## 📖 收录典籍

### 民国时期
- **《烹饪一斑》** (1935) - 钱寿卢著，326种菜式，中西融合
- **《家庭食谱烹调法》** (1935) - 李于明著，系统化家庭烹饪指南
- **《美味烹调食谱秘典》** (1948) - 李克明著，500余道菜肴秘方

### 古代经典
- **《随园食单》** (1792) - 袁枚著，清代饮食百科全书
- **《本心斋蔬食谱及其他二种》** (1936) - 宋代至元代饮食古籍合集

## 🚀 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173 查看应用

### 生产构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🎯 使用指南

### 阅读古籍
1. 在首页选择感兴趣的典籍
2. 点击"开始阅读"进入阅读界面
3. 使用右侧的Dify AI助手进行智能问答
4. 支持缩放、翻页、搜索等阅读功能

### 探索食谱
1. 点击导航栏的"食谱"菜单
2. 按菜系、时代或难度筛选食谱
3. 点击具体食谱查看详细制作步骤
4. 了解每道菜的历史文化背景

### 使用美食地图
1. 点击"美食地图"进入时空探索
2. 选择感兴趣的时代或地域
3. 点击地图标记查看详细信息
4. 按菜系进行筛选探索

## 🔧 配置说明

### Dify AI配置
在 `src/components/ReadingInterface.tsx` 中配置不同书籍的Dify AI助手：

```typescript
const loadDifyInPanel = (bookId: string) => {
  let token = 'default-token';
  
  switch(bookId) {
    case 'family-cookbook':
      token = '8XO14XJ7ZCVYKibv';
      break;
    case '3':
      token = 'u3npcMPAlZeXAR4J';
      break;
    // ... 其他书籍配置
  }
  
  // 加载Dify聊天机器人...
};
```

### 响应式样式
项目使用Tailwind CSS实现响应式设计，主要断点：
- `sm`: 640px (移动设备)
- `md`: 768px (平板设备)
- `lg`: 1024px (桌面设备)
- `xl`: 1280px (大屏设备)

## 📱 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发规范
1. 使用TypeScript进行类型安全的开发
2. 遵循ESLint代码规范
3. 组件化开发，保持代码可复用性
4. 添加适当的注释和文档

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

*让中华传统饮食文化在数字时代焕发新的生机*