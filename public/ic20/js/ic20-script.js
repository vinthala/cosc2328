// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy

// Reflection question answers:
//1. The express.json() does is connecting the two files and sending the data to req.body, and without it req.body in the POST route would be undefined.
//2. The difference between HTTP status 200 and 201 is that the first status means that there is a new object there to save while the second means that there is the full array of missions not just an object to get from the memory; I would use 201 when I need an object from the JSON file specifically (POST), and I would use 200 when I want the entire array (GET).
//3. To make the seed missions persist I would need to make a json file that codes to store it and connect that to app.js and then use get and post on it.
//4. If two people in different brower tabs both added missions at the same time, the list they would see would be the because the missions are not saved into the actual js script in the routes folder.

const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
  const res  = await fetch('/ic20/missions');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name        = document.getElementById('mission-name').value.trim();
  const destination = document.getElementById('mission-dest').value.trim();
  await fetch('/ic20/missions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, destination }),
  });
  form.reset();
  loadMissions();
});

loadMissions();