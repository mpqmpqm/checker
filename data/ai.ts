'use server';

import OpenAI from 'openai';
import { revalidatePath } from 'next/cache';
import { upsert } from './pinecone';

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export const embed = async (input: string) => {
    const {
        data: [{ embedding }],
    } = await client.embeddings.create({
        input,
        model: 'text-embedding-ada-002',
    });
    return embedding;
};
