var num;

(function()
{
	window.addEventListener("load", main);
}());

function main(){
	const snoowrap = require('snoowrap');
	

	const r = new snoowrap({
	  userAgent: 'NewsFinder',
	  clientId: '8PRDzdlBcEOdxg',
	  clientSecret: 'RqQ5ZFLgo2-FyGX7KthAZTh-T3g',
	  refreshToken: '95212774921-R6jorxu6Q99DpmeLerFO0S3_aoE'
	});

	var logout = document.getElementById("LogOut");
	var interesses;
	var nome = document.getElementById("nome_utilizador");
	num = 0;
	var controlo_foto;

	var listElm = document.querySelector('#infinite-list');
	

	function escreve_reddit(string){

		var img = new Image();
		img.src = "../resources/reddit_icon.png";
		listElm.appendChild(img);

		var item = document.createElement('li');
	    item.innerText = string[0];
	    listElm.appendChild(item);

	    var item1 = document.createElement('li');
	    item1.innerText = "Title: " + string[1];
	    listElm.appendChild(item1);

	    var item2 = document.createElement('a');
	    item2.style.color = "#0000FF";
	    item2.href = string[2];
	    item2.target = "_blank";
	    item2.innerText = string[2];
	    listElm.appendChild(item2);

	    var item3 = document.createElement('li');
	    item3.innerText = string[3] + " Comments";
	    listElm.appendChild(item3);

	    var item4 = document.createElement('li');
	    item4.innerText = "\n";
	    listElm.appendChild(item4);
	}

	function apresentaReddit(interesses, r){
		//falta um limitador no NUM, falta interesses, controlo se interesse existe mesmo || Tem de ser tudo junto
		var title = document.getElementById("title");
		var link = document.getElementById("link");
		var array_interesses;
		var interesse_random;
		var aux_string ="";

		array_interesses = check_interesses(interesses);
		interesse_random = array_interesses[Math.floor(Math.random()*array_interesses.length)];
		r.getHot(interesse_random).map(post => post).then(show);
		
		function show(array){
			//console.log(array[num])
			//title.innerHTML = "Reddit: "+(array[num].title);
			var referencia = 'https://www.reddit.com'+array[num].permalink
			aux_string = array[num].subreddit_name_prefixed + "|" + array[num].title + "|" + referencia + "|" + array[num].num_comments + "|";
			num++;
			escreve_reddit(aux_string.split("|"));
		}
	}

	var loadMore = function() {
	  for (var i = 0; i < 5; i++) 
	    apresentaReddit(interesses, r);
	}

	// Detect when scrolled to bottom.
	listElm.addEventListener('scroll', function() {
	  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
	    loadMore();
	  }
	});
	

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			nome.innerHTML = firebaseUser.displayName.split("|")[0]+" "+firebaseUser.displayName.split("|")[1];
			interesses = firebaseUser.displayName.split("|")[5];
			controlo_foto = firebaseUser.displayName.split("|")[6];
			if(controlo_foto==1){
				carrega_imagem(firebaseUser.email);
			}
			// Initially load some items.
			loadMore();
			//apresentaReddit(interesses, r);
		}
	});

	logout.addEventListener("click", logingOut);

	function mudarReddit(){
		apresentaReddit(interesses, r);
	}

	function logingOut(){
		firebase.auth().signOut();
		window.location.href = "../html/index.html";
	}

}



function check_interesses(interesses){
	var aux;
	
	aux = interesses.split(",");

	return aux;
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

function carrega_imagem(email){
	var ref = firebase.storage().ref('fotos_perfil/' + retefica_nome(email));
	var foto = document.getElementById("mini_foto");

	ref.getDownloadURL().then(function(url){
		foto.src = url;
		//foto.width=150;
		//foto.height=150;
	})
}

