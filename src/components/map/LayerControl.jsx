import React, { useState } from 'react';
import { Card, Button } from '../ui/Shared';
import { Layers, ChevronDown, ChevronRight, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LayerControl = ({ layers, onToggleLayer, onOpacityChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    // Group layers by category
    const categories = layers.reduce((acc, layer) => {
        if (!acc[layer.category]) acc[layer.category] = [];
        acc[layer.category].push(layer);
        return acc;
    }, {});

    const [expanded, setExpanded] = useState(Object.keys(categories));

    const toggleCategory = (cat) => {
        setExpanded(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    };

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 right-4 z-[400] shadow-lg bg-white text-slate-700 hover:bg-slate-50"
            >
                <Layers className="h-4 w-4 mr-2 text-brand-primary" />
                Capas
            </Button>
        );
    }

    return (
        <Card className="absolute top-4 right-4 w-[90vw] max-w-sm md:w-80 p-0 shadow-xl z-[400] bg-white/95 backdrop-blur-sm border-slate-300 max-h-[80vh] flex flex-col transition-all duration-200">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-lg flex justify-between items-center">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-brand-primary" /> Capas
                </h4>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-sm">
                        {layers.filter(l => l.status === 'active').length} activas
                    </span>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                {Object.entries(categories).map(([cat, cathLayers]) => (
                    <div key={cat} className="border border-slate-100 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleCategory(cat)}
                            className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                        >
                            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                                {expanded.includes(cat) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                {cat}
                            </span>
                        </button>

                        {expanded.includes(cat) && (
                            <div className="p-2 space-y-2 bg-white">
                                {cathLayers.map((layer) => (
                                    <div key={layer.id} className="group">
                                        <div className="flex items-start gap-2">
                                            <div className="pt-1">
                                                <input
                                                    type="checkbox"
                                                    checked={layer.status === 'active'}
                                                    onChange={() => onToggleLayer(layer.id)}
                                                    className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-700">{layer.name}</span>
                                                    <div title={layer.description} className="text-slate-300 hover:text-slate-500 cursor-help">
                                                        <Info className="h-3 w-3" />
                                                    </div>
                                                </div>

                                                {layer.status === 'active' && (
                                                    <div className="mt-2 pl-1 pr-2 animate-in slide-in-from-top-1 duration-200">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <div className="h-2 w-2 rounded-full border border-slate-200" style={{ backgroundColor: layer.color }}></div>
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                defaultValue="80"
                                                                className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                                                onChange={(e) => onOpacityChange && onOpacityChange(layer.id, e.target.value)}
                                                            />
                                                            <span className="text-[10px] text-slate-400 w-6 text-right">80%</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};
