const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //Request
  fetch('http://localhost:8000/registro', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  //   create a user with email and password
  auth
    .createUserWithEmailAndPassword(email, password)
    // if the user was created successfully, send the credentials to use in Front
    .then((UserCredential) => {
      // clear the form
      signupForm.remove();
      window.location = "http://localhost:8000/control-gastos";

      console.log("signup");
    });
});

// Events
