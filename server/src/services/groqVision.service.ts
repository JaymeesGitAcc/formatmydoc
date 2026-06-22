import { groq } from "../config/groq"

export const extractTextFromImage = async (
  imageBase64: string,
  mimeType: string,
) => {
  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Extract all text from this image exactly as written.

Rules:
- Do not summarize.
- Do not correct spelling.
- Do not add punctuation.
- Preserve line breaks where possible.

Return only the extracted text.
`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
  })

  return response.choices[0].message.content
}

export const generateHtmlFromImage = async (
  imageBase64: string,
  mimeType: string,
) => {
  const response = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Extract all text from this image.

Preserve all information and meaning.

Format the content into clean semantic HTML.

Rules:
- Use h1, h2, p, ul, ol when appropriate.
- If the text sizes are similar, place them under one html tag using p tag or h1, h2 for headings.
- The article title should be inside a single h1.
- Use p tags for article paragraphs.
- Do not place paragraph text inside headings.
- Preserve all information.
- No markdown code fences.
- Do not wrap in html, head, or body tags.
- Return only valid HTML.
- Do not include markdown code fences.
- Do not include any other information other than the exracted text
`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
  })

  return response.choices[0].message.content
}
