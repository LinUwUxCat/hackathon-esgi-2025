import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import  HeatmapLayer from "react-leaflet-heat-layer"
import getAisneGeoJSON from "~/services/aisne-geography";
import { getDoctorLatLongs } from "~/services/doctor-lat-long";

export default function DoctorMap() {
  const [positions, setPositions] = useState<Number[][]>([]);
  useEffect(() => {
    getDoctorLatLongs().then(pos => setPositions(pos));
  }, []);
  
  
  return (
    <MapContainer center={[49.4904, 3.5587]} zoom={10} scrollWheelZoom={true} style={{ height : "95vh", width: "100vw"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer latlngs={positions} minOpacity={0.3} />
      <GeoJSON data={getAisneGeoJSON()} style={() => {return {fill:false}}}/>
    </MapContainer>

  );
}
