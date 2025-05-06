import type { LatLng } from "leaflet";

async function getDoctorLatLongs(insee_list? : {lat : number, lon: number, nb_med: number}[]) : Promise<LatLng[]> {
    var res = await (await fetch("http://localhost:3050/heatmap", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({insee_list:insee_list ?? []})
    })).json();
    const max = Math.max(...res.map((e: { ratio: number; }) => Number(e.ratio)));
    res = res.map((e:any) => {
        return {
            lat: e.lat,
            lng: e.lon,
            alt: e.ratio
        }
    })
    return res;
}

export {getDoctorLatLongs}