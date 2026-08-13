// ==========================================
// CAMPUSFLOW LOGIN
// ==========================================

const roles = document.querySelectorAll(".role");

const selectedRole =
  document.getElementById("selectedRole");

const loginForm =
  document.getElementById("loginForm");

const loginMessage =
  document.getElementById("loginMessage");

const password =
  document.getElementById("loginPassword");

const showPassword =
  document.getElementById("showPassword");


// ==========================================
// ROLE SELECTION
// ==========================================

roles.forEach(role => {

  role.addEventListener("click", () => {

    roles.forEach(button => {
      button.classList.remove("active");
    });

    role.classList.add("active");

    selectedRole.value =
      role.dataset.role;

  });

});


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

showPassword.addEventListener("click", () => {

  if (password.type === "password") {

    password.type = "text";

    showPassword.textContent = "Hide";

  } else {

    password.type = "password";

    showPassword.textContent = "Show";

  }

});


// ==========================================
// DEMO ACCOUNTS
// ==========================================

const accounts = {

  student: {
    email: "student@campusflow.com",
    password: "student123"
  },

  faculty: {
    email: "faculty@campusflow.com",
    password: "faculty123"
  },

  admin: {
    email: "admin@campusflow.com",
    password: "admin123"
  }

};


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", event => {

  event.preventDefault();


  const email =
    document.getElementById(
      "loginEmail"
    ).value.trim();


  const enteredPassword =
    password.value;


  const role =
    selectedRole.value;


  const account =
    accounts[role];


  // CHECK LOGIN

  if (
    email === account.email &&
    enteredPassword === account.password
  ) {

    // Store login session

    sessionStorage.setItem(
      "campusflow_logged_in",
      "true"
    );


    sessionStorage.setItem(
      "campusflow_role",
      role
    );


    sessionStorage.setItem(
      "campusflow_email",
      email
    );


    // Remember user

    if (
      document.getElementById(
        "rememberMe"
      ).checked
    ) {

      localStorage.setItem(
        "campusflow_remember",
        "true"
      );

    }


    // SUCCESS MESSAGE

    loginMessage.textContent =
      "Login successful! Opening your dashboard...";

    loginMessage.className =
      "login-message success";


    // Redirect

    setTimeout(() => {

      window.location.href =
        "index.html";

    }, 700);


  } else {

    // ERROR

    loginMessage.textContent =
      "Invalid email or password for the selected role.";

    loginMessage.className =
      "login-message error";

  }

});
