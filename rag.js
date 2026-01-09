
import express from 'express';
import cors from 'cors';

import  {runRAG}  from './retrival.js'; 

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask-jarvis', async (req, res) => {
    try {
        const userQuery = req.body.textInput;
        
      
        console.log("Passing to RAG System:", userQuery);
        
        const ragResponse = await queryMyRagSystem(userQuery); 
        
        //  SEND BACK TO JARVIS
        res.json({ reply: ragResponse });

    } catch (error) {
        console.error("RAG Error:", error);
        res.status(500).json({ reply: "Sir, I encountered an error accessing the database." });
    }
});

//  RAG call
async function queryMyRagSystem(query) {
   const answer = await runRAG(query)
    return answer;
}

app.listen(process.env.PORT, () => console.log('Jarvis-RAG Bridge running on port 3000'));
