const fs = require('fs');
const path = require('path');

// Chemin du fichier log
const logFilePath = path.join(__dirname, 'logger.txt');

// Fonction réutilisable
function logError(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
  } catch (err) {
    console.error('Erreur lors de l’écriture dans le fichier log :', err);
  }
}

module.exports = {
  logError
};
