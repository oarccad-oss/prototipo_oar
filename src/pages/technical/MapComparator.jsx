import React from 'react';
import { MapViewer } from '../../components/map/MapViewer';

export const MapComparator = () => {
    return (
        <div className="h-full w-full">
            <MapViewer initialComparison={true} hideControls={true} />
        </div>
    );
};
