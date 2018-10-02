(function(){
	window.addEventListener("load", main);
}());

function main(){

	var txtemail = document.getElementById("email");
	var btnRecPass= document.getElementById("BRec");

	txtemail.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };

	//Evento Login
	btnRecPass.addEventListener("click" , verificar); 
	function verificar(){

		var email = txtemail.value;   	// verificar que é e-mail real

		if(email.length == 0){
			alert("O campo e-mail está vazio.");
		}
		else{
			var auth = firebase.auth();

			auth.sendPasswordResetEmail(email).then(function() {
  				alert("Enviamos um e-mail para alteracao da password.");
  				window.location.href = "../html/index.html";
			}).catch(function(error) {
				alert("Nao existe um utilizador com o e-mail inserido.");
			});
		}
	}
}