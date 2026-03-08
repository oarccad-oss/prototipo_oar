import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2, X, HelpCircle, Info, Share2, Check } from 'lucide-react';

export const Card = ({ children, className, ...props }) => {
    return (
        <div className={cn("bg-white rounded-lg shadow-sm border border-slate-200 p-6", className)} {...props}>
            {children}
        </div>
    );
};

export const Button = ({ children, variant = "primary", size = "md", className, isLoading, ...props }) => {
    const variants = {
        primary: "bg-brand-primary text-white hover:bg-blue-800 focus:ring-blue-500",
        secondary: "bg-brand-secondary text-white hover:bg-green-800 focus:ring-green-500",
        outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
        ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
        danger: "bg-alert-fire text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export const Badge = ({ children, variant = "default", className }) => {
    const variants = {
        default: "bg-slate-100 text-slate-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
    };

    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
            {children}
        </span>
    );
};

export const Input = ({ className, icon: Icon, ...props }) => {
    return (
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                className={cn(
                    "block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm py-2 px-3 border",
                    Icon && "pl-10",
                    className
                )}
                {...props}
            />
        </div>
    );
};

export const DataSourceModal = ({ isOpen, onClose, title, sources }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-full">
                            <Info className="h-5 w-5 text-brand-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Fuentes de Datos</h3>
                            <p className="text-sm text-slate-500">{title}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    {sources.map((source, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm mb-1">{source.name}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed mb-2">{source.description}</p>
                                <div className="flex items-center gap-2">
                                    <Badge variant="default" className="text-[10px] uppercase tracking-wider">{source.provider}</Badge>
                                    <span className="text-[10px] text-slate-400">Actualización: {source.updateFrequency || 'Tiempo Real'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <Button onClick={onClose} variant="ghost" size="sm">Entendido</Button>
                </div>
            </div>
        </div>
    );
};

export const ShareButton = ({ className, variant = "white", size = "sm" }) => {
    const [copied, setCopied] = React.useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button onClick={handleShare} variant={variant} size={size} className={cn("text-slate-600 border-slate-200 hover:bg-slate-50", className)}>
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-2 text-green-500" /> Copiado
                </>
            ) : (
                <>
                    <Share2 className="h-4 w-4 mr-2" /> Compartir
                </>
            )}
        </Button>
    );
};
