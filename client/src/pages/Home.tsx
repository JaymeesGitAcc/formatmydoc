import { generatePdf } from "@/api/pdf"
import Editor from "@/components/Editor"
import { Button } from "@/components/ui/button"
import UploadImageBtn from "@/components/UploadImageBtn"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { CircleCheck, File, FileDown } from "lucide-react"
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

  const handleDownloadPdf = async () => {
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
    <div className="bg-gray-100">
      <div className="w-full min-h-[70px] flex items-center border-b px-4 sticky z-50 top-0 left-0 bg-white">
        <div className="flex items-center gap-1">
          <div className="p-1 flex items-center justify-center rounded bg-indigo-50">
            <File size={18} className="text-indigo-500" />
          </div>
          <span className="text-xl font-semibold">FormatMyDoc</span>
        </div>

        <div className="ml-auto">
          <Button
            className="bg-indigo-500 hover:bg-indigo-600"
            disabled={!hasContent}
            onClick={handleDownloadPdf}
          >
            <FileDown />
            Download PDF
          </Button>
        </div>
      </div>
      <div className="flex">
        <section className="w-[25%] p-4">
          <div className="border rounded-md shadow h-full bg-white">
            <div className="p-4">
              <h3 className="font-semibold">Upload Image</h3>
              <p className="text-sm text-gray-500">
                Upload a clear image of your document to get started.
              </p>
            </div>
            <div className="p-4">
              <UploadImageBtn onHtmlGenerated={setHtml} />
            </div>

            <div className="bg-white p-4">
              <div className="border rounded-md p-3 space-y-1">
                <h4 className="text-sm mb-2 font-semibold">
                  Tips for Best Result
                </h4>
                <div className="text-xs flex items-center gap-1">
                  <CircleCheck size={15} className="text-green-600" />
                  Use clear, high contrast images
                </div>
                <div className="text-xs flex items-center gap-1">
                  <CircleCheck size={15} className="text-green-600" />
                  Ensure text is not cropped
                </div>
                <div className="text-xs flex items-center gap-1">
                  <CircleCheck size={15} className="text-green-600" />
                  Good Lighting and contrast
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full p-4">
          <div className="">
            <Editor content={html} editor={editor} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
