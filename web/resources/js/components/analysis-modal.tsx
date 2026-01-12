import { Dialog, DialogTitle, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Flex, Section, Blockquote } from '@radix-ui/themes'
import { SubHeading } from '@/components/ui/subheading'
import { currentPromptAtom } from '@/lib/atoms'
import type { Prompt } from '@/types'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import axios from 'axios'

type AnalysisModalProps = {
    prompt: Prompt | null
    isModalOpen: boolean
    onClose: () => void
}

type AnalysisResponse = {
    success: boolean
    analysis?: string
    error?: string
}

export default function AnalysisModal({ prompt, isModalOpen, onClose }: AnalysisModalProps) {
    const [analysis, setAnalysis] = useState<string | null>(null)
    const [currentPrompt, setCurrentPrompt] = useAtom(currentPromptAtom)
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        setAnalysis(prompt?.analysis || null);
    }, [prompt?.analysis]);

    const analyzeResponse = async () => {
        if (!prompt?.id) return;
        
        setProcessing(true);
        
        try {
            const response = await axios.post(`/api/prompt/${prompt.id}/analyze`, {
                response: prompt.response || ''
            });
            
            const data = response.data as AnalysisResponse;
            
            if (!data.success || !data.analysis) {
                throw new Error(data.error || 'No analysis could be generated');
            }
            
            setAnalysis(data.analysis);
            
            if (currentPrompt && currentPrompt.id === prompt.id) {
                setCurrentPrompt({
                    ...currentPrompt,
                    analysis: data.analysis
                });
            }

        } catch (error) {
            console.error('Analysis error:', error);

            const errorMessage = 'Failed to analyze reflection. Please try again.';

            setAnalysis(errorMessage);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl bg-popover text-popover-foreground p-8">
                <DialogTitle className="mb-2">Reflection Analysis</DialogTitle>
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
                                        {currentPrompt?.analysis || analysis}
                                    </Blockquote>
                                </div>
                            )}

                            {!currentPrompt?.response && !prompt?.response && (
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