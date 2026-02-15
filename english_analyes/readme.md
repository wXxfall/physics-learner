# 英语句子分析器

一个用于分析英语句子结构的Web应用，可以识别主谓宾定状补等句子成分，并标注语法类型。

## 功能特点

- 句子成分分析：自动识别主语、谓语、宾语、定语、状语、补语
- 语法类型识别：支持多种英语语法类型（一般现在时、一般过去时、现在进行时等）
- 例句展示：提供相同语法下的不同例句
- 历史记录：保存查询历史，支持快速查看之前的分析结果

## 技术栈

- 后端：Node.js + Express
- 前端：原生 HTML/CSS/JavaScript
- 数据存储：JSON文件

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动服务器：
```bash
npm start
```

3. 在浏览器中访问：
```
http://localhost:3000
```

## 使用说明

1. 在输入框中输入英语句子
2. 点击"分析句子"按钮
3. 查看分析结果，包括句子成分和语法类型
4. 浏览相同语法下的例句
5. 在历史记录中查看之前的查询

## 项目结构

```
english_analyes/
├── server.js                 # 服务器入口文件
├── package.json              # 项目配置
├── routes/
│   └── analyze.js           # API路由
├── services/
│   ├── grammarAnalyzer.js   # 语法分析服务
│   └── historyService.js    # 历史记录服务
├── public/
│   ├── index.html           # 主页面
│   ├── css/
│   │   └── style.css        # 样式文件
│   └── js/
│       └── app.js           # 前端逻辑
└── data/
    └── history.json         # 历史记录数据
```

## API接口

- `POST /api/analyze` - 分析英语句子
- `GET /api/history` - 获取历史记录
- `DELETE /api/history` - 清空历史记录
