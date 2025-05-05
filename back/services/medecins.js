
const { logError } = require('./../logger/logger');

async function getMedecins() {
    let results = {};
    let offset = 0;
    let isFinished = false;

    try {
        do {
            const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/medecins/records?select=code_insee&limit=100&offset=${offset}&refine=dep_name%3AAisne&refine=libelle_profession%3A%22M%C3%A9decin%20g%C3%A9n%C3%A9raliste%22`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const json = await response.json();

            if (response.status !== 200) {
                logError("Erreur venant de l'API distante: -> " + JSON.stringify(json));
                break;
            }

            if (!json.results || json.results.length === 0) {
                isFinished = true;
            } else {
                json.results.forEach(entry => {
                    const code = entry.code_insee;
                    if (code) {
                        if (results[code]) {
                            results[code].nb_med += 1;
                        } else {
                            results[code] = { nb_med: 1 };
                        }
                    }
                });

                offset += 100;
            }

        } while (!isFinished);

        return results;

    } catch (error) {
        logError("Erreur dans getMedecins : " + error.message);
        return {};
    }
}

module.exports = { getMedecins };
