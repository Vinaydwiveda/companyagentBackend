import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
export async function embedding(embeddings,cleanTexts){

    // Creating index...
// Index langchain-showcase created.

try{
   const INDEX_NAME = "vinaycompanyt";

const pinecone = new Pinecone({
  apiKey: 'process.env.PINECONEKEY',
});

const existing_indexes = await pinecone.listIndexes();
if (!existing_indexes.indexes?.some((idx) => idx.name === INDEX_NAME)) {
  console.log("Creating index...");
  await pinecone.createIndex({
    name: INDEX_NAME,
    dimension: 768, 
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });

  console.log(`Index ${INDEX_NAME} created.`);
}

const pinecone_index = pinecone.Index(INDEX_NAME);

const vector_store =  await PineconeStore.fromTexts(
  cleanTexts,
  cleanTexts.map((_, i) => ({ id: `chunk-${i}` })),
  embeddings,
  {
    pineconeIndex: pinecone_index,
  }
);

}catch(err){
  console.log(err)
}
}

export default embedding;
