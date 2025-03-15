

import pinecone from "@/utils/pinecone"


export async function createIndex() : Promise<void> {
    try {
        
        await pinecone.createIndexForModel({
            name : "candidate-resumes",
            cloud : "aws",
            region : "us-east-1",
            embed : {
                model : "multilingual-e5-large",
                fieldMap : {
                    text : "chuck_text"
                }
            },
            waitUntilReady : true,
        })

        console.log("✅ Pinecone index created successfully!")
    } catch (error : any) {

        console.error(" ❌ Error creating Pinecone index : " , error)
        
    }
    
}   