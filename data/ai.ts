import OpenAI from 'openai';
import { OpenAIStream } from 'ai';

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export const embed = async (input: string) => {
    'use server';
    const {
        data: [{ embedding }],
    } = await client.embeddings.create({
        input,
        model: 'text-embedding-ada-002',
    });
    return embedding;
};

export async function stream() {
    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content:
                    'At the start of each conversation, pick two figures from Greek mythology and give a concise summary of their relationship. Then ask the user how their day is going.',
            },
        ],
    });
    return OpenAIStream(response);
}
