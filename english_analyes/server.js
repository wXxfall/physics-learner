const http = require('http');
const fs = require('fs');
const path = require('path');
const { saveHistory, getHistory } = require('./services/historyService');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    serveFile(path.join(__dirname, 'public', 'index.html'), res);
  } else if (req.method === 'POST' && req.url === '/api/analyze') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { sentence, result } = data;
        if (!sentence || sentence.trim() === '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: '请输入英语句子' }));
          return;
        }
        saveHistory(sentence, result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '保存失败: ' + error.message }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/api/history') {
    try {
      const history = getHistory();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(history));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '获取历史记录失败: ' + error.message }));
    }
  } else if (req.method === 'DELETE' && req.url === '/api/history') {
    try {
      const historyPath = path.join(__dirname, 'data/history.json');
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(historyPath, '[]');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '历史记录已清空' }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '清空历史记录失败: ' + error.message }));
    }
  } else if (req.url.startsWith('/public/')) {
    const filePath = path.join(__dirname, req.url);
    serveFile(filePath, res);
  } else if (req.url.startsWith('/css/') || req.url.startsWith('/js/')) {
    const filePath = path.join(__dirname, 'public', req.url);
    serveFile(filePath, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function serveFile(filePath, res) {
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
