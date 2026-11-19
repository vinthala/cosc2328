// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
//Reflection answers:
//1. db.all() gets the entire array while db.get() gets a single element from the array; I would use the first when I need all of the students, and the second when I want only one.
//2. 'SELECT * FROM students WHERE id = ' + id is wrong because it should be 'SELECT * FROM students WHERE id = ?', [id]; the mistake will the cause the entire table to be deleted after the request.
//3. The naming of rows for db.all and row for db.get are conventional because the first is looking for the entire array of rows to return while the other is looking to return one row within the array
//4. express uses db.get when iterating through the rows and errors and returns student not found when the row called (7) does not exist and calls res.json on the row when it does exist which results on returning the student.

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