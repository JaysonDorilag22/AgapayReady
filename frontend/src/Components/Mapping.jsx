import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default function Mapping() {
  const mapContainer = useRef(null);
  const mapOverlayContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [121.03536967321583, 14.509284182080165],
      zoom: 15, // Default zoom
    });

    newMap.on('load', async () => {
      setMap(newMap);

      const response = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/121.035752%2C14.509454%3B121.034277%2C14.510801?alternatives=true&banner_instructions=true&geometries=geojson&language=en&overview=simplified&steps=true&voice_instructions=true&voice_units=imperial&access_token=' + mapboxgl.accessToken);
      const data = await response.json();

      // Add route layer to map
      newMap.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: data.routes[0].geometry, // Use the geometry from the API response
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#007cbf',
          'line-width': 5,
        },
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: {
          inputs: false,
          instructions: true,
          profileSwitcher: false
        },
        flyTo: false,
        placeholderOrigin: 'Starting point',
        placeholderDestination: 'Destination',
        language: 'en',
        alternatives: true,
        geometries: 'geojson',
        overview: 'full',
        steps: true,
        routeIndex: 0,
        routes: data.routes
      });

      mapOverlayContainer.current.appendChild(directions.onAdd(newMap));
    });

    return () => {
      newMap.remove();
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-full absolute top-0 left-0" ref={mapOverlayContainer} />
      <div className="w-full h-full relative" ref={mapContainer} />
    </div>
  );
}
