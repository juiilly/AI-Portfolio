import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Trash2, Loader2, Sparkles, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/history`, { timeout: 5000 });
      setMessages(response.data || []);
    } catch (err) {
      console.log('No history available');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: userMessage.content
      }, { timeout: 30000 });
      
      const aiMessage: Message = { 
        role: 'assistant', 
        content: response.data.response 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg = err.response?.data?.detail || 'Failed to connect to AI. Is backend running?';
      setError(errorMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${errorMsg}` }]);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    if (!confirm('Clear chat history?')) return;
    try {
      await axios.delete(`${API_URL}/api/clear`, { timeout: 5000 });
      setMessages([]);
    } catch {
      setError('Failed to clear history');
      setTimeout(() => setError(null), 3000);
    }
  };

  const suggestions = [
    "What projects have you built?",
    "What are your technical skills?",
    "Tell me about your education"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 border-b border-slate-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Bot className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Juily's AI Assistant</h3>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            <button onClick={clearChat} className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-950/50">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
                <Sparkles className="text-blue-400" size={16} />
                <span className="text-blue-300 text-sm">AI-Powered Assistant</span>
              </div>
              <p className="text-slate-400 mb-6">Ask me anything about my resume!</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => { setInput(s); setTimeout(sendMessage, 100); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full text-sm text-slate-300 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-2xl border border-slate-700">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-slate-400">AI is thinking...</span>
              </div>
            </div>
          )}

          {error && <div className="text-center text-red-400 text-sm">{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-700 bg-slate-900/50">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my experience..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 rounded-xl font-medium transition-all flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}