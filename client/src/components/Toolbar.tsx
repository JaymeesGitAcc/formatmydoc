import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Code2,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Minus,
  CornerDownLeft,
  Undo2,
  Redo2,
} from "lucide-react"
import type { ReactNode } from "react"
import type { Editor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { menuBarStateSelector } from "@/utils/menuBarState"

interface BtnProps {
  children: ReactNode
  label: string
  active?: boolean
  onClick: () => void
  disabled?: boolean
}

const Btn = ({
  children,
  label,
  onClick,
  disabled = false,
  active = false,
}: BtnProps) => (
  <button
    title={label}
    onClick={onClick}
    className={`
      inline-flex items-center justify-center w-8 h-8 rounded-md
      text-sm transition-colors duration-100 border-0
      ${
        active
          ? "bg-neutral-200 text-neutral-900"
          : "bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
      }
    `}
    disabled={disabled}
  >
    {children}
  </button>
)

const Sep = () => <div className="w-px h-5 bg-neutral-200 mx-1 shrink-0" />

export default function Toolbar({ editor }: { editor: Editor | null }) {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-evenly gap-0.5 p-1.5 bg-white">
        {/* History */}
        <Btn
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState?.canUndo}
        >
          <Undo2 size={15} />
        </Btn>
        <Btn
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState?.canRedo}
        >
          <Redo2 size={15} />
        </Btn>

        <Sep />

        {/* Inline marks */}
        <Btn
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState?.canBold}
          active={editorState?.isBold}
        >
          <Bold size={15} />
        </Btn>
        <Btn
          label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState?.canItalic}
          active={editorState?.isItalic}
        >
          <Italic size={15} />
        </Btn>
        <Btn
          label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editorState?.isUnderline}
        >
          <Underline size={15} />
        </Btn>
        <Btn
          label="Strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState?.canStrike}
          active={editorState?.isStrike}
        >
          <Strikethrough size={15} />
        </Btn>
        <Btn
          label="Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState?.canCode}
          active={editorState?.isCode}
        >
          <Code size={15} />
        </Btn>

        <Sep />

        {/* Block type */}
        <Btn
          label="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editorState?.isParagraph}
        >
          <Pilcrow size={15} />
        </Btn>
        <Btn
          label="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editorState?.isHeading1}
        >
          <Heading1 size={15} />
        </Btn>
        <Btn
          label="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editorState?.isHeading2}
        >
          <Heading2 size={15} />
        </Btn>
        <Btn
          label="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editorState?.isHeading3}
        >
          <Heading3 size={15} />
        </Btn>
        <Btn
          label="Heading 4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          active={editorState?.isHeading4}
        >
          <Heading4 size={15} />
        </Btn>
        <Btn
          label="Heading 5"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          active={editorState?.isHeading5}
        >
          <Heading5 size={15} />
        </Btn>
        <Btn
          label="Heading 6"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          active={editorState?.isHeading6}
        >
          <Heading6 size={15} />
        </Btn>

        <Sep />

        {/* Lists & blocks */}
        <Btn
          label="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editorState?.isBulletList}
        >
          <List size={15} />
        </Btn>
        <Btn
          label="Ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editorState?.isOrderedList}
        >
          <ListOrdered size={15} />
        </Btn>
        <Btn
          label="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editorState?.isCodeBlock}
        >
          <Code2 size={15} />
        </Btn>
        <Btn
          label="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editorState?.isBlockquote}
        >
          <Quote size={15} />
        </Btn>

        <Sep />

        {/* Inserts */}
        <Btn
          label="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={15} />
        </Btn>
        <Btn
          label="Hard break"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <CornerDownLeft size={15} />
        </Btn>
      </div>
    </div>
  )
}
