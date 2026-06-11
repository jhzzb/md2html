export interface SummaryResult {
  id: string;
  url: string;
  title: string;
  oneSentence: string;
  shortSummary: string;
  detailedSummary: string;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  oneSentence: string;
  createdAt: string;
}

const historyStore: SummaryResult[] = [
  {
    id: "1",
    url: "https://example.com/ai-advances-2024",
    title: "AI Advances in 2024",
    oneSentence: "2024 年 AI 领域在多模态模型、Agent 系统和开源生态方面取得了显著突破。",
    shortSummary: "2024 年 AI 领域的关键趋势包括多模态大模型的成熟、AI Agent 系统的实用化，以及开源模型的全面崛起。各大厂商纷纷推出新一代模型，竞争格局更加多元化。",
    detailedSummary: "2024 年是 AI 行业高速发展的一年。多模态模型方面，GPT-4V、Gemini Pro Vision 等产品展示了强大的图像理解和生成能力，将 AI 的应用边界从文本扩展到了视觉、音频等多个维度。\n\nAI Agent 系统从概念走向实用，AutoGPT、Claude Computer Use 等项目展示了 AI 自主执行复杂任务的能力。开发者社区围绕 Agent 框架构建了丰富的工具生态。\n\n开源生态方面，Llama 3、Mistral、Qwen 2 等开源模型在性能上持续追赶闭源模型，推动了 AI 技术的民主化。Hugging Face 平台上的模型数量突破百万，社区贡献空前活跃。\n\n边缘计算也成为重要趋势，Apple Intelligence、Qualcomm AI Engine 等方案让 AI 推理在移动设备上成为现实，为用户带来了更即时、更私密的体验。",
    createdAt: "2024-12-20T10:30:00Z",
  },
  {
    id: "2",
    url: "https://example.com/rust-system-programming",
    title: "Why Rust Matters for System Programming",
    oneSentence: "Rust 以其内存安全、零成本抽象和现代工具链正在重新定义系统编程的标准。",
    shortSummary: "Rust 凭借其独特的所有权系统和借用检查器，在保证内存安全的同时无需垃圾回收，成为系统编程领域的热门选择。",
    detailedSummary: "Rust 的设计哲学是在不牺牲性能的前提下提供内存安全。其所有权系统在编译时检查内存访问的有效性，从而消除了空指针解引用、双重释放等常见的内存错误。\n\n零成本抽象让 Rust 能够提供高级语言的表达力而不带来运行时开销。迭代器、闭包、泛型等在编译时被优化为高效的机器码。\n\nCargo 包管理器和 Rust 编译器提供了卓越的开发体验。依赖管理、单元测试、文档生成等开箱即用。\n\nRust 在 Linux 内核、WebAssembly、嵌入式系统等领域的应用正在快速增长。微软、Google、Meta 等巨头都在积极采用 Rust 重构关键系统组件。",
    createdAt: "2024-12-19T14:20:00Z",
  },
  {
    id: "3",
    url: "https://example.com/obsidian-productivity",
    title: "Building a Second Brain with Obsidian",
    oneSentence: "Obsidian 通过链接式笔记和本地优先的架构，成为构建第二大脑的理想工具。",
    shortSummary: "Obsidian 的独特之处在于其基于本地 Markdown 文件的架构和强大的双向链接功能，让知识管理变得直观而高效。",
    detailedSummary: "Obsidian 采用本地优先的策略，所有笔记以纯 Markdown 文件形式存储在本地。这意味着用户完全拥有自己的数据，无需依赖任何云服务。\n\n双向链接是 Obsidian 的核心功能。通过将想法和概念链接起来，用户可以在笔记之间自由导航，逐渐构建起一个有机的知识网络。图谱视图直观地展示了这些连接。\n\n插件生态极大地扩展了 Obsidian 的功能。Dataview、Templater、Kanban 等社区插件让 Obsidian 从简单的笔记应用变为强大的知识管理平台。\n\nZettelkasten 方法在 Obsidian 中得到了完美实现。原子化的笔记、自由的链接和灵活的标签系统，帮助用户实现知识的积累、连接和创造。",
    createdAt: "2024-12-18T09:15:00Z",
  },
  {
    id: "4",
    url: "https://example.com/nextjs-app-router",
    title: "Next.js App Router Deep Dive",
    oneSentence: "Next.js App Router 通过服务端组件、流式渲染和嵌套布局重新定义了 React 应用架构。",
    shortSummary: "Next.js 13+ 引入的 App Router 是 React 全栈框架的一次重大革新，提供了服务端组件、流式渲染和嵌套布局等强大的新特性。",
    detailedSummary: "App Router 是 Next.js 的下一代路由系统，基于 React Server Components (RSC) 构建。服务端组件在服务器端渲染，显著减少了客户端 JavaScript 体积。\n\n嵌套布局是 App Router 的核心特性之一。通过 layout.tsx 文件，开发者可以轻松实现跨路由共享的布局、加载状态和错误处理。\n\n流式渲染 (Streaming) 允许服务器逐步发送 UI，用户在等待完整页面加载时可以看到部分内容，大幅提升感知性能。\n\n数据获取方面，App Router 支持在组件内直接使用 async/await 获取数据，配合 React Suspense 实现精细化的加载控制。\n\nServer Actions 进一步简化了表单处理和变异操作，让全栈开发变得更加直观。",
    createdAt: "2024-12-17T16:45:00Z",
  },
];

function randomDelay(): Promise<void> {
  const ms = 800 + Math.random() * 1200;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockSummarize(url: string): Promise<SummaryResult> {
  await randomDelay();
  const id = String(Date.now());
  const now = new Date().toISOString();
  const result: SummaryResult = {
    id,
    url,
    title: "Summary of " + new URL(url).hostname,
    oneSentence: "这是一篇来自 " + new URL(url).hostname + " 的文章摘要。文章探讨了一个值得关注的议题，并提供了深入的分析和洞察。",
    shortSummary: "这篇文章从多个角度分析了当前的热点话题。作者引用了丰富的数据和案例，为读者呈现了一个全面的视角。文章结构清晰，论证严谨，值得仔细阅读和思考。",
    detailedSummary: "文章首先介绍了问题的背景和现状，指出该领域在过去几年中经历了显著的变化和发展。作者通过多个实际案例说明了这一趋势的具体表现，并对背后的驱动因素进行了深入分析。\n\n在核心论证部分，文章提出了几个关键观点：第一，技术进步正在重塑行业的竞争格局；第二，用户需求的变化推动着产品和服务的创新；第三，政策和法规的演变对发展方向产生着重要影响。\n\n文章最后总结了当前面临的主要挑战和机遇，并给出了具体的行动建议。作者认为，只有那些能够快速适应变化并持续创新的组织，才能在未来的竞争中立于不败之地。\n\n总体而言，这是一篇内容充实、分析深入的文章，对于理解该领域的最新动态和发展趋势具有重要的参考价值。",
    createdAt: now,
  };
  historyStore.unshift(result);
  return result;
}

export async function mockGetHistory(page: number): Promise<{ items: HistoryItem[]; total: number; page: number }> {
  await randomDelay();
  const sorted = [...historyStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize).map((h) => ({
    id: h.id,
    url: h.url,
    title: h.title,
    oneSentence: h.oneSentence,
    createdAt: h.createdAt,
  }));
  return { items, total: sorted.length, page };
}

export async function mockGetHistoryById(id: string): Promise<SummaryResult | null> {
  await randomDelay();
  return historyStore.find((h) => h.id === id) ?? null;
}

export async function mockSearchHistory(query: string): Promise<HistoryItem[]> {
  await randomDelay();
  const q = query.toLowerCase();
  const sorted = [...historyStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return sorted
    .filter((h) => h.title.toLowerCase().includes(q) || h.url.toLowerCase().includes(q))
    .map((h) => ({
      id: h.id,
      url: h.url,
      title: h.title,
      oneSentence: h.oneSentence,
      createdAt: h.createdAt,
    }));
}