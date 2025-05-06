import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import HeatmapLayer from "react-leaflet-heat-layer";

type PegmanDropHandlerProps = {
  pegmanDropPosition: { x: number; y: number } | null;
};

function PegmanDropHandler({ pegmanDropPosition }: PegmanDropHandlerProps) {
  const map = useMap();
  const [latlng, setLatlng] = useState<LatLng | null>(null);

  useEffect(() => {
    if (!pegmanDropPosition || !map) return;

    const mapBounds = map.getContainer().getBoundingClientRect();

    const relativeX = pegmanDropPosition.x - mapBounds.left;
    const relativeY = pegmanDropPosition.y - mapBounds.top;

    const latLng = map.containerPointToLatLng([relativeX, relativeY]);
    setLatlng(latLng);
  }, [pegmanDropPosition, map]);

  return latlng ? (
    <Marker position={[latlng.lat, latlng.lng]}>
      <Popup>
        Coordonnées :<br />
        Lat: {latlng.lat.toFixed(5)}<br />
        Lng: {latlng.lng.toFixed(5)}
      </Popup>
    </Marker>
  ) : null;
}

type DoctorMapProps = {
  pegmanDropPosition: { x: number; y: number } | null;
};

export default function DoctorMap({ pegmanDropPosition }: DoctorMapProps) {
  return (
    <MapContainer
      center={[49.4904, 3.7587]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <HeatmapLayer
        latlngs={[
          [49.4904, 3.7587, 5.0],
          [49.4904, 3.7597, 1.0],
          [49.4904, 3.7687, 1.0],
          [49.4904, 3.7787, 1.0],
          [49.4904, 3.7887, 1.0],
          [49.4904, 3.7987, 1.0],
          [49.4904, 3.9587, 1.0],
        ]}
        minOpacity={0.5}
      />

      <Marker position={[49.4904, 3.7587]}>
        <Popup>Point de départ</Popup>
      </Marker>

      <PegmanDropHandler pegmanDropPosition={pegmanDropPosition} />
    </MapContainer>
  );
}
