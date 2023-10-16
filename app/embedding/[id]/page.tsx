import { pinecone } from '@/data/pc';
import Link from 'next/link';

export const revalidate = 0;

const Embedding = async ({ params: { id } }: { params: { id: string } }) => {
    const { matches = [] } = await pinecone.query({
        id,
        topK: 10,
        includeMetadata: true,
    });

    return (
        <div className="p-4">
            <Link href="/" className="text-blue-500 underline">
                Home
            </Link>
            <ul className="space-y-2">
                {matches.map(({ id, metadata }) => (
                    <li key={id}>
                        <Link href={`/embedding/${id}`}>{metadata?.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Embedding;
