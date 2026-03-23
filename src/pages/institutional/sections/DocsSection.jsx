import React from 'react';
import { FileText, Search, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Badge, Input } from '../../../components/ui/Shared';

export const DocsSection = ({ documents, navigate }) => {
  return (
    <section id="docs" className="py-24 bg-white overflow-hidden relative">
      {/* Background Decorative Blob */}
      <div 
        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"
        style={{ animation: 'blob-drift 25s infinite alternate' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-200/50 shadow-sm">
              <FileText className="h-3 w-3 animate-bounce" /> Biblioteca Digital
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 leading-tight">Centro de Documentación</h2>
            <p className="text-slate-600 text-lg mt-4 font-light">
              Accede a los informes institucionales, guías metodológicas y datasets oficiales del Observatorio Ambiental Regional.
            </p>
            
            <motion.div 
              whileFocusWithin={{ scale: 1.02 }}
              className="mt-8 relative max-w-md shadow-2xl shadow-blue-500/5 border border-slate-100 rounded-3xl overflow-hidden"
            >
              <Input 
                icon={Search}
                placeholder="Buscar documentos..."
                className="h-14 rounded-3xl border-none bg-slate-50 focus:bg-white transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/technical/docs?q=${e.target.value}`);
                  }
                }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Clock className="h-3 w-3" /> Enter
              </div>
            </motion.div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6 h-auto border-slate-200 hover:bg-slate-900 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest shadow-sm"
            onClick={() => navigate('/technical/docs')}
          >
            Ver Todo el Catálogo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Card className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={doc.thumbnail} 
                    alt={doc.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/95 backdrop-blur-md text-slate-900 border-none px-3 py-1 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                      {doc.type}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="rounded-full h-10 w-10 p-0 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-none"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
