import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';


if (!process.env.PINECONE_API_KEY || !process.env.GOOGLE_API_KEY) {
  console.error(" Missing API keys.");
  process.exit(1);
}


const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


async function getEmbedding(text) {
  
  try {
    const model = genAI.getGenerativeModel({
      model: 'text-embedding-004',
    
    });

    const result = await model.embedContent({
      content: { parts: [{ text }] }
    });

    return result.embedding.values;
  } catch (err) {
    console.error(" Embedding generation error:", err.message);
    return [];
  }
}


async function retrieveFromPinecone(queryVector, topK = 3) {
  try {
    const index = pc.index("vinaycompanyt");

    const results = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true
    });

    return results.matches
      ?.map(m => m?.metadata?.text || "")
      .join("\n");
  } catch (err) {
    console.error(" Pinecone retrieval error:", err.message);
    return "";
  }
}


export async function runRAG(userQuery) {
  if (!userQuery?.trim()) return "I didn't catch that, sir.";

  const queryVector = await getEmbedding(userQuery);
  if (!queryVector.length) return "Error generating neural representation.";

  const index = pc.index("vinaycompanyt");
  const results = await index.query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true
  });
 

  // Filter out low-confidence matches (Score < 0.5)
  const relevantMatches = results.matches.filter(m => m.score > 0.3);
 
  if (relevantMatches.length === 0) {
    return "Sir, that information is not in my current database.";
  }

  const context = relevantMatches.map(m => m.metadata.text).join("\n---\n");
  

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are Company Assistant, a corporate assistant. 
    Use the following internal documentation to answer.
    Context: ${context}
    Question: ${userQuery}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.log(err);
    return "Sir, the AI core is experiencing connectivity issues.";
  }
}

export default runRAG



  