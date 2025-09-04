import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { Flex } from '@radix-ui/themes';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import DragHandle from '@tiptap/extension-drag-handle-react';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BulletList, OrderedList } from '@tiptap/extension-list';
import Placeholder from '@tiptap/extension-placeholder';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import ReflectionToolbar from './reflection-toolbar';
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { currentPromptAtom } from '@/lib/atoms';
import { useEffect } from 'react';

export default function ReflectionEditor() {
    const [currentPrompt] = useAtom(currentPromptAtom);
    const { data, setData, post, processing } = useForm({
        response: currentPrompt?.response || '',
    });
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontSize,
            Image,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'language-js bg-zinc-800 text-white border border-slate-200 rounded pl-4',
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc pl-5',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal pl-5',
                },
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-4 border-slate-200 pl-4 italic text-slate-700 bg-slate-50',
                },
            }),
            Placeholder.configure({ placeholder: 'Write your reflection here...' }),
            DragHandle,
        ],
        content: currentPrompt?.response || '',
        onUpdate: ({ editor }) => {
            setData('response', editor.getHTML());
        },
        editorProps: { attributes: { class: 'prose max-w-full focus:outline-none h-full p-4' } },
    });

        useEffect(() => {
        editor?.commands.setContent(currentPrompt?.response || '');
    }, [currentPrompt, editor]);


    const addImage = useCallback(() => {
        const url = window.prompt('URL');
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        try {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        } catch (e) {
            alert(e.message);
        }
    }, [editor]);

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isLink: ctx.editor.isActive('link'),
        }),
    });

    const handleSave = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (currentPrompt?.id) {
            post(`/prompt/${currentPrompt.id}/response`, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Response saved successfully!');
                },
                onError: (errors) => {
                    console.error('Error saving response:', errors);
                }
            }); 
        }
    };

    if (!editor) return null;

    return (
        <form className="h-full space-y-4" onSubmit={handleSave}>
            <Flex direction="column" gap="2" className="">
                <Label htmlFor="response">Your Reflection:</Label>
                <div className="rounded-md border bg-white">
                    <ReflectionToolbar
                        editor={editor}
                        editorState={editorState}
                        addImage={addImage}
                        setLink={setLink}
                    />
                    <div className="flex justify-end p-3 border-b">
                        <Button 
                            type="submit"
                            disabled={processing}
                            size="sm"
                        >
                            {processing ? 'Saving...' : 'Save Reflection'}
                        </Button>
                    </div>
                    <div className="p-3s">
                        <div className="rounded-md bg-white p-3  overflow-hidden">
                            <DragHandle editor={editor}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                </svg>
                            </DragHandle>
                            <EditorContent editor={editor} className="prose 
                            h-[400px] max-w-full focus:outline-none overflow-y-scroll" />
                        </div>
                    </div>

                    {editor && (
                        <BubbleMenu editor={editor} className="z-50">
                            <div className="flex gap-1 rounded bg-white px-2 py-1 shadow">
                                <button className="p-1" aria-label="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                                    B
                                </button>
                                <button className="p-1" aria-label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                                    I
                                </button>
                                <button className={editorState.isLink ? 'is-active' : ''} aria-label="Link" onClick={setLink}>
                                    🔗
                                </button>
                            </div>
                        </BubbleMenu>
                    )}

                    {editor && (
                        <FloatingMenu editor={editor} className="z-40">
                            <div className="flex gap-1 rounded bg-white px-2 py-1 shadow">
                                <button className="p-1" aria-label="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                                    B
                                </button>
                                <button className="p-1" aria-label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                                    I
                                </button>
                                <button className="p-1" aria-label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                                    •
                                </button>
                            </div>
                        </FloatingMenu>
                    )}
                </div>
            </Flex>
        </form>
    );
}
