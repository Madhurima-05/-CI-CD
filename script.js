// Initial data mimicking your project structure [cite: 275]
const students = [
    { name: "G. Deekshitha", roll: "23951A0521", status: "Active" }
];

function renderTable() {
    const body = document.getElementById('studentBody');
    body.innerHTML = '';
    
    students.forEach(student => {
        const row = `<tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td style="color: green; font-weight: bold;">${student.status}</td>
        </tr>`;
        body.innerHTML += row;
    });
}

function addStudent() {
    const name = document.getElementById('studentName').value;
    const roll = document.getElementById('rollNo').value;

    if (name && roll) {
        students.push({ name, roll, status: "Active" });
        renderTable();
        
        // Clear inputs
        document.getElementById('studentName').value = '';
        document.getElementById('rollNo').value = '';
    } else {
        alert("Please fill in both fields");
    }
}

// Initial render
renderTable();