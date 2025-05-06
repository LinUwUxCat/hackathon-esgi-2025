import { GeoJSON, MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import HeatmapLayer from "react-leaflet-heat-layer";
import getAisneGeoJSON from "~/services/aisne-geography";
import { getDoctorLatLongs } from "~/services/doctor-lat-long";

type PegmanDropHandlerProps = {
  pegmanDropPosition: { x: number; y: number } | null;
  additional: LatLng[]
  setAdditional: Function
};

function PegmanDropHandler({ pegmanDropPosition, additional, setAdditional }: PegmanDropHandlerProps) {
  const map = useMap();
  const [latlng, setLatlng] = useState<LatLng[]>([]);

  useEffect(() => {
    if (!pegmanDropPosition || !map) return;

    const mapBounds = map.getContainer().getBoundingClientRect();

    const relativeX = pegmanDropPosition.x - mapBounds.left;
    const relativeY = pegmanDropPosition.y - mapBounds.top;

    const latLng = map.containerPointToLatLng([relativeX, relativeY]);

    setAdditional([...additional, { lat: latLng.lat, lon: latLng.lng, nb_med: 100 }])

    setLatlng([...latlng, latLng]);
  }, [pegmanDropPosition, map]);

  return latlng.length != 0 ?
    latlng.map(l => (
      <Marker position={[l.lat, l.lng]}>
        <Popup>
          Coordonnées :<br />
          Lat: {l.lat.toFixed(5)}<br />
          Lng: {l.lng.toFixed(5)}
        </Popup>
      </Marker>
    )) : null;
}

type DoctorMapProps = {
  pegmanDropPosition: { x: number; y: number } | null;
};

export default function DoctorMap({ pegmanDropPosition }: DoctorMapProps) {
  const [positions, setPositions] = useState<LatLng[]>([]);
  const [additional, setAdditional] = useState([]);
  useEffect(() => {
    getDoctorLatLongs(additional).then(pos => {
      //console.log(pos.filter(a => a.insee=="02553"), positions.filter(a => a.insee=="02553"))
      setPositions(pos)
    });
  }, [additional]);

  return (
    <MapContainer
      center={[49.4904, 3.7587]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={getAisneGeoJSON()} style={() => { return { fill: false } }} />
      <HeatMap positions={positions}/>

      <PegmanDropHandler pegmanDropPosition={pegmanDropPosition} additional={additional} setAdditional={setAdditional} />
    </MapContainer>
  );
}

function HeatMap ({positions} : {positions : LatLng[]}) {
  const map = useMap();
  return (
    <HeatmapLayer
        latlngs={positions}
        minOpacity={0.3}
        radius={50}
        gradient={{0: 'red', 0.99687: 'green', 1: 'blue'}}
        maxZoom={13}
      />
  )
}
