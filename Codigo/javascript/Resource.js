(function(){
	window.addEventListener("load", main);
}());

function main(){

	var texto = document.getElementById("Texto");
	var add = document.getElementById("Add");
	var description = document.getElementById("description");
	var link = document.getElementById("link");
	texto.innerHTML = "Description: Center for Informatics and Systems of the Univesity of Coimbra\nLink: https://cisuc.uc.pt/\n\nDescription: DEI - Department of Computer Science - FCTUC\nLink: www.uc.pt/fctuc/dei\n";

	var aux = "";
	var array = [];

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			aux = firebaseUser.displayName.split("|")[6];
			console.log(aux);
			if(aux != ""){
				array = aux.split("~");
				for(let i=0; i<array.length; i++){
					texto.innerHTML += "\nDescription: "+array[i]+"\nLink: "+array[i+1]+"\n";
					i++;
				}
			}
		}
	});

	add.addEventListener("click", baddPressed);
	function baddPressed(){
		if(description.value.length == 0 || link.value.length == 0)
			alert("There is a empty camp.");
		else{
			if(array.indexOf(description.value) != -1 || array.indexOf(link.value) != -1){
				alert("This Description or Link is already added.");
			}
			else{
				array.push(description.value);
				array.push(link.value);
				texto.innerHTML += "\nDescription: "+description.value+"\nLink: "+link.value+"\n";
				var string;
				for(let i=0; i<array.length; i++){
					if(i==0)
						string = array[i];
					else
						string += "~"+array[i];
				}
				var user = firebase.auth().currentUser;
				var aux2 = user.displayName.split("|")[0] +"|"+user.displayName.split("|")[1]+"|"+user.displayName.split("|")[2]+"|"+user.displayName.split("|")[3]+"|"+user.displayName.split("|")[4]+"|"+user.displayName.split("|")[5];
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