// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy

async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();


    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
        list.appendChild(li);
    });

}

//Step 6 - look up one student by ID
document.getElementById('lookup-btn').addEventListener('click', async () =>{
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    }else{
        result.textContent = `${student.first_name}, ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});
loadStudents();