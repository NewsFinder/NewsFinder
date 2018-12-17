const caract = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';

(function(){
	window.addEventListener("load", main);
}());

function main(){
//	firebase.auth().signOut();												// isto é para quê?  é necessário fazer logout??
	// P.M.#########  
	var foto = document.getElementById("fileToUpload");
	var txtunidade = document.getElementById("ResearchUnit_txt");
	var btnFileUpload = document.getElementById("B_file"); 
	// ######################
	var txtemail = document.getElementById("email");
	var txtPassword = document.getElementById("passwordtxt");
	var txtConfirma = document.getElementById("confpasswordtxt");
	var txtORCID = document.getElementById("ORCID_txt");
	//var txtFirstName = document.getElementById("FirstNametxt");
	//var txtLastName = document.getElementById("LastNametxt");
	var btnSignUp = document.getElementById("BSignUp");
	
	// PM ########################
	txtORCID.onkeypress = function(event){
		if(event.keycode == 13){
			verificar();
		}
	}; 
	txtunidade.onkeypress = function(event){
		if(event.keycode == 13){
			verificar();
		}
	};  
    // ###########################
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
	/*txtFirstName.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };
	txtLastName.onkeypress = function(event){
                if (event.keyCode == 13){
                    verificar();
                }
            };
	*/
	btnSignUp.addEventListener("click" , verificar);
	
	// P.M. ###################
	btnFileUpload.addEventListener("click" , B_Upload_pressed); 
	// ########################
	
	function verificar(){
		// PM ###########
		var photo = foto.files[0];
		var unidade = txtunidade.value;
		var ORCID_var = txtORCID.value;
		//###############
		var email = txtemail.value;
		var pass = txtPassword.value;
		var conf = txtConfirma.value;
		//var fName = txtFirstName.value;
		//var lName = txtLastName.value;
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
		/*else if(fName.length<2 || lName.length<2){
			alert("Names must be at least 3 characters.");
		}*/
		// P.M. ########
		else if(unidade.length == 0){
			alert("The research unit field is empty.");
		}
		else if(ORCID_var.length<6 || ORCID_var.length>24){
			alert("The ORCID number must be between 6 and 24 characters########.");
		}
		/*else if(photo == null){
			alert("You must upload an image.");
		}*/
		//##############
		else{
			var controlo = 0;
			// P.M. #################################
			for(var i=0; i<caract.length; i++){
				for(var j=0; j<unidade.length; j++){
					if(caract[i] == unidade[j]){
						controlo++;
					}
				}
			}			
			//#######################################
			/*for(var i=0; i<caract.length; i++){
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
			}*/
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
	//#############################################################################################################
	//#############################################################################################################
	//###################################				P.M.			###########################################
	function B_Upload_pressed(){ 
		var photo = foto.files[0]; 
		if(photo == null){
			alert("You must select an image to upload (click in 'Escolher ficheiro').");
			alert("Image file upload failed.")
		}
		else if(!photo.name.includes(".jpg") && !photo.name.includes(".png") && !photo.name.includes(".jpeg")){
			alert("Photo must be JPEG or PNG format.");
			alert("Image file upload failed.")
		}
		else{
			//Buscar utilizador e suas informações
			var user = firebase.auth().currentUser;

			//Dar storage da foto
			//Criar referencia do storage 
			alert("1"); 
			var storage = firebase.storage().ref('fotos_perfil/' + valida_nome(user.email));
			alert("2");
			//Upload
			var task = storage.put(photo);
			alert("3");		
			alert("Image file upload terminated.")
		}
		
	} 
	//#############################################################################################################
	//#############################################################################################################
	//#############################################################################################################

	//Verificação a tempo real
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			var user = firebase.auth().currentUser;
			// P.M.		##########
			var unidade = txtunidade.value;											// actualiza a unidade pertencente?
			// ###################
			//var fName = txtFirstName.value;
			//var lName = txtLastName.value;
			user.updateProfile({
  				//displayName: fName+"|"+lName
				
			}).then(function() {
  				window.location.href = "../html/dados.html";													// página do utilizador?
			}).catch(function(error) {
  				console.log("Erro a guardar o nome");
			});
		}
	})
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