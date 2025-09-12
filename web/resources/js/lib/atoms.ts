import { atom } from 'jotai';
import type { Prompt } from '@/types';

export const currentPromptAtom = atom<Prompt | null>(null);

// Auth state management
export const currentUserIdAtom = atom<number | null>(null);

// Action to reset all user-specific atoms when user changes
export const resetUserStateAtom = atom(null, (get, set) => {
    set(currentPromptAtom, null);
});