import React from 'react';
import { MapViewer } from '../../components/map/MapViewer';

export const MapExplorer = () => {
    return (
        <div className="h-full w-full">
            <MapViewer hideControls={true} />
        </div>
    );
};
