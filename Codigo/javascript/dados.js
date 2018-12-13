const caract = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';
const caract_2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';


(function(){
	window.addEventListener("load", main);
}());

function main(){

	var foto = document.getElementById("foto");
	var orcid = document.getElementById("orcid");
	var unidade = document.getElementById("unidade");
	var bsave = document.getElementById("Save");

	var img_controlo = 1;

	bsave.addEventListener("click", bsavePressed);

	function bsavePressed(){
		var photo = foto.files[0];

		if(photo == null){
			img_controlo = 0;
		}
		if(orcid.value.length == 0)
			alert("The ORCID field is empty.");
		else if(unidade.value.length == 0)
			alert("The Research Unit field is empty.");
		else if(img_controlo==1 && !photo.name.includes(".jpg") && !photo.name.includes(".png") && !photo.name.includes(".jpeg"))
			alert("Photo must be JPEG or PNG format.");
		else{
			//Buscar utilizador e suas informações
			var user = firebase.auth().currentUser;

			//Upload
			if(img_controlo==1){
				//Dar storage da foto
				//Criar referencia do storage
				var storage = firebase.storage().ref('fotos_perfil/' + valida_nome(user.email));
				var task = storage.put(photo);

				task.on('state_changed', 

					function progress(snapshot){
						console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
					},

					function error(err){
						console.log(err);				
					},

					function complete(){
						finaliza();
							
				});
			}
			else 
				finaliza();

			function finaliza(){
				//Controlo de segurança de strings
				var controlo = 0;
					
				window.addEventListener("message" , mensagem);

				controlo += verificar(unidade.value, 0);
				controlo += verificar(orcid.value, 1);
				var orcidID;

				if(controlo==0){
					orcidID = transforma_orcid(orcid.value);
					checkORCIDProfile(orcidID);
				}	
							
				function mensagem(ev){
					if(ev.data == "ORCID_1"){
						controlo+= 1;
						alert("ORCID number is not valid");
					}
					else{
						var keywords = le_XML(orcidID, "keyword:content");
						var nome = le_XML(orcidID, "personal-details:given-names") + "|" + le_XML(orcidID, "personal-details:family-name");
						var filiacao = ""; 
						console.log(keywords + " | " + nome + " | " + orcidID);

						if(img_controlo == 1){
							var reader = new FileReader();
							reader.onloadend = function () {
							
								user.updateProfile({
									//faltar ler ficheiro XML
									displayName: nome+"|"+orcidID+"|"+filiacao+"|"+unidade.value+"|"+keywords+"|"+img_controlo+"|"
								}).then(function() {

									window.location.href="../html/feed.html";	
										
								}).catch(function(error) {
			  						console.log(error);
								});
		       				}
		  					if(photo){
			 					reader.readAsDataURL(photo);
		    				}
						}
						else{
							user.updateProfile({
									//faltar ler ficheiro XML
									displayName: nome+"|"+orcidID+"|"+filiacao+"|"+unidade.value+"|"+keywords+"|"+img_controlo+"|"
								}).then(function() {

									window.location.href="../html/feed.html";	
										
								}).catch(function(error) {
			  						console.log(error);
								});
	    				}
					}
				}
			}
			
		}
	}

}

function verificar(check, flag){

	if(flag==1){
		for(var i=0; i< check.length ; i++){
			for(var j=0; j< caract_2.length ; j++){
				if(caract_2[j] == check[i]){
					alert("ORCID number is invalid");
					return 1;
				}
			}
		}
	}
	else{
		for(var i=0; i< check.length ; i++){
			for(var j=0; j< caract.length ; j++){
				if(caract[j] == check[i]){
					alert("Names can not contain special characters.");
					return 1;
				}
			}
		}
	}

	return 0;
}

function valida_nome(nome){

	//Alteração de '.' -> '!'  e '@' -> '#' para ser aceite no storage
	var aux;

	aux = nome.replace('@','#');

	for(var i=0 ; i<nome.length; i++)
		if(nome[i].localeCompare('.')==0)
			aux = aux.replace('.','!');

	return aux;
}

function checkORCIDProfile(orcidID) {

    var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID;


    fetch(ORCIDLink, {
        
        headers: {
          "Accept": "application/orcid+json"
        }
      })

    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          window.postMessage("ORCID_1" ,'*');
          return 1;
        }

        console.log(response.json);
        // Examine the text in the response
        response.json().then(teste = function(data) {
        	window.postMessage("ORCID_0" ,'*');
        	return 0;
        })
    })
   
}

function transforma_orcid(orcid){
	var orcid_format= "";
	var caract = "-";
	var final;

	for(var i=0; i<orcid.length; i++){
		orcid_format += orcid[i];
		if(((i+1)%4)==0 && i<orcid.length-1)
			orcid_format += caract;
	}

	return orcid_format;
}


function le_XML(orcid, flag){
	var request = new XMLHttpRequest();
	request.open("GET", "https://pub.orcid.org/v2.0/"+orcid, false);
	request.send();
	var xml = request.responseXML;
	var users = xml.getElementsByTagName(flag);

	var string = "";

	for(var j = 0; j < users.length; j++) {
		if(j==0)
	    	string += users[j].childNodes[0].nodeValue;
	    else
	    	string += "," + users[j].childNodes[0].nodeValue;
	}

	return string;
}