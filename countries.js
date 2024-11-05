const fs = require('fs');
const UE = ['Belgio', 'Bulgaria', 'Repubblica Ceca', 'Danimarca', 'Germania', 'Estonia', 'Irlanda', 'Grecia', 'Spagna', 'Francia', 'Croazia', 'Italia', 'Cipro', 'Lettonia', 'Lituania', 'Lussemburgo', 'Ungheria', 'Malta', 'Paesi Bassi', 'Austria', 'Polonia', 'Portogallo', 'Romania', 'Slovenia', 'Slovacchia', 'Finlandia', 'Svezia']

async function getNonEUCountries() {
    try {
        const data = fs.readFileSync('./_countries.json');
        const countries = JSON.parse(data);
        // Filtra i paesi che non fanno parte dell'Unione Europea
        const nonEUCountries = countries.filter(country => {
            return UE.indexOf(country.translations.it) < 0;
        });

        // Mappa i dati per includere solo informazioni necessarie (es. nome)
        const countryNames = nonEUCountries.map((country, index) => ({ key: index, label: country.translations.it, value: country.translations.it }));

        // Scrivi i risultati in un file JSON
        fs.writeFile('nonEUCountries.json', JSON.stringify(countryNames, null, 2), (err) => {
            if (err) throw err;
            console.log('File JSON creato con successo!');
        });
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
    }
}

// Esegui la funzione
getNonEUCountries();