import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Flex, Section, Blockquote } from '@radix-ui/themes'
import { SubHeading } from '@/components/ui/subheading'
import type { Prompt } from '@/types'
import { useForm } from '@inertiajs/react'
import { useState, useEffect } from 'react'

type AnalysisModalProps = {
    prompt: Prompt | null
    isModalOpen: boolean
    onClose: () => void
}

export default function AnalysisModal({ prompt, isModalOpen, onClose }: AnalysisModalProps) {
    const [analysis, setAnalysis] = useState<string | null>(null)
    const { setData, post, processing } = useForm({
        response: prompt ? prompt.response : '',
    });

    useEffect(() => {
        if (prompt?.analysis === null) {
            setAnalysis(null); 
        }
    }, [prompt]);

    const analyzeResponse = () => {
        if (!prompt?.id) return;
        
        setData('response', prompt.response || '');

        post(route('analyzeResponse', { prompt: prompt.id.toString() }), {
            onSuccess: () => {
                setAnalysis(prompt.analysis || 'No analysis available');
            },
            onError: (e) => {
                // Handle error
                console.error(e)
            },
        });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl bg-popover text-popover-foreground p-8">
                <DialogTitle>
                {/* <Heading>{prompt?.prompt}</Heading> */}
                </DialogTitle>
                
                <DialogDescription className="sr-only">
                    View your completed reflection and AI analysis
                </DialogDescription>

                <div className="space-y-6">
                    <Flex direction="column" className="text-center">
                        <Section>
                            <SubHeading className="mb-4">AI Analysis & Insights</SubHeading>
                            
                            {!analysis && !processing && prompt?.response && (
                                <div className="mb-4">
                                    <p className="text-muted-foreground mb-4">Get personalized insights about your reflection</p>
                                    <Button
                                        onClick={analyzeResponse}
                                        disabled={processing}
                                        variant="default"
                                    >
                                        {processing ? 'Analyzing...' : 'Generate AI Analysis'}
                                    </Button>
                                </div>
                            )}

                            {processing && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-2"></div>
                                    <span className="ml-3 text-muted-foreground">Analyzing your reflection...</span>
                                </div>
                            )}

                            {analysis && (
                                <div className="bg-muted/50 border border-border rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                        <span className="text-sm font-medium text-primary">AI Insights</span>
                                    </div>
                                    <Blockquote className="text-foreground leading-relaxed">
                                        {prompt?.analysis || analysis}
                                    </Blockquote>
                                </div>
                            )}

                            {!prompt?.response && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">Complete your reflection to get AI analysis</p>
                                </div>
                            )}
                        </Section>
                    </Flex>
                </div>
            </DialogContent>
        </Dialog>
    )
}