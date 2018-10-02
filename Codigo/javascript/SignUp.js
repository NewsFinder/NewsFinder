const caract = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';

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
	txtFirstName.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };
	txtLastName.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };

	btnSignUp.addEventListener("click" , verificar);

	function verificar(){
		var email = txtemail.value;
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
			var controlo = 0;
			for(var i=0; i<caract.length; i++){
				for(var j=0; j<fName.length; j++){
					if(caract[i] == fName[j]){
						controlo++;
					}
				}
			}
			for(var i=0; i<caract.length; i++){
				for(var j=0; j<lName.length; j++){
					if(caract[i] == lName[j]){
						controlo++;
					}
				}
			}
			if(controlo == 0){
				var confirmation = auth.createUserWithEmailAndPassword(email, pass);
				confirmation.catch(e => alert("O e-mail não é válido."));
			}
			else{
				alert("Os nomes nao podem conter caracteres especias!");
			}
		}
	}

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			var user = firebase.auth().currentUser;
			var fName = txtFirstName.value;
			var lName = txtLastName.value;
			user.updateProfile({
  				displayName: fName+"|"+lName
			}).then(function() {
				console.log(firebaseUser);
  				window.location.href = "../html/dados.html";
			}).catch(function(error) {
  				console.log("Erro a guardar o nome");
			});
		}
	})
}