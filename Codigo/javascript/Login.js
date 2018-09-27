
(function(){
	window.addEventListener("load", main);
}());

function main(){

	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("password");
	var btnLogin = document.getElementById("BLogin");

	//Evento Login
	btnLogin.addEventListener("click" , e => {

		var email = txtemail.value;   	// verificar que é e-mail real
		var pass = txtPassword.value;	// requisitos de password
		var auth = firebase.auth();   	// Firebase autenticação

		var confirmation = auth.signInWithEmailAndPassword(email, pass);
		confirmation.catch(e => console.log(e.message));

	});

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {

		if(firebaseUser){
			console.log(firebaseUser);
			// Entrou. Mudar para pagina feed
			alert("Login efetuado com sucesso");
			firebase.auth().signOut();
		}
		else{
			console.log("Logout");
		}
	})
}