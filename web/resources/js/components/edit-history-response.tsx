// EditHistoryResponse.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Prompt } from "@/types";

interface EditHistoryResponseProps {
    prompt: Prompt;
    history: Prompt[];
    onSave: (response: string) => void;
    processing: boolean;
}

export default function EditHistoryResponse({ prompt, onSave, processing }: EditHistoryResponseProps) {
    const [response, setResponse] = useState(prompt.response || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(response);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter your response..."
                className="w-full"
            />
            <Button type="submit" disabled={processing}>
                {processing ? "Saving..." : "Save Response"}
            </Button>
        </form>
    );
}