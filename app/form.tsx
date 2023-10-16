import { embed } from '@/data/ai';
import { upsert } from '@/data/pinecone';
import { redirect } from 'next/navigation';

const action = async (formData: FormData) => {
    'use server';
    const query = formData.get('query') as string;
    return embed(query)
        .then((embedding) => upsert(query, embedding))
        .then((id) => redirect(`/embedding/${id}`));
};

export const Form = () => {
    return (
        <form action={action} className="flex gap-2  items-end">
            <textarea
                name="query"
                className="p-1 border rounded-sm border-slate-800 w-full bg-slate-900 text-white"
            />
            <button
                type="submit"
                className="px-2 py-1 text-white rounded-sm bg-slate-900 border border-slate-800"
            >
                Embed
            </button>
        </form>
    );
};
