// IC23 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
// Reflection answers
//1. The three options fetch() POST requires are method 'POST', headers {'Content-Type: 'application/json'},  and body JSON.stringfy({...}); the first matters because GET is used as a default so POST must be specified, the second matters because req.body is undefined without it since it tells Express to parse the body that is JSON , and the third matters because fetch cannot send objects directly so the Javascript object needs to be converted to a JSON string first.
//2. The db.run callback uses function(err) instead of (err) => because arrow functions don't bind their own to this while function does, and the callback needs this.lastID which ID SQLite assigned to the new row; if the error function was used this.lastID would be undefined.
//3. The re-fetch pattern is  to call await loadStudents() after a successful post; it keeps the UI in sync with the server instead of just appending a new <li> directly because it re-fetches the student list from the server after a successful POST and because the server is the source not the client.
//4. The difference about the POST in the Headers and Payload tabs that the GET doesn't have is the JSON body that was sent.

const list = document.getElementById('student-list');

async function loadStudents() {
  try {
    const res  = await fetch('/ic23/students');
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(s => {
      const li   = document.createElement('li');
      const name = document.createElement('p');
      const meta = document.createElement('p');
      name.className = 'name';
      meta.className = 'meta';
      name.textContent = `${s.first_name} ${s.last_name}`;
      meta.textContent = `${s.classification || '—'} — ${s.major || '—'}`;
      li.appendChild(name);
      li.appendChild(meta);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<li>Error loading students: ${err.message}</li>`;
  }
}

document.getElementById('add-btn').addEventListener('click', async () => {
     const first_name = document.getElementById('first-name').value.trim(); 
     const last_name = document.getElementById('last-name').value.trim(); 
     const classification = document.getElementById('classification').value; 
     const major = document.getElementById('major').value.trim(); 
     const result = document.getElementById('add-result'); 
     if (!first_name || !last_name) { result.className = 'error'; 
        result.textContent = 'First name and last name are required.'; 
        return; }

 try { 
    const res = await fetch('/ic23/students', 
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ first_name, last_name, classification, major }) 
    }); 
    const data = await res.json(); 
    if (res.ok)
        { result.className = ''; 
        result.textContent = `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`; 
        document.getElementById('first-name').value = ''; 
        document.getElementById('last-name').value = ''; 
        document.getElementById('classification').value = ''; 
        document.getElementById('major').value = ''; await loadStudents(); 
    } else { result.className = 'error'; 
        result.textContent = data.error || 'Something went wrong.'; } 
    } catch (err) { 
        result.className = 'error'; 
        result.textContent = `Network error: ${err.message}`; } 
    }); 
    loadStudents();
