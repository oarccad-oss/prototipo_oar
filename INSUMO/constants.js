export const SICA_COORDINATES = {
    "GT": { name: "Guatemala", lat: 15.7835, lon: -90.2308, zoom: 7 },
    "SV": { name: "El Salvador", lat: 13.7942, lon: -88.8965, zoom: 8 },
    "HN": { name: "Honduras", lat: 15.2000, lon: -86.2419, zoom: 7 },
    "NI": { name: "Nicaragua", lat: 12.8654, lon: -85.2072, zoom: 7 },
    "CR": { name: "Costa Rica", lat: 9.7489, lon: -83.7534, zoom: 7 },
    "PA": { name: "Panamá", lat: 8.5380, lon: -80.7821, zoom: 7 },
    "BZ": { name: "Belize", lat: 17.1899, lon: -88.4976, zoom: 8 },
    "DO": { name: "Rep. Dominicana", lat: 18.7357, lon: -70.1627, zoom: 7 },
    "regional": { name: "Región SICA", lat: 13.5, lon: -85.0, zoom: 5 }
};

export const SICA_COUNTRIES = Object.entries(SICA_COORDINATES)
    .filter(([key]) => key !== 'regional')
    .map(([code, data]) => ({ code, name: data.name }));