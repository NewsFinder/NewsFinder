(function(){
	window.addEventListener("load", main);
}());

function main(){
	firebase.auth().signOut();
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
			alert("The email field is empty.");
		}
		else{
			var auth = firebase.auth();

			auth.sendPasswordResetEmail(email).then(function() {
  				alert("We sent an email to change the password.");
  				window.location.href = "../html/index.html";
			}).catch(function(error) {
				alert("There is no user with this email.");
			});
		}
	}
}