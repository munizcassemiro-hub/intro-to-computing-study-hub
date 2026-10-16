import {test,expect} from '@playwright/test';
import {modules,allLessons,questions,questionById,correctAnswer} from '../../src/data.js';
import {emptyState,grade} from '../../src/study.js';
const qById=id=>questionById.get(String(id));
async function route(page,name,query=''){const path=`/#${encodeURIComponent(name)}${query?'?'+query:''}`;const same=new URL(path,'http://127.0.0.1:5173').pathname+new URL(path,'http://127.0.0.1:5173').hash===new URL(page.url()).pathname+new URL(page.url()).hash;await page.goto(path);if(same)await page.reload();await expect(page.locator('h1')).toBeVisible()}
async function answer(page,q,correct=true){
 if(q.type==='ordering'){
  const target=correct?q.options:[...q.options].reverse();
  for(let i=0;i<target.length;i++){let items=await page.locator('.order-list b').allTextContents();let index=items.indexOf(target[i]);while(index>i){await page.locator(`[data-move="${index}"][data-direction="-1"]`).click();index--}}
 }else if(q.type==='build'){while(await page.locator('[data-remove-step]').count())await page.locator('[data-remove-step]').last().click();const target=correct?q.options:[...q.options].reverse();for(const x of target)await page.locator(`[data-add-step="${q.options.indexOf(x)}"]`).click()}
 else if(q.type==='pairs'||q.type==='classify'){for(let i=0;i<q.options.length;i++){const expected=q.type==='pairs'?q.options[i].split('|')[1]:q.expected[i];const wrong=q.type==='pairs'?q.options[(i+1)%q.options.length].split('|')[1]:q.categories.find(x=>x!==expected);await page.locator('.pair-answer').nth(i).selectOption(correct?expected:wrong)}}
 else if(q.type==='fill')await page.fill('#blank-answer',correct?q.options[q.answer]:'incorrect');
 else await page.locator(`input[name="answer"][value="${correct?q.answer:(q.answer+1)%q.options.length}"]`).check();
 await page.click('#submit-answer');
}
test.beforeEach(async({page})=>{page.on('pageerror',e=>{throw e});await page.goto('/')});

test('all modules and every lesson render their complete content in both modes',async({page})=>{
 await route(page,'Learn');await expect(page.locator('.all-modules .module-card')).toHaveCount(12);
 for(const m of modules){await route(page,'Module',`module=${m.id}`);await expect(page.locator('.lesson-list [data-lesson]')).toHaveCount(m.lessons.length)}
 for(const mode of ['bilingual','english']){
  await page.evaluate(mode=>{const s=JSON.parse(localStorage.getItem('computing-hub')||'{}');s.mode=mode;localStorage.setItem('computing-hub',JSON.stringify(s))},mode);await page.reload();
  for(const l of allLessons){await route(page,'Learn',`lesson=${l.id}`);await expect(page.locator('h1')).toHaveText(l.term);await expect(page.locator('.definition')).toContainText(l.en);await expect(page.locator('.lesson-content')).toContainText(l.exampleEn);await expect(page.locator('.concept-answer')).not.toHaveCount(0);await expect(page.locator('.lesson-content')).not.toContainText('undefined');await expect(page.locator('[lang="pt"]')).toHaveCount(mode==='english'?0:await page.locator('[lang="pt"]').count());if(mode==='bilingual')await expect(page.locator('.lesson-content [lang="pt"]').first()).toBeVisible();else {await expect(page.locator('.lesson-content')).not.toContainText(l.pt);await expect(page.locator('.lesson-content')).not.toContainText(l.examplePt)}}
 }
});

test('required activities validate incorrect and correct answers with real feedback',async({page})=>{
 const ids=[16,15,'topology-bus','topology-ring','topology-mesh','topology-tree','topology-diagram-matching',209,210,'hardware-identification','ram-storage-sort','ct-sort',10,'build-tea','debug-total','debug-condition','abstraction-relevance','crypto-sort',26,'scenario-extra-2'];
 for(const id of ids){const q=qById(id);await route(page,'Practice',`module=${q.module}&question=${q.id}`);await page.click('#submit-answer');if(q.type!=='ordering')await expect(page.locator('#answer-error')).not.toBeEmpty();if(q.type==='ordering')await expect(page.locator('.feedback.failure')).toBeVisible();else await answer(page,q,false);await expect(page.locator('.feedback.failure')).toBeVisible();await expect(page.locator('.feedback')).toContainText(correctAnswer(q));await route(page,'Practice',`module=${q.module}&question=${q.id}`);await answer(page,q,true);await expect(page.locator('.feedback.success')).toBeVisible()}
});

test('practice filters, fill-in drafts and bilingual feedback work across mode switches',async({page})=>{
 await route(page,'Practice');await page.selectOption('#module-filter','4');await page.selectOption('#format-filter','fill');await page.selectOption('#activity-select','debug-condition');await page.fill('#blank-answer','>=');await page.click('#language');await expect(page.locator('#blank-answer')).toHaveValue('>=');await page.reload();await route(page,'Practice','module=4&question=debug-condition');await expect(page.locator('#blank-answer')).toHaveValue('>=');await page.click('#submit-answer');await expect(page.locator('.feedback.success')).toBeVisible();await expect(page.locator('[lang="pt"]')).toHaveCount(0);await page.click('#language');await expect(page.locator('.feedback [lang="pt"]')).toBeVisible();
});

test('lesson checks, dashboard progress, routing and browser back survive reload',async({page})=>{
 await route(page,'Learn','lesson=3-1');const q=questions.find(q=>q.conceptIds?.includes('3-1'));await page.locator(`[data-concept="3-1"][data-value="${q.answer}"]`).click();await expect(page.locator('#concept-feedback .success')).toBeVisible();await page.click('#complete-lesson');await expect(page.locator('h1')).toHaveText('Pattern Recognition');await page.reload();await expect(page.locator('h1')).toHaveText('Pattern Recognition');await page.locator('button[data-nav="Dashboard"]').click();await expect(page.locator('.stats')).toContainText(`1 of ${allLessons.length} concepts`);await page.goBack();await expect(page.locator('h1')).toHaveText('Pattern Recognition');
});

test('all flashcard ratings reschedule and no-due state is reachable',async({page})=>{
 for(let rating=0;rating<4;rating++){await route(page,'Flashcards','module=3');const term=await page.locator('.flashcard h2').textContent();await page.click('#flip-card');await expect(page.locator('.flashcard [lang="pt"]')).toBeVisible();await page.click(`[data-rate="${rating}"]`);const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('computing-hub')));const l=allLessons.find(l=>l.module===3&&l.term===term);expect(saved.cards[l.id].rating).toBe(rating);expect(saved.cards[l.id].due).toBeGreaterThan(Date.now()-1000)}
 await page.evaluate(ids=>{const s=JSON.parse(localStorage.getItem('computing-hub'));for(const id of ids)s.cards[id]={rating:3,due:Date.now()+86400000};localStorage.setItem('computing-hub',JSON.stringify(s))},allLessons.filter(l=>l.module===3).map(l=>l.id));await page.reload();await expect(page.locator('h2')).toHaveText('You’re up to date.');await page.click('#toggle-browse');await expect(page.locator('.flashcard')).toBeVisible();await page.click('#language');await page.click('#flip-card');await expect(page.locator('[lang="pt"]')).toHaveCount(0);
});

test('exam includes interactive formats, hides answers, resumes, submits once and keeps results',async({page})=>{
 const ids=[0,'ram-storage-sort','ct-sort',10,12,'topology-diagram-matching',16,210,'crypto-sort',23,'scenario-extra-2',26];
 await page.evaluate(ids=>{const s={version:2,mode:'bilingual',done:[],answers:[],cards:{},mistakes:{},days:[],exam:{ids,index:0,results:[],started:Date.now(),finished:false,recorded:false}};localStorage.setItem('computing-hub',JSON.stringify(s))},ids);await page.reload();await route(page,'Exam Mode');
 for(let i=0;i<ids.length;i++){const q=qById(ids[i]);await expect(page.locator('.feedback')).toHaveCount(0);await expect(page.locator('h1')).toHaveText(`Question ${i+1} of 12`);await answer(page,q,i!==0);if(i===4){await page.reload();await expect(page.locator('h1')).toHaveText('Question 6 of 12')}}
 await expect(page.locator('.exam-score')).toContainText('11 / 12');await expect(page.locator('.review-detail')).toHaveCount(12);await expect(page.getByRole('heading',{name:'Weakest topics'})).toBeVisible();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('computing-hub')));expect(saved.answers).toHaveLength(12);expect(saved.examHistory).toHaveLength(1);expect(saved.mistakes['0'].archived).toBe(false);await page.reload();await expect(page.locator('.exam-score')).toContainText('11 / 12');expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('computing-hub')).answers.length)).toBe(12);await page.getByRole('button',{name:'Study my mistakes →'}).click();await expect(page.locator('.mistake-card')).toHaveCount(1);
});

