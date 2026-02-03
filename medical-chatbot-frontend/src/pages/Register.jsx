import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(name, email, password);
            alert("Registration successful! Accessing portal...");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.detail || "Registration failed. This account may already exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

            <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse glass-panel rounded-[32px] overflow-hidden shadow-2xl relative z-10 border border-white/10">

                {/* Branding/Hero Side */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-between bg-gradient-to-bl from-blue-500/20 to-teal-600/20 border-l border-white/5">
                    <div className="flex items-center space-x-3 self-end">
                        <span className="text-2xl font-bold tracking-tight text-white font-heading text-right">MediBot<span className="text-teal-400">.AI</span></span>
                        <div className="w-12 h-12 medical-gradient rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>

                    <div className="py-12 text-right">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight font-heading mb-6">
                            Secure <br />
                            <span className="medical-text-gradient">Professional</span> <br />
                            Profile
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md ml-auto leading-relaxed">
                            Join our elite network of healthcare professionals. Gain access to advanced AI tools designed to enhance patient outcomes.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 glass-card rounded-2xl">
                            <h4 className="text-white font-bold text-lg mb-1">99.9%</h4>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Accuracy</p>
                        </div>
                        <div className="p-4 glass-card rounded-2xl">
                            <h4 className="text-white font-bold text-lg mb-1">HIPAA</h4>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Compliant</p>
                        </div>
                    </div>
                </div>

                {/* Register Form Side */}
                <div className="w-full md:w-1/2 p-12 lg:p-16 bg-[#0f172a]/40 backdrop-blur-md">
                    <div className="max-w-md mx-auto">
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-3 font-heading">New Account</h2>
                            <p className="text-slate-400">Initialize your professional medical credentials</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-600"
                                        placeholder="Dr. John Smith"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Medical Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-600"
                                        placeholder="jsmith@medical.org"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 ml-1">
                                    <label className="text-sm font-semibold text-slate-300">Choose Password</label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2m18-3l-3 3m0 0l-3-3m3 3V10" />
                                            <rect x="8" y="11" width="8" height="8" rx="2" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-slate-600"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full medical-gradient hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-teal-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2 overflow-hidden relative group"
                            >
                                <span className="relative z-10">{loading ? "CREATING..." : "REQUEST ACCESS"}</span>
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            </button>
                        </form>

                        <p className="mt-10 text-center text-slate-500 text-sm">
                            Already registered?{" "}
                            <Link to="/login" className="text-teal-400 font-bold hover:text-teal-300 transition-colors ml-1 underline underline-offset-4">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
