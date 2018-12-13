(function(){
	window.addEventListener("load", main);
}());

function main(){

	var texto = document.getElementById("texto");
	var add = document.getElementById("BtAdd");
	var remove = document.getElementById("BtRemove");
	var description = document.getElementById("idDescription");
	var link = document.getElementById("idLink");
	var mini_foto = document.getElementById("mini_foto");
	var btCancel = document.getElementById("BtCancel");
	var btSave = document.getElementById("BtSave");
	var modal = document.getElementById("ModalAdd");
	var nome = document.getElementById("nome_utilizador");


	add.onclick = function(){
		modal.style.display = "block";
	}

	btCancel.onclick = function(){
		modal.style.display = "none";
	}

	window.onclick = function(event){
		if(event.target == modal){
			modal.style.display = "none";
		}
	}


	var listElm = document.querySelector('#infinite-list');
	var item_contados = 0;
	var array = [];

	var loadMore = function() {
	  for (var i = item_contados; i < array.length; i++) {
	    var item = document.createElement('li');
	    item.innerText = "Description: "+array[i];
	    listElm.appendChild(item);
	   
	    var item2 = document.createElement('a');
	    item2.style.color = "#0000FF";
	    if(array[i+1].startsWith("https://"))
	    	item2.href = array[i+1];
	    else
	    	item2.href = "https://"+array[i+1];
	    item2.target = "_blank";
	    item2.innerText = array[i+1];
	    listElm.appendChild(item2);
	    
		var item3 = document.createElement('li');
	    item3.innerText = "\n";
	    listElm.appendChild(item3);

	    i++;
	    item_contados+=2;
	  }
	}
	// Detect when scrolled to bottom.
	listElm.addEventListener('scroll', function() {
	  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
	    loadMore();
	  }
	});


	//texto.innerHTML = "Description: Center for Informatics and Systems of the Univesity of Coimbra\nLink: https://cisuc.uc.pt/\n\nDescription: DEI - Department of Computer Science - FCTUC\nLink: www.uc.pt/fctuc/dei\n\n";

	var aux = "";
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			nome.innerHTML = firebaseUser.displayName.split("|")[0]+" "+firebaseUser.displayName.split("|")[1];
			aux = firebaseUser.displayName.split("|")[7];
			if(aux != ""){
				array = aux.split("~");
				loadMore();
			}

			var controlo_foto;

			controlo_foto = firebaseUser.displayName.split("|")[6];
			
			if(controlo_foto==1){
				var ref = firebase.storage().ref('fotos_perfil/' + retefica_nome(firebaseUser.email) );
				ref.getDownloadURL().then(function(url){
					mini_foto.src = url;
				})
			}
		}
	});

	btSave.addEventListener("click", BtSavePressed);
	function BtSavePressed(){
		if(description.value.length == 0 || link.value.length == 0)
			alert("There is a empty camp.");
		else{
			if(array.indexOf(description.value) != -1 || array.indexOf(link.value) != -1){
				alert("This Description or Link is already added.");
			}
			else{
				array.push(description.value);
				array.push(link.value);
				modal.style.display = "none";
				loadMore();
				var string;
				for(let i=0; i<array.length; i++){
					if(i==0)
						string = array[i];
					else
						string += "~"+array[i];
				}
				var user = firebase.auth().currentUser;
				var aux2 = user.displayName.split("|")[0] +"|"+user.displayName.split("|")[1]+"|"+user.displayName.split("|")[2]+"|"+user.displayName.split("|")[3]+"|"+user.displayName.split("|")[4]+"|"+user.displayName.split("|")[5]+"|"+user.displayName.split("|")[6];
				user.updateProfile({
					displayName: aux2+"|"+string
				}).then(function() {

				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}

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