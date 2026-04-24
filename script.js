// --- 1. Student Database ---
const students = [
    { name: "G. Deekshitha", roll: "23951A0521", dept: "CSE", status: "Verified" },
    { name: "Vishweshwer Reddy", roll: "24951A05H0", dept: "CSE", status: "Verified" },
    { name: "Rahul Kumar", roll: "23951A0523", dept: "IT", status: "Pending" },
    { name: "Sneha Lata", roll: "23951A0524", dept: "ECE", status: "Verified" }
];
function handleLogin() {
    // .toLowerCase() makes it work whether you type 'A' or 'a'
    const user = document.getElementById('username').value.toLowerCase();
    const pass = document.getElementById('password').value;

    console.log("Login Attempt:", user);

    if (user === "24951a05h0" && pass === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRoll", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied! Check your Roll Number and Password.");
    }
}


// --- 3. Dashboard Initialization ---
function initDashboard() {
    // Check if user is logged in before showing data
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    renderTable();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- 4. Render Table Dynamically ---
function renderTable(dataToRender = students) {
    const tableBody = document.getElementById('studentBody');
    if (!tableBody) return;

    tableBody.innerHTML = dataToRender.map(student => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="https://api.dicebear.com/7.x/initials/svg?seed=${student.name}" style="width: 30px; border-radius: 50%;">
                    ${student.name}
                </div>
            </td>
            <td style="font-family: monospace; font-weight: 600;">${student.roll}</td>
            <td>${student.dept}</td>
            <td>
                <span class="status-tag ${student.status === 'Verified' ? 'success' : 'warning'}">
                    ${student.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// --- 5. Search Filter Function ---
function filterTable() {
    const searchTerm = document.getElementById('studentSearch').value.toUpperCase();
    const filtered = students.filter(s => 
        s.roll.toUpperCase().includes(searchTerm) || 
        s.name.toUpperCase().includes(searchTerm)
    );
    renderTable(filtered);
}

// --- 6. Add New Entry ---
function addNew() {
    const name = prompt("Enter Student Name:");
    const roll = prompt("Enter Roll Number:");
    
    if (name && roll) {
        students.push({
            name: name,
            roll: roll,
            dept: "CSE",
            status: "Pending"
        });
        renderTable();
        alert("Successfully added to the DevOps Registry!");
    }
}

// --- 7. Logout ---
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// --- 8. Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // If we are on the dashboard page
    if (document.getElementById('studentBody')) {
        initDashboard();
    }
    
    // Initialize icons if the library is loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
