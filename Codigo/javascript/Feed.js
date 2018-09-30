(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var next = document.getElementById("Next");
	var logout = document.getElementById("LogOut");
	//FAZER VERIFICACAO DO STATUS
	var requestURL = 'https://newsapi.org/v2/everything?q=bitcoin&from=2018-08-30&sortBy=publishedAt&apiKey=afaebedbdb1e4e798277fd0b74955296';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var data = request.response;
  		var title = document.getElementById("title");
  		var author = document.getElementById("author");
  		var feed = document.getElementById("Feed");

  		var num = Math.floor(Math.random() * data.articles.length);
  		console.log(data);
  		title.innerHTML = "Title: "+data.articles[num].title;
  		author.innerHTML = "Author: "+data.articles[num].author;
  		feed.innerHTML = "Description: "+data.articles[num].description;
	}

	next.addEventListener("click", nextFeed);
	logout.addEventListener("click", logingOut);

	function nextFeed(){
		var data = request.response;
  		var title = document.getElementById("title");
  		var author = document.getElementById("author");
  		var feed = document.getElementById("Feed");

  		var num = Math.floor(Math.random() * data.articles.length);
  		console.log(data);
  		title.innerHTML = "Title: "+data.articles[num].title;
  		author.innerHTML = "Author: "+data.articles[num].author;
  		feed.innerHTML = "Description: "+data.articles[num].description;
	}

	function logingOut(){
		firebase.auth().signOut();
		window.location.href = "../html/start.html";
	}
}