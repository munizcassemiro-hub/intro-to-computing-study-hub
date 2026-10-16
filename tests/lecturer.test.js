import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {allLessons,questionById,questions} from '../src/data.js';
import {courseActivities,courseActivityById,checkCourseActivity,suggestedTea} from '../src/course-activities.js';
import {lecturerSources,lecturerNameAge,legalDateClaims,moduleSources} from '../src/lecturer-lessons.js';
import {lecturerScenario,lecturerStages} from '../src/lecturer-case.js';
import {normalizeState,emptyState,grade} from '../src/study.js';
const normalized=x=>x.replace(/\s+/g,' ').trim();
const source=id=>readFileSync(lecturerSources[id].textPath,'utf8');

test('all 20 lecturer sources have traceable hashes, extracted text and an app reference',()=>{
 assert.equal(Object.keys(lecturerSources).length,20);assert.equal(new Set(Object.values(lecturerSources).map(s=>s.sha256)).size,19);assert.equal(lecturerSources.T12.duplicate_of,'T11');
 for(const [id,s] of Object.entries(lecturerSources)){assert.match(s.sha256,/^[a-f0-9]{64}$/);assert.ok(source(id).length>100);assert.ok(Object.values(moduleSources).flat().includes(id),id)}
});
test('original activity prompts and role questions are anchored to the supplied sources',()=>{
 for(const a of courseActivities){const text=normalized(a.refs.map(source).join(' '));for(const line of a.prompt.split('\n').filter(x=>x.trim().length>20)){assert.ok(text.includes(normalized(line)),`${a.id}: ${line}`)}}
 const student=normalized(source('T06')),tutor=normalized(source('T05'));
 assert.ok(student.includes(lecturerScenario));for(const stage of lecturerStages){assert.ok(student.includes(stage.event));assert.ok(student.includes(stage.role));for(const q of stage.questions)assert.ok(student.includes(q));assert.ok(tutor.includes(stage.tutor))}
});
test('missing lecturer terms, examples and source-specific distinctions are represented',()=>{
 const text=JSON.stringify(allLessons);for(const term of ['Bandwidth','Firewall','ISP','TCP/IP','ALU','CU','STORE','BCS','Patterns among problems','Patterns within problems','Model (Abstraction)','Start or Stop','Process','Input or Output','Direction of flow','Importers','Distributors','Article 50','Article 53','Article 55'])assert.ok(allLessons.some(l=>l.term.includes(term)),term);
 for(const example of ['cat-drawing','Sponge cake','ingredient','bicycle','toothbrush','age >= 70'])assert.ok(text.toLowerCase().includes(example.toLowerCase()),example);
 assert.ok(lecturerNameAge.includes("'You are aged to perfection!'"));assert.ok(lecturerNameAge.includes("'You are a spring chicken!'"));assert.ok(!lecturerNameAge.includes('age >= 18'));
});
test('decomposition gate counts at least 8 task steps and does not accept START/STOP as tasks',()=>{
 const a=courseActivityById.get('tea-decomposition');assert.equal(checkCourseActivity(a,{steps:'START\n1\n2\n3\n4\n5\n6\n7\nSTOP',smaller:'Fill the kettle'}).complete,false);assert.ok(checkCourseActivity(a,{steps:'Get cup\nChoose tea\nFill kettle\nBoil water\nAdd bag\nPour water\nBrew tea\nRemove bag',smaller:'Fill the kettle: open, fill, close'}).complete);
});
test('tea algorithm gate requires START/STOP, 8 tasks and a conditional milk action',()=>{
 const a=courseActivityById.get('tea-algorithm'),values={format:'Pseudocode',algorithm:suggestedTea,improve:'Specify the exact brewing time'};assert.ok(checkCourseActivity(a,values).complete);
 for(const algorithm of [suggestedTea.replace('START','BEGIN'),suggestedTea.replace('STOP','END'),suggestedTea.replace('END IF',''),suggestedTea.replace('IF milk is required THEN\n    Add milk\nEND IF','Add milk'), 'START\nIF milk is required THEN\nAdd milk\nEND IF\nSTOP'])assert.equal(checkCourseActivity(a,{...values,algorithm}).complete,false,algorithm);
 const numbered='START\n1. Get a cup\n2. Choose tea\n3. Fill kettle\n4. Boil water\n5. Put tea in cup\n6. Pour hot water\n7. Brew the tea\n8. If milk is required, add milk\n9. Stir\n10. Serve\nSTOP';assert.ok(checkCourseActivity(a,{...values,format:'Numbered instructions',algorithm:numbered}).complete);
});
test('debugging requires three distinct attempts plus a START/STOP rewrite; keys stay separate',()=>{
 const a=courseActivityById.get('tea-debugging'),v={error1:'Pour before boil',error2:'Throw away tea bag before using it',error3:'No time to brew',rewrite:suggestedTea};assert.ok(checkCourseActivity(a,v).complete);assert.equal(checkCourseActivity(a,{...v,error3:v.error1}).complete,false);assert.ok(!a.prompt.includes(a.answerEn));for(const a of courseActivities)assert.ok(!a.prompt.includes(a.answerEn));
});
test('classification and numeric checks are real; open reasoning is not represented as an automatic grade',()=>{
 const a=courseActivityById.get('tea-abstraction'),values=Object.fromEntries(a.expected.map((x,i)=>[`item${i}`,x]));values.reason='Keep only what changes the tea procedure';const good=checkCourseActivity(a,values);assert.equal(good.objectiveScore,9);values.item0='Relevant';assert.equal(checkCourseActivity(a,values).objectiveScore,8);
 const p=courseActivityById.get('tea-patterns'),v={a1:'12',a2:'14',b1:'25',b2:'30',c1:'Sunday',c2:'Tuesday',rule:'Advance through the week cyclically'};assert.equal(checkCourseActivity(p,v).numericChecks.filter(x=>x.correct).length,4);assert.equal(checkCourseActivity(p,v).objectiveScore,null);
});
test('legacy progress survives and does not unlock new role-specific tutor guidance',()=>{
 const s=normalizeState({version:2,done:['3-1'],answers:[{id:0,correct:true}],cards:{'3-1':{rating:2,due:Date.now()+1000}},caseNotes:{0:['law','ethics','profession','action']},caseDone:[0,1,2,3,4]});assert.equal(s.version,3);assert.deepEqual(s.done,['3-1']);assert.equal(s.answers.length,1);assert.equal(s.cards['3-1'].rating,2);assert.equal(s.caseDone.length,5);assert.deepEqual(s.lecturerCaseDone,[]);assert.deepEqual(s.caseRoleNotes,{});assert.deepEqual(s.courseWork,{});
 const empty=normalizeState({courseWork:{'tea-algorithm':{submitted:true,values:{algorithm:'START\nSTOP'},review:'understood'}}});assert.equal(empty.courseWork['tea-algorithm'].submitted,false);assert.equal(empty.courseWork['tea-algorithm'].review,null);
});
test('date claims are labelled separately and never become definitive answer options',()=>{
 assert.equal(legalDateClaims.length,6);const options=JSON.stringify(questions.map(q=>q.options));for(const row of legalDateClaims)assert.ok(!options.includes(row[0]),row[0]);for(const q of questions)assert.equal(q.sourceKind,'generated');assert.ok(courseActivities.every(a=>a.refs.length));
});
test('adapted milk builder works and rejects broken IF structure/order',()=>{
 const q=questionById.get('tea-milk-builder');assert.ok(grade(q,q.options));const wrong=[...q.options];const a=wrong.indexOf('Add milk'),b=wrong.indexOf('END IF');[wrong[a],wrong[b]]=[wrong[b],wrong[a]];assert.equal(grade(q,wrong),false);
});
