if (localStorage.getItem("firebaseIdToken")) {
  // User is logged in
  // hide form id ButtonAuth
  document.getElementById("ButtonLogin").style.display = "none";
  document.getElementById("ButtonRegister").style.display = "none";
  // show form id ButtonLogout
  document.getElementById("ButtonLogout").style.display = "block";

  // show user email
  document.getElementById("userEmail").innerHTML =
    localStorage.getItem("firebaseEmail");
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