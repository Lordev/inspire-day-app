import { currentPromptAtom } from '@/lib/atoms';
import { Prompt } from '@/types';
import { Flex, Grid } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import CalendarDate from './calendar-date';
import ReflectionModal from './analysis-modal';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { fadeInUp } from '@/utils/animations';

interface HistoryItemProps {
    item: Prompt;
    index: number;
}


const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export default function HistoryItem({ item, index }: HistoryItemProps) {
    const [currentPrompt, setCurrentPrompt] = useAtom(currentPromptAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (e: React.MouseEvent<HTMLAnchorElement>, item: Prompt) => {
        e.preventDefault();
        setCurrentPrompt(item);
    };

    useEffect(() => {
        if (!currentPrompt && index === 0) {
            setCurrentPrompt(item);
        }
    }, [currentPrompt, index, item, setCurrentPrompt ]);

    const handleViewReflection = () => {
        setIsModalOpen(true);
    };

    const strippedResponse = stripHtmlTags(item.response || '');

    return (
        <motion.div {...fadeInUp(0.1 * index)}>
            <Link href="#" onClick={(e) => handleEdit(e, item)} className="block">
            <Flex
                direction="column"
                className={`rounded-lg p-3 transition-all ${currentPrompt?.id === item.id ? 'border border-border bg-secondary shadow-sm text-secondary-foreground' : 'border border-border bg-muted text-muted-foreground'}`}
            >
                    <Flex align="start" justify="between" className="mb-1" gap="3">
                        <CalendarDate date={new Date(item.date)} />
                            <Flex direction="column" gap="1">
                                <Flex align="center" justify="end" className="mb-1">
                                    {currentPrompt?.id === item.id ? (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Analyze reflection"
                                            disabled={item.status !== 'answered'}
                                            className={item.status !== 'answered' ? 'opacity-50' : ''}
                                            onClick={item.status === 'answered' ? handleViewReflection : undefined}
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

                                    {item.status === 'answered' ? (
                                        <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                                    ) : (
                                        <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-orange-500" title="Pending"></span>
                                    )}
                                </Flex>
                                <p className="line-clamp-2 text-sm">"{item.prompt.substring(0, 60)}{item.prompt.length > 60 ? '...' : ''}"</p>
                                {item.response && (
                                    <p className="mt-1 line-clamp-1 text-xs">
                                        {strippedResponse.length > 60 ? `${strippedResponse.substring(0, 60)}...` : strippedResponse}
                                    </p>
                                )}
                            </Flex>
                    </Flex>
                </Flex>
            </Link>
            <ReflectionModal prompt={item} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
    );
}
