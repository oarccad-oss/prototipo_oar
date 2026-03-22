import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, Float, PerspectiveCamera, Html, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight, Tree, Fish, CloudRain, Drop, Wind, WarningCircle, Bell, List, ArrowLeft, SpeakerHigh } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

// --- SISTEMA DE AUDIO REUTILIZABLE ---
const playSound = (isMuted) => {
    if (isMuted) return;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
};

const Node = ({ position, color, title, isActive, onClick }) => {
    const mesh = useRef();
    
    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.2;
            
            const targetScale = isActive ? 1.9 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        }
    });

    return (
        <group position={position}>
            <Sphere 
                ref={mesh} 
                args={[4.5, 32, 32]} 
                onClick={onClick}
            >
                <meshPhysicalMaterial 
                    color={isActive ? "#0a221a" : "#ffffff"} 
                    metalness={0.1} 
                    roughness={0.1} 
                    transmission={isActive ? 0.5 : 0.8}
                    thickness={1.5} 
                    ior={1.33} 
                    emissive={color} 
                    emissiveIntensity={isActive ? 0.45 : 0.05}
                    transparent={true} 
                    opacity={isActive ? 0.8 : 0.4}
                />
            </Sphere>

            {isActive && (
                <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                    <Sphere args={[1.5, 16, 16]} position={[0, 0, 0]}>
                        <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
                    </Sphere>
                </Float>
            )}

            <Html center position={[0, isActive ? 8 : -7, 0]} zIndexRange={[100, 0]}>
                <div 
                    className={cn(
                        "pointer-events-none transition-all duration-500 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center",
                        isActive 
                            ? "text-[#ffffff] text-[24px] font-bold tracking-[6px]" 
                            : "text-[#ffffff]/60 text-[11px] font-semibold tracking-[1px] uppercase"
                    )}
                    style={{ textShadow: isActive ? '0 0 20px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.9)' : undefined }}
                >
                    {isActive ? title.toUpperCase() : title.toUpperCase()}
                </div>
            </Html>
        </group>
    );
};

const OrbitBeams = ({ color }) => {
    return (
        <group>
            <Torus args={[55, 0.05, 16, 128]}>
                <meshBasicMaterial color="#2ecc71" transparent opacity={0.15} />
            </Torus>
            <Torus args={[55, 0.2, 16, 100]}>
                <meshBasicMaterial color={color} transparent opacity={0.05} />
            </Torus>
        </group>
    );
};

const CarouselRig = ({ axes, activeIndex, targetRotation, setIsDashboardOpen, isMuted, onNodeClick }) => {
    const groupRef = useRef();
    const radius = 55;
    const angleStep = (Math.PI * 2) / axes.length;
    
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotación suave, continua y sin límites de cuadrante
            groupRef.current.rotation.z += (targetRotation - groupRef.current.rotation.z) * 0.15;
        }
    });

    return (
        <group position={[0, -10, 0]}>
            <group rotation={[Math.PI / 2.3, 0, 0]} ref={groupRef}>
                <OrbitBeams color={axes[activeIndex].color} />
                {axes.map((axis, i) => {
                    const angle = (Math.PI / 2) - (i * angleStep);
                    return (
                        <Node 
                            key={axis.id}
                            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
                            color={axis.color}
                            title={axis.text}
                            isActive={i === activeIndex}
                            onClick={(e) => {
                                e.stopPropagation();
                                onNodeClick(i);
                            }}
                        />
                    );
                })}
            </group>
        </group>
    );
};

