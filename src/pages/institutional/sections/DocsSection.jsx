import React from 'react';
import { FileText, Search, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button, Card, Badge, Input } from '../../../components/ui/Shared';

export const DocsSection = ({ documents, navigate }) => {
  return (
    <section id="docs" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
              <FileText className="h-3 w-3" /> Biblioteca Digital
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight">Centro de Documentación</h2>
            <p className="text-slate-600 text-lg mt-4 font-light">
              Accede a los informes institucionales, guías metodológicas y datasets oficiales del Observatorio Ambiental Regional.
            </p>
            
            <div className="mt-8 relative max-w-md">
              <Input 
                icon={Search}
                placeholder="Buscar documentos..."
                className="h-12 rounded-2xl shadow-sm border-none bg-slate-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/technical/docs?q=${e.target.value}`);
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">
                <Clock className="h-3 w-3" /> Enter
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full px-8 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
            onClick={() => navigate('/technical/docs')}
          >
            Ver Todo el Catálogo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc) => (
            <Card key={doc.id} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-slate-50 flex flex-col h-full">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={doc.thumbnail} 
                  alt={doc.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 py-1 text-[10px] font-black uppercase tracking-tighter shadow-lg">
                    {doc.type}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.ejes.map((eje, i) => (
                    <span key={i} className="text-[10px] font-black uppercase tracking-widest text-blue-600/60 bg-blue-50 px-2 py-0.5 rounded">
                      {eje}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {doc.name}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                  {doc.description}
                </p>
                
                <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Fuente</span>
                    <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{doc.source}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="rounded-full h-10 w-10 p-0 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-none"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
