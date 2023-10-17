import { stream } from '@/data/ai';
import { Form } from './form';
import { Suspense } from 'react';
import Messages from './messages';

export const revalidate = 0;
export const runtime = 'edge';

async function Tokens() {
    const res = await stream();
    const reader = res.getReader();

    return (
        <Suspense>
            <RecursiveTokens reader={reader} acc="" />
        </Suspense>
    );
}

async function RecursiveTokens({
    reader,
    acc,
}: {
    reader: ReadableStreamDefaultReader;
    acc?: string;
}) {
    const { done, value } = await reader.read();

    if (done) {
        return acc ? <Messages seed={acc} /> : null;
    }

    const text = new TextDecoder().decode(value);

    return (
        <>
            {text}
            <Suspense fallback={null}>
                <RecursiveTokens reader={reader} acc={acc?.concat(text)} />
            </Suspense>
        </>
    );
}

export default async function Home() {
    return (
        <main className="flex flex-col items-stretch justify-end min-h-[100dvh] p-4 space-y-2 bg-black text-white">
            <Suspense>
                <Tokens />
            </Suspense>
        </main>
    );
}
