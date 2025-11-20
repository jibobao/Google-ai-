import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, SparklesIcon } from './Icons';
import { generateContent } from '../services/geminiService';
import { ChatMessage, ModelType } from '../types';

const LivePlayground: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await generateContent(userMessage.text, ModelType.FLASH);
      const botMessage: ChatMessage = { role: 'model', text: result };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "出错了：无法连接到 AI 模型。请稍后再试。", 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-indigo-600" />
            模拟实验室 (Live Demo)
          </h3>
          <p className="text-xs text-slate-500 mt-1">模型: gemini-2.5-flash</p>
        </div>
        <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-indigo-600 border border-indigo-100 shadow-sm">
          Playground 预览
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4 opacity-60">
            <SparklesIcon className="w-12 h-12" />
            <p>这里是模拟的 AI Studio 运行环境。<br/>在下方输入框尝试输入："给我讲个笑话" 或 "写一首关于春天的诗"。</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : msg.isError 
                  ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'}
            `}>
              <div className="font-bold text-[10px] uppercase tracking-wider mb-1 opacity-70">
                {msg.role === 'user' ? 'User' : 'Model'}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="在此输入提示词 (Prompt)..."
            className="w-full pl-4 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none text-sm"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2.5 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          提示：按 Shift + Enter 换行，按 Enter 发送
        </p>
      </div>
    </div>
  );
};

export default LivePlayground;