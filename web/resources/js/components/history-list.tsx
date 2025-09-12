import { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { currentPromptAtom } from '@/lib/atoms';
import HistoryItem from './history-item';
import type { Prompt } from '@/types';


export default function HistoryList({ items }: { items: Prompt[] }) {
    const currentPrompt = useAtomValue(currentPromptAtom);
    const setCurrentPrompt = useSetAtom(currentPromptAtom);

    const handleSelect = useCallback((item: Prompt) => {
        setCurrentPrompt(item);
    }, [setCurrentPrompt]);

    return (
        <>
            {items.map((item, i) => (
                <HistoryItem
                    key={item.id}
                    item={item}
                    index={i}
                    isActive={currentPrompt?.id === item.id}
                    onSelect={handleSelect}
                />
            ))}
        </>
    );
}