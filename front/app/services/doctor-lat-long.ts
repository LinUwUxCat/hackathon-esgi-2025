async function getDoctorLatLongs() : Promise<Number[][]> {
    const def = [49.4904, 3.7587];
    let pos = [];
    for (let i = 0; i < 1000; i++){
        pos.push([
            def[0] + (Math.random() - 0.5) / 2,
            def[1] + (Math.random() - 0.5) / 1,
        ])
    } 
    return pos;
}
export {getDoctorLatLongs}