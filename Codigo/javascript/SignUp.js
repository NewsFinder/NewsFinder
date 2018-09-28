const carct = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€"+'"'; //Fazer verificacao

(function(){
	window.addEventListener("load", main);
}());

function main(){

	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("password");
	var txtConfirma = document.getElementById("confpassword");
	var txtFirstName = document.getElementById("FirstName");
	var txtLastName = document.getElementById("LastName");
	var btnSignUp = document.getElementById("BSignUp");

	//Evento Login
	btnSignUp.addEventListener("click" , e => {

		var email = txtemail.value;   	// verificar que é e-mail real
		var pass = txtPassword.value;
		var conf = txtConfirma.value;
		var fName = txtFirstName.value;
		var lName = txtLastName.value;
		var auth = firebase.auth();   	// Firebase autenticação

		if(email.length == 0){
			alert("O campo e-mail está vazio.");
		}
		else if(pass.length<6 || pass.length>24){
			alert("A password deve conter entre 6 a 24 caracteres.");
		}
		else if(pass!=conf){
			alert("As passwords têm de coincidir.");
		}
		else if(fName.length<2 || lName.length<2){
			alert("Os nomes devem ter no mínimo 3 caracteres.");
		}
		else{
			var confirmation = auth.createUserWithEmailAndPassword(email, pass);
			confirmation.catch(e => alert("O e-mail não é válido."));
		}

	});

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			var user = firebase.auth().currentUser;
			var fName = txtFirstName.value;
			var lName = txtLastName.value;
			user.updateProfile({
  				displayName: fName+"|"+lName
			}).then(function() {
  				//console.log("Com sucesso!");
			}).catch(function(error) {
  				console.log("Erro a guardar o nome");
			});
			console.log(firebaseUser);
			firebase.auth().signOut();
			alert("Registado com sucesso");
			//window.location.href = "../html/Start.html";
			// Entrou. Mudar para pagina feed
		}
		else{
			console.log("Logout");
		}
	})
}