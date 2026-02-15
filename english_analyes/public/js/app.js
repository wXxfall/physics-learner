const API_BASE = 'http://localhost:3000/api';

const sentenceInput = document.getElementById('sentenceInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultSection = document.getElementById('resultSection');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const historyList = document.getElementById('historyList');

analyzeBtn.addEventListener('click', analyzeSentence);
clearHistoryBtn.addEventListener('click', clearHistory);

sentenceInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    analyzeSentence();
  }
});

async function analyzeSentence() {
  const sentence = sentenceInput.value.trim();
  
  if (!sentence) {
    alert('请输入英语句子');
    return;
  }

  if (typeof nlp === 'undefined') {
    alert('NLP 库加载失败，请检查网络连接或刷新页面');
    return;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = '分析中...';

  try {
    const result = analyzeWithNLP(sentence);
    displayResult(result);
    await saveHistoryToServer(sentence, result);
    await loadHistory();
  } catch (error) {
    alert('分析失败: ' + error.message);
    console.error('Analysis error:', error);
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '分析句子';
  }
}

function analyzeWithNLP(sentence) {
  const doc = nlp(sentence);
  
  const components = {
    subject: [],
    predicate: [],
    object: [],
    attribute: [],
    adverbial: [],
    complement: []
  };

  try {
    const people = doc.people().out('array');
    const nouns = doc.nouns().out('array');
    const pronouns = doc.pronouns().out('array');
    const verbs = doc.verbs().out('array');
    const adjectives = doc.adjectives().out('array');
    const adverbs = doc.adverbs().out('array');
    const places = doc.places().out('array');
    const organizations = doc.organizations().out('array');
    const prepositions = doc.prepositions().out('array');
    const determiners = doc.determiners().out('array');
    
    const allNouns = [...new Set([...people, ...nouns, ...places, ...organizations])];
    const allSubjects = [...new Set([...allNouns, ...pronouns, ...determiners])];
    
    const mainVerb = doc.match('#Verb').first();
    const verbText = mainVerb ? mainVerb.text() : '';
    
    const words = sentence.split(/\s+/);
    let predicateFound = false;
    let predicateIndex = -1;
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      const originalWord = word;
      
      if (!predicateFound) {
        if (verbs.includes(cleanWord) || (cleanWord === verbText.toLowerCase())) {
          predicateFound = true;
          predicateIndex = i;
          components.predicate.push(originalWord);
          continue;
        }
        
        if (allSubjects.includes(cleanWord) || pronouns.includes(cleanWord) || determiners.includes(cleanWord)) {
          components.subject.push(originalWord);
          continue;
        }
        
        if (adjectives.includes(cleanWord)) {
          components.attribute.push(originalWord);
          continue;
        }
        
        if (prepositions.includes(cleanWord) || adverbs.includes(cleanWord)) {
          components.adverbial.push(originalWord);
          continue;
        }
        
        components.subject.push(originalWord);
      } else {
        if (verbs.includes(cleanWord)) {
          if (i === predicateIndex + 1 || (components.predicate.length > 0 && !allNouns.includes(cleanWord))) {
            components.predicate.push(originalWord);
            continue;
          }
        }
        
        if (allNouns.includes(cleanWord) || pronouns.includes(cleanWord)) {
          components.object.push(originalWord);
          continue;
        }
        
        if (adjectives.includes(cleanWord)) {
          if (components.object.length > 0) {
            components.attribute.push(originalWord);
          } else {
            components.object.push(originalWord);
          }
          continue;
        }
        
        if (prepositions.includes(cleanWord) || adverbs.includes(cleanWord)) {
          components.adverbial.push(originalWord);
          continue;
        }
        
        components.object.push(originalWord);
      }
    }
    
    const mainSubject = doc.match('#Subject+').out('array');
    if (mainSubject.length > 0 && components.subject.length === 0) {
      components.subject = mainSubject;
    }
    
    const mainObject = doc.match('#Object+').out('array');
    if (mainObject.length > 0 && components.object.length === 0) {
      components.object = mainObject;
    }
    
  } catch (error) {
    console.error('NLP analysis error:', error);
  }

  const grammar = identifyGrammar(sentence);
  
  const result = {
    sentence: sentence,
    components: components,
    grammar: grammar,
    examples: []
  };

  if (grammar) {
    const pattern = grammarPatterns.find(p => p.name === grammar);
    if (pattern) {
      result.examples = pattern.examples.filter(ex => ex.toLowerCase() !== sentence.toLowerCase());
    }
  }

  return result;
}

function displayResult(result) {
  resultSection.classList.remove('hidden');
  
  document.getElementById('displaySentence').textContent = result.sentence;
  document.getElementById('grammarType').textContent = result.grammar;
  
  const components = result.components;
  document.getElementById('subject').textContent = components.subject.join(' ') || '无';
  document.getElementById('predicate').textContent = components.predicate.join(' ') || '无';
  document.getElementById('object').textContent = components.object.join(' ') || '无';
  document.getElementById('attribute').textContent = components.attribute.join(' ') || '无';
  document.getElementById('adverbial').textContent = components.adverbial.join(' ') || '无';
  document.getElementById('complement').textContent = components.complement.join(' ') || '无';
  
  const examplesList = document.getElementById('examplesList');
  examplesList.innerHTML = '';
  
  if (result.examples && result.examples.length > 0) {
    document.getElementById('examplesSection').classList.remove('hidden');
    result.examples.forEach(example => {
      const exampleItem = document.createElement('div');
      exampleItem.className = 'example-item';
      exampleItem.innerHTML = `<span>${example}</span>`;
      examplesList.appendChild(exampleItem);
    });
  } else {
    document.getElementById('examplesSection').classList.add('hidden');
  }
  
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function saveHistoryToServer(sentence, result) {
  try {
    await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sentence, result })
    });
  } catch (error) {
    console.error('保存历史记录失败:', error);
  }
}

async function loadHistory() {
  try {
    const response = await fetch(`${API_BASE}/history`);
    const history = await response.json();
    displayHistory(history);
  } catch (error) {
    console.error('加载历史记录失败:', error);
  }
}

function displayHistory(history) {
  historyList.innerHTML = '';
  
  if (!history || history.length === 0) {
    historyList.innerHTML = '<div class="empty-history">暂无历史记录</div>';
    return;
  }
  
  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const time = new Date(item.timestamp).toLocaleString('zh-CN');
    
    historyItem.innerHTML = `
      <div class="history-sentence">${item.sentence}</div>
      <div class="history-grammar">${item.result.grammar}</div>
      <div class="history-time">${time}</div>
    `;
    
    historyItem.addEventListener('click', () => {
      sentenceInput.value = item.sentence;
      displayResult(item.result);
    });
    
    historyList.appendChild(historyItem);
  });
}

async function clearHistory() {
  if (!confirm('确定要清空所有历史记录吗？')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/history`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadHistory();
      alert('历史记录已清空');
    } else {
      throw new Error('清空失败');
    }
  } catch (error) {
    alert('清空历史记录失败: ' + error.message);
  }
}

loadHistory();
