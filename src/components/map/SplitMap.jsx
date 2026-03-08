import React, { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export const SplitMap = ({ leftLayerUrl, rightLayerUrl }) => {
    const map = useMap();
    const [sliderPos, setSliderPos] = useState(50);
    const sliderPosRef = useRef(50);
    const updateClipRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        // Ensure panes exist
        if (!map.getPane('left')) { map.createPane('left'); map.getPane('left').style.zIndex = 200; }
        if (!map.getPane('right')) { map.createPane('right'); map.getPane('right').style.zIndex = 200; }

        const leftPane = map.getPane('left');
        const rightPane = map.getPane('right');

        // Add Layers
        const left = L.tileLayer(leftLayerUrl, { pane: 'left' }).addTo(map);
        const right = L.tileLayer(rightLayerUrl, { pane: 'right' }).addTo(map);

        const updateLayers = () => {
            const val = sliderPosRef.current;
            const size = map.getSize();
            // Calculate x position in container pixels
            const xInContainer = (val / 100) * size.x;

            // Convert to layer point x (relative to map origin)
            const clipX = map.containerPointToLayerPoint([xInContainer, 0]).x;

            const minY = -10000000;
            const maxY = 10000000;
            const minX = -10000000;
            const maxX = 10000000;

            // Apply clip paths
            leftPane.style.clipPath = `polygon(${minX}px ${minY}px, ${clipX}px ${minY}px, ${clipX}px ${maxY}px, ${minX}px ${maxY}px)`;
            rightPane.style.clipPath = `polygon(${clipX}px ${minY}px, ${maxX}px ${minY}px, ${maxX}px ${maxY}px, ${clipX}px ${maxY}px)`;
        };

        updateClipRef.current = updateLayers;

        // Map events
        const handleMapMove = () => updateLayers();
        map.on('move', handleMapMove);
        map.on('moveend', handleMapMove);

        // Initial update
        updateLayers();

        return () => {
            map.removeLayer(left);
            map.removeLayer(right);
            map.off('move', handleMapMove);
            map.off('moveend', handleMapMove);

            // Reset styles
            leftPane.style.clipPath = '';
            rightPane.style.clipPath = '';
        };
    }, [map, leftLayerUrl, rightLayerUrl]);

    const handleSliderChange = (e) => {
        const val = e.target.value;
        setSliderPos(val);
        sliderPosRef.current = val;
        if (updateClipRef.current) {
            updateClipRef.current();
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full z-[1000] pointer-events-none select-none">
            <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={sliderPos}
                onInput={handleSliderChange}
                onChange={handleSliderChange}
                className="pointer-events-auto appearance-none w-full h-full bg-transparent outline-none m-0 p-0 absolute inset-0 z-[1010]"
                style={{ cursor: 'col-resize', WebkitAppearance: 'none' }}
            />
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none z-[1005]"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="absolute top-1/2 left-1/2 bg-white rounded-full p-2 shadow-xl transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8">
                    <span className="text-slate-600 font-bold mb-1">↔</span>
                </div>
            </div>
        </div>
    );
};
