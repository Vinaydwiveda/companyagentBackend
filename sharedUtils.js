import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });



export async function embedQuery(query) {
  return await embeddings.embedQuery(query);
}
export default embedDocuments;