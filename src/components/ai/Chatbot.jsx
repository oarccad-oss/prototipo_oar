import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Card, Button } from '../ui/Shared';
import { AI_RESPONSES } from '../../api/mockData';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown'; // Assuming we want basic styling, but for now standard text

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hola, soy el asistente IA del OAR. ¿En qué puedo ayudarte hoy? (Prueba preguntar sobre "incendios" o "cobertura")' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Latency
        setTimeout(() => {
            const lower = userMsg.text.toLowerCase();
            let responseText = AI_RESPONSES.default;
            let actionLink = null;

            if (lower.includes('incendio') || lower.includes('fuego') || lower.includes('calor')) {
                responseText = AI_RESPONSES.incendios;
                actionLink = { text: 'Ver Análisis de Incendios', path: '/preguntas/incendios-activos' };
            } else if (lower.includes('cobertura') || lower.includes('bosque')) {
                responseText = AI_RESPONSES.cobertura;
                actionLink = { text: 'Ver Estado de Bosques', path: '/preguntas/estado-bosques' };
            } else if (lower.includes('reporte') || lower.includes('documento')) {
                responseText = AI_RESPONSES.reporte;
                actionLink = { text: 'Ir a Documentación', path: '/technical/docs' };
            } else if (lower.includes('restaur') || lower.includes('meta')) {
                responseText = AI_RESPONSES.restauracion;
                actionLink = { text: 'Ver Meta 30x30', path: '/preguntas/meta-30x30' };
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: responseText,
                action: actionLink
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 p-4 bg-brand-primary text-white rounded-full shadow-2xl hover:bg-blue-800 transition-all z-[900] hover:scale-110 flex items-center gap-2"
                >
                    <MessageSquare className="h-6 w-6" />
                    <span className="font-bold hidden md:inline">Asistente IA</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 w-[90vw] max-w-sm h-[70vh] md:h-[500px] z-[900] flex flex-col font-sans transition-all duration-300">
                    <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden">
                        {/* Header */}
                        <div className="bg-brand-primary p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Asistente OAR</h3>
                                    <p className="text-[10px] text-blue-200 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Bot className="h-4 w-4 text-brand-primary" />
                                        </div>
                                    )}

                                    <div className={cn(
                                        "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-brand-primary text-white rounded-br-none"
                                            : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
                                    )}>
                                        {/* Use dangerouslySetInnerHTML or just text for bolding simulated markdown */}
                                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}></p>

                                        {msg.action && (
                                            <button
                                                onClick={() => navigate(msg.action.path)}
                                                className="mt-2 text-xs bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full font-bold hover:bg-brand-primary/20 transition-colors w-full text-left"
                                            >
                                                → {msg.action.text}
                                            </button>
                                        )}
                                    </div>

                                    {msg.sender === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-slate-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Bot className="h-4 w-4 text-brand-primary" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 bg-slate-100 border-0 rounded-full px-4 text-sm focus:ring-2 focus:ring-brand-primary/50 outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2 bg-brand-primary text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-slate-400 mt-2">
                                IA simulada. Puede cometer errores.
                            </p>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};
