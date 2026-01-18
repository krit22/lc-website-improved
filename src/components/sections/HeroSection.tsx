import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Pencil, Check, X } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context';

interface HeroContent {
    line1: string;
    line2: string;
    tagline: string;
    lastEditedBy?: string;
}

const defaultContent: HeroContent = {
    line1: "We are",
    line2: "The Literary Circle",
    tagline: "Welcome to Our Page!",
};

export function HeroSection() {
    const { user } = useAuth();
    const [content, setContent] = useState<HeroContent>(defaultContent);
    const [editField, setEditField] = useState<keyof HeroContent | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const canEdit = user !== null && user.admin === true;

    // Parallax scrolling effect
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, 'SiteContent', 'hero');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data() as HeroContent;
                setContent({
                    line1: data.line1 || defaultContent.line1,
                    line2: data.line2 || defaultContent.line2,
                    tagline: data.tagline || defaultContent.tagline,
                    lastEditedBy: data.lastEditedBy,
                });
            } else {
                setContent(defaultContent);
            }
        } catch (error) {
            console.error('Error fetching hero content, using defaults:', error);
            setContent(defaultContent);
        }
    };

    const handleEdit = (field: keyof HeroContent) => {
        setEditField(field);
        setEditValue(content[field] as string);
    };

    const handleSave = async () => {
        if (!editField || editValue.trim() === content[editField]) {
            setEditField(null);
            return;
        }

        setIsSaving(true);
        try {
            const editorName = user?.name || user?.userId || 'unknown';
            const newContent = {
                ...content,
                [editField]: editValue.trim(),
                lastEditedBy: editorName,
            };

            const docRef = doc(db, 'SiteContent', 'hero');
            await setDoc(docRef, newContent);

            setContent(newContent);
            setEditField(null);
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditField(null);
        setEditValue('');
    };

    const renderEditableText = (field: keyof HeroContent, text: string, className: string) => {
        if (!canEdit) {
            return <span className={className}>{text}</span>;
        }

        if (editField === field) {
            return (
                <div className="inline-flex items-center gap-2">
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-3 py-2 bg-white/90 text-gray-900 rounded border-2 border-primary-500 focus:outline-none focus:border-primary-700"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') handleCancel();
                        }}
                    />
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        <Check size={20} />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        <X size={20} />
                    </button>
                </div>
            );
        }

        return (
            <span className={`${className} group relative`}>
                {text}
                <button
                    onClick={() => handleEdit(field)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/20 rounded hover:bg-white/30"
                >
                    <Pencil size={16} />
                </button>
            </span>
        );
    };

    return (
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('images/slider/a8.jpg')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-primary-900/50 to-black/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </motion.div>

            <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ opacity }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-cormorant text-white leading-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="block"
                        >
                            {renderEditableText('line1', content.line1, 'text-5xl md:text-7xl lg:text-8xl font-cormorant text-white')}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            className="block text-gold-400 italic mt-4 drop-shadow-2xl"
                        >
                            {renderEditableText('line2', content.line2, 'text-5xl md:text-7xl lg:text-8xl font-cormorant text-gold-400 italic')}
                        </motion.span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        className="text-xl md:text-2xl font-spectral text-gray-100 mt-8 drop-shadow-lg"
                    >
                        {renderEditableText('tagline', content.tagline, 'text-xl md:text-2xl font-spectral text-gray-200')}
                    </motion.div>

                    {canEdit && content.lastEditedBy && (
                        <p className="text-xs text-white/40 italic">
                            (Last edited by - {content.lastEditedBy})
                        </p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-7 h-11 border-2 border-white/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5"
                    >
                        <motion.div
                            animate={{ y: [0, 14, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-white rounded-full shadow-lg shadow-white/50"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </header>
    );
}
