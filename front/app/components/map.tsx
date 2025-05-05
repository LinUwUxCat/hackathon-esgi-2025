import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import  HeatmapLayer from "react-leaflet-heat-layer"

export default function DoctorMap() {
  
  return (
    <MapContainer center={[49.4904, 3.7587]} zoom={10} scrollWheelZoom={true} style={{ height : "95vh", width: "100vw"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer latlngs={[
        [49.4904, 3.7587, 5.0],
        [49.4904, 3.7597, 1.0],
        [49.4904, 3.7687, 1.0],
        [49.4904, 3.7787, 1.0],
        [49.4904, 3.7887, 1.0],
        [49.4904, 3.7987, 1.0],
        [49.4904, 3.9587, 1.0]
      ]} minOpacity={0.5} />
      <Marker position={[49.4904, 3.7587]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>

  );
}
