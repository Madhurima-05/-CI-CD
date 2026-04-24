// --- 1. Data Store ---
const students = [
    { name: "G. Deekshitha", roll: "23951A0521", dept: "CSE", status: "Verified" },
    { name: "Vishweshwer Reddy", roll: "24951A05H0", dept: "CSE", status: "Verified" },
    { name: "Rahul Kumar", roll: "23951A0523", dept: "IT", status: "Pending" }
];

// --- 2. Login Logic ---
function handleLogin() {
    const user = document.getElementById('username').value.toLowerCase();
    const pass = document.getElementById('password').value;

    if (user === "24951a05h0" && pass === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Details! Please try again.");
    }
}

// --- 3. Tab Switching Logic ---
function showTab(tabName) {
    // Update Sidebar UI
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');

    const metrics = document.getElementById('metrics-section');
    const tableTitle = document.getElementById('table-title');
    const tableHead = document.getElementById('table-head');
    const addBtn = document.getElementById('add-btn');
    const tableBody = document.getElementById('studentBody');

    if (tabName === 'overview') {
        metrics.style.display = 'grid';
        tableTitle.innerText = "Student Registry";
        tableHead.style.display = 'table-header-group';
        addBtn.style.display = 'block';
        renderTable();
    } 
    else if (tabName === 'students') {
        metrics.style.display = 'none';
        tableTitle.innerText = "Detailed Student List";
        tableHead.style.display = 'table-header-group';
        addBtn.style.display = 'block';
        renderTable();
    } 
    else if (tabName === 'logs') {
        metrics.style.display = 'none';
        tableTitle.innerText = "CI/CD Build Logs";
        tableHead.style.display = 'none'; // Hide headers for logs
        addBtn.style.display = 'none';
        
        tableBody.innerHTML = `
            <tr><td colspan="4" style="font-family: 'Courier New', monospace; background: #1e293b; color: #34d399; padding: 20px; line-height: 1.6; border-radius: 8px;">
                > [INFO] Initializing CI/CD Pipeline...<br>
                > [INFO] Fetching repository: Madhurima-05/-CI-CD<br>
                > [SUCCESS] Checkout completed.<br>
                > [INFO] Running Build Scripts...<br>
                > [SUCCESS] Production build generated in 3m 24s.<br>
                > [INFO] Deploying to Netlify...<br>
                > [SUCCESS] Site is live at ci-cd-student.netlify.app<br>
                > [METRIC] Overall Build Success Rate: 98.2%
            </td></tr>
        `;
    }
    lucide.createIcons();
}

// --- 4. Table Rendering ---
function renderTable(data = students) {
    const tableBody = document.getElementById('studentBody');
    if (!tableBody) return;

    tableBody.innerHTML = data.map(s => `
        <tr>
            <td><div style="display:flex; align-items:center; gap:10px;">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=${s.name}" style="width:30px; border-radius:50%;">
                ${s.name}</div></td>
            <td style="font-weight:600;">${s.roll}</td>
            <td>${s.dept}</td>
            <td><span class="status-tag ${s.status === 'Verified' ? 'success' : 'warning'}">${s.status}</span></td>
        </tr>
    `).join('');
}

// --- 5. Utilities ---
function filterTable() {
    const term = document.getElementById('studentSearch').value.toUpperCase();
    const filtered = students.filter(s => s.roll.toUpperCase().includes(term) || s.name.toUpperCase().includes(term));
    renderTable(filtered);
}

function addNew() {
    const name = prompt("Student Name:");
    const roll = prompt("Roll Number:");
    if (name && roll) {
        students.push({ name, roll, dept: "CSE", status: "Pending" });
        renderTable();
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// On Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('studentBody')) {
        if(localStorage.getItem("isLoggedIn") !== "true") {
            window.location.href = "index.html";
        }
        renderTable();
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
