const loginForm = document.getElementById("login-form");


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  
  //Request
  await fetch('http://localhost:8000/login', {
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
  .then(res => res.json())
  .then(res => {
    console.log(res);
    localStorage.setItem('idUsuario', res.usuario._id);
    window.location = "http://localhost:8000/control-gastos";
  })


  // auth.signInWithEmailAndPassword(email, password).then((UserCredential) => {
  //   //   clear the form
  //   loginForm.remove();
  //   window.location = "http://127.0.0.1:5500/frontend/control-gastos.html";
  //   console.log("login");
  // });
});

// Google Login
const btnGoogle = document.querySelector("#btn-google");
btnGoogle.addEventListener("click", (e) => {
  //autenticación con google
  const provider = new firebase.auth.GoogleAuthProvider();
  //muestra un popUp e intenta autenticar con google
  auth
    .signInWithPopup(provider)
    //si funciona, captura un resultado
    .then((result) => {
      console.log("google sign in");
      window.location = "http://localhost:8000/control-gastos";
    })
    .catch((err) => {
      console.log(err);
    });
});

//Facebook Login / BOTON DESACTIVADO!
// const btnFacebook = (document.querySelector("#btn-facebook").disabled = true);
// btnFacebook.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("facebook login");
//   const facebookProvider = new firebase.auth.FacebookAuthProvider();
//   auth
//     .signInWithPopup(facebookProvider)
//     .then((result) => {
//       console.log(result);
//       console.log("facebook singin");
//       window.location = "http://127.0.0.1:5500/control-gastos.html";
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
