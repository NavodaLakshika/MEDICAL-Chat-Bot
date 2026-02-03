import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Import generated assets (Using the paths provided by the tool)
const BG_IMAGE = "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=2071&auto=format&fit=crop";
const AVATAR_IMAGE = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

const AuthPage = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginUser(loginEmail, loginPassword);
            navigate("/chat");
        } catch (err) {
            alert(err.response?.data?.detail || "Invalid medical credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(regName, regEmail, regPassword);
            alert("Registration successful! Medical profile initialized.");
            setIsActive(false);
        } catch (err) {
            alert(err.response?.data?.detail || "Registration failed. Check your data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Fututistic Light Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${BG_IMAGE})`, filter: 'brightness(1.1) saturate(1.2)' }}
            ></div>

            {/* Soft Overlays for Depth */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-200/30 rounded-full blur-[150px] animate-pulse-soft"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-200/30 rounded-full blur-[150px] animate-pulse-soft"></div>

            <div className={`auth-container ${isActive ? 'active' : ''} glass-panel relative z-10`} id="main">

                {/* Sign Up Form */}
                <div className="auth-form-container sign-up-container">
                    <div className="form-content">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={AVATAR_IMAGE} alt="AI Avatar" className="w-20 h-20 mb-4 animate-float drop-shadow-xl" />
                            <h1 className="text-4xl font-extrabold text-teal-900 font-heading tracking-tight">Create Profile</h1>
                            <p className="text-teal-600 text-xs font-black uppercase tracking-[0.2em] mt-2">Initialize AI Workspace</p>
                        </div>

                        <form onSubmit={handleRegister} className="w-full space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-6 py-4 bg-white/80 border border-teal-100 rounded-2xl text-teal-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Medical Email"
                                className="w-full px-6 py-4 bg-white/80 border border-teal-100 rounded-2xl text-teal-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Set Password"
                                className="w-full px-6 py-4 bg-white/80 border border-teal-100 rounded-2xl text-teal-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                required
                            />
                            <button
                                disabled={loading}
                                className="w-full mt-6 medical-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-teal-500/20 active:scale-95 transition-all text-lg tracking-wide group overflow-hidden relative"
                            >
                                <span className="relative z-10">{loading ? 'PROCESSING...' : 'GET STARTED'}</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sign In Form */}
                <div className="auth-form-container sign-in-container">
                    <div className="form-content">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={AVATAR_IMAGE} alt="AI Avatar" className="w-20 h-20 mb-4 animate-float drop-shadow-xl" />
                            <h1 className="text-4xl font-extrabold text-blue-900 font-heading tracking-tight">Expert Login</h1>
                            <p className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mt-2">Welcome Back, Clinician</p>
                        </div>

                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-6 py-4 bg-white/80 border border-blue-100 rounded-2xl text-blue-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Access Password"
                                className="w-full px-6 py-4 bg-white/80 border border-blue-100 rounded-2xl text-blue-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <button
                                disabled={loading}
                                className="w-full mt-8 medical-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-lg tracking-wide group overflow-hidden relative"
                            >
                                <span className="relative z-10">{loading ? 'AUTHENTICATING...' : 'ACCESS CONSOLE'}</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                            </button>
                        </form>

                        <div className="mt-10 flex space-x-4">
                            {['G', 'f', 'in'].map(p => (
                                <button key={p} className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all font-black">{p}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="text-5xl font-black text-white mb-6 font-heading leading-tight underline decoration-white/30 underline-offset-8">Hello, Friend!</h1>
                            <p className="text-white text-lg font-medium leading-relaxed mb-10 max-w-[280px]">
                                Enter your personal details and start your journey with us
                            </p>
                            <button
                                className="bg-white text-blue-600 font-black py-4 px-14 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl tracking-widest text-sm"
                                onClick={() => setIsActive(false)}
                            >
                                SIGN IN
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="text-5xl font-black text-white mb-6 font-heading leading-tight underline decoration-white/30 underline-offset-8">Welcome Back!</h1>
                            <p className="text-white text-lg font-medium leading-relaxed mb-10 max-w-[280px]">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className="bg-white text-teal-600 font-black py-4 px-14 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl tracking-widest text-sm"
                                onClick={() => setIsActive(true)}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
