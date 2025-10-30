// Native Node.js moduler, ingen installation nødvendigt
const fs = require("fs"); // Fil-system modul til at læse og skrive filer
const path = require("path"); // Modul til håndtering af filstier

/**
 * Læs JSON-fil og returner array af produkter
 * @param {string} filePath - relativ sti til JSON fil
 * @returns {Array} - array med produkter
 */

const importUsers = () => {
  try {
    // Konverter relativ sti til absolut sti
    const fullPath = path.resolve(__dirname, "../../data/users.json");
    // Læs fil som tekst
    const data = fs.readFileSync(fullPath, "utf-8");
    // Konveter tekst til JavaScript objekt
    return JSON.parse(data);
  } catch (error) {
    console.error(`Fejl ved læsning af JSON-fil: ${error.message}`);
    return [];
  }
};

/**
 * Gem et array som JSON-fil (kan importeres til MongoDB Compass)
 * @param {Array} data - array med produkter
 * @param {string} fileName - output filnavn
 */

const exportUsersToJSON = (data, fileName = "mongoImportUsers.json") => {
  try {
    // Konveter array til JSON-string med pæn formatering
    const jsonData = JSON.stringify(data, null, 2);
    // Skriv fil til disk
    fs.writeFileSync(path.resolve(fileName), jsonData, "utf-8");
    console.log(`Data gemt som ${fileName}`);
  } catch (error) {
    console.error(`Fejl ved eksport af JSON-fil: ${error.message}`);
  }
};

module.exports = importUsers;
