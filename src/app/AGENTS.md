# url2obsidian — 前端指南 (`src/app/`)

本目录包含所有页面路由、UI 组件和 Server Actions。遵循 Next.js 15 App Router 规范。

## 技术栈

- Next.js 15 App Router (React 19)
- Tailwind CSS
- TypeScript strict mode

## 架构约定

### 路由规则

- 页面文件放在 `app/` 下的路由目录中，文件名必须为 `page.tsx`。
- 布局文件为 `layout.tsx`，只在需要共享布局时创建。
- 静态路由使用目录名表达语义（如 `history/page.tsx`），不用方括号参数化路由。

### 组件分层

```
app/
├── page.tsx               # Server Component（数据获取 + 骨架）
├── actions.ts             # Server Actions（表单提交、数据变更）
└── components/
    ├── url-input.tsx      # Client Component（交互表单）
    ├── summary-card.tsx   # Client Component（摘要展示 + 折叠）
    ├── summary-skeleton.tsx  # Client Component（加载态骨架屏）
    └── history-list.tsx   # Client Component（历史列表渲染）
```

### Server Components 原则

- 默认用 Server Component。只在需要交互状态（表单、折叠、加载态）时加 `"use client"`。
- Server Component 直接导入 Server Action 并传给 Client Component。
- 数据获取放在 Server Component 或 Server Action 中，不放在 `useEffect` 里。

### Client Components 原则

- 使用 `useActionState` 绑定 Server Action，管理表单提交状态。
- 不将 API 密钥、业务逻辑暴露在 Client Component 中。
- 交互模式：URL 提交 → loading 态 → success/error 态，三者有清晰的 UI 区分。

## 文件命名

| 类型 | 约定 | 示例 |
|---|---|---|
| 页面文件 | `page.tsx` | `app/history/page.tsx` |
| 布局文件 | `layout.tsx` | `app/layout.tsx` |
| UI 组件 | `kebab-case.tsx` | `url-input.tsx` |
| 样式文件 | `globals.css` | 仅限全局样式 |

## UI 设计准则

- 全部使用 Tailwind CSS，不写 `.css` 文件（全局样式除外）。
- 颜色使用 Tailwind 内置色板（slate/blue/emerald），不自定义色值。
- 交互反馈：表单提交必有 loading 态，错误使用红色警告条。
- 响应式：移动端优先，关键布局在 `sm` / `md` / `lg` 三个断点适配。
- 无障碍：所有按钮和交互元素有 `aria-label` 或可见文本标签。

## Server Actions (`actions.ts`)

- 所有 Server Action 集中定义在 `app/actions.ts` 中。
- 每个 Action 使用 `"use server"` 指令。
- Action 签名：接收 `FormData` 或纯对象，返回 `{ success, data?, error? }` 格式。
- 错误处理：try/catch 包裹所有异步调用，返回友好的中文错误信息给用户。
- 敏感操作：Server Action 中读取/设置 Cookie，不暴露给客户端。

```typescript
export async function summarizeUrl(formData: FormData): Promise<ActionResult> {
  "use server";
  // ...
}
```
