# url2obsidian — 后端 & 数据库指南 (`src/lib/`)

本目录包含数据库、外部 API 集成和工具函数。纯逻辑层，不包含任何 React 或 UI 代码。

## 技术栈

- Drizzle ORM + Turso (SQLite 兼容边缘数据库)
- OpenAI SDK (`openai` npm 包)
- `@mozilla/readability` + `jsdom`（文章内容提取）
- `next/headers` 中的 `cookies()`（会话管理）

## 目录结构

```
lib/
├── db/
│   ├── schema.ts       # Drizzle 表定义（唯一源）
│   └── index.ts        # Turso 客户端初始化
├── article.ts          # 文章抓取 + Readability 提取
├── openai.ts           # OpenAI API 调用封装
└── session.ts          # 会话 ID 读写
```

## 数据库约定

### Schema 定义 (`db/schema.ts`)

- 所有表定义集中在一个文件中，表名使用复数蛇形命名（`articles`, `summaries`）。
- 字段类型优先使用 SQLite 原生类型（`text`, `integer`），不嵌套对象。
- 主键用 `text` + `default(cuid())`，不用自增整数。
- 时间戳统一使用 Unix 时间戳（`integer`），由代码生成，不由数据库生成。
- 索引显式声明在 schema 中，不在迁移时单独添加。

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey().$defaultFn(cuid),
  url: text("url").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  siteName: text("site_name"),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const summaries = sqliteTable("summaries", {
  id: text("id").primaryKey().$defaultFn(cuid),
  articleId: text("article_id").notNull().references(() => articles.id),
  sessionId: text("session_id").notNull(),
  oneSentence: text("one_sentence").notNull(),
  shortSummary: text("short_summary").notNull(),
  detailedSummary: text("detailed_summary").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});
```

### 客户端初始化 (`db/index.ts`)

- 使用 `@libsql/client` 的 `createClient` 连接 Turso。
- 环境变量 `TURSO_DB_URL` 和 `TURSO_AUTH_TOKEN` 从 `.env.local` 读取。
- 只导出一个 `db` 实例和一个 `schema` 对象，不导出原始 client。

## 模块约定

### 文章抓取 (`article.ts`)

```typescript
export async function fetchArticle(url: string): Promise<{
  title: string;
  content: string;
  excerpt: string | null;
  siteName: string | null;
}>
```

- 入参总是 `string`（URL），函数内做 URL 格式校验，不信任调用方。
- `fetch` 必须设置 15 秒超时和合理的 User-Agent。
- Readability 解析失败时抛出明确错误，不静默返回 null。
- 无副作用（不涉及数据库），纯转换函数。

### OpenAI (`openai.ts`)

```typescript
export async function generateSummaries(content: string): Promise<{
  oneSentence: string;
  shortSummary: string;
  detailedSummary: string;
}>
```

- 使用 `openai` SDK 官方包，`response_format: { type: "json_object" }`。
- Prompt 用模板字符串，要求模型以 JSON 格式返回三种摘要。
- 返回的中文摘要长度：一句话 ≤ 30 字，短摘要 100 字以内，详细摘要 300 字以内。
- 错误处理：区分 API 超时、限流、内容审核三类错误，分别返回对应错误码 + 中文信息。

### 会话管理 (`session.ts`)

```typescript
export async function getSessionId(): Promise<string>
```

- 使用 `next/headers` 的 `cookies()` API 读取和设置 `session_id`。
- Cookie 配置：`httpOnly: true`, `secure: true`, `sameSite: "lax"`, `maxAge: 1年`。
- 会话 ID 使用 `crypto.randomUUID()` 生成，不依赖外部库。
- 每次调用先读 Cookie，不存在则生成新 ID 并设置 Cookie，保证幂等。

## 数据流

```
Client (URL) → Server Action
  ↓
查 articles 表 (去重缓存)
  ↓ 未命中
fetchArticle() → 写 articles 表
  ↓
查 summaries 表 (同文章+同会话去重)
  ↓ 未命中
generateSummaries() → 写 summaries 表
  ↓
返回结果给客户端
```

## 错误处理策略

- 所有外部调用（fetch、OpenAI）必须 try/catch。
- 业务层函数不直接 throw，而是返回 `{ success: false, error: string }` 结构。
- 日志：不使用 console.log，使用 `console.error` 记录错误信息。
- 用户侧看到的中文错误消息在 Server Action 层组装，lib 层只传错误码。
- 超时统一控制在 15 秒（fetch 文章）+ 30 秒（OpenAI API）。
