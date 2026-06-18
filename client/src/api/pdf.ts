const API_BASE_URL = "http://localhost:5000"

export const generatePdf = async (html: string) => {
  const response = await fetch(`${API_BASE_URL}/api/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ html }),
  })

  if (!response.ok) {
    throw new Error("Failed to generate PDF")
  }

  return response.blob()
}
