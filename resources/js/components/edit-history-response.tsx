// EditHistoryResponse.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
    prompt: Prompt;
    history: Prompt[];
    onSave: (response: string) => void;
    processing: boolean;
}

export default function EditHistoryResponse({ prompt, onSave, processing }: Props) {
    const [response, setResponse] = useState(prompt.response || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(response);
    };

    return (
        <form onSubmit={handleSubmit}>
        <Input
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your reflection here..."
            required
            className="w-full"
        />
        <Button type="submit" disabled={processing}>Save Response</Button>
        </form>
    );
}