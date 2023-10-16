import { stream } from '@/data/ai';
import { Form } from './form';
import { Suspense } from 'react';

async function Tokens({ stream }: { stream: ReadableStream }) {
    const reader = stream.getReader();

    return (
        <Suspense>
            <RecursiveTokens reader={reader} />
        </Suspense>
    );
}

async function RecursiveTokens({
    reader,
}: {
    reader: ReadableStreamDefaultReader;
}) {
    const { done, value } = await reader.read();

    if (done) {
        return null;
    }

    const text = new TextDecoder().decode(value);

    return (
        <>
            {text}
            <Suspense fallback={null}>
                <RecursiveTokens reader={reader} />
            </Suspense>
        </>
    );
}

export default async function Home() {
    const res = await stream();
    return (
        <main className="flex flex-col items-stretch justify-end h-[100dvh] p-4 gap-2">
            <Tokens stream={res} />
            <Form />
        </main>
    );
}
