'use client';

import { embed } from '@/data/ai';
import { upsert } from '@/data/pinecone';
import { useRef } from 'react';
import { redirect } from 'next/navigation';

export const Form = () => {
    const ref = useRef<HTMLFormElement>(null);
    const action = (formData: FormData) => {
        const query = formData.get('query') as string;
        return embed(query)
            .then((embedding) => upsert(query, embedding))
            .then((id) => redirect(`/embedding/${id}`, 'push'));
    };
    return (
        <form
            action={action}
            className="flex gap-2 grow ps-4 pe-3 py-4 items-end"
            ref={ref}
        >
            <textarea
                name="query"
                className="p-1 border rounded-sm border-slate-300 w-full"
            />
            <button
                type="submit"
                className="px-2 py-1 text-white rounded-sm bg-blue-600"
            >
                Embed
            </button>
        </form>
    );
};
