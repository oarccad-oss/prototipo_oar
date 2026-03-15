import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Search, HelpCircle, Database, ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';
import { Card, Button, ViewGuideModal } from '../ui/Shared';
import { AI_RESPONSES } from '../../api/mockData';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hola, soy el asistente IA del OAR. ¿En qué puedo ayudarte hoy? (Prueba preguntar sobre "incendios" o "cobertura")' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Cerrar menú al navegar
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isChatOpen) scrollToBottom();
    }, [messages, isTyping, isChatOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

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

    const handleSearchClick = () => {
        window.dispatchEvent(new Event('oar-open-search'));
        setIsMenuOpen(false);
    };

    const menuItems = [
        { 
            id: 'search', 
            label: 'Búsqueda Global', 
            icon: Search, 
            color: 'bg-slate-900', 
            action: handleSearchClick 
        },
        { 
            id: 'questions', 
            label: 'Preguntas Estratégicas', 
            icon: HelpCircle, 
            color: 'bg-emerald-600', 
            action: () => navigate('/strategic-questions') 
        },
        { 
            id: 'analysis', 
            label: 'Cruce de Variables', 
            icon: Database, 
            color: 'bg-brand-primary', 
            action: () => navigate('/analisis-multidimensional') 
        },
        { 
            id: 'guide', 
            label: 'Guía de esta Vista', 
            icon: Lightbulb, 
            color: 'bg-amber-500', 
            action: () => {
                setIsGuideOpen(true);
                setIsMenuOpen(false);
            } 
        },
        { 
            id: 'chat', 
            label: 'Asistente IA', 
            icon: Bot, 
            color: 'bg-blue-600', 
            action: () => {
                setIsChatOpen(true);
                setIsMenuOpen(false);
            } 
        }
    ];

    return (
        <>
            {/* Multi-Function FAB Menu */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[950] flex flex-col items-end gap-3">
                {/* Menu Options (Slide up) */}
                <div className={cn(
                    "flex flex-col items-end gap-3 transition-all duration-300 transform",
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}>
                    {menuItems.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-3 group">
                            <span className="bg-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold text-slate-700 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.label}
                            </span>
                            <button
                                onClick={item.action}
                                className={cn(
                                    "p-3 text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center",
                                    item.color
                                )}
                                title={item.label}
                            >
                                <item.icon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main Trigger Button (Chatbot Style) */}
                <button
                    onClick={() => {
                        if (isChatOpen) setIsChatOpen(false);
                        else setIsMenuOpen(!isMenuOpen);
                    }}
                    className={cn(
                        "p-4 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2",
                        isChatOpen || isMenuOpen ? "bg-slate-800" : "bg-brand-primary"
                    )}
                >
                    {isChatOpen || isMenuOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                    {!isChatOpen && !isMenuOpen && <span className="font-bold hidden md:inline ml-1">Centro de Ayuda</span>}
                </button>
            </div>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-4 w-[90vw] max-w-sm h-[70vh] md:h-[500px] z-[900] flex flex-col font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-8">
                    <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden rounded-[2rem]">
                        {/* Header */}
                        <div className="bg-brand-primary p-5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-xl">
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
                            <button onClick={() => setIsChatOpen(false)} className="bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                                <X className="h-4 w-4" />
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
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 bg-slate-100 border-0 rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2.5 bg-brand-primary text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {/* View Guide Modal */}
            <ViewGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </>
    );
};
