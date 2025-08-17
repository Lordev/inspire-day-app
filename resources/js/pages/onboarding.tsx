import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Onboarding() {
    const { data, setData, post, processing, errors } = useForm({
        niche: '',
        tone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('storePreferences')); // Submits the form to the backend
    };

    return (
        <>
            <Head title="Onboarding" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="niche">Niche</label>
                    <input
                        type="text"
                        id="niche"
                        name="niche"
                        value={data.niche}
                        onChange={handleChange}
                        required
                    />
                    {errors.niche && <span className="error">{errors.niche}</span>}
                </div>
                <div>
                    <label htmlFor="tone">Tone</label>
                    <input
                        type="text"
                        id="tone"
                        name="tone"
                        value={data.tone}
                        onChange={handleChange}
                        required
                    />
                    {errors.tone && <span className="error">{errors.tone}</span>}
                </div>
                <button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Preferences'}
                </button>
            </form>
        </>
    );
}