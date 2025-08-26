import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Prompt } from '@/types';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

interface ReflectionResponseProps {
    prompt: Prompt
}

export default function ReflectionResponse({ prompt }: ReflectionResponseProps) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Heading asChild size="md" className="mb-3 text-lg text-slate-800">
                <h4>Your Reflection:</h4>
            </Heading>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="whitespace-pre-wrap">{prompt.response}</p>
            </div>
            <div className="mt-4 flex justify-end">
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button variant="outline" size="sm">
                            <Pencil size={14} />
                            Edit Reflection
                        </Button>
                    </Dialog.Trigger>
                </Dialog.Root>
            </div>
        </motion.div>
    );
}
