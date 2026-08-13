const initialStudents = [
  {name:"Aarav Sharma",dept:"CSE",cgpa:9.1,skills:["Java","SQL","React"],status:"Placed"},
  {name:"Ananya Rao",dept:"CSE",cgpa:8.6,skills:["Python","ML","SQL"],status:"Interview"},
  {name:"Rahul Verma",dept:"ECE",cgpa:7.4,skills:["C","Embedded"],status:"Applied"},
  {name:"Meera Nair",dept:"CSE",cgpa:9.4,skills:["Java","React","Git"],status:"Placed"},
  {name:"Vikram Reddy",dept:"IT",cgpa:7.8,skills:["Python","Django"],status:"Unplaced"}
];
let students = JSON.parse(localStorage.getItem("campusflow_students")) || initialStudents;
const companies = [
  {name:"TechNova",role:"Software Engineer",required:["Java","SQL","Git"],cgpa:7.5},
  {name:"CloudPeak",role:"Frontend Developer",required:["React","JavaScript","Git"],cgpa:7},
  {name:"DataSphere",role:"Data Analyst",required:["Python","SQL"],cgpa:7.2},
  {name:"QuantumSoft",role:"Backend Engineer",required:["Java","SQL"],cgpa:8}
];
const app=document.getElementById("app"), title=document.getElementById("pageTitle");

function save(){localStorage.setItem("campusflow_students",JSON.stringify(students))}
function readiness(s){let score=0; score+=Math.min(s.cgpa/10*30,30); score+=Math.min(s.skills.length/6*30,30); score+=s.status==="Placed"?30:s.status==="Interview"?20:s.status==="Applied"?10:5; return Math.round(score)}
function badge(status){let c=status==="Placed"?"green":status==="Interview"||status==="Applied"?"yellow":"red";return `<span class="pill ${c}">${status}</span>`}
function render(view="overview"){
  title.textContent={overview:"Overview",students:"Students 360°",placements:"Placement Hub",skills:"Skill Gap",companies:"Company Match",analytics:"Analytics"}[view];
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  if(view==="overview") overview(); if(view==="students") studentsView(); if(view==="placements") placements(); if(view==="skills") skills(); if(view==="companies") companyMatch(); if(view==="analytics") analytics();
}
function overview(){
 const placed=students.filter(s=>s.status==="Placed").length, avg=(students.reduce((a,s)=>a+s.cgpa,0)/students.length).toFixed(2), rate=Math.round(placed/students.length*100);
 app.innerHTML=`<div class="grid stats">
 ${stat("Students",students.length,"+12% this month")}${stat("Placement Rate",rate+"%","+8% this season")}${stat("Average CGPA",avg,"Across active cohort")}${stat("Readiness",Math.round(students.reduce((a,s)=>a+readiness(s),0)/students.length)+"/100","Cohort score")}
 </div><br>
 <div class="grid two"><div class="card"><div class="card-head"><h2>Placement readiness</h2><span class="muted small">Live</span></div>
 ${students.slice(0,4).map(s=>`<div class="bar-row"><div class="bar-meta"><span>${s.name}</span><strong>${readiness(s)}</strong></div><div class="progress"><span style="width:${readiness(s)}%"></span></div></div>`).join("")}</div>
 <div class="card"><div class="card-head"><h2>What should I do next?</h2></div>
 <div class="recommend">🎯 Complete one role-aligned project</div><div class="recommend">📚 Close your biggest skill gap</div><div class="recommend">🏢 Apply to 3 high-match companies</div><div class="recommend">🧪 Take a mock technical assessment</div></div></div><br>
 <div class="grid three">${feature("🧠","Smart Eligibility","Explain exactly why a student qualifies or misses a company requirement.")}${feature("🛣️","Skill-Gap Analyzer","Compare current skills with target-role requirements.")}${feature("🔔","Deadline Center","Prioritize applications, assessments and interviews.")}</div>`;
}
function stat(l,v,t){return `<div class="card"><div class="stat-label">${l}</div><div class="stat-value">${v}</div><div class="trend">${t}</div></div>`}
function feature(i,t,p){return `<div class="card feature"><div>${i}</div><h3>${t}</h3><p>${p}</p></div>`}
function studentsView(){
 app.innerHTML=`<div class="card"><div class="card-head"><div class="actions"><input class="search" id="search" placeholder="Search students..."><button class="primary" id="add">+ Add Student</button></div></div><div class="table-wrap"><table class="table"><thead><tr><th>Student</th><th>Dept</th><th>CGPA</th><th>Skills</th><th>Readiness</th><th>Status</th></tr></thead><tbody id="studentRows">${rows(students)}</tbody></table></div></div>`;
 document.getElementById("add").onclick=()=>document.getElementById("studentDialog").showModal();
 document.getElementById("search").oninput=e=>document.getElementById("studentRows").innerHTML=rows(students.filter(s=>(s.name+s.dept+s.skills.join()).toLowerCase().includes(e.target.value.toLowerCase())));
}
function rows(list){return list.map(s=>`<tr><td><strong>${s.name}</strong></td><td>${s.dept}</td><td>${s.cgpa}</td><td>${s.skills.map(x=>`<span class="pill skill">${x}</span>`).join("")}</td><td>${readiness(s)}/100</td><td>${badge(s.status)}</td></tr>`).join("")}
function placements(){
 app.innerHTML=`<div class="grid two"><div class="card"><div class="card-head"><h2>Application pipeline</h2></div>${["Applied","Interview","Placed","Unplaced"].map(st=>{let n=students.filter(s=>s.status===st).length;return `<div class="bar-row"><div class="bar-meta"><span>${st}</span><strong>${n}</strong></div><div class="progress"><span style="width:${Math.max(5,n/students.length*100)}%"></span></div></div>`}).join("")}</div><div class="card"><h2>Upcoming actions</h2><div class="recommend">🔴 Application deadline — TechNova — Tomorrow</div><div class="recommend">🟡 Technical interview — CloudPeak — Friday</div><div class="recommend">🟢 Mock assessment — DataSphere — Monday</div></div></div><br><div class="card"><div class="card-head"><h2>Placement tracker</h2><span class="muted small">${students.length} active records</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Student</th><th>Company stage</th><th>Readiness</th></tr></thead><tbody>${students.map(s=>`<tr><td>${s.name}</td><td>${badge(s.status)}</td><td>${readiness(s)}/100</td></tr>`).join("")}</tbody></table></div></div>`;
}
function skills(){
 const target=["Java","SQL","Git","React","JavaScript","REST APIs","Testing"];
 app.innerHTML=`<div class="grid two"><div class="card"><div class="card-head"><h2>Target: Software Developer</h2><span class="score">82</span></div><p class="muted small">Example readiness profile for the cohort.</p>${target.map(x=>`<div class="bar-row"><div class="bar-meta"><span>${x}</span><strong>${students.some(s=>s.skills.includes(x))?"Covered":"Gap"}</strong></div><div class="progress"><span style="width:${students.some(s=>s.skills.includes(x))?85:25}%"></span></div></div>`).join("")}</div><div class="card"><h2>Recommended learning path</h2><div class="recommend">1. Master REST APIs</div><div class="recommend">2. Build a React + API project</div><div class="recommend">3. Add automated JavaScript tests</div><div class="recommend">4. Practice DSA twice a week</div></div></div>`;
}
function companyMatch(){
 const s=students[0];
 app.innerHTML=`<div class="card"><div class="card-head"><div><h2>Best matches for ${s.name}</h2><span class="muted small">Based on skills, CGPA and role requirements</span></div></div><div class="grid three">${companies.map(c=>{const matches=c.required.filter(x=>s.skills.includes(x)).length;const score=Math.round(matches/c.required.length*70+(s.cgpa>=c.cgpa?30:10));return `<div class="card"><div class="stat-label">${c.role}</div><h2>${c.name}</h2><div class="score">${score}%</div><p class="small muted">${matches}/${c.required.length} required skills matched · CGPA ${c.cgpa}+</p>${c.required.map(x=>`<span class="pill ${s.skills.includes(x)?"green":"red"} skill">${x}</span>`).join("")}</div>`}).join("")}</div></div>`;
}
function analytics(){
 const placed=students.filter(s=>s.status==="Placed").length;
 app.innerHTML=`<div class="grid stats">${stat("Placed",placed,Math.round(placed/students.length*100)+"% of cohort")}${stat("Interview",students.filter(s=>s.status==="Interview").length,"Active pipeline")}${stat("Applications",students.filter(s=>s.status==="Applied").length,"Need follow-up")}${stat("Skill Gaps",7,"Most demanded: APIs")}</div><br><div class="grid two"><div class="card"><h2>Department distribution</h2><div class="bar-row"><div class="bar-meta"><span>CSE</span><strong>${students.filter(s=>s.dept==="CSE").length}</strong></div><div class="progress"><span style="width:80%"></span></div></div><div class="bar-row"><div class="bar-meta"><span>ECE</span><strong>${students.filter(s=>s.dept==="ECE").length}</strong></div><div class="progress"><span style="width:35%"></span></div></div><div class="bar-row"><div class="bar-meta"><span>IT</span><strong>${students.filter(s=>s.dept==="IT").length}</strong></div><div class="progress"><span style="width:25%"></span></div></div></div><div class="card"><h2>Most demanded skills</h2><p class="recommend">JavaScript <b>84%</b></p><p class="recommend">SQL <b>78%</b></p><p class="recommend">React <b>72%</b></p><p class="recommend">Git <b>69%</b></p></div></div>`;
}
document.getElementById("nav").onclick=e=>{if(e.target.dataset.view)render(e.target.dataset.view)}
document.getElementById("studentForm").onsubmit=e=>{e.preventDefault();students.push({name:studentName.value,dept:studentDept.value,cgpa:+studentCgpa.value,skills:studentSkills.value.split(",").map(x=>x.trim()).filter(Boolean),status:"Applied"});save();document.getElementById("studentDialog").close();render("students")}
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("dark");
render();
