import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textarea';
import { SendHorizontal } from 'lucide-react';
import { FormEvent, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Prompt } from '@/types';

interface ReflectionFormProps {
    prompt: Prompt
}


export default function ReflectionForm({prompt} : ReflectionFormProps) {
    const { data, setData, post, processing } = useForm({
        response: prompt.response || '',
    });
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('saveResponse', { prompt: prompt.id }));
    };
    
    useEffect(() => {
        setData('response', prompt.response || '');
    }, [prompt.response, setData]);
    
    const placeholderText = "Take a moment to reflect on this prompt. How does it relate to your day or recent experiences?"; 


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="response" className="mb-2 block text-sm font-medium text-slate-700">
                    Your Reflection:
                </label>
                <TextArea
                    id="response"
                    name="response"
                    value={data.response}
                    onChange={(e) => setData('response', e.target.value)}
                    placeholder={prompt.response ? prompt.response : placeholderText}
                    required
                    className="min-h-[180px] resize-y text-base"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Reflection'}
                    {!processing && <SendHorizontal size={18} />}
                </Button>
            </div>
        </form>
    );
}
