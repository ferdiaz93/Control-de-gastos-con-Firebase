const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  console.log(email, password);

  auth.signInWithEmailAndPassword(email, password).then((UserCredential) => {
    //   clear the form
    loginForm.remove();
    window.location = "http://127.0.0.1:5500/control-gastos.html";
    console.log("login");
  });
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
      window.location = "http://127.0.0.1:5500/control-gastos.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

//Facebook Login / BOTON DESACTIVADO!
const btnFacebook = (document.querySelector("#btn-facebook").disabled = true);
btnFacebook.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("facebook login");
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(facebookProvider)
    .then((result) => {
      console.log(result);
      console.log("facebook singin");
      window.location = "http://127.0.0.1:5500/control-gastos.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
