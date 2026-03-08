import React from 'react';
import { Card } from '../ui/Shared';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '../../lib/utils'; // Keep this if we use cn, else verify usage

export const TimeSlider = ({ currentYear, onChange, isPlaying, onTogglePlay }) => {
    const years = [2010, 2015, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-20">
            <Card className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 shadow-xl rounded-2xl">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Línea de Tiempo</span>
                            <span className="text-lg font-bold text-brand-primary tabular-nums">{currentYear}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><SkipBack className="h-4 w-4" /></button>
                            <button
                                onClick={onTogglePlay}
                                className="p-2 bg-brand-primary text-white rounded-full hover:bg-blue-800 transition-colors shadow-sm"
                            >
                                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                            </button>
                            <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><SkipForward className="h-4 w-4" /></button>
                        </div>
                    </div>

                    <div className="relative h-8 flex items-center">
                        {/* Track */}
                        <div className="absolute left-0 right-0 h-1 bg-slate-200 rounded-full"></div>
                        {/* Progress (Simulated visual only for now) */}
                        <div className="absolute left-0 h-1 bg-brand-secondary rounded-full" style={{ width: `${((years.indexOf(currentYear)) / (years.length - 1)) * 100}%` }}></div>

                        {/* Steps */}
                        <div className="absolute inset-0 flex justify-between items-center">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => onChange(year)}
                                    className={cn(
                                        "w-3 h-3 rounded-full transition-all border-2",
                                        currentYear === year
                                            ? "bg-white border-brand-primary scale-125 shadow-sm"
                                            : "bg-slate-300 border-transparent hover:bg-brand-primary/50"
                                    )}
                                >
                                    <span className={cn(
                                        "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium transition-opacity",
                                        currentYear === year ? "text-slate-800 opacity-100" : "text-slate-400 opacity-0 hover:opacity-100"
                                    )}>
                                        {year}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
