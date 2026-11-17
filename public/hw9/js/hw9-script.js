// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
//HW Reflection questions and answers:
//1. require('dotenv').config() loads the .env file into process.env before the route files mount; process.env.PI_LICENSE in hw9-routes.js gets its value through process.env even though dotenv is not called.
//2. The thing that changed from IC20 when the data was submitted that caused a lack of need for a form and e.preventDefault() here was that the plain button does not submit upon click so there was no default to prevent and because of the fetch call; a plain button outside the form does not trigger a page reload because it is not a submit type button nor does it have a default made that reloads the page automatically.
//3. When the docker container restarts the case list is cleared because the array cases holds temporary while the same Node process is running not after the process is ended; to make the data survive a restart you would need to use an SQLite database.
//4. The browser-side code received the 400 through the await fetch() from line 54-57 that goes to the routes hw9 folder and calls post cases routes from app.js which will return the status of response; response.ok helps distinguish from a 400 and a 201 because it returns early if the status is deemed to be 400 which leaves response null.
async function loadCredentials() {
  const res  = await fetch('/hw9/credentials');
  const data = await res.json();
    const d1 = document.getElementById('credentials');
    d1.innerHTML = "";
    Object.entries(data).forEach(([key, value]) => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            dt.textContent = key;
            dd.textContent = value;
            d1.appendChild(dt);
            d1.appendChild(dd);}
  );
}


async function loadCases() {
  const res  = await fetch('/hw9/cases');
  const data = await res.json();

  const ul = document.getElementById('case-list');
  ul.innerHTML = "";
  if (data.length === 0){
        ul.innerHTML = '<li class="empty-msg">No cases filed yet.</li>';
    } else {
        data.forEach( el =>{
        const li = document.createElement('li');
        li.innerHTML = 
            `<p class="case-id">${el.id}</p>` +
            `<p class="case-suspect">${el.suspect}</p>` +
            `<p class="case-location">${el.location}</p>` +
            `<p class="case-notes">${el.notes || "no notes"}</p>` +
            `<p class="case-ts">${el.timestamp}</p>`
        ul.append(li);
        });}
}

const btn = document.getElementById('log-btn');
btn.addEventListener('click', async () => {
  let sus = document.getElementById('suspect');
  let loc = document.getElementById('location');
  let note = document.getElementById('notes');
  let statusMessage = document.getElementById('log-status');
  let suspect = sus.value;
  let location = loc.value;
  let notes = note.value;
  const response = await fetch('/hw9/cases', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ suspect, location, notes }),
  });
  if (!response.ok){
    const status = await response.json();
    document.getElementById('log-status').textContent = status.error;
    return;
  } else {
  statusMessage.innerHTML = "";
  sus.value = "";
  loc.value = "";
  note.value = "";
  await loadCases();
  }
});
loadCredentials();
loadCases();