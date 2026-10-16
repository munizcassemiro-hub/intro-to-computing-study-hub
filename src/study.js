import {courseActivityById,checkCourseActivity} from './course-activities.js';
import {allLessons,modules,questions,questionById} from './data.js';
export const STORAGE_KEY='computing-hub';
export function emptyState(){return {version:3,courseWork:{},caseRoleNotes:{},lecturerCaseDone:[],done:[],answers:[],mistakes:{},cards:{},mode:'bilingual',last:null,days:[],caseNotes:{},caseDone:[],exam:null,examHistory:[],drafts:{},checks:{}}}
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
export function normalizeState(input){
 const base=emptyState();if(!object(input))return base;
 const state={...base,...input};state.version=3;
 for(const key of ['done','answers','days','caseDone','examHistory','lecturerCaseDone'])if(!Array.isArray(state[key]))state[key]=[];
 for(const key of ['mistakes','cards','caseNotes','drafts','checks','courseWork','caseRoleNotes'])if(!object(state[key]))state[key]={};
 state.answers=state.answers.filter(a=>object(a)&&questionById.has(String(a.id))&&typeof a.correct==='boolean');
 state.done=[...new Set(state.done.filter(id=>allLessons.some(l=>l.id===id)))];
 state.mistakes=Object.fromEntries(Object.entries(state.mistakes).filter(([id,m])=>questionById.has(String(id))&&object(m)).map(([id,m])=>[id,{...m,id:questionById.get(id).id,streak:Number.isFinite(m.streak)?m.streak:0}]));
 state.mode=state.mode==='english'?'english':'bilingual';
 state.caseNotes=Object.fromEntries(Object.entries(state.caseNotes).filter(([id,notes])=>Number(id)>=0&&Number(id)<5&&Array.isArray(notes)).map(([id,notes])=>[id,Array.from({length:4},(_,i)=>typeof notes[i]==='string'?notes[i]:'')]));
 state.caseRoleNotes=Object.fromEntries(Object.entries(state.caseRoleNotes).filter(([id,notes])=>Number(id)>=0&&Number(id)<5&&Array.isArray(notes)).map(([id,notes])=>[id,Array.from({length:2},(_,i)=>typeof notes[i]==='string'?notes[i]:'')]));
 state.lecturerCaseDone=[...new Set(state.lecturerCaseDone.filter(x=>Number.isInteger(x)&&x>=0&&x<5))];
 state.courseWork=Object.fromEntries(Object.entries(state.courseWork).filter(([id,e])=>courseActivityById.has(id)&&object(e)).map(([id,e])=>{const a=courseActivityById.get(id),values=Object.fromEntries(a.fields.map(f=>[f.key,typeof e.values?.[f.key]==='string'?e.values[f.key]:''])),submitted=Boolean(e.submitted&&checkCourseActivity(a,values).complete);return [id,{...e,values,submitted,review:e.review==='needs-review'?'needs-review':submitted&&e.review==='understood'?'understood':null}]}));
 state.caseDone=[...new Set(state.caseDone.filter(x=>Number.isInteger(x)&&x>=0&&x<5))];
 state.cards=Object.fromEntries(Object.entries(state.cards).filter(([id,c])=>allLessons.some(l=>l.id===id)&&object(c)&&Number.isFinite(c.due)&&Number.isInteger(c.rating)&&c.rating>=0&&c.rating<4));
 if(state.exam&&(!Array.isArray(state.exam.ids)||!state.exam.ids.length||state.exam.ids.some(id=>!questionById.has(String(id)))||!Array.isArray(state.exam.results)||!Number.isInteger(state.exam.index)||state.exam.index<0||state.exam.index>=state.exam.ids.length))state.exam=null;
 if(state.exam&&!object(state.exam.drafts))state.exam.drafts={};
 return state;
}
export function loadState(storage){try{return {state:normalizeState(JSON.parse(storage.getItem(STORAGE_KEY)||'null')),warning:''}}catch{return {state:emptyState(),warning:'Stored progress could not be read. This session is available; export your progress before closing.'}}}
export function persistState(storage,state){try{storage.setItem(STORAGE_KEY,JSON.stringify(state));return ''}catch{return 'Progress could not be saved on this browser. Export a backup before closing.'}}
export function grade(q,value){
 if(value===null||value===undefined||value==='')return false;
 if(q.type==='build')return Array.isArray(value)&&value.length===q.options.length&&new Set(value).size===q.options.length&&q.options.every(x=>value.includes(x))&&value[0]===q.options[0]&&value.at(-1)===q.options.at(-1)&&q.before.every(([a,b])=>value.indexOf(q.options[a])<value.indexOf(q.options[b]));
 if(q.type==='ordering')return Array.isArray(value)&&value.length===q.options.length&&value.every((x,i)=>x===q.options[i]);
 if(q.type==='pairs')return Array.isArray(value)&&value.length===q.options.length&&value.every((x,i)=>x===q.options[i].split('|')[1]);
 if(q.type==='classify')return Array.isArray(value)&&value.length===q.expected.length&&value.every((x,i)=>x===q.expected[i]);
 if(q.type==='fill')return (q.accepted||[q.options[q.answer]]).some(x=>String(x).toLowerCase().trim()===String(value).toLowerCase().trim());
 return Number(value)===q.answer;
}
export function answerText(q,value){return Array.isArray(value)?value.join(' → '):q.type==='fill'?String(value):q.options[Number(value)]}
export function recordAnswer(state,q,value,correct=grade(q,value)){
 state.answers.push({id:q.id,correct,answer:answerText(q,value),date:Date.now()});
 if(!correct){state.mistakes[q.id]={id:q.id,streak:0,archived:false,updated:Date.now(),answer:answerText(q,value)};const relevant=allLessons.filter(l=>l.module===q.module&&((q.conceptIds||[]).includes(l.id)||(q.prompt+' '+q.why).toLowerCase().includes(l.term.toLowerCase())));for(const l of relevant)state.cards[l.id]={rating:0,due:0}}
 else if(state.mistakes[q.id]){const m=state.mistakes[q.id];m.streak++;m.updated=Date.now();if(m.streak>=2)m.archived=true}
 const today=new Date().toLocaleDateString('en-CA');if(!state.days.includes(today))state.days.push(today);
 return correct;
}
export function topicStats(state,moduleId){
 const byQuestion=new Map();state.answers.filter(a=>questionById.get(String(a.id))?.module===moduleId).forEach(a=>byQuestion.set(String(a.id),a));
 const recent=[...byQuestion.values()];const correct=recent.filter(a=>a.correct).length;
 return {total:recent.length,correct,accuracy:recent.length?Math.round(correct/recent.length*100):0,mastered:recent.length>=5&&correct/recent.length>=.8,needsReview:recent.some(a=>!a.correct)};
}
export function dueCards(state,moduleId=0){return allLessons.filter(l=>(!moduleId||l.module===moduleId)&&(!state.cards[l.id]||state.cards[l.id].due<=Date.now())).sort((a,b)=>Number(state.cards[b.id]?.rating===0)-Number(state.cards[a.id]?.rating===0)||(state.cards[a.id]?.due||0)-(state.cards[b.id]?.due||0))}
export function rateCard(state,id,rating){state.cards[id]={rating,due:Date.now()+[60000,600000,86400000,345600000][rating]}}
export function createExam(){return {ids:modules.map(m=>{const pool=questions.filter(q=>q.module===m.id&&q.type!=='identify');return pool[Math.floor(Math.random()*pool.length)].id}),index:0,results:[],started:Date.now(),finished:false,recorded:false}}
