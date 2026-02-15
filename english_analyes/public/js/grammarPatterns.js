const grammarPatterns = [
  {
    name: '一般现在时',
    pattern: /^(I|You|We|They)\s+(?:do|does|have|go|play|like|love|eat|drink|read|write|study|work|run|walk|talk|speak|listen|watch|see|think|know|understand|remember|forget|want|need|hope|wish|believe|feel|look|sound|taste|smell)\b/i,
    examples: [
      'I play football every day.',
      'She reads books in the library.',
      'They go to school by bus.'
    ]
  },
  {
    name: '一般过去时',
    pattern: /\b(?:played|did|had|went|liked|loved|ate|drank|read|wrote|studied|worked|ran|walked|talked|spoke|listened|watched|saw|thought|knew|understood|remembered|forgot|wanted|needed|hoped|wished|believed|felt|looked|sounded|tasted|smelled)\b/i,
    examples: [
      'I played football yesterday.',
      'She read books last night.',
      'They went to school by bus yesterday.'
    ]
  },
  {
    name: '现在进行时',
    pattern: /\b(?:am|is|are)\s+\w+ing\b/i,
    examples: [
      'I am playing football now.',
      'She is reading books at the moment.',
      'They are going to school right now.'
    ]
  },
  {
    name: '过去进行时',
    pattern: /\b(?:was|were)\s+\w+ing\b/i,
    examples: [
      'I was playing football at 5 PM yesterday.',
      'She was reading books when I came.',
      'They were going to school when it rained.'
    ]
  },
  {
    name: '现在完成时',
    pattern: /\b(?:have|has)\s+\w+ed\b|\b(?:have|has)\s+(?:been|done|gone|written|read|eaten|drunk)\b/i,
    examples: [
      'I have played football for 10 years.',
      'She has read many books this year.',
      'They have gone to school.'
    ]
  },
  {
    name: '过去完成时',
    pattern: /\bhad\s+\w+ed\b|\bhad\s+(?:been|done|gone|written|read|eaten|drunk)\b/i,
    examples: [
      'I had played football before I came here.',
      'She had read many books before she met me.',
      'They had gone to school before I arrived.'
    ]
  },
  {
    name: '一般将来时',
    pattern: /\b(?:will|shall)\s+\w+\b|\bam\s+going\s+to\b/i,
    examples: [
      'I will play football tomorrow.',
      'She will read books next week.',
      'They are going to go to school.'
    ]
  },
  {
    name: '被动语态',
    pattern: /\b(?:am|is|are|was|were|be|been|being)\s+\w+ed\b/i,
    examples: [
      'The book is read by many students.',
      'The football was played by us.',
      'The work is being done by them.'
    ]
  },
  {
    name: '情态动词',
    pattern: /\b(?:can|could|may|might|must|should|would|will|shall|ought\s+to)\s+\w+\b/i,
    examples: [
      'I can play football.',
      'She could read books when she was young.',
      'They should go to school on time.'
    ]
  },
  {
    name: '祈使句',
    pattern: /^(?:Please|Do|Don't|Let's|Let)\s+\w+/i,
    examples: [
      'Please open the door.',
      "Don't make noise.",
      "Let's go to the park."
    ]
  },
  {
    name: '疑问句',
    pattern: /^(?:What|Where|When|Why|How|Who|Which|Whose|Do|Does|Did|Is|Are|Was|Were|Can|Could|Will|Would|Should|May|Might|Must)\b/i,
    examples: [
      'What are you doing?',
      'Where do you live?',
      'When did you arrive?'
    ]
  },
  {
    name: 'There be 句型',
    pattern: /^There\s+(?:is|are|was|were)\s+/i,
    examples: [
      'There is a book on the table.',
      'There are many students in the classroom.',
      'There was a cat in the garden.'
    ]
  }
];

function identifyGrammar(sentence) {
  for (const pattern of grammarPatterns) {
    if (pattern.pattern.test(sentence)) {
      return pattern.name;
    }
  }
  return '未识别的语法';
}
