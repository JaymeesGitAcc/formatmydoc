import "@/styles/editor.css"
import type { Editor as EditorType } from "@tiptap/react"
import Toolbar from "@/components/Toolbar"
import { EditorContent } from "@tiptap/react"
import { useEffect } from "react"

interface EditorProps {
  content: string
  editor: EditorType | null
}

const Editor = ({ content, editor }: EditorProps) => {
  useEffect(() => {
    if (!editor || !content) return

    editor.commands.setContent(content)
  }, [editor, content])

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b">
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className="overflow-y-auto bg-white" />
    </div>
  )
}

export default Editor