test('mistakes archive after two retries and restore; weak topic display recovers',async({page})=>{
 const q=qById(5);await route(page,'Practice',`module=3&question=${q.id}`);await answer(page,q,false);await route(page,'Dashboard');await expect(page.locator('.weak-list')).toContainText('Computational Thinking');
 for(let i=0;i<2;i++){await route(page,'Mistake Notebook');await page.locator(`[data-retry="${q.id}"]`).click();await answer(page,q,true)}
 await route(page,'Mistake Notebook');await expect(page.locator('.archive summary').first()).toContainText('1');await page.locator('.archive>summary').click();await expect(page.locator('.archive .mistake-card')).toHaveCount(1);await page.locator(`[data-understood="${q.id}"]`).click();await expect(page.locator('.mistake-group .mistake-card')).toHaveCount(1);await route(page,'Dashboard');await expect(page.locator('.weak-list')).not.toContainText('Computational Thinking');
});

test('five MediMind stages save reflections, gate explanations and preserve English-only mode',async({page})=>{
 await route(page,'MediMind');for(let stage=0;stage<5;stage++){await expect(page.locator('.case-explanation')).toHaveCount(0);await page.click('#reveal-case');await expect(page.locator('#case-error')).not.toBeEmpty();for(let i=0;i<4;i++)await page.locator(`[data-note="${i}"]`).fill(`Stage ${stage+1}: responsibility ${i+1}`);if(stage===0){await page.reload();await expect(page.locator('[data-note="0"]')).toHaveValue('Stage 1: responsibility 1')}await page.click('#reveal-case');await expect(page.locator('.tutor-guidance')).toHaveCount(0);for(let r=0;r<2;r++)await page.locator(`[data-role-note="${r}"]`).fill(`Role ${stage+1}: response ${r+1}`);await page.click('#reveal-case');await expect(page.locator('.case-explanation')).toHaveCount(4);if(stage===0){await page.click('#language');await expect(page.locator('[lang="pt"]')).toHaveCount(0);await expect(page.locator('[data-note="0"]')).toHaveValue('Stage 1: responsibility 1');await page.click('#language');await expect(page.locator('.case-explanation [lang="pt"]')).toHaveCount(4)}await page.click('#next-case')}
 await expect(page.locator('h1')).toHaveText('Big ideas. Small, clear steps.');expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('computing-hub')).caseDone.length)).toBe(5);
});

test('glossary searches Portuguese and full English names and persists language',async({page})=>{
 await route(page,'Glossary');await page.fill('#glossary-search','Transmission Control Protocol');await expect(page.locator('.glossary-card h3')).toContainText(['TCP']);await page.fill('#glossary-search','volátil');await expect(page.locator('.glossary-card')).not.toHaveCount(0);await page.fill('#glossary-search','');await page.selectOption('#module-filter','8');await expect(page.locator('.glossary-card')).toHaveCount(6);await page.click('#language');await expect(page.locator('[lang="pt"]')).toHaveCount(0);await page.reload();await expect(page.locator('#language')).toContainText('English only');
});

test('quick quiz actually ends after five questions',async({page})=>{
 await page.click('#quick-quiz');for(let i=0;i<5;i++){const found=qById(await page.locator('.question-meta').getAttribute('data-question-id'));await answer(page,found,true);await page.click('#next-question')}await expect(page.locator('h1')).toHaveText('5 / 5 correct');
});

test('all main pages work at phone, tablet and desktop widths without overflow',async({page})=>{
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});for(const routeInfo of [['Dashboard',''],['Learn',''],['Module','module=6'],['Learn','lesson=8-1'],['Flashcards',''],['Practice','module=6&question=topology-diagram-matching'],['Exam Mode',''],['Mistake Notebook',''],['Glossary',''],['MediMind','']]){await route(page,...routeInfo);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${routeInfo}`).toBe(true)}if(width===390){await page.locator('.mobile-toggle').click();await expect(page.locator('.mobile-toggle')).toHaveAttribute('aria-expanded','true');await page.locator('button[data-nav="Dashboard"]').click();await expect(page.locator('h1')).toContainText('A little learning');await page.screenshot({path:'test-results/mobile-dashboard.png',fullPage:true})}}
});

test('unavailable storage is reported rather than crashing or claiming progress is saved',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Quota exceeded','QuotaExceededError')}});await route(page,'Dashboard');await page.reload();await page.click('#language');await expect(page.locator('.saved')).toHaveText('Progress not saved');await expect(page.locator('.storage-warning')).toBeVisible();
});
