import "@/styles/editor.css"
import { MenuBar } from "@/components/MenuBar"
import { EditorContent } from "@tiptap/react"
import type { Editor as EditorType } from "@tiptap/react"
import { useEffect } from "react"

interface EditorProps {
  content: string,
  editor: EditorType | null
}

const Editor = ({ content, editor }: EditorProps) => {
  useEffect(() => {
    if (!editor || !content) return

    editor.commands.setContent(content)
  }, [editor, content])

  return (
    <div className="border">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
