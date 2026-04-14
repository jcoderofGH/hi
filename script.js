// members fetching
function fetchMembers() {
async function go(){
try{
const r=await fetch('https://api.chess.com/pub/club/chess-coms-unofficial-club/members');
const d=await r.json();
const all=[...(d.weekly||[]),...(d.monthly||[])].sort((a,b)=>b.joined-a.joined).slice(0,3);
const rows=await Promise.all(all.map(async m=>{
const[pj,st]=await Promise.all([fetch('https://api.chess.com/pub/player/'+m.username).then(x=>x.json()),fetch('https://api.chess.com/pub/player/'+m.username+'/stats').then(x=>x.json())]);
const rats=[{t:'Rapid',v:st.chess_rapid?.last?.rating},{t:'Blitz',v:st.chess_blitz?.last?.rating},{t:'Bullet',v:st.chess_bullet?.last?.rating},{t:'Daily',v:st.chess_daily?.last?.rating}].filter(x=>x.v).sort((a,b)=>b.v-a.v);
const best=rats[0]||{t:'?',v:'?'};
return{u:m.username,av:pj.avatar||'https://taki2023.github.io/taki/default-pawn.png',rt:best.t,rv:best.v,j:m.joined};
}));
document.getElementById('membersList').innerHTML=rows.map(m=>`<a class="m-card" href="https://www.chess.com/member/${m.u}" target="_blank"><img class="m-av" src="${m.av}"><div><div class="m-name">@${m.u}</div><div class="m-meta">${m.rt}: ${m.rv}</div></div><div class="m-time">⏱ ${ago(m.j)}</div></a>`).join('');
}catch(e){document.getElementById('membersList').innerHTML='<div style="color:var(--text-muted);font-size:11px;padding:8px;">Unable to load members</div>';}
}}

// calendar rendering
function renderCalendar() {
function getEvents(year,month){
const events={};
function nthWeekday(n,wd,y,m){let count=0;for(let d=1;d<=new Date(y,m+1,0).getDate();d++){if(new Date(y,m,d).getDay()===wd){count++;if(count===n)return d;}}return null;}
function lastWeekday(wd,y,m){let last=null;for(let d=1;d<=new Date(y,m+1,0).getDate();d++){if(new Date(y,m,d).getDay()===wd)last=d;}return last;}
function addEv(day,text){if(!events[day])events[day]=[];events[day].push(text);}
const mon2=nthWeekday(2,1,year,month);if(mon2)addEv(mon2,'U-700 Team Match');
const thu1=nthWeekday(1,4,year,month);if(thu1)addEv(thu1,'U-1100 Team Match');
const lastWed=lastWeekday(3,year,month);if(lastWed)addEv(lastWed,'Daily Match');
const sat3=nthWeekday(3,6,year,month);if(sat3)addEv(sat3,'Vote Chess');
const sun1=nthWeekday(1,0,year,month);if(sun1)addEv(sun1,'Community Game');
return events;
}}

// milestones tracking
function trackMilestones() {
const MILESTONES=[
{val:'10',thresh:10,date:'Jan 21',reached:false},
{val:'100',thresh:100,date:'Nov 27',reached:false},
{val:'500',thresh:500,date:'Feb 06',reached:false},
{val:'1K',thresh:1000,date:'Apr 09',reached:false},
{val:'2K',thresh:2000,date:'—',reached:false},
{val:'5K',thresh:5000,date:'—',reached:false},
];}

// music player functionality
function musicPlayer() {
const DB=[
{title:'Montage Rugada - Mafia',src:'https://raw.githubusercontent.com/taki2023/taki/main/MONTAGEM RUGADA - MAFIA.mp3'},
{title:'Montage Coma Slowed',src:'https://raw.githubusercontent.com/taki2023/taki/main/Montagem-Coma.mp3'},
// ... more tracks
];}
