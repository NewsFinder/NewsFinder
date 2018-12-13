const caract = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';

(function(){
	window.addEventListener("load", main);
}());

function main(){
	firebase.auth().signOut();
	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("passwordtxt");
	var txtConfirma = document.getElementById("confpasswordtxt");
	var btnSignUp = document.getElementById("BSignUp");

	txtemail.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };
	txtPassword.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };
	txtConfirma.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };

	btnSignUp.addEventListener("click" , verificar);

	function verificar(){
		var email = txtemail.value;
		var pass = txtPassword.value;
		var conf = txtConfirma.value;
		var auth = firebase.auth();   	// Firebase autenticação

		if(email.length == 0){
			alert("The email field is empty.");
		}
		else if(pass.length<6 || pass.length>24){
			alert("The password must be between 6 and 24 characters.");
		}
		else if(pass!=conf){
			alert("Passwords must match.");
		}
		else{
			var controlo = 0;
			
			if(controlo == 0){
				var confirmation = auth.createUserWithEmailAndPassword(email, pass);
				confirmation.catch(e => {
					if(e.code == "auth/email-already-in-use")
						alert("A user with this email already exists.");
					else
						alert("Email format is not valid.");
				});
			}
			else{
				alert("Names can not contain special characters.");
			}
		}
	}

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			var user = firebase.auth().currentUser;
			user.updateProfile({
  				displayName: "..."
			}).then(function() {
  				window.location.href = "../html/dados.html";
			}).catch(function(error) {
  				console.log("Erro a guardar o nome");
			});
		}
	})
}