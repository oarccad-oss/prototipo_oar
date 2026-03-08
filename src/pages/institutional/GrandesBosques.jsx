import React, { useState } from 'react';
import { Button } from '../../components/ui/Shared';
import { ArrowLeft, Trees, Map as MapIcon, Shield, Activity, Share2, X, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const GrandesBosques = () => {
    const navigate = useNavigate();
    const [selectedBridge, setSelectedBridge] = useState(null);
    
    // Slugs for navigation
    const getSlug = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Data including countries and transboundary "bridges"
    const regions = [
        { 
            type: "country",
            name: "Montañas Mayas", 
            country: "Belice", 
            desc: "Un complejo vital de selvas tropicales que alberga la Reserva Forestal Chiquibul y una biodiversidad excepcional.", 
            img: "/forests/belize.png",
            status: "Conservación Activa"
        },
        {
            type: "bridge",
            name: "Selva Maya",
            desc: "Bloque forestal transfronterizo que une a México, Guatemala y Belice, formando el macizo de selva tropical más grande de Mesoamérica. Un ecosistema único de selva tropical húmeda que sustenta especies icónicas como el jaguar.",
            countries: ["Belice", "Guatemala"],
            img: "/forests/bridge_selva_maya.png"
        },
        { 
            type: "country",
            name: "Reserva de la Biosfera Maya", 
            country: "Guatemala", 
            desc: "El corazón de la Selva Maya, protegiendo tanto la herencia natural como los antiguos sitios arqueológicos de la civilización maya.", 
            img: "/forests/guatemala.png",
            status: "Patrimonio Mundial"
        },
        { 
            type: "country",
            name: "Parque Nacional El Imposible", 
            country: "El Salvador", 
            desc: "Bosque secundario de montaña que constituye el refugio de biodiversidad más importante del país, vital para la recarga hídrica.", 
            img: "/forests/el_salvador.png",
            status: "Área Protegida Crítica"
        },
        { 
            type: "country",
            name: "Reserva de la Biosfera del Río Plátano", 
            country: "Honduras", 
            desc: "Área de bosque tropical virgen hogar de comunidades indígenas y especies raras, parte integral de la Moskitia.", 
            img: "/forests/honduras.png",
            status: "Reserva de la Biosfera"
        },
        {
            type: "bridge",
            name: "Trinacional Trifinio (Montecristo)",
            desc: "Ecosistema de bosque nuboso compartido por tres fronteras, un modelo de gestión regional para la conservación del bosque alto. Es vital para la producción de agua en la región del Trifinio.",
            countries: ["Guatemala", "El Salvador", "Honduras"],
            img: "/forests/bridge_trifinio.png"
        },
        {
            type: "bridge",
            name: "Manglares del Golfo de Fonseca",
            desc: "Ecosistema estuarino y de manglar de importancia crítica para la pesca y la resiliencia costera en el Pacífico. Un corredor biológico marino-costero compartido.",
            countries: ["El Salvador", "Honduras", "Nicaragua"],
            img: "/forests/bridge_fonseca.png"
        },
        { 
            type: "country",
            name: "Reserva de la Biosfera Bosawás", 
            country: "Nicaragua", 
            desc: "Pilar fundamental para el Corredor Biológico Mesoamericano, protegiendo vastas extensiones de selva tropical húmeda.", 
            img: "/forests/nicaragua.png",
            status: "Pulmón Centroamericano"
        },
        {
            type: "bridge",
            name: "La Moskitia",
            desc: "El segundo bosque tropical más grande de las Américas, un ecosistema binacional compartido que sostiene la conectividad biológica del norte y la identidad de pueblos indígenas.",
            countries: ["Honduras", "Nicaragua"],
            img: "/forests/honduras.png"
        },
        {
            type: "bridge",
            name: "Indio Maíz - Tortuguero",
            desc: "Un corredor de vida silvestre transfronterizo esencial para especies migratorias y la salud de los ecosistemas costero-terrestres. Une las selvas del sureste de Nicaragua con el caribe costarricense.",
            countries: ["Nicaragua", "Costa Rica"],
            img: "/forests/nicaragua.png"
        },
        { 
            type: "country",
            name: "Parque Nacional Corcovado", 
            country: "Costa Rica", 
            desc: "Bosque de montaña y tierras bajas que alberga una de las mayores densidades de biodiversidad del planeta.", 
            img: "/forests/costa_rica.png",
            status: "Biodiversidad Intensa"
        },
        {
            type: "bridge",
            name: "La Amistad (Talamanca)",
            desc: "Parque Internacional binacional que protege la cordillera de Talamanca, el sistema de bosque nuboso más extenso de la región y sitio de Patrimonio Mundial.",
            countries: ["Costa Rica", "Panamá"],
            img: "/forests/panama.png"
        },
        { 
            type: "country",
            name: "Parque Nacional Darién", 
            country: "Panamá", 
            desc: "El Tapón del Darién actúa como un puente biológico salvaje uniendo dos continentes en una selva impenetrable.", 
            img: "/forests/panama.png",
            status: "Tapón del Darién"
        },
        { 
            type: "country",
            name: "Valle Nuevo / Los Haitises", 
            country: "República Dominicana", 
            desc: "Bosque de montaña caribeño, fundamental para la captación de agua y la conservación de especies endémicas maderables.", 
            img: "/forests/dominican_republic.png",
            status: "Tesoro Antillano"
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Modal for Bridges */}
            {selectedBridge && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setSelectedBridge(null)}
                    ></div>
                    
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                        <button 
                            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                            onClick={() => setSelectedBridge(null)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                        
                        <div className="md:flex-1 h-64 md:h-auto overflow-hidden">
                            <img 
                                src={selectedBridge.img} 
                                alt={selectedBridge.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div className="md:flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                                    <Share2 className="h-3 w-3" /> Ecosistema Compartido
                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight">
                                    {selectedBridge.name}
                                </h3>
                            </div>
                            
                            <p className="text-lg text-slate-600 leading-relaxed font-light">
                                {selectedBridge.desc}
                            </p>
                            
                            <div className="space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Países Participantes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBridge.countries.map(c => (
                                        <div key={c} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold">
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button 
                                        className="bg-emerald-500 hover:bg-emerald-600 rounded-2xl py-6 font-bold flex items-center justify-center gap-2"
                                        onClick={() => navigate(`/grandes-bosques/historias/${getSlug(selectedBridge.name)}`)}
                                    >
                                        Ver Historia Completa
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl py-6 font-bold"
                                        onClick={() => setSelectedBridge(null)}
                                    >
                                        Cerrar Información
                                    </Button>
                                </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation removed as it's now handled by the main Layout */}

            {/* Page Header */}
            <div className="pt-8 px-8 pb-4">
                <div className="flex items-center gap-3 mb-2 text-emerald-600">
                    <Trees className="h-6 w-6" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-emerald-600/70">Iniciativa Regional CCAD</span>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight mt-2">
                            Grandes Bosques de Mesoamérica y República Dominicana
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                            Una iniciativa para proteger los pulmones verdes de los países de la Región SICA, monitoreando la conectividad y la salud forestal.
                        </p>
                    </div>
                    
                    <div className="shrink-0">
                        <select 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 outline-none cursor-pointer font-bold appearance-none border-none transition-all"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                    const el = document.getElementById(val);
                                    if (el) {
                                        const offset = 80; // Account for Navbar
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const elementRect = el.getBoundingClientRect().top;
                                        const elementPosition = elementRect - bodyRect;
                                        const offsetPosition = elementPosition - offset;

                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                }
                            }}
                        >
                            <option value="" className="bg-white text-slate-800">Seleccionar masa boscosa...</option>
                            {regions.map((item, idx) => (
                                <option key={idx} value={getSlug(item.name)} className="bg-white text-slate-800">
                                    {item.name} {item.type === 'bridge' ? '(Transfronterizo)' : `(${item.country})`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <section id="forests-list" className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="space-y-12">
                        {regions.map((item, i) => (
                            item.type === 'country' ? (
                                <div key={i} id={getSlug(item.name)} className={cn(
                                    "flex flex-col md:flex-row gap-12 items-center p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl scroll-mt-24",
                                    i % 4 > 1 ? "md:flex-row-reverse" : ""
                                )}>
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                                            <span className="text-emerald-600 font-black tracking-widest uppercase text-xs">
                                                {item.country}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                                            {item.name}
                                        </h2>
                                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                                {item.status}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button 
                                                variant="outline"
                                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl px-6 py-2 h-auto text-sm font-bold flex items-center gap-2"
                                                onClick={() => navigate(`/grandes-bosques/historias/${getSlug(item.name)}`)}
                                            >
                                                Ver Historia <ArrowLeft className="h-4 w-4 rotate-180" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 w-full max-w-md">
                                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg group">
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div key={i} id={getSlug(item.name)} className="relative py-8 px-4 flex flex-col items-center text-center scroll-mt-24">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -z-10 bg-dashed"></div>
                                    <button 
                                        onClick={() => setSelectedBridge(item)}
                                        className="bg-emerald-50 block p-6 rounded-2xl border border-emerald-100 max-w-xl shadow-sm relative group hover:bg-emerald-100 hover:shadow-md transition-all cursor-pointer text-center w-full"
                                    >
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            {item.countries.length > 2 ? 'Iniciativa Multinacional' : 'Vínculo Transfronterizo'}
                                        </div>
                                        <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center justify-center gap-2 group-hover:text-emerald-700 transition-colors">
                                            <Share2 className="h-5 w-5" /> {item.name}
                                        </h3>
                                        <p className="text-sm text-emerald-700/80 leading-relaxed font-medium mb-3 line-clamp-2">
                                            {item.desc}
                                        </p>
                                        <div className="flex items-center justify-center gap-3 flex-wrap">
                                            {item.countries.map((c, index) => (
                                                <React.Fragment key={index}>
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{c}</span>
                                                    {index < item.countries.length - 1 && <div className="h-px w-4 bg-emerald-200"></div>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Info className="h-3 w-3" /> Ver detalles
                                        </div>
                                    </button>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-emerald-950 text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c')] bg-fixed bg-cover"></div>
                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight">Sea parte de la protección de nuestros pulmones</h2>
                    <p className="text-emerald-200 text-xl font-light">
                        Acceda a los datos abiertos del Observatorio Ambiental para colaborar en la preservación de Mesoamérica y República Dominicana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50 px-10 rounded-full font-bold">
                            Explorar Visor de Mapas
                        </Button>
                        <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-300 hover:bg-emerald-900/50 px-10 rounded-full font-bold">
                            Contáctenos
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
