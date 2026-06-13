import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

type Message = { id: string; role: 'user' | 'assistant'; text: string };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Hei! Jeg er Anleggsgartner 1 sin AI-assistent. Hvordan kan jeg hjelpe deg med uteområdet ditt i dag?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg.text,
          context: messages.map(m => `${m.role}: ${m.text}`).join('\n')
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: data.reply }]);
      } else {
        throw new Error('No reply from server');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: 'Beklager, systemet mitt er for øyeblikket nede. Ta gjerne kontakt med oss på telefon eller e-post.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon" 
          onClick={() => setIsOpen(true)}
          className={`h-14 w-14 rounded-full shadow-2xl bg-moss hover:bg-moss-hover text-white transition-transform ${isOpen ? 'scale-0' : 'scale-100 hover:scale-105'}`}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-charcoal rounded-sm shadow-2xl border border-white/10 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-charcoal-light border-b border-white/10 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-moss animate-pulse" />
                <span className="font-bold uppercase tracking-widest text-[10px]">AnleggsgartnerAI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-charcoal space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === 'user' 
                      ? 'bg-moss text-white rounded-br-sm' 
                      : 'bg-charcoal-light text-white border border-white/10 rounded-bl-sm shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-charcoal-light border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 bg-charcoal-light border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv din melding..."
                className="flex-1 text-sm bg-charcoal border border-white/10 text-white placeholder-gray-500 rounded-sm px-4 py-2 focus:outline-none focus:ring-1 focus:ring-moss"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-sm h-10 w-10 bg-moss hover:bg-moss-hover text-white shrink-0">
                <Send className="h-4 w-4 shrink-0" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
