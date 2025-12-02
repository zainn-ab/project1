const students = JSON.parse(localStorage.getItem("students")) || [];
const cardContainer = document.querySelector("#cardContainer");

function getFormattedTime() {
  return new Date().toLocaleString("en-IN");
}

cardContainer.innerHTML = "";

students.forEach(student => {

  // Each student MUST have an activity array
  if (!student.activities) student.activities = [];

  const card = document.createElement("div");
  card.classList.add("card");

  card.dataset.roll=String(student.rollNumber || "").toLowerCase()
  card.innerHTML = `
    <div class="card-header">
      <div class="user-info">
        <div class="avatar">A</div>
        <div class="user-text">
          <div class="user-name">${student.name}</div>
          <div class="user-meta">
            <div class="meta-item"><span class="meta-icon">🏠</span>${student.roomNumber}</div>
            <div class="meta-item"><span class="meta-icon">📞</span>${student.phoneNumber}</div>

            <div class="meta-item"><img src="usericon.jpeg" style="width:20px"><span class="roll-number">${student.rollNumber}</span></div>

          </div>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn-inactive btn-out" style="background-color:#519ccb">Mark Out</button>
        <button class="btn-inactive btn-in" style="background-color:gray">Mark In</button>
      </div>
    </div>

    <div class="divider"></div>

    <div class="activity-header">
      <span class="activity-header-icon">⏱</span>
      <span>Recent Activity</span>
    </div>

    <div class="activity-list"></div>
  `;

  cardContainer.appendChild(card);

  const btnOut = card.querySelector(".btn-out");
  const btnIn  = card.querySelector(".btn-in");

  const activityList = card.querySelector(".activity-list");
  const last= student.activities.at(-1);
  if(!last || last.type==="In")
  {
    btnIn.disabled = true;      // Can't mark IN again
    btnOut.disabled = false;    // Can mark OUT first
  }else{
    btnIn.disabled=false;
    btnOut.disabled=true;
  }

  function renderActivities() {
    activityList.innerHTML = ""; 
   
    const lastThree = student.activities.slice(-3).reverse();   // mark out, mark in; 
    lastThree.forEach(act => {
      const item = document.createElement("div");
      item.classList.add("activity-item");
      item.innerHTML = `
        <div class="activity-icon ${act.type === 'In' ? 'in' : 'out'}">⮕</div>
        <div class="activity-text">
          <div class="activity-title">${act.type === "In" ? "Returned" : "Went Out"}</div>
          <div class="activity-time">${act.time}</div>
        </div>
      `;
       activityList.appendChild(item); // appending item div inside activity list div
    });
  }
  // FIRST RENDER (if the student already has old data)
  renderActivities();
  btnOut.addEventListener("click", () => {
  // ❗ Disable OUT button & enable IN button 
      btnOut.disabled = true;
      btnIn.disabled = false;
      student.activities.push({
      type: "Out",
      time: getFormattedTime()
    });
    renderActivities();
    localStorage.setItem("students", JSON.stringify(students));
    });
  btnIn.addEventListener("click", () => {
    // ❗ Disable IN button & enable OUT button
      btnIn.disabled = true;
      btnOut.disabled = false;
    student.activities.push({
      type: "In",
      time: getFormattedTime()
    });
    renderActivities();
    localStorage.setItem("students", JSON.stringify(students));
  });
});
function reset(){
  localStorage.clear();
  location.reload();
}
function searchItems(){
  const input=(document.getElementById("search")?.value || "").trim().toLowerCase();
  const cards=document.querySelectorAll("#cardContainer .card");
  cards.forEach(card=>{
     const roll= card.dataset.roll || "";
     if(!input || roll.includes(input)){
       card.style.display="";
      }else{
        card.style.display="none";
      }
   });
}
