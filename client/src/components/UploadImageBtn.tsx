import { useRef, useState } from "react"
import { CloudUpload, type LucideIcon } from "lucide-react"
import { generateHtmlfromImage } from "@/services/vision.service"

interface UploadImageBtnProps {
  title?: string
  icon?: LucideIcon
  accept?: string
  onFileSelect?: (file: File | null) => void
  onHtmlGenerated?: (html: string) => void
}

const UploadImageBtn = ({
  title = "Upload Image",
  icon: Icon = CloudUpload,
  accept = "image/*",
  onFileSelect,
  onHtmlGenerated,
}: UploadImageBtnProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = async (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return
    setPreview(URL.createObjectURL(file))
    const data = await generateHtmlfromImage(file)
    onHtmlGenerated?.(data.html)
    onFileSelect?.(file)
  }

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ""
    onFileSelect?.(null)
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFile(e.dataTransfer.files?.[0])
      }}
      className={`relative group flex flex-col items-center justify-center gap-3
        min-h-[180px] rounded-md border-2 border-dashed border-indigo-200 cursor-pointer overflow-hidden
        transition-all duration-200 select-none
        ${
          dragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : preview
              ? "border-border bg-muted/30"
              : "border-muted-foreground/25 bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200
            flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
          >
            <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">
              Change
            </span>
            <button
              onClick={reset}
              className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full
                hover:bg-red-500/80 transition-colors border-0 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg bg-muted
            transition-colors duration-200 group-hover:bg-primary/10
            ${dragOver ? "bg-primary/10" : ""}`}
          >
            <Icon
              size={18}
              className={`text-muted-foreground transition-colors duration-200
              group-hover:text-primary ${dragOver ? "text-primary" : ""}`}
            />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
              {title}
            </p>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
              Click or drag & drop
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default UploadImageBtn
