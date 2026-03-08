import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';

export const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onLogin({ name: "Carlos Perez", role: "admin", department: "Ministerio Ambiente" });
            setLoading(false);
            navigate('/technical/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <span className="text-4xl mb-2 block">🌿</span>
                    <h2 className="mt-6 text-3xl font-serif font-bold text-slate-900">
                        Acceso a Funcionarios
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sistema Regional de Información Ambiental
                    </p>
                </div>

                <Card className="mt-8 space-y-6">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Correo Institucional
                                </label>
                                <Input icon={Mail} type="email" placeholder="usuario@ambiente.gob.xx" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Contraseña
                                </label>
                                <Input icon={Lock} type="password" placeholder="••••••••" required />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-primary hover:text-blue-800">
                                    ¿Olvidó su contraseña?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                            Ingresar
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">
                                    O ingrese con
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full text-xs">SICA ID</Button>
                            <Button variant="outline" className="w-full text-xs">Microsoft 365</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
