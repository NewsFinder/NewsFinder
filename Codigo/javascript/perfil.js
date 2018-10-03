(function(){
	window.addEventListener("load", main);
}());

function main(){

	var foto = document.getElementById("imgF");
	var orcid = document.getElementById("orcid");
	var filiacao = document.getElementById("filiacao");
	var unidade = document.getElementById("unidade");
	var interesses = document.getElementById("interesses");
	var nome = document.getElementById("nome");
	var logout = document.getElementById("LogOut");

	logout.addEventListener("click", e =>{
		firebase.auth().signOut();
		window.location.href = "../html/index.html";
	});
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			nome.innerHTML = firebaseUser.displayName.split("|")[0]+" "+firebaseUser.displayName.split("|")[1];
			orcid.innerHTML += firebaseUser.displayName.split("|")[2];
			filiacao.innerHTML += firebaseUser.displayName.split("|")[3];
			unidade.innerHTML += firebaseUser.displayName.split("|")[4];
			interesses.innerHTML += firebaseUser.displayName.split("|")[5];
			//foto.src = firebaseUser.displayName.split("|")[6];
		}
	});

	
	
}