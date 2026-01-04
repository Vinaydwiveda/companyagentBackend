# Company AI Tool

A comprehensive AI-powered tool for document retrieval and voice assistance, integrating Retrieval-Augmented Generation (RAG) with a Assistant-style voice assistant.

## Description

This project is a Company AI Tool that leverages AI technologies to process documents, generate embeddings, and provide intelligent responses through a voice-enabled web interface. It uses Pinecone for vector storage, Google Generative AI for embeddings and text generation, and Express.js for the backend API.

## Features

- **Document Processing**: Load and process PDF documents, split text into chunks, and generate embeddings.
- **Vector Storage**: Store and retrieve embeddings using Pinecone.
- **RAG System**: Implement Retrieval-Augmented Generation for answering queries based on internal documentation.
- **Voice Assistant**: A web-based JARVIS-style assistant that supports voice input and output.
- **API Endpoints**: RESTful API for querying the RAG system.
- **Real-time Interaction**: Continuous voice loop for seamless user interaction.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd companyaitool
   ```

2. Install dependencies:

   ```
   npm install
   cd Agent/jarvis-website
   npm install
   cd ../..
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add your API keys:
     ```
     PINECONE_API_KEY=your_pinecone_api_key
     GOOGLE_API_KEY=your_google_api_key
     ```

4. Prepare documents:

   - Place your PDF documents (e.g., `Docs.pdf`) in the root directory.
   - Run the preparation script:
     ```
     node prepare.js
     ```

5. Store embeddings:
   - Run the embedding storage script:
     ```
     node storeembedding.js
     ```

## Usage

1. Start the RAG server:

   ```
   node rag.js
   ```

2. Start the web interface:

   ```
   cd Agent/jarvis-website
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3001` (or the port specified in the server).

4. Use the voice assistant by clicking the microphone button or typing queries.

## Project Structure

```
companyaitool/
├── package.json
├── retrival.js          # RAG system implementation
├── prepare.js           # Document processing and embedding generation
├── rag.js               # Express server for API endpoints . backend starting point
├── sharedUtils.js       # Utility functions for embeddings
├── storeembedding.js    # Pinecone vector storage
├── Agent/
│   └── jarvis-website/
│       ├── package.json
│       ├── public/
│       │   ├── index.html    # Web interface
│       │   ├── script.js     # Client-side JavaScript for voice interaction
│       │   └── style.css     # Styling
│       
└── README.md
```

## API

### POST /ask-jarvis

Query the RAG system with a text input.

**Request Body:**

```json
{
  "textInput": "Your query here"
}
```

**Response:**

```json
{
  "reply": "AI-generated response based on retrieved context"
}
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework for API
- **Pinecone**: Vector database for embeddings
- **Google Generative AI**: For embeddings and text generation
- **LangChain**: For document processing and text splitting
- **Web Speech API**: For voice recognition and synthesis

## Dependencies

- @google/generative-ai
- @langchain/community
- @langchain/core
- @langchain/google-genai
- @langchain/pinecone
- @langchain/textsplitters
- @pinecone-database/pinecone
- cors
- dotenv
- express
- pdf-parse

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the ISC License.
