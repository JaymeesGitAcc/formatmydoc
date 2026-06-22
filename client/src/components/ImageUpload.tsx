import { Input } from "@/components/ui/input"
import { generateHtmlfromImage } from "@/services/vision.service"

interface ImageUploadProps {
  onHtmlGenerated: (html: string) => void
}

const ImageUpload = ({ onHtmlGenerated }: ImageUploadProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      const data = await generateHtmlfromImage(file)
      onHtmlGenerated(data.html)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="max-w-[250px]"
    />
  )
}

export default ImageUpload
