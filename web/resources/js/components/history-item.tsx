import React, { useState, useCallback } from 'react';
import { Prompt } from '@/types';
import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CalendarDate from './calendar-date';
import ReflectionModal from './analysis-modal';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
import { fadeInUp } from '@/utils/animations';
import { useAtomValue } from 'jotai';
import { currentPromptAtom } from '@/lib/atoms';

interface HistoryItemProps {
    item: Prompt;
    index: number;

    isActive?: boolean;
    onSelect?: (item: Prompt) => void;
}

const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export default function HistoryItem({ item, index, isActive = false, onSelect }: HistoryItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentPrompt = useAtomValue(currentPromptAtom);
    
    const displayItem = isActive && currentPrompt?.id === item.id ? currentPrompt : item;

    const handleEdit = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        onSelect?.(item);
    }, [item, onSelect]);

    const handleViewReflection = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const strippedResponse = stripHtmlTags(displayItem.response || '');

    return (
        <motion.div {...fadeInUp(0.1 * index)}>
            <Link href="#" onClick={handleEdit} className="block">
                <Flex
                    direction="column"
                    className={`rounded-lg p-3 transition-all ${isActive ? 'border border-border bg-secondary shadow-sm text-secondary-foreground' : 'border border-border bg-muted text-muted-foreground'}`}
                >
                    <Flex align="start" justify="between" className="mb-1" gap="3">
                        <CalendarDate date={new Date(item.date)} />
                        <Flex direction="column" gap="1">
                            <Flex align="center" justify="end" className="mb-1">
                                {isActive ? (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Analyze reflection"
                                        disabled={displayItem.status !== 'answered'}
                                        className={displayItem.status !== 'answered' ? 'opacity-50' : ''}
                                        onClick={displayItem.status === 'answered' ? handleViewReflection : undefined}
                                        title="Analyze reflection"
                                    >
                                        <Sparkles size={18}/>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        title="View reflection"
                                        className="invisible"
                                        disabled
                                    >
                                        <Sparkles size={18}/>
                                    </Button>
                                )}

                                {displayItem.status === 'answered' ? (
                                    <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                                ) : (
                                    <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-orange-500" title="Pending"></span>
                                )}
                            </Flex>
                            <p className="line-clamp-2 text-sm">"{displayItem.prompt.substring(0, 60)}{displayItem.prompt.length > 60 ? '...' : ''}"</p>
                            {displayItem.response && (
                                <p className="mt-1 line-clamp-1 text-xs">
                                    {strippedResponse.length > 60 ? `${strippedResponse.substring(0, 60)}...` : strippedResponse}
                                </p>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <ReflectionModal prompt={displayItem} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
    );
}

