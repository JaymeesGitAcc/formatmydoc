import "@/styles/editor.css"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"

const sampleHtml = `
 <h1>Document Title</h1>

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
  return (
    <div className="border rounded-lg p-4">
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
