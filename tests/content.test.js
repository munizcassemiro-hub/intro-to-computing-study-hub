import test from 'node:test';
import assert from 'node:assert/strict';
import {modules,allLessons,questions,questionById,correctAnswer} from '../src/data.js';
import {emptyState,normalizeState,loadState,persistState,grade,recordAnswer,topicStats,dueCards,rateCard,createExam} from '../src/study.js';

const required=[
 ['What is a Computer?','Input','Processing','Storage','Output','Desktop','Laptop','Server','Tablet','Smartphone','Game Console','Smart TV','Hardware','Software','Microcomputer','Minicomputer','Mainframe','Supercomputer','Personal Computer','Embedded System','Wearable Computer','Analog Computer','Digital Computer','Hybrid Computer'],
 ['Motherboard','PCB','CPU','CPU cores','GPU','RAM','volatile memory','HDD','SSD','SATA','NVMe','NIC','I/O','CMOS Battery','Power Supply','TPM','Fans'],
 ['Computational Thinking','Decomposition','Pattern Recognition','Abstraction','Algorithm'],
 ['Sequence','Clear instructions','Starting point','Ending point','Pseudocode','Flow diagrams','INPUT','OUTPUT','Decision','IF / THEN','Debugging','Human Robot'],
 ['Computer Network','Node','NIC','MAC Address','IP Address','Router','Switch','Ethernet','Wi-Fi','Packet','Data Transmission','Routing','Protocol'],
 ['Network Topology','Network Type','Bus','Ring','Star','Mesh','Tree / Hybrid','PAN','LAN','WLAN','WAN','MAN','VPN','CAN','EPN','DCN','SAN','System Area Network / Cluster Area Network'],
 ['Application','Presentation','Session','Transport','Network','Data Link','Physical','Network Security','unauthorised access','interception','manipulation','denial / interruption'],
 ['IP','TCP','UDP','HTTP','FTP','SMTP'],
 ['Cryptography','Plaintext','Ciphertext','Encryption','Decryption','Algorithm (cryptography)','Key','Symmetric Cryptography','Asymmetric Cryptography','Public Key','Private Key'],
 ['Legal requirement','Ethical responsibility','Professional responsibility','GDPR','Digital Services Act (DSA)','professional codes','whistleblowing','public interest','privacy','confidentiality','bias','security breaches'],
 ['EU AI Act','risk-based regulation','unacceptable risk','high-risk AI','providers','deployers','General-Purpose AI (GPAI)','GPAI providers','systemic risk','technical documentation','training-data summaries','copyright responsibilities','cybersecurity','risk management','human oversight','conformity assessment','AI interaction disclosure','AI-generated / synthetic content','machine-readable marking','deepfakes','emotion recognition','biometric categorisation'],
 ['1. General Ethical Principles','1.1 Contribute to society and human well-being','1.2 Avoid harm','1.3 Be honest and trustworthy','1.4 Be fair and take action not to discriminate','1.5 Respect the work required to produce new ideas and creative works','1.6 Respect privacy','1.7 Honor confidentiality','2. Professional Responsibilities','High quality','Professional competence','Existing rules','Evaluate systems and risks','Public understanding','Authorised access','Secure systems','3. Professional Leadership Principles','4. Compliance with the Code']
];
test('all 12 modules cover every originally requested term',()=>{
 assert.equal(modules.length,12);for(const [i,terms] of required.entries())for(const term of terms){const local=modules[i].lessons.some(l=>l.term===term);const shared=['NIC'].includes(term)&&allLessons.some(l=>l.term===term);assert.ok(local||shared,`Module ${i+1}: ${term}`)}
});
test('every lesson has bilingual content, a real example, exam points and a recall question',()=>{
 assert.equal(new Set(allLessons.map(l=>l.id)).size,allLessons.length);for(const l of allLessons){for(const field of ['en','pt','meaning','bigIdeaEn','bigIdeaPt','exampleEn','examplePt','rememberEn','rememberPt'])assert.ok(typeof l[field]==='string'&&l[field].trim(),`${l.term}: ${field}`);assert.notEqual(l.exampleEn,l.en,`${l.term} repeats definition as example`);assert.ok(questions.some(q=>q.conceptIds?.includes(l.id)),`Missing recall: ${l.term}`)}
});
test('no malformed question survives; IDs and correct answers are valid',()=>{
 assert.equal(new Set(questions.map(q=>String(q.id))).size,questions.length);
 for(const q of questions){assert.ok(q.prompt&&q.why&&q.ptWhy&&q.options.length);assert.ok(q.options.every(x=>typeof x==='string'&&x.trim()),q.prompt);assert.ok(!correctAnswer(q).includes('undefined'),q.prompt);assert.equal(questionById.get(String(q.id)),q);assert.ok(grade(q,['ordering','build'].includes(q.type)?q.options:q.type==='pairs'?q.options.map(x=>x.split('|')[1]):q.type==='classify'?q.expected:q.type==='fill'?q.options[q.answer]:q.answer),q.prompt)}
});
test('grading rejects incomplete and wrong answers for every format',()=>{
 for(const type of ['choice','boolean','fill','ordering','build','pairs','classify','diagram','scenario','identify']){const q=questions.find(q=>q.type===type);assert.ok(q,type);assert.equal(grade(q,''),false,type);const wrong=['ordering','build','pairs','classify'].includes(type)?['wrong']:type==='fill'?'wrong':(q.answer+1)%q.options.length;assert.equal(grade(q,wrong),false,type)}
 const q=questions.find(q=>q.id==='debug-condition');assert.ok(grade(q,' ≥ '));assert.ok(!grade(q,'>'));
});
test('mistakes reset on failure, archive after two successes and reopen on a later failure',()=>{
 const s=emptyState(),q=questions[0];recordAnswer(s,q,0,false);assert.equal(s.mistakes[q.id].streak,0);recordAnswer(s,q,q.answer,true);assert.equal(s.mistakes[q.id].archived,false);recordAnswer(s,q,q.answer,true);assert.equal(s.mistakes[q.id].archived,true);recordAnswer(s,q,0,false);assert.equal(s.mistakes[q.id].archived,false);assert.equal(s.mistakes[q.id].streak,0);assert.ok(s.cards['1-2']);
});
test('mastery uses distinct questions and weak topics recover after corrections',()=>{
 const s=emptyState(),pool=questions.filter(q=>q.module===1);for(let i=0;i<8;i++)recordAnswer(s,pool[0],pool[0].answer,true);assert.equal(topicStats(s,1).mastered,false);for(const q of pool.slice(1,5))recordAnswer(s,q,q.answer,true);assert.equal(topicStats(s,1).mastered,true);recordAnswer(s,pool[0],0,false);assert.equal(topicStats(s,1).needsReview,true);recordAnswer(s,pool[0],pool[0].answer,true);assert.equal(topicStats(s,1).needsReview,false);
});
test('flashcards prioritise missed concepts and honour all four future due intervals',()=>{
 const s=emptyState(),id=allLessons[5].id;s.cards[id]={rating:0,due:0};assert.equal(dueCards(s)[0].id,id);for(let rating=0;rating<4;rating++){const now=Date.now();rateCard(s,id,rating);assert.ok(s.cards[id].due>now);assert.ok(!dueCards(s).some(l=>l.id===id))}
});
test('legacy IDs, valid progress and notes survive normalisation; malformed entries do not crash',()=>{
 const legacy={done:['8-1','5-13'],answers:[{id:0,correct:true},{id:99999,correct:false}],mistakes:{0:{id:0,streak:1},99999:{id:99999}},cards:null,caseNotes:{0:['a','b','c','d']}};const s=normalizeState(legacy);assert.deepEqual(s.done,['8-1']);assert.equal(s.answers.length,1);assert.equal(Object.keys(s.mistakes).length,1);assert.deepEqual(s.caseNotes[0],legacy.caseNotes[0]);assert.deepEqual(s.cards,{});assert.equal(normalizeState({done:null,answers:'bad'}).answers.length,0);
});
test('storage success, corrupt data and access/quota failure are handled explicitly',()=>{
 const mem=new Map(),storage={getItem:k=>mem.get(k),setItem:(k,v)=>mem.set(k,v)};const s=emptyState();s.mode='english';assert.equal(persistState(storage,s),'');assert.equal(loadState(storage).state.mode,'english');storage.setItem('computing-hub','{bad');assert.ok(loadState(storage).warning);const bad={getItem(){throw Error('blocked')},setItem(){throw Error('quota')}};assert.ok(loadState(bad).warning);assert.ok(persistState(bad,s));
});
test('exams contain one valid question per module without excluding interactive formats',()=>{
 for(let i=0;i<20;i++){const e=createExam();assert.equal(e.ids.length,12);assert.equal(new Set(e.ids.map(id=>questionById.get(String(id)).module)).size,12);assert.equal(e.finished,false)}
});

test('tea builder accepts independent preparation orders but rejects unsafe sequences',()=>{const q=questions.find(q=>q.id==='build-tea');const valid=[q.options[0],q.options[3],q.options[1],q.options[2],q.options[4],q.options[5],q.options[6]];assert.ok(grade(q,valid));const unsafe=[...q.options];[unsafe[2],unsafe[4]]=[unsafe[4],unsafe[2]];assert.equal(grade(q,unsafe),false)});
