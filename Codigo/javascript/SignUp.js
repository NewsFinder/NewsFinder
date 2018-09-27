
(function(){
	window.addEventListener("load", main);
}());

function main(){

	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("password");
	var btnSignUp = document.getElementById("BSignUp");

	//Evento Login
	btnSignUp.addEventListener("click" , e => {

		var email = txtemail.value;   	// verificar que é e-mail real
		var pass = txtPassword.value;	// requisitos de password
		var auth = firebase.auth();   	// Firebase autenticação

		var confirmation = auth.createUserWithEmailAndPassword(email, pass);
		confirmation.catch(e => console.log(e.message));

	});

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {

		if(firebaseUser){
			console.log(firebaseUser);
			firebase.auth().signOut();
			alert("Registado com sucesso");
			window.location.href = "../html/Start.html";
			// Entrou. Mudar para pagina feed
		}
		else{
			console.log("Logout");
		}
	})
}