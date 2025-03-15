import axios from "axios"




export async function getEmbedding(text: string) {
    
    try {
        if (!text.trim()){
            throw new Error("Text for embedding cannot be empty")
        }

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/textembedding-gecko:embedText",
            {
              content: text,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Use environment variable for API key
              },
            }
          );


        const embedding = response.data.embedding;

        if(!embedding || !Array.isArray(embedding)){
            throw new Error("Invalid embedding response")
        }

        return embedding
    } catch (error) {

        console.error("Error while getting the embedding from the geckooo" , error)
        throw new Error("Failed to generate the embedding")
        
    }
}