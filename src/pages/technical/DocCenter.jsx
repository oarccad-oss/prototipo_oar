import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DocSearch } from '../../components/docs/DocSearch';

export const DocCenter = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || "";

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-full">
            <div className="mb-6">
                <h1 className="text-2xl font-serif font-bold text-slate-800">
                    Centro de Documentación
                </h1>
                <p className="text-slate-500">
                    Accede a reportes oficiales, datasets y mapas temáticos de la región.
                </p>
            </div>
            {/* Key attribute to force re-render if query changes */}
            <DocSearch key={query} initialQuery={query} />
        </div>
    );
};
