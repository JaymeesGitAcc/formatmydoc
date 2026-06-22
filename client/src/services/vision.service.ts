import API from "@/lib/api"

export interface GenerateHtmlResponse {
  success: boolean
  html: string
}

export const generateHtmlfromImage = async (
  file: File,
): Promise<GenerateHtmlResponse> => {
  const formData = new FormData()

  formData.append("image", file)

  const { data } = await API.post("/api/vision/html", formData)

  return data
}
