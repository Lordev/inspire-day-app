import { Prompt } from '@/types';
import { motion } from 'framer-motion';
import { Eye, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { useAtom } from 'jotai';
import { currentPromptAtom } from '@/lib/atoms';
import { useState } from 'react';
import ReflectionModal from './reflection-modal';
import { Flex } from '@radix-ui/themes';

interface HistoryItemProps {
    item: Prompt;
    index: number;
}

export default function HistoryItem({ item, index }: HistoryItemProps) {
    const [, setCurrentPrompt] = useAtom(currentPromptAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (item: Prompt) => {
        setCurrentPrompt(item);
    };

    const handleViewReflection = () => {
        setIsModalOpen(true);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }}>
            <Flex direction="column" className={`rounded-lg p-3 transition-all ${item.status === 'answered' ? 'border border-green-100 bg-gradient-to-r from-blue-50 to-green-50' : 'border border-slate-200 bg-slate-50'}`}>
                <Flex align="center" justify="between" className="mb-1">
                    <p className="text-sm font-medium text-slate-700">{item.date}</p>
                    <Flex align="center" >
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
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Edit journal"
                            onClick={() => {handleEdit(item);}}
                        >
                            <Pencil size={14} />
                        </Button>
                        {item.status === 'answered' ? (
                            <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                        ) : (
                            <span className="mr-1 ml-2 inline-flex h-2 w-2 rounded-full bg-amber-500" title="Pending"></span>
                        )}
                    </Flex>
                </Flex>
                <p className="line-clamp-2 text-sm text-slate-600">"{item.prompt}"</p>
                {item.response && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                        {item.response.length > 60 ? `${item.response.substring(0, 60)}...` : item.response}
                    </p>
                )}
            </Flex>
            <ReflectionModal 
                prompt={item}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </motion.div>
    );
}
