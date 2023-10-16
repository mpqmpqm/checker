import { pinecone } from '@/data/pc';
import Link from 'next/link';

export const revalidate = 0;

const Embedding = async ({ params: { id } }: { params: { id: string } }) => {
    const { records } = await pinecone.fetch([id]);
    const page = records[id];

    const { matches = [] } = await pinecone.query({
        id,
        topK: 10,
        includeMetadata: true,
    });

    return (
        <div className="p-4 space-y-4">
            <Link href="/" className="text-blue-500 underline">
                Home
            </Link>
            <p className="font-semibold text-lg">{page?.metadata?.text}</p>
            <ul className="space-y-2">
                {matches
                    .filter(({ id: qid }) => qid !== id)
                    .map(({ id, metadata }) => (
                        <li key={id}>
                            <Link href={`/embedding/${id}`}>
                                {metadata?.text}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Embedding;
