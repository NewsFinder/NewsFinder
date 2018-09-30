
(function(){
	window.addEventListener("load", main);
}());

function main(){

	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("password");
	var btnLogin = document.getElementById("BLogin");
	var btnRec = document.getElementById("BRecPass");

	//Evento Login
	btnLogin.addEventListener("click" , e => {

		var email = txtemail.value;   	// verificar que é e-mail real
		var pass = txtPassword.value;	// requisitos de password
		var auth = firebase.auth();   	// Firebase autenticação

		var confirmation = auth.signInWithEmailAndPassword(email, pass);
		confirmation.catch(e => alert("Não existe um utilizador com esse e-mail."));

	});

	btnRec.addEventListener("click", e => {
		window.location.href = "../html/forgetPassword.html";
	});

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {

		if(firebaseUser){
			console.log(firebaseUser);
			// Entrou. Mudar para pagina feed
			window.location.href = "../html/feed.html";
		}
		else{
			console.log("Logout");
		}
	})
}