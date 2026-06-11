export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-center text-4xl font-bold tracking-tight text-slate-800">
        url2obsidian
      </h1>
      <p className="text-center text-lg text-slate-500">
        Paste an article URL to generate an AI summary and save it as an Obsidian note.
      </p>
    </main>
  );
}
