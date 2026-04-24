// --- 1. Initial Data ---
const students = [
    { name: "G. Deekshitha", roll: "23951A0521", dept: "CSE", status: "Verified" },
    { name: "Vishweshwer Reddy", roll: "23951A0522", dept: "CSE", status: "Verified" },
    { name: "Rahul Kumar", roll: "23951A0523", dept: "IT", status: "Pending" }
];

// --- 2. Authentication Logic ---
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Direct match for project demonstration
    if (user === "23951A0521" && pass === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRoll", user);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials! Try 23951A0521 / admin123");
    }
}

// --- 3. Dashboard Logic ---
function initDashboard() {
    // Check if user is logged in
    if (localStorage.getItem("isLoggedIn") !== "true" && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
        return;
    }

    renderTable();
    lucide.createIcons(); // Initialize icons
}

// --- 4. Render Table Dynamically ---
function renderTable(dataToRender = students) {
    const tableBody = document.getElementById('studentBody');
    if (!tableBody) return;

    tableBody.innerHTML = dataToRender.map((student, index) => `
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
        alert("Student added to the DevOps Registry!");
    }
}

// --- 7. Logout ---
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('studentBody')) {
        initDashboard();
    }
    lucide.createIcons();
});
