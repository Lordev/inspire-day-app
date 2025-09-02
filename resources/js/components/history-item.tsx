import { currentPromptAtom } from '@/lib/atoms';
import { Prompt } from '@/types';
import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import CalendarDate from './calendar-date';
import ReflectionModal from './reflection-modal';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { Link } from '@inertiajs/react';

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }}>
            <Link href="#" onClick={(e) => handleEdit(e, item)} className="block">
            <Flex
                direction="column"
                className={`rounded-lg p-3 transition-all ${currentPrompt?.id === item.id ? 'border border-slate-200 bg-slate-50' : 'border border-zinc-200 bg-zinc-200'}`}
            >
                    <Flex align="start" justify="between" className="mb-1" gap="3">
                        <CalendarDate date={new Date(item.date)} />
                        <Flex direction="column" >
                            <Flex align="center" justify="end" className="mb-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="View journal"
                                    disabled={item.status !== 'answered'}
                                    className={item.status !== 'answered' ? 'opacity-50' : ''}
                                    onClick={item.status === 'answered' ? handleViewReflection : undefined}
                                    title="View journal"
                                >
                                    <Eye size={18} />
                                </Button>
                                {item.status === 'answered' ? (
                                    <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                                ) : (
                                    <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-amber-500" title="Pending"></span>
                                )}
                            </Flex>
                            <p className="line-clamp-2 text-sm text-slate-600">"{item.prompt}"</p>
                            {item.response && (
                                <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                    {strippedResponse.length > 60 ? `${strippedResponse.substring(0, 60)}...` : strippedResponse}
                                </p>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <ReflectionModal prompt={item} open={isModalOpen} onOpenChange={setIsModalOpen} />
        </motion.div>
    );
}
