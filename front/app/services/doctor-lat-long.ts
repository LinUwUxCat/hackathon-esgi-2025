async function getDoctorLatLongs() : Promise<Number[][]> {
    const res = await (await fetch("http://localhost:3050/heatmap")).json();
    const max = Math.max(...res.map((e: { ratio: number; }) => Number(e.ratio)));
    ///TODO en gros faire ratio = ratio / max et après mettre ça en intensité
    const def = [49.4904, 3.7587];
    res.map((e: { ratio: number; }) => e.ratio = e.ratio / max);
    res.map((e:any) => [e.lat, e.lon, e.ratio])
    return res;
}
export {getDoctorLatLongs}