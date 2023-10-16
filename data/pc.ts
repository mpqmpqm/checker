import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY,
    environment: process.env.PINECONE_ENV,
});

export const pinecone = pc.Index('checker');
