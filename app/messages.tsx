'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Messages({ seed }: { seed: string }) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        initialMessages: [
            {
                id: 'seed',
                role: 'assistant',
                content: seed,
            },
        ],
    });

    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages]);

    return (
        <div>
            <div className="mt-2 space-y-2">
                {messages.slice(1).map((m) => (
                    <div
                        key={m.id}
                        className={
                            m.role === 'user'
                                ? 'bg-stone-900 px-4 py-2 -mx-4'
                                : ''
                        }
                    >
                        {m.content}
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 items-end mt-2 sticky bottom-0 -mb-4 bg-black py-4"
                ref={form}
            >
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    name="query"
                    className="p-1 border rounded-sm border-zinc-800 w-full bg-zinc-900 text-white"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.metaKey) {
                            e.preventDefault();
                            // trigger submit
                            form.current?.dispatchEvent(
                                new Event('submit', {
                                    bubbles: true,
                                    cancelable: true,
                                })
                            );
                        }
                    }}
                />
                <button
                    type="submit"
                    className="px-2 py-1 text-white rounded-sm bg-zinc-900 border border-zinc-800"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