export const Hero3D = ({ axes }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [targetRotation, setTargetRotation] = useState(0);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const navigate = useNavigate();

    const totalNodes = axes.length;
    const angleStep = (Math.PI * 2) / totalNodes;

    const handleNodeClick = (clickedIndex) => {
        if (clickedIndex === activeIndex) {
            setIsDashboardOpen(true);
        } else {
            // Calcular el camino más corto natural en términos de índices
            let diff = clickedIndex - activeIndex;
            
            // Si la distancia cruzando el círculo es menor, tomamos la ruta corta
            if (diff > totalNodes / 2) diff -= totalNodes;
            else if (diff < -totalNodes / 2) diff += totalNodes;
            
            setActiveIndex(clickedIndex);
            // La rotación suma para compensar el ángulo negativo del mapeo
            setTargetRotation((prev) => prev + (diff * angleStep));
            playSound(isMuted);
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#021226] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f2847] via-[#0a221a] to-[#021226] z-0" />
            
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera 
                    makeDefault 
                    position={[0, 35, 130]} 
                    fov={45} 
                    onUpdate={c => c.lookAt(0, -10, 0)}
                />
                <fog attach="fog" args={['#133e36', 100, 220]} />
                
                <React.Suspense fallback={null}>
                    <hemisphereLight args={['#87CEEB', '#0984e3', 0.7]} />
                    <directionalLight color="#fff5e6" intensity={0.8} position={[30, 100, 30]} />
                    <pointLight color={axes[activeIndex].color} intensity={2.5} distance={120} position={[0, -10, 80]} />
                    
                    <CarouselRig 
                        axes={axes} 
                        activeIndex={activeIndex} 
                        targetRotation={targetRotation}
                        setIsDashboardOpen={setIsDashboardOpen} 
                        isMuted={isMuted} 
                        onNodeClick={handleNodeClick}
                    />
                    
                    <Preload all />
                </React.Suspense>
            </Canvas>

            {/* UI Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="w-full h-full relative flex flex-col items-center">
                    
                    {/* Header institucional */}
                    <div className="mt-8 text-center animate-fade-in">
                        <h2 className="text-white text-lg font-bold tracking-[0.4em] uppercase opacity-90 drop-shadow-lg">
                            Observatorio Ambiental Regional
                        </h2>
                    </div>

                    {/* Descripcion Central */}
                    <div className={cn(
                        "mt-12 max-w-xl text-center transition-all duration-700 pointer-events-none",
                        isDashboardOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
                    )}>
                        <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 opacity-50" />
                            <p className="text-slate-200 text-sm leading-relaxed relative z-10">
                                {axes[activeIndex].description}
                            </p>
                        </div>
                        
                        <div className="mt-8 pointer-events-auto">
                            <button 
                                onClick={() => setIsDashboardOpen(true)}
                                className="px-10 py-3 bg-white/10 hover:bg-white text-white hover:text-[#021226] font-bold text-xs uppercase tracking-[0.3em] rounded-full border border-white/20 transition-all shadow-xl backdrop-blur-md"
                            >
                                Ingresar al Eje
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-10 left-10 pointer-events-auto">
                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-sm"
                        >
                            <SpeakerHigh size={18} weight={isMuted ? "slash" : "fill"} />
                        </button>
                    </div>
                </div>
            </div>

            {/* dashboard View (Modal) */}
            <DashboardOverlay 
                isOpen={isDashboardOpen} 
                onClose={() => setIsDashboardOpen(false)} 
                axis={axes[activeIndex]} 
            />
        </div>
    );
};

const DashboardOverlay = ({ isOpen, onClose, axis }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 animate-fade-in overflow-hidden">
            <div className="absolute inset-0 bg-[#021226]/90 backdrop-blur-2xl" onClick={onClose} />
            
            <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
                {/* Header Navbar */}
                <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10">
                    <button onClick={onClose} className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors uppercase text-xs font-bold tracking-widest">
                        <ArrowLeft size={16} /> Regresar al Inicio
                    </button>
                    <div className="text-white font-bold tracking-[0.4em] text-xs uppercase">
                        Observatorio <span className="text-emerald-400">Ambiental</span>
                    </div>
                    <div className="flex gap-4">
                        <Bell size={20} className="text-white/40 hover:text-white cursor-pointer" />
                        <List size={20} className="text-white/40 hover:text-white cursor-pointer" />
                    </div>
                </div>

                <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            {axis.text}
                        </h1>
                        <p className="text-white/60 text-lg max-w-3xl leading-relaxed">
                            {axis.description}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* KPIs */}
                        <div className="md:col-span-4 space-y-6">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Tree className="text-emerald-400" /> Métrica Principal
                                </div>
                                <div className="text-4xl font-light text-emerald-400 mb-2">42.8%</div>
                                <div className="text-xs text-white/30">↓ 0.2% anual en la región</div>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <CloudRain className="text-blue-400" /> Estado Actual
                                </div>
                                <div className="text-4xl font-light text-blue-400 mb-2">Normal</div>
                                <div className="text-xs text-white/30">Sin anomalías críticas detectadas</div>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Drop className="text-indigo-400" /> Observaciones
                                </div>
                                <div className="text-4xl font-light text-indigo-400 mb-2">12.5k</div>
                                <div className="text-xs text-white/30">Unidades de monitoreo activas</div>
                            </div>
                        </div>

                        {/* Map / Visualization Placeholder */}
                        <div className="md:col-span-8 bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#021226] via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 text-left">
                                <div className="flex items-center gap-2 text-white/80 font-bold uppercase text-[10px] tracking-widest mb-1">
                                    <Fish className="h-4 w-4" /> Transmisión Satelital (En vivo)
                                </div>
                                <div className="text-white/40 text-xs">Sincronización de datos geoespaciales completada.</div>
                            </div>
                            {/* Hotspots animated */}
                            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
                            <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75" />
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button 
                            className="flex items-center gap-2 px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-full shadow-2xl transition-all hover:-translate-y-1"
                            onClick={() => window.location.href = axis.ruta}
                        >
                            Ver Análisis Detallado <ArrowLeft className="rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
