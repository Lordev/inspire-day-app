import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Flex, Section, Heading, Blockquote } from '@radix-ui/themes'
import { SubHeading } from '@/components/ui/subheading'
import type { Prompt } from '@/types'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { set } from 'date-fns'

type AnalysisModalProps = {
    prompt: Prompt | null
    isModalOpen: boolean
    onClose: () => void
}

export default function AnalysisModal({ prompt, isModalOpen, onClose }: AnalysisModalProps) {
    const [analysis, setAnalysis] = useState<string | null>(null)
    const { data, setData, post, processing } = useForm({
        response: prompt ? prompt.response : '',
    });

    const analyzeResponse = () => {
        if (!prompt?.id) return;
        
        setData('response', prompt.response || '');

        post(route('analyzeResponse', { prompt: prompt.id }), {
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
        <Dialog open={isModalOpen} onOpenChange={() => onClose()} className="p-8">
            <DialogContent className="max-w-2xl">
                <DialogTitle>
                <Heading>{prompt?.prompt}</Heading>
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
                                    <p className="text-slate-600 mb-4">Get personalized insights about your reflection</p>
                                    <Button 
                                        onClick={analyzeResponse}
                                        disabled={processing}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                        {processing ? 'Analyzing...' : 'Generate AI Analysis'}
                                    </Button>
                                </div>
                            )}

                            {processing && (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    <span className="ml-3 text-slate-600">Analyzing your reflection...</span>
                                </div>
                            )}

                            {analysis && (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                                    <div className="flex items-center mb-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        <span className="text-sm font-medium text-blue-700">AI Insights</span>
                                    </div>
                                    <Blockquote className="text-slate-700 leading-relaxed">
                                        {prompt?.analysis || analysis}
                                    </Blockquote>
                                </div>
                            )}

                            {!prompt?.response && (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">Complete your reflection to get AI analysis</p>
                                </div>
                            )}
                        </Section>
                    </Flex>
                </div>
            </DialogContent>
        </Dialog>
    )
}