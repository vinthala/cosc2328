// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
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