import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function generateImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'Create a realistic classroom image showing middle school students (Classes 6–9) attentively learning mathematics and science concepts from a teacher. Students are engaged, raising hands or writing notes. Clean Indian classroom environment, organized seating, bright but natural lighting, calm and focused atmosphere, professional photography, high resolution, academic and disciplined mood.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        fs.writeFileSync('./public/about-classroom.png', buffer);
        console.log('Image saved successfully to ./public/about-classroom.png');
        return;
      }
    }
    console.log('No image found in response');
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();
