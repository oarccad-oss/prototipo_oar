import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// Sub-componente para animar el cambio de vista
const MapController = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center && zoom) {
            map.flyTo(center, zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
};

export const MiniMap = ({ layers = [], markers = [], height = "350px", center = [13.5, -85.0], zoom = 5 }) => {
    return (
        <div className="rounded-xl overflow-hidden shadow-inner border border-slate-200 z-0 relative" style={{ height }}>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <MapController center={center} zoom={zoom} />
                <TileLayer attribution='&copy; CartoDB' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                {layers.map((l, i) => (
                    <TileLayer key={i} url={l.url} opacity={l.opacity || 0.7} zIndex={10 + i} />
                ))}
                {markers.map((m, i) => (
                    m.type === 'circle' ?
                        <CircleMarker key={i} center={[m.lat, m.lon]} radius={5} pathOptions={{ color: m.color || 'red', fillColor: m.color, fillOpacity: 0.8 }}>
                            {m.popup && <Popup>{m.popup}</Popup>}
                        </CircleMarker>
                        :
                        <Marker key={i} position={[m.lat, m.lon]}>{m.popup && <Popup>{m.popup}</Popup>}</Marker>
                ))}
            </MapContainer>
        </div>
    );
};
