(function(){
	window.addEventListener("load", main);
}());

function main(){

	var foto = document.getElementById("foto");
	var orcid = document.getElementById("orcid");
	var filiacao = document.getElementById("filiacao");
	var unidade = document.getElementById("unidade");
	var interesses = document.getElementById("interesses");
	var bsave = document.getElementById("Save");


	window.addEventListener("beforeunload", function(e){
		firebase.auth().signOut();
	}, true);

	bsave.addEventListener("click", bsavePressed);

	function bsavePressed(){
		//atualizar informação dos campos text
		//controlo ORCID 
		window.location.href="../html/feed.html";
	}

	
}