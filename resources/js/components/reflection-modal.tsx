import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Prompt } from '@/types';
import { format } from 'date-fns';

interface ReflectionModalProps {
    prompt: Prompt;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    // Future: aiSummary?: string; aiQuote?: string;
}

export default function ReflectionModal({ prompt, open, onOpenChange }: ReflectionModalProps) {
    const formattedDate = format(new Date(prompt.date), 'EEEE, MMMM d, yyyy');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg bg-white p-0 rounded-xl shadow-2xl border border-slate-100">
                <div className="p-6">
                    <div className="mb-4 flex flex-col gap-1">
                        <span className="text-xs text-slate-400">{formattedDate}</span>
                        <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
                            Journal Entry <span className="text-base">✨</span>
                        </h2>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 text-sm text-slate-500">Prompt</div>
                        <div className="rounded-md bg-slate-50 p-3 border border-slate-100 text-slate-700 italic">
                            {prompt.prompt}
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 text-sm text-slate-500">Your Reflection</div>
                        <div className="rounded-md bg-slate-50 p-3 border border-slate-100 text-indigo-900 font-serif text-lg tracking-wide whitespace-pre-wrap max-h-48 overflow-y-auto">
                            {prompt.response}
                        </div>
                    </div>
                    <div className="border-t border-slate-100 mb-6 pt-6">
                        <div className="mb-2 text-sm text-indigo-500">AI’s Interpretation</div>
                        <div className="rounded-md bg-indigo-50 p-3 border border-indigo-100 text-indigo-400 italic text-center">
                            <span className="opacity-50">Coming soon...</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm italic text-slate-400">
                        <span className="opacity-50">Inspirational quote will appear here</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}