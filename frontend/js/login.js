const loginForm = document.getElementById("login-form");

auth.signOut();

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
      console.log(result);
      console.log("google sign in");
      const email = result.user.email;
      const uid_firebase = result.user.uid;
      
      fetch("http://localhost:8000/loginFb", {
        method: 'POST',
        body: JSON.stringify({
          email,
          uid_firebase
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
       if (res.success === true) {
        localStorage.setItem('idUsuario', res.usuario._id);
        window.location = "http://localhost:8000/control-gastos";
       }else{
        window.location = "http://localhost:8000/registro";
       }
      })
      
    })
    .catch((err) => {
      console.log(err);
    });
});

