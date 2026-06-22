import Home from "@/pages/Home"

function App() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">FormatMyDoc</h1>
          <p>Upload an image and convert it into an editable document</p>
        </div>
        <Home />
      </div>
    </main>
  )
}

export default App
