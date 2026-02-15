const express = require('express');
const router = express.Router();
const { analyzeSentence } = require('../services/grammarAnalyzer');
const { saveHistory, getHistory } = require('../services/historyService');

router.post('/analyze', (req, res) => {
  try {
    const { sentence } = req.body;
    if (!sentence || sentence.trim() === '') {
      return res.status(400).json({ error: '请输入英语句子' });
    }

    const result = analyzeSentence(sentence);
    saveHistory(sentence, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: '分析失败: ' + error.message });
  }
});

router.get('/history', (req, res) => {
  try {
    const history = getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: '获取历史记录失败: ' + error.message });
  }
});

router.delete('/history', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const historyPath = path.join(__dirname, '../data/history.json');
    fs.writeFileSync(historyPath, '[]');
    res.json({ message: '历史记录已清空' });
  } catch (error) {
    res.status(500).json({ error: '清空历史记录失败: ' + error.message });
  }
});

module.exports = router;
