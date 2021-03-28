const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //   create a user with email and password
  auth
    .createUserWithEmailAndPassword(email, password)
    // if the user was created successfully, send the credentials to use in Front
    .then((UserCredential) => {
      // clear the form
      signupForm.remove();
      window.location = "http://127.0.0.1:5500/frontend/control-gastos.html";

      console.log("signup");
    });
});

// Events
