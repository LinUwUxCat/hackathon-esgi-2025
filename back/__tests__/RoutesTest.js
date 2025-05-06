const app = require('../app')
app.listen(3050);

test("Test Medecine Route", async () => {
    const response = await fetch("http://localhost:3050/medecins");
    expect(response.status).toBe(200);
}, 20000);

test("Test Demo Route", async () => {
    const response = await fetch("http://localhost:3050/demo");
    expect(response.status).toBe(200);
}, 20000);

test("Test Heatmap Route", async () => {
    const response = await fetch("http://localhost:3050/heatmap", {method:"POST", body: "{insee_list:[]}"});
    expect(response.status).toBe(200);
}, 20000);  

