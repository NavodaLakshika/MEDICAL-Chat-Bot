import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/chat");
    } catch (err) {
      alert(err.response?.data?.detail || "Invalid credentials. Please attempt again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row glass-panel rounded-[32px] overflow-hidden shadow-2xl relative z-10 border border-white/10">

        {/* Branding/Hero Side */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-between bg-gradient-to-br from-teal-500/20 to-blue-600/20 border-r border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 medical-gradient rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-heading">MediBot<span className="text-teal-400">.AI</span></span>
          </div>

          <div className="py-12">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight font-heading mb-6">
              Intelligent <br />
              <span className="medical-text-gradient">Healthcare</span> <br />
              Assistant
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Experience the next generation of medical AI. Secure, private, and exceptionally accurate consultations at your fingertips.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-slate-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#121418] bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">Trusted by 2,000+ medical professionals</p>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="w-full md:w-1/2 p-12 lg:p-16 bg-[#0f172a]/40 backdrop-blur-md">
          <div className="max-w-md mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-3 font-heading">Welcome Back</h2>
              <p className="text-slate-400">Sign in to access your secure medical records</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Work Email</label>
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
                    placeholder="name@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-sm font-semibold text-slate-300">Password</label>
                  <a href="#" className="text-xs text-teal-400 hover:text-teal-300 font-bold transition-colors">Forgot PWD?</a>
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

              <div className="flex items-center space-x-2 ml-1">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-teal-500/20" id="remember" />
                <label htmlFor="remember" className="text-xs text-slate-400 font-medium">Keep me signed in for 30 days</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full medical-gradient hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-teal-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2 overflow-hidden relative group"
              >
                <span className="relative z-10">{loading ? "VERIFYING..." : "ENTER PORTAL"}</span>
                {!loading && (
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm">
                Don't have professional access?{" "}
                <Link to="/register" className="text-teal-400 font-bold hover:text-teal-300 transition-colors ml-1 underline decoration-teal-500/30 underline-offset-4">
                  Request Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
