import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

export async function Pdfloader(filePath) {
  const loader = new PDFLoader(filePath, { splitPages: false });
  const Doc = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const texts = await splitter.splitText(Doc[0].pageContent);

  const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: 'process.env.GOOGLEAPIKEY',
  model: "text-embedding-004",
});


  const embedding = await embeddings.embedDocuments(texts);
console.log(embedding)

  // const cleanTexts = splitter.filter((t) => t && t.trim().length > 0);
  // console.log("Chunks:", cleanTexts.length);
//   const value = await embedDocuments(cleanTexts);
// console.log(value);
  // return {
  //   cleanTexts: cleanTexts,
  //   embeddings: value,
  // };
}

Pdfloader('Docs.pdf')
// export default Pdfloader;
