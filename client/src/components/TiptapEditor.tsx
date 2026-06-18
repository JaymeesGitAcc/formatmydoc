import { generatePdf } from "@/api/pdf"
import "@/styles/editor.css"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"

const sampleHtml = `
 <h1>Andrew James</h1>

<p>
  This paragraph contains
  <strong>bold text</strong>
  and
  <em>italic text</em>.
</p>

<h2>Features</h2>

<ul>
  <li>Bullet One</li>
  <li>Bullet Two</li>
</ul>

<ol>
  <li>Step One</li>
  <li>Step Two</li>
</ol>

<blockquote>
  This is a quote.
</blockquote>
`

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleHtml,
  })

  const handleExportPdf = async () => {
    if (!editor) return

    try {
      const html = editor.getHTML()

      const pdfBlob = await generatePdf(html)

      const url = window.URL.createObjectURL(pdfBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = "document.pdf"

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="border rounded-lg p-4">
      <button
        onClick={handleExportPdf}
        className="mb-4 rounded border px-4 py-2"
      >
        Export PDF
      </button>
      <EditorContent editor={editor} />
      <button
        onClick={() => console.log(editor.getHTML())}
        className="mb-4 rounded border px-4 py-2"
      >
        Log HTML
      </button>
    </div>
  )
}

export default TiptapEditor
