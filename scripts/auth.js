import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9A1WKkR1kBi7f_JvST9zldRmTTGXLZuA",
  authDomain: "auth-3fefa.firebaseapp.com",
  databaseURL:
    "https://auth-3fefa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-3fefa",
  storageBucket: "auth-3fefa.appspot.com",
  messagingSenderId: "678392158406",
  appId: "1:678392158406:web:16bf798a563d270df15fc7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (localStorage.getItem("firebaseIdToken")) {
  console.log("User is logged in");
  console.log(localStorage.getItem("firebaseIdToken"));
  console.log(localStorage.getItem("firebaseEmail"));
  // User is logged in
  // hide form id ButtonAuth
  document.getElementById("ButtonLogin").style.display = "none";
  document.getElementById("ButtonRegister").style.display = "none";
  // show form id ButtonLogout
  document.getElementById("ButtonLogout").style.display = "block";

  // show user email
  document.getElementById("userEmail").innerHTML = localStorage.getItem(
    "firebaseEmail"
  );
  document.getElementById("userEmail").style.display = "block";

  // get idToken
  // getIdToken();
} else {
  // hide form id ButtonLogout
  document.getElementById("ButtonLogout").style.display = "none";
  // show form id ButtonAuth
  document.getElementById("ButtonLogin").style.display = "block";
  document.getElementById("ButtonRegister").style.display = "block";

  // hide user email
  document.getElementById("userEmail").style.display = "none";

  // clear idToken
  localStorage.removeItem("firebaseIdToken");

  // clear email
  localStorage.removeItem("firebaseEmail");
}

// Sign Up
const RegisterForm = document.getElementById("registerForm");
const RegisterButton = document.getElementById("registerButton");
RegisterButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = RegisterForm["email-input"].value;
  const password = RegisterForm["password-input"].value;
  const confirmPassword = RegisterForm["confirm-password-input"].value;
  if (password === confirmPassword) {
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters!",
      });
      return;
    }
    // when the user successfully registered
    createUserWithEmailAndPassword(auth, email, password);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "You have successfully registered!",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password does not match!",
    });
  }
});

// Sign In
const LoginForm = document.getElementById("loginForm");
const LoginButton = document.getElementById("loginButton");
LoginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = LoginForm["email-input"].value;
  const password = LoginForm["password-input"].value;
  // get firebae auth error
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have successfully logged in!",
      }).then((result) => {
        if (result.isConfirmed) {
          // close modal
          const modal = document.getElementById("loginModal");
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();

          // hide form id ButtonAuth
          document.getElementById("ButtonLogin").style.display = "none";
          document.getElementById("ButtonRegister").style.display = "none";
          // show form id ButtonLogout
          document.getElementById("ButtonLogout").style.display = "block";

          // show user email
          document.getElementById("userEmail").innerHTML = user.email;
          document.getElementById("userEmail").style.display = "block";

          // get idToken
          getIdToken();

          // clear form
          LoginForm.reset();
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    });
});

// Sign Out
const LogoutButton = document.getElementById("ButtonLogout");
LogoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Logged out!", "You have been logged out.", "success");
          // hide form id ButtonLogout
          document.getElementById("ButtonLogout").style.display = "none";
          // show form id ButtonAuth
          document.getElementById("ButtonLogin").style.display = "block";
          document.getElementById("ButtonRegister").style.display = "block";
          // hide user email
          document.getElementById("userEmail").style.display = "none";

          localStorage.removeItem("firebaseIdToken");
        }
      });
    })
    .catch((error) => {
      // An error happened.
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    });
});

// localStorage
function getIdToken() {
  auth.currentUser.getIdToken(true).then((idToken) => {
    localStorage.setItem("firebaseIdToken", idToken);
    console.log(idToken);
  });
  // get email
  localStorage.setItem("firebaseEmail", auth.currentUser.email);
  console.log(auth.currentUser.email);
}
