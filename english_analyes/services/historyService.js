const fs = require('fs');
const path = require('path');

const historyPath = path.join(__dirname, '../data/history.json');

function ensureHistoryFile() {
  if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
  }
  if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, '[]');
  }
}

function saveHistory(sentence, result) {
  ensureHistoryFile();
  
  let history = [];
  try {
    history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  } catch (e) {
    history = [];
  }

  const record = {
    id: Date.now(),
    sentence: sentence,
    result: result,
    timestamp: new Date().toISOString()
  };

  history.unshift(record);
  
  if (history.length > 100) {
    history = history.slice(0, 100);
  }

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

function getHistory() {
  ensureHistoryFile();
  
  try {
    const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    return history;
  } catch (e) {
    return [];
  }
}

module.exports = { saveHistory, getHistory };
