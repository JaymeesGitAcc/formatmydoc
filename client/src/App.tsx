import TiptapEditor from "@/components/TiptapEditor"

function App() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          FormatMyDoc - Tiptap Experiment
        </h1>

        <TiptapEditor/>
      </div>
    </main>
  )
}

export default App
