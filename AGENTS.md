# url2obsidian

将任意网页文章转换为 Obsidian 笔记的 AI 摘要工具。

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript (strict mode) |
| 样式 | Tailwind CSS |
| 数据库 | Turso (SQLite 兼容边缘数据库) |
| ORM | Drizzle ORM |
| AI | OpenAI API (GPT-4o) |
| 内容提取 | `@mozilla/readability` + `jsdom` |
| 部署 | Vercel |

## 项目结构

```
url2obsidian/
├── AGENTS.md           # 本文件：全局约定
├── next.config.ts
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── .env.local          # 环境变量（不提交）
├── .gitignore
├── src/
│   ├── app/            # Next.js App Router 页面 + 组件
│   │   ├── AGENTS.md
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── actions.ts  # Server Actions
│   │   ├── globals.css
│   │   ├── history/
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── url-input.tsx
│   │       ├── summary-card.tsx
│   │       ├── summary-skeleton.tsx
│   │       └── history-list.tsx
│   ├── lib/            # 后端逻辑 + 数据库
│   │   ├── AGENTS.md
│   │   ├── db/
│   │   │   ├── schema.ts
│   │   │   └── index.ts
│   │   ├── article.ts
│   │   ├── openai.ts
│   │   └── session.ts
│   └── types/
│       └── index.ts
```

## 开发约定

- **TypeScript strict mode** 全程开启，禁止 `any`。
- 所有环境变量通过 `.env.local` 管理，类型定义在 `src/types/index.ts` 中。
- 数据库迁移使用 `drizzle-kit push` 推送至 Turso，迁移文件不提交至 Git。
- 命名：目录名 `kebab-case`，文件/组件名 `kebab-case.tsx`。
- 所有新增目录或功能需同步更新对应的 AGENTS.md。

## 环境变量

```env
TURSO_DB_URL=
TURSO_AUTH_TOKEN=
OPENAI_API_KEY=
```

## 快速开始

```bash
pnpm install
pnpm exec drizzle-kit push    # 同步数据库表结构
pnpm dev                      # 启动开发服务器
```
