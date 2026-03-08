import React, { useState } from 'react';
import { DOCUMENTS } from '../../api/mockData';
import { Card, Button, Input, Badge } from '../ui/Shared';
import { Search, FileText, Download, Eye, FileSpreadsheet, Map } from 'lucide-react';

export const DocSearch = ({ initialQuery = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const filteredDocs = DOCUMENTS.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getIcon = (type) => {
        switch (type) {
            case 'PDF': return <FileText className="h-8 w-8 text-red-500" />;
            case 'Excel': return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
            case 'Shapefile': return <Map className="h-8 w-8 text-blue-500" />;
            default: return <FileText className="h-8 w-8 text-slate-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">Centro de Documentación Ambiental</h2>
                <Input
                    icon={Search}
                    placeholder="Buscar por título, país o palabra clave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 text-lg shadow-md"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredDocs.map((doc) => (
                    <Card key={doc.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-slate-50 p-2 rounded-lg">
                                {getIcon(doc.type)}
                            </div>
                            <Badge variant="info">{doc.type}</Badge>
                        </div>

                        <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 min-h-[3rem]">{doc.title}</h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="default" className="bg-slate-100">{doc.country}</Badge>
                            <Badge variant="default" className="bg-slate-100">{doc.year}</Badge>
                            <Badge variant="default" className="bg-slate-100">{doc.category}</Badge>
                        </div>

                        <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-4 w-4 mr-2" />
                                Ver
                            </Button>
                            <Button variant="ghost" size="sm" className="px-2 text-slate-400 hover:text-brand-primary">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}

                {filteredDocs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No se encontraron documentos para "{searchTerm}".
                    </div>
                )}
            </div>
        </div>
    );
};
