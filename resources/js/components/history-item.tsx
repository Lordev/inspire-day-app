import { Prompt } from '@/types';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { useAtom } from 'jotai';
import { currentPromptAtom } from '@/lib/atoms';

interface HistoryItemProps {
    item: Prompt;
    processing: boolean;
    index: number;
}

export default function HistoryItem({ item, index }: HistoryItemProps) {
    const [, setCurrentPrompt] = useAtom(currentPromptAtom);

    const handleEdit = (item: Prompt) => {
        setCurrentPrompt(item);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }}>
            <div
                className={`rounded-lg p-3 transition-all ${item.status === 'answered' ? 'border border-green-100 bg-gradient-to-r from-blue-50 to-green-50' : 'border border-slate-200 bg-slate-50'}`}
            >
                <div className="mb-1 flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-700">{item.date}</p>
                    <div className="flex items-center">
                        {item.status === 'answered' ? (
                            <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                        ) : (
                            <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-amber-500" title="Pending"></span>
                        )}
                        <Button
                            variant="ghost"
                            aria-label="Edit journal"
                            onClick={() => {handleEdit(item);}}
                        >
                            <Pencil size={14} />
                        </Button>
                    </div>
                </div>
                <p className="line-clamp-2 text-sm text-slate-600">"{item.prompt}"</p>
                {item.response && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                        {item.response.length > 60 ? `${item.response.substring(0, 60)}...` : item.response}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
