import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Shared';

import { LogOut, User, Menu, Search, X } from 'lucide-react';
import { GlobalSearch } from '../ui/GlobalSearch';

export const Navbar = ({ user, onLogout, toggleSidebar, isSidebarVisible }) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {user && isSidebarVisible && (
                            <button onClick={toggleSidebar} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
                                <Menu className="h-6 w-6" />
                            </button>
                        )}
                        <Link to="/" className="flex items-center gap-2">
                            <img 
                                src="https://centroclima.org/wp-content/uploads/2016/06/CCAD-300x76.png" 
                                alt="CCAD Logo" 
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center Search Bar (Trigger) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-6">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-100/50 border border-slate-300 rounded-full text-sm text-slate-500 hover:bg-white hover:shadow-sm transition-all group"
                        >
                            <Search className="h-4 w-4 group-hover:text-brand-primary" />
                            <span>Buscar mapas, reportes, indicadores...</span>
                            <span className="ml-auto text-xs bg-white border border-slate-200 px-1.5 rounded text-slate-400">Ctrl+K</span>
                        </button>
                    </div>

                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="md:hidden p-2 text-slate-600"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <>
                                <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
                                    <Link to="/" className="hover:text-brand-primary transition-colors">Inicio</Link>
                                    <Link to="/grandes-bosques" className="hover:text-brand-primary transition-colors">Grandes Bosques</Link>
                                </div>
                                <Button onClick={() => navigate('/auth/login')} size="sm">
                                    Acceso Funcionarios
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2 text-right">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-brand-primary">Admin</span>
                                        <span className="text-xs text-slate-500">Ministerio Ambiente</span>
                                    </div>
                                    <div className="h-8 w-8 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-500">
                                    <LogOut className="h-4 w-4 md:mr-2" />
                                    <span className="hidden md:inline">Salir</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Global Search Modal */}
            <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};
