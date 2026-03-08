import React, { useState } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SplitMap } from './SplitMap';
import { Button } from '../ui/Shared';
import { Columns, X } from 'lucide-react';

const LAYERS = {
    satellite: { name: "Satélite (Esri)", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" },
    osm: { name: "Mapa Base (OSM)", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
    loss: { name: "Pérdida Bosque (GFW)", url: "https://tiles.globalforestwatch.org/umd_tree_cover_loss/latest/dynamic/{z}/{x}/{y}.png" },
    biodiversity: { name: "Biodiversidad (GBIF)", url: "https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.poly&bin=hex&hexPerTile=30" },
    protected: { name: "Áreas Protegidas", url: "https://tiles.unep-wcmc.org/arcgis/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/MapServer/tile/{z}/{y}/{x}" }
};

export const MapViewer = ({ initialComparison = false, hideControls = false }) => {
    const [isComparing, setIsComparing] = useState(initialComparison);
    const [leftKey, setLeftKey] = useState('satellite');
    const [rightKey, setRightKey] = useState('loss');

    return (
        <div className="h-full w-full relative">
            <MapContainer center={[13.5, -85.0]} zoom={6} style={{ height: '100%', width: '100%' }}>
                {isComparing ? <SplitMap leftLayerUrl={LAYERS[leftKey].url} rightLayerUrl={LAYERS[rightKey].url} /> : (
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="Satélite"><TileLayer url={LAYERS.satellite.url} attribution="Esri" /></LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Mapa Base"><TileLayer url={LAYERS.osm.url} attribution="OSM" /></LayersControl.BaseLayer>
                        <LayersControl.Overlay name="Pérdida Bosque"><TileLayer url={LAYERS.loss.url} /></LayersControl.Overlay>
                        <LayersControl.Overlay name="Biodiversidad"><TileLayer url={LAYERS.biodiversity.url} opacity={0.7} /></LayersControl.Overlay>
                        <LayersControl.Overlay name="Áreas Protegidas"><TileLayer url={LAYERS.protected.url} /></LayersControl.Overlay>
                    </LayersControl>
                )}
            </MapContainer>
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 items-end">
                <div className="bg-white p-2 rounded shadow-md border border-slate-200">
                    {!hideControls && (
                        <Button size="sm" variant={isComparing ? "primary" : "outline"} onClick={() => setIsComparing(!isComparing)} className="w-full flex gap-2">
                            {isComparing ? <><X className="h-4 w-4" />Cerrar</> : <><Columns className="h-4 w-4" />Comparar Capas</>}
                        </Button>
                    )}
                </div>
                {isComparing && (
                    <div className="bg-white p-3 rounded shadow-md border border-slate-200 w-64 space-y-3">
                        <div><label className="text-xs font-bold block mb-1">Izquierda</label><select className="w-full text-sm border rounded p-1" value={leftKey} onChange={e => setLeftKey(e.target.value)}>{Object.entries(LAYERS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}</select></div>
                        <div><label className="text-xs font-bold block mb-1">Derecha</label><select className="w-full text-sm border rounded p-1" value={rightKey} onChange={e => setRightKey(e.target.value)}>{Object.entries(LAYERS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}</select></div>
                    </div>
                )}
            </div>
        </div>
    );
};
