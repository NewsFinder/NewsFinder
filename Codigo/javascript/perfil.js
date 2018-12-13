(function(){
	window.addEventListener("load", main);
}());

function main(){

	var foto = document.getElementById("foto_perfil");
	var orcid = document.getElementById("orcid");
	var filiacao = document.getElementById("filiacao");
	var unidade = document.getElementById("unidade");
	var interesses = document.getElementById("interesses");
	var nome = document.getElementById("nome");
	var logout = document.getElementById("LogOut");
	var change = document.getElementById("btnChange");
	var mini_foto = document.getElementById("mini_foto");

	logout.addEventListener("click", e =>{
		firebase.auth().signOut();
		window.location.href = "../html/index.html";
	});

	/*change.addEventListener("click", e =>{
		window.location.href = "../html/changeProfile.html";
	});*/
	
	var controlo_foto;

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			//console.log(firebaseUser);
			nome.innerHTML = firebaseUser.displayName.split("|")[0]+" "+firebaseUser.displayName.split("|")[1];
			orcid.innerHTML += firebaseUser.displayName.split("|")[2];
			filiacao.innerHTML += firebaseUser.displayName.split("|")[3];
			unidade.innerHTML += firebaseUser.displayName.split("|")[4];
			interesses.innerHTML += firebaseUser.displayName.split("|")[5];
			controlo_foto = firebaseUser.displayName.split("|")[6];
			
			if(controlo_foto==1){
				var ref = firebase.storage().ref('fotos_perfil/' + retefica_nome(firebaseUser.email) );
				ref.getDownloadURL().then(function(url){
					foto.src = url;
					mini_foto.src = url;
					foto.width=150;
					foto.height=150;
				})
			}
		}
	});	
}

function retefica_nome(nome){

	//Alteração de '.' -> '!'  e '@' -> '#' para ser aceite no storage
	var aux;

	aux = nome.replace('@','#');

	for(var i=0 ; i<nome.length; i++)
		if(nome[i].localeCompare('.')==0)
			aux = aux.replace('.','!');

	return aux;
}