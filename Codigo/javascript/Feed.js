const api = 	["https://newsapi.org/v2/everything?q=bitcoin&from=2018-08-30&sortBy=publishedAt&apiKey=afaebedbdb1e4e798277fd0b74955296", //Noticias sobre bitcoin no ultimo mes
				"https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=afaebedbdb1e4e798277fd0b74955296", //Top bussiness Noticas nos US
				"https://newsapi.org/v2/everything?q=apple&from=2018-09-29&to=2018-09-29&sortBy=popularity&apiKey=afaebedbdb1e4e798277fd0b74955296", //Noticias mencionando Apple no ultimo mes
				"https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=afaebedbdb1e4e798277fd0b74955296", //Top noticias de techcrunch
				"https://newsapi.org/v2/everything?domains=wsj.com&apiKey=afaebedbdb1e4e798277fd0b74955296", //Todas as noticias do jornal wall street
				"https://newsapi.org/v2/top-headlines?country=us&apiKey=afaebedbdb1e4e798277fd0b74955296",
				"https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=afaebedbdb1e4e798277fd0b74955296",
				"https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=afaebedbdb1e4e798277fd0b74955296",
				"https://newsapi.org/v2/top-headlines?q=trump&apiKey=afaebedbdb1e4e798277fd0b74955296",
				"https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=afaebedbdb1e4e798277fd0b74955296",]; 


(function()
{
	window.addEventListener("load", main);
}());

function main(){
	var next = document.getElementById("Next");
	var logout = document.getElementById("LogOut");
	var nome = document.getElementById("Nome");
	var user = firebase.auth().currentUser;

	if (user != null) {
	  user.providerData.forEach(function (profile) {
	    nome.innerHTML = "Nome do Utilizador: "+profile.displayName;
	  });
	}

	window.addEventListener("beforeunload", function(e){
		firebase.auth().signOut();
	}, false);

	var controlo = 0;

	function carregarFeed(){
		var requestURL = api[Math.floor(Math.random()*api.length)];
		var request = new XMLHttpRequest();
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		request.onload = function() {
	  		var data = request.response;


            if(data.status == "ok" && data.totalResults != 0){
	  			var title = document.getElementById("title");
	  			var author = document.getElementById("author");
	  			var feed = document.getElementById("Feed");
	  			var link = document.getElementById("link");
		  		var num = Math.floor(Math.random() * data.articles.length);
		  		if(data.articles[num].title != null)
	  				title.innerHTML = " "+data.articles[num].title;
	  			else
	  				title.innerHTML = "Title: Unknown Title";
	  			if(data.articles[num].author != null)
	  				author.innerHTML = "Author: "+data.articles[num].author;
	  			else
	  				author.innerHTML = "Author: Unknown Author";
	  			if(data.articles[num].description != null)
	  				feed.innerHTML = " "+data.articles[num].description;
	  			else
	  				feed.innerHTML = "Description: Unknown Description";
	  			link.setAttribute("href", data.articles[num].url);
	  			controlo = 1;

            }
	  		if(controlo == 0){
	  			carregarFeed();
	  		}else{
	  			controlo = 0;
	  		}

		}
	}

	carregarFeed();
	next.addEventListener("click", carregarFeed);
	logout.addEventListener("click", logingOut);


	function logingOut(){
		firebase.auth().signOut();
		window.location.href = "../html/index.html";
	}
}