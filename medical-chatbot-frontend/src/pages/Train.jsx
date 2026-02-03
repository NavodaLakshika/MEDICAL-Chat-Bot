import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BG_IMAGE = "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2071&auto=format&fit=crop";

const Train = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Medical');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleTrain = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please login first');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/train/upload-text', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(`Success: Data Synchronized`);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Training error:', error);
            setMessage('Error: Failed to train');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 lg:p-12 relative overflow-hidden flex items-center justify-center font-sans">
            {/* Fututistic Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BG_IMAGE})`, opacity: 0.1, filter: 'saturate(1.5) brightness(1.2)' }}
            ></div>

            <div className="w-full max-w-5xl glass-panel !bg-white/90 rounded-[32px] md:rounded-[40px] p-6 md:p-12 lg:p-16 border border-white/60 relative z-10 shadow-2xl">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 md:mb-16 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 medical-gradient rounded-lg shadow-lg"></div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">AI Laboratory</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
                            Knowledge <span className="text-teal-600 underline decoration-teal-100 underline-offset-8">Ingestion</span>
                        </h1>
                        <p className="text-slate-500 text-sm md:text-base font-medium mt-4">Integrate specialized clinical data into your AI core memory.</p>
                    </div>
                    <button
                        onClick={() => navigate('/chat')}
                        className="flex items-center space-x-3 bg-white border border-slate-200 hover:border-teal-400 hover:text-teal-600 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest shadow-sm group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Console</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Form Section */}
                    <form onSubmit={handleTrain} className="lg:col-span-3 space-y-6 md:space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Document Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Cardiology Protocol 2026"
                                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-teal-500/30 transition-all font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Clinical Classification</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-teal-500/30 transition-all appearance-none cursor-pointer font-bold"
                                >
                                    <option value="Medical">General Medicine</option>
                                    <option value="Pharmacy">Pharmacology</option>
                                    <option value="Research">Research Papers</option>
                                    <option value="Hospital Policy">Institutional Policy</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Clinical Data Stream</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste the comprehensive clinical text here..."
                                rows="6"
                                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-teal-500/30 transition-all resize-none font-medium leading-relaxed"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !title || !content}
                            className="w-full medical-gradient hover:scale-[1.01] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-teal-500/20 active:scale-95 disabled:opacity-20 flex items-center justify-center space-x-3 group uppercase tracking-widest text-sm"
                        >
                            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>{loading ? 'Processing...' : 'Execute Ingestion'}</span>
                        </button>
                    </form>

                    {/* Guide Section */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-slate-900 font-black mb-4 flex items-center text-lg">
                                <span className="text-teal-500 mr-3 text-2xl font-black">01</span>
                                Unified Memory
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                Data is processed into a persistent vector space, allowing the AI to reference your specific clinical records during active analysis.
                            </p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-slate-900 font-black mb-4 flex items-center text-lg">
                                <span className="text-blue-500 mr-3 text-2xl font-black">02</span>
                                Precision Filtering
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                High-quality clinical data ensures the AI maintains biometrically accurate reasoning and provides reliable consultation support.
                            </p>
                        </div>

                        {message && (
                            <div className={`mt-4 p-5 rounded-2xl border flex items-center space-x-3 animate-float ${message.startsWith('Success') ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                <div className={`w-2 h-2 rounded-full ${message.startsWith('Success') ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                                <span className="font-black text-[10px] uppercase tracking-widest">{message}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Train;
