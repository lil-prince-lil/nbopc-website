# NB OPC 宁波一人公司社区官网

[English](#english) | [中文](#中文)

---

<a id="中文"></a>

## 中文

### 项目简介

NB OPC（Ningbo One Person Company）社区官网，是宁波首个专为 AI 原生独立创业者打造的市级孵化社区平台。由宁波软件行业协会人工智能应用专委会主管运营。

**在线预览**: [https://nbopc-website.vercel.app](https://nbopc-website.vercel.app)

### 功能特性

**前台官网（7 个导航页面）**
- 首页 — 品牌视频背景、GSAP 入场动画、数据活跃度、活动预告、OPC 矩阵、产品展示、资源生态图、合作伙伴
- 活动 — 活动列表（筛选）、活动详情、在线报名
- OPC 图谱 — 成员卡片墙（方向筛选）、成员详情页
- 资源 — AI 大模型 API、云服务、OPC 自研产品、政策资源
- 资讯 — 文章列表（分类筛选）、文章详情
- 关于我们 — 社区介绍、使命愿景、团队展示、发展历程时间轴
- 加入我们 — 入驻说明、申请表单、FAQ

**管理后台**
- 文章管理（CRUD）
- 活动管理（CRUD）
- OPC 成员管理（CRUD）
- 合作伙伴管理（CRUD）
- 入驻申请查看与审批
- 报名数据管理 + CSV 导出
- 用户管理
- 站点设置（Logo 上传、基础配置）
- 图片上传（Vercel Blob 云存储）

**用户系统**
- 手机号注册/登录
- 个人中心
- JWT 认证

### 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Next.js 16 (App Router) + TypeScript |
| 样式 | Tailwind CSS v4 |
| 动画 | GSAP + ScrollTrigger |
| 字体 | Noto Sans SC Variable |
| 数据库 | Turso (LibSQL) — 云端 SQLite |
| ORM | Prisma 7 |
| 认证 | JWT (jose) + bcrypt |
| 文件存储 | Vercel Blob |
| 部署 | Vercel |

### 品牌色

| 色号 | 用途 |
|------|------|
| `#2857A4` | 主色（深蓝） |
| `#1EAF8E` | 副色（青绿） |
| `#FFFFFF` | 白色 |

### 本地开发

```bash
# 克隆项目
git clone https://github.com/lil-prince-lil/nbopc-website.git
cd nbopc-website

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 Turso 数据库凭证（或使用本地 SQLite）

# 初始化数据库并填充种子数据
npx prisma db push
npx prisma db seed

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看前台，http://localhost:3000/admin/login 进入后台（默认账号 `admin` / `admin123`）。

### 环境变量

| 变量名 | 说明 |
|--------|------|
| `DATABASE_URL` | Prisma 验证用（本地 `file:./dev.db`） |
| `TURSO_DATABASE_URL` | Turso 数据库连接地址 |
| `TURSO_AUTH_TOKEN` | Turso 认证令牌 |
| `JWT_SECRET` | JWT 签名密钥 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 存储令牌 |

### 项目结构

```
src/
├── app/                  # Next.js App Router 页面
│   ├── admin/            # 管理后台页面
│   ├── api/              # API 路由
│   │   ├── admin/        # 管理后台 API
│   │   ├── auth/         # 用户认证 API
│   │   └── public/       # 公开数据 API
│   ├── about/            # 关于我们
│   ├── activities/       # 活动
│   ├── atlas/            # OPC 图谱
│   ├── join/             # 加入我们
│   ├── news/             # 资讯
│   └── resources/        # 资源
├── components/           # 可复用组件
│   ├── home/             # 首页区块组件
│   ├── layout/           # 布局组件（Header/Footer）
│   ├── admin/            # 后台组件（ImageUpload）
│   └── activities/       # 活动相关组件
├── hooks/                # 自定义 Hooks
├── lib/                  # 工具库（db、auth、constants）
└── generated/            # Prisma 生成的客户端
```

---

<a id="english"></a>

## English

### About

NB OPC (Ningbo One Person Company) is the official website for Ningbo's first municipal-level AI-native solo entrepreneur incubation community. Operated by the AI Application Committee of the Ningbo Software Industry Association.

**Live Demo**: [https://nbopc-website.vercel.app](https://nbopc-website.vercel.app)

### Features

**Public Website (7 Navigation Pages)**
- Home — Video hero with GSAP animations, stats bar, activity previews, OPC showcase, product carousel, ecosystem map, partners wall
- Activities — Event listings with filters, event details, online registration
- OPC Atlas — Member card wall with category filters, member detail pages
- Resources — AI model APIs, cloud services, OPC products, policy resources
- News — Article listings with category filters, article details
- About — Community intro, mission & vision, team, development timeline
- Join Us — Membership info, application form, FAQ

**Admin Dashboard**
- Full CRUD for articles, activities, OPC members, partners
- Application review & approval
- Event signup data management + CSV export
- User management, site settings, logo upload
- Image upload via Vercel Blob cloud storage

**User System**
- Phone number registration & login
- User profile
- JWT authentication

### Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| Font | Noto Sans SC Variable |
| Database | Turso (LibSQL) — Cloud SQLite |
| ORM | Prisma 7 |
| Auth | JWT (jose) + bcrypt |
| File Storage | Vercel Blob |
| Deployment | Vercel |

### Local Development

```bash
# Clone the repo
git clone https://github.com/lil-prince-lil/nbopc-website.git
cd nbopc-website

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Turso credentials (or use local SQLite)

# Initialize database and seed data
npx prisma db push
npx prisma db seed

# Start dev server
npm run dev
```

Visit http://localhost:3000 for the frontend, http://localhost:3000/admin/login for admin (default: `admin` / `admin123`).

### Environment Variables

| Variable | Description |
|----------|------------|
| `DATABASE_URL` | For Prisma validation (local: `file:./dev.db`) |
| `TURSO_DATABASE_URL` | Turso database connection URL |
| `TURSO_AUTH_TOKEN` | Turso auth token |
| `JWT_SECRET` | JWT signing secret |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |

### License

This project is proprietary software for NB OPC Community. All rights reserved.
