import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import { useNavigate } from "react-router-dom";

// Standard medical iconography / assets
const AVATAR_IMAGE = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello, Clinician. I am MediBot AI, your secure diagnostic assistant. I've initialized the latest clinical data protocols. How can I assist you with patient analysis or research today?",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
      attachments: [...attachments],
      type: attachments.length > 0 ? "mixed" : "text"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachments([]);
    setIsTyping(true);

    try {
      // For now, we only send the text to the backend. 
      // Multi-modal support (images/docs) would require backend update to handle multipart.
      console.log("Attempting to send message:", input);
      const response = await sendMessage(input);
      console.log("Received response:", response);

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.response || response.reply || "Diagnostic analysis complete. No further anomalies detected in the provided context.",
        timestamp: new Date(),
        type: "text"
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);

      let errorMessage = "System Alert: Connection to the medical database was interrupted.";

      if (err.response) {
        // Server responded with error
        if (err.response.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response.status === 500) {
          errorMessage = `Server Error: ${err.response.data?.detail || 'Internal server error'}`;
        } else {
          errorMessage = `Error ${err.response.status}: ${err.response.data?.detail || 'Unknown error'}`;
        }
      } else if (err.request) {
        // Request made but no response
        errorMessage = "Cannot reach the server. Please check if the backend is running on port 8000.";
      } else {
        // Something else happened
        errorMessage = `Error: ${err.message}`;
      }

      setMessages((prev) => [...prev, {
        id: Date.now() + 2,
        sender: "bot",
        text: errorMessage,
        isError: true,
        timestamp: new Date(),
        type: "text"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Simple alert or toast could go here
    alert("Clinical data copied to clipboard!");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      type: file.type,
      size: (file.size / 1024).toFixed(1) + " KB",
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Real speech recognition would happen here
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] text-slate-900 font-sans overflow-hidden">

      {/* Sidebar - Telegram/WhatsApp Style */}
      <aside className={`
        fixed lg:relative flex flex-col w-80 h-full bg-white border-r border-[#e9edef] z-40 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User Profile Header */}
        <div className="h-16 bg-[#f0f2f5] px-4 flex items-center justify-between border-b border-[#e9edef]">
          <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden border border-white shadow-sm">
            <img src="https://i.pravatar.cc/100?u=doc" alt="Profile" />
          </div>
          <div className="flex space-x-4">
            <button className="text-slate-500 hover:text-teal-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></button>
            <button className="text-slate-500 hover:text-teal-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3">
          <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 border border-transparent focus-within:border-teal-500 transition-all">
            <svg className="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search clinical history..." className="bg-transparent outline-none text-sm w-full" />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="hover:bg-[#f5f6f6] cursor-pointer p-4 flex items-center space-x-3 border-b border-[#f5f6f6] bg-[#ebebeb]">
            <div className="w-12 h-12 rounded-full medical-gradient flex items-center justify-center shadow-md">
              <img src={AVATAR_IMAGE} alt="AI" className="w-7 h-7 invert brightness-0" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-slate-900">MediBot AI Core</h3>
                <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter">Online</span>
              </div>
              <p className="text-xs text-slate-500 truncate">System initialized. Awaiting input...</p>
            </div>
          </div>

          <div className="hover:bg-[#f5f6f6] cursor-pointer p-4 flex items-center space-x-3 border-b border-[#f5f6f6]">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-400">RC</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-slate-700">Recent Consultations</h3>
                <span className="text-[10px] text-slate-400">14:22</span>
              </div>
              <p className="text-xs text-slate-400 truncate">Previous patient analysis record...</p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 bg-white border-t border-[#e9edef]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg>
            <span>LOGOUT PORTAL</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#e5ddd5] relative">
        {/* WhatsApp-style Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcd2ad4.png')` }}></div>

        {/* Chat Header */}
        <header className="h-16 bg-[#f0f2f5] px-4 md:px-6 flex items-center justify-between z-10 border-b border-[#e9edef]">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
            <div className="w-10 h-10 rounded-full medical-gradient flex items-center justify-center">
              <img src={AVATAR_IMAGE} alt="AI" className="w-6 h-6 invert brightness-0" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-slate-900 leading-tight">MediBot AI Core</h2>
              <p className="text-[10px] text-teal-600 font-bold uppercase flex items-center">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1.5 animate-pulse"></span>
                Active Consultation Mode
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="hidden md:flex flex-col items-end justify-center mr-4">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Elapsed</p>
              <p className="text-xs font-black text-slate-700 tabular-nums">{formatTime(sessionTime)}</p>
            </div>
            <button className="p-2 text-slate-500 hover:text-teal-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
            <button className="p-2 text-slate-500 hover:text-teal-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
          </div>
        </header>

        {/* Messages Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 py-6 scroll-smooth z-10">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`
                    group relative px-4 py-2.5 rounded-xl shadow-sm max-w-[85%] md:max-w-[70%] text-[15px]
                    ${msg.sender === "user" ? "bg-[#dcf8c6] text-slate-800 rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none"}
                    ${msg.isError ? "bg-red-50 text-red-900 border border-red-200" : ""}
                `}>
                  {/* Action Buttons (Copy) */}
                  <button
                    onClick={() => copyToClipboard(msg.text)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity z-20 border border-slate-100"
                    title="Copy Clinical Trace"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>

                  {/* Attachments Preview */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-2 space-y-2">
                      {msg.attachments.map((file, fIdx) => (
                        <div key={fIdx} className="rounded-lg overflow-hidden border border-slate-100 bg-black/5 p-1">
                          {file.preview ? (
                            <img src={file.preview} alt="Upload" className="w-full max-h-60 object-cover rounded-md" />
                          ) : (
                            <div className="flex items-center p-2 space-x-2 text-xs">
                              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              <span className="font-bold truncate">{file.name}</span>
                              <span className="opacity-50">({file.size})</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  <div className="flex justify-end items-center mt-1 space-x-1">
                    <span className="text-[10px] text-slate-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.sender === "user" && <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-xl rounded-tl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Bar - WhatsApp style */}
        <footer className="bg-[#f0f2f5] p-3 flex flex-col z-10 border-t border-[#e9edef]">

          {/* Attachment Bar (Preview area) */}
          {attachments.length > 0 && (
            <div className="flex space-x-3 px-4 py-3 bg-white/50 mb-2 rounded-xl overflow-x-auto">
              {attachments.map((file, idx) => (
                <div key={idx} className="relative flex-shrink-0 w-16 h-16 rounded-lg border-2 border-teal-500 overflow-hidden bg-slate-200">
                  {file.preview ? <img src={file.preview} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-[10px] font-bold p-1 text-center">{file.name}</div>}
                  <button
                    onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-3 px-2">
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-2 text-slate-500 hover:text-teal-600 transition-colors"
              title="Attach Document/Image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            </button>
            <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors" title="Emoji Console">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>

            <form onSubmit={handleSend} className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type clinical inquiry..."
                className="w-full bg-white px-5 py-2.5 rounded-xl border border-transparent focus:border-teal-400 outline-none text-slate-800 transition-all shadow-sm"
              />
            </form>

            {input.trim() || attachments.length > 0 ? (
              <button
                onClick={handleSend}
                className="bg-teal-500 text-white p-2.5 rounded-full shadow-md hover:bg-teal-600 transition-all active:scale-95"
              >
                <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
              </button>
            ) : (
              <button
                onClick={toggleRecording}
                className={`p-2.5 rounded-full shadow-md transition-all active:scale-95 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-slate-500 hover:text-teal-600'}`}
                title="Voice Command"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
            )}
          </div>

          <div className="flex justify-center mt-2 opacity-30 select-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Protocol v2.5.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
