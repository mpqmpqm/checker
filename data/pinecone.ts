'use server';

import { v4 as uuidv4 } from 'uuid';
import { pinecone } from './pc';

export const upsert = async (text: string, embedding: number[]) => {
    const id = uuidv4();
    return pinecone
        .upsert([
            {
                id,
                values: embedding,
                metadata: { text },
            },
        ])
        .then(() => id);
};

export const query = (vector: number[]) =>
    pinecone.query({
        vector,
        topK: 3,
        includeMetadata: true,
    });

export const fetch = (id: string) => pinecone.fetch([id]);
