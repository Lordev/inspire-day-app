import { Image as IconImage } from 'lucide-react';

interface ReflectionToolbarProps {
    editor: any;
    editorState: any;
    addImage: () => void;
    setLink: () => void;
}

export default function ReflectionToolbar({ editor, editorState, addImage, setLink }: ReflectionToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 border-b px-2 py-2 bg-card">
            <div className="flex gap-1">
                <button
                    type="button"
                    aria-label="Bold"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('bold') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    aria-label="Italic"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('italic') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    aria-label="Strike"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('strike') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                    S
                </button>
                <button
                    type="button"
                    aria-label="Code"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('codeBlock') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                    {'</>'}
                </button>
            </div>
            <div className="ml-2 flex gap-1">
                <button
                    type="button"
                    aria-label="Heading 1"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('textStyle', { fontSize: '32px' }) ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor.chain().focus().setFontSize('32px').run()}
                >
                    H1
                </button>
                <button
                    type="button"
                    aria-label="Heading 2"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('textStyle', { level: 2 }) ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor.chain().focus().setFontSize('24px').run()}
                >
                    H2
                </button>
            </div>
            <div className="ml-2 flex gap-1">
                <button
                    type="button"
                    aria-label="Bullet list"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('bulletList') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                    • List
                </button>
                <button
                    type="button"
                    aria-label="Ordered list"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('orderedList') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                    1.
                </button>
                <button
                    type="button"
                    aria-label="Blockquote"
                    className={`rounded p-2 hover:bg-muted ${editor?.isActive('blockquote') ? 'is-active bg-muted' : ''}`}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    ❝ ❞
                </button>
                <button type="button" aria-label="Image" className="rounded p-2 hover:bg-muted" onClick={addImage}>
                    <IconImage className="h-4 w-4" />
                </button>
            </div>
            <div className="ml-auto flex gap-1">
                <button
                    type="button"
                    aria-label="Add link"
                    className={`rounded p-2 hover:bg-muted ${editorState?.isLink ? 'is-active bg-muted' : ''}`}
                    onClick={setLink}
                >
                    🔗
                </button>
                <button
                    type="button"
                    aria-label="Undo"
                    className="rounded p-2 hover:bg-muted"
                    onClick={() => editor?.chain().focus().undo().run()}
                >
                    ↶
                </button>
                <button
                    type="button"
                    aria-label="Redo"
                    className="rounded p-2 hover:bg-muted"
                    onClick={() => editor?.chain().focus().redo().run()}
                >
                    ↷
                </button>
            </div>
        </div>
    );
}
