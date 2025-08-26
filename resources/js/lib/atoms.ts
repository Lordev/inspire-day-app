import { atom } from 'jotai';
import type { Prompt } from '@/types';

export const currentPromptAtom = atom<Prompt | null>(null);