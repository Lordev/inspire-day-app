import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SubHeading } from '@/components/ui/subheading';
import { Blockquote } from '@/components/ui/blockquote';
import { Heading } from '@/components/ui/heading';
import { Prompt } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { Flex, Section } from '@radix-ui/themes';

interface ReflectionModalProps {
    prompt: Prompt;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ReflectionModal({ prompt, open, onOpenChange }: ReflectionModalProps) {
    const formattedDate = formatDate(new Date(prompt.date));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle className="sr-only">Reflection Modal</DialogTitle>
                <DialogDescription className="sr-only">This dialog displays the details of your reflection.</DialogDescription>
                <Flex direction="column" gap="4" className="p-6">
                    <Flex direction="column" gap="1" className="mb-4">
                        <span className="text-xs text-slate-400">{formattedDate}</span>
                        <Heading as="h2" size="lg">
                            Journal Entry
                        </Heading>
                    </Flex>

                    <Section className="mb-6">
                        <SubHeading className="mb-2">Prompt</SubHeading>
                        <Blockquote>
                            {prompt.prompt}
                        </Blockquote>
                    </Section>

                    <Section className="mb-8 bg-accent">
                        <SubHeading className="mb-2">Your Reflection</SubHeading>
                        <Blockquote>
                            {prompt.response}
                        </Blockquote>
                    </Section>

                    <Flex direction="column" className="border-t border-slate-100 mb-6 pt-6">
                        <Section>
                            <SubHeading className="mb-2">AI’s Interpretation</SubHeading>
                            <Flex className="rounded-md p-3 border border-indigo-100 italic text-center">
                                <span className="opacity-50">Coming soon...</span>
                            </Flex>
                        </Section>
                    </Flex>

                    <Flex direction="column" className="mt-4 text-center text-sm italic text-slate-400">
                        <span className="opacity-50">Inspirational quote will appear here</span>
                    </Flex>
                </Flex>
            </DialogContent>
        </Dialog>
    );
}