import { generatePdf } from "@/api/pdf"
import Editor from "@/components/Editor"
import ImageUpload from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

const Home = () => {
  const [html, setHtml] = useState("")
  const [hasContent, setHasContent] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: html,
    onUpdate: ({ editor }) => {
      setHasContent(editor.getText().trim().length > 0)
    },
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
    <div>
      <div className="flex items-center gap-2 mb-2">
        <ImageUpload onHtmlGenerated={setHtml} />
        <Button disabled={!hasContent} onClick={handleExportPdf}>
          Export PDF
        </Button>
      </div>
      <Editor content={html} editor={editor} />
    </div>
  )
}

export default Home
