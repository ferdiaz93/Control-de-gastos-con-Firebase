const signupForm = document.getElementById("signup-form");
let uid_firebase = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    signupForm["signup-email"].value = user.email;
    signupForm["signup-email"].disabled = true;
    uid_firebase = user.uid;
  } else {
    console.log("error");
  }
});

console.log(signupForm);
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //Request
  fetch('http://localhost:8000/registro', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      uid_firebase
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
  .then(res => res.json())
  .then(res => {
    
    if (res.success) {
      localStorage.setItem('idUsuario', res.usuario._id);
      window.location = "http://localhost:8000/control-gastos";
    }else{
      console.log("error");
    }
  })
  .catch((err) => {
    console.log(err);
  });
})


