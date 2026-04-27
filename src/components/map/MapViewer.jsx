import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
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
    const [geoLayers, setGeoLayers] = useState({
        paises: null,
        admin1: null,
        areas: null
    });

    useEffect(() => {
        const fetchGeo = async (name, path) => {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setGeoLayers(prev => ({ ...prev, [name]: data }));
            } catch (error) {
                console.error(`Error loading GeoJSON ${name}:`, error);
            }
        };

        fetchGeo('paises', '/data_mapa/sica_paises_indicadores.geojson');
        fetchGeo('admin1', '/data_mapa/sica_admin1_indicadores.geojson');
        fetchGeo('areas', '/data_mapa/sica_areas_protegidas.geojson');
    }, []);

    const renderPropertiesTable = (properties, title) => {
        const entries = Object.entries(properties);
        // Sort: priority names first, then others alphabetically
        const sortedEntries = entries.sort(([aK], [bK]) => {
            const priorityKeys = ['nombre', 'name', 'pais', 'id', 'iso3', 'categoria'];
            const aIdx = priorityKeys.indexOf(aK.toLowerCase());
            const bIdx = priorityKeys.indexOf(bK.toLowerCase());
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return aK.localeCompare(bK);
        });

        const rows = sortedEntries.map(([key, value]) => {
            if (value === null || value === undefined) return '';
            
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            let formattedValue = value;
            
            if (typeof value === 'number') {
                if (key.includes('pct') || key.includes('porcentaje') || key.includes('tasa')) {
                    formattedValue = `${value.toFixed(2)}%`;
                } else if (value > 1000) {
                    formattedValue = value.toLocaleString();
                } else if (value % 1 !== 0) {
                    formattedValue = value.toFixed(2);
                } else {
                    formattedValue = value.toString();
                }
            }

            return `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 6px 0; color: #64748b; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.025em; width: 50%; vertical-align: top;">${label}</td>
                    <td style="padding: 6px 0; color: #1e293b; font-size: 12px; font-weight: 700; text-align: right; word-break: break-word;">${formattedValue}</td>
                </tr>
            `;
        }).join('');

        return `
            <div style="font-family: 'Inter', sans-serif; min-width: 280px; max-height: 400px; overflow-y: auto; padding: 12px; background: white; border-radius: 12px;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #3b82f6; padding-bottom: 6px;">
                    ${title || properties.nombre || properties.name || 'Detalles'}
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
                <div style="margin-top: 12px; font-size: 10px; color: #94a3b8; text-align: center; font-style: italic; border-top: 1px dashed #e2e8f0; padding-top: 8px;">
                    Fuente: Observatorio Ambiental Regional SICA
                </div>
            </div>
        `;
    };

    const onEachFeaturePaises = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(renderPropertiesTable(feature.properties, feature.properties.nombre), { 
                className: 'custom-popup',
                maxWidth: 320
            });
            
            layer.on({
                mouseover: (e) => {
                    const l = e.target;
                    l.setStyle({ fillOpacity: 0.3, weight: 3 });
                },
                mouseout: (e) => {
                    const l = e.target;
                    l.setStyle({ fillOpacity: 0.1, weight: 2 });
                }
            });
        }
    };

    const onEachFeatureAdmin1 = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(renderPropertiesTable(feature.properties, feature.properties.nombre), {
                maxWidth: 300
            });
            
            layer.on({
                mouseover: (e) => { e.target.setStyle({ weight: 2, color: '#3b82f6' }); },
                mouseout: (e) => { e.target.setStyle({ weight: 1, color: '#94a3b8' }); }
            });
        }
    };

    const onEachFeatureAreas = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(renderPropertiesTable(feature.properties, feature.properties.nombre), {
                maxWidth: 300
            });
            
            layer.on({
                mouseover: (e) => { e.target.setStyle({ fillOpacity: 0.6 }); },
                mouseout: (e) => { e.target.setStyle({ fillOpacity: 0.35 }); }
            });
        }
    };

    return (
        <div className="h-full w-full relative">
            <MapContainer center={[13.5, -85.0]} zoom={6} style={{ height: '100%', width: '100%', background: '#0f172a' }}>
                {isComparing ? (
                    <SplitMap leftLayerUrl={LAYERS[leftKey].url} rightLayerUrl={LAYERS[rightKey].url} />
                ) : (
                    <>
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer name="Satélite (Esri)"><TileLayer url={LAYERS.satellite.url} attribution="Esri" /></LayersControl.BaseLayer>
                            <LayersControl.BaseLayer checked name="Mapa Base (OSM)"><TileLayer url={LAYERS.osm.url} attribution="OSM" /></LayersControl.BaseLayer>
                            
                            <LayersControl.Overlay name="Pérdida Bosque (GFW)"><TileLayer url={LAYERS.loss.url} /></LayersControl.Overlay>
                            <LayersControl.Overlay name="Biodiversidad (GBIF)"><TileLayer url={LAYERS.biodiversity.url} opacity={0.7} /></LayersControl.Overlay>
                            
                            {geoLayers.paises && (
                                <LayersControl.Overlay checked name="Países SICA (OAR)">
                                    <GeoJSON 
                                        data={geoLayers.paises} 
                                        style={{
                                            color: '#3b82f6',
                                            weight: 2,
                                            fillOpacity: 0.1,
                                            fillColor: '#3b82f6'
                                        }}
                                        onEachFeature={onEachFeaturePaises}
                                    />
                                </LayersControl.Overlay>
                            )}

                            {geoLayers.admin1 && (
                                <LayersControl.Overlay name="Límites Administrativos (Admin1)">
                                    <GeoJSON 
                                        data={geoLayers.admin1} 
                                        style={{
                                            color: '#94a3b8',
                                            weight: 1,
                                            fillOpacity: 0,
                                            dashArray: '3'
                                        }}
                                        onEachFeature={onEachFeatureAdmin1}
                                    />
                                </LayersControl.Overlay>
                            )}

                            {geoLayers.areas && (
                                <LayersControl.Overlay name="Áreas Protegidas (Local)">
                                    <GeoJSON 
                                        data={geoLayers.areas} 
                                        style={{
                                            color: '#10b981',
                                            weight: 1,
                                            fillOpacity: 0.35,
                                            fillColor: '#10b981'
                                        }}
                                        onEachFeature={onEachFeatureAreas}
                                    />
                                </LayersControl.Overlay>
                            )}

                            <LayersControl.Overlay name="WDPA Protegidas (Remoto)">
                                <TileLayer url={LAYERS.protected.url} />
                            </LayersControl.Overlay>
                        </LayersControl>
                    </>
                )}
            </MapContainer>
            
            <div className="absolute top-4 left-16 z-[1000] pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl pointer-events-auto">
                    <h2 className="text-white font-bold text-lg mb-1">Geoportal OAR</h2>
                    <p className="text-slate-400 text-xs">Visor de indicadores geoespaciales SICA</p>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 items-end">
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-200">
                    {!hideControls && (
                        <Button size="sm" variant={isComparing ? "primary" : "outline"} onClick={() => setIsComparing(!isComparing)} className="w-full flex gap-2 rounded-lg">
                            {isComparing ? <><X className="h-4 w-4" />Cerrar</> : <><Columns className="h-4 w-4" />Comparar Capas</>}
                        </Button>
                    )}
                </div>
                {isComparing && (
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 w-72 space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Capa Izquierda</label>
                            <select className="w-full text-sm border rounded-lg p-2 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" value={leftKey} onChange={e => setLeftKey(e.target.value)}>
                                {Object.entries(LAYERS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Capa Derecha</label>
                            <select className="w-full text-sm border rounded-lg p-2 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" value={rightKey} onChange={e => setRightKey(e.target.value)}>
                                {Object.entries(LAYERS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
