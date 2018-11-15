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

	var next = document.getElementById("Next");
	var logout = document.getElementById("LogOut");
	var nome = document.getElementById("Nome");
	var interesses;
	num = 0;
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			nome.innerHTML = "USER: "+firebaseUser.displayName.split("|")[0]+" "+firebaseUser.displayName.split("|")[1];
			interesses = firebaseUser.displayName.split("|")[5];
			apresentaReddit(interesses, r);
		}
	});

	next.addEventListener("click", mudarReddit);
	logout.addEventListener("click", logingOut);

	function mudarReddit(){
		apresentaReddit(interesses, r);
	}

	function logingOut(){
		firebase.auth().signOut();
		window.location.href = "../html/index.html";
	}

}

function apresentaReddit(interesses, r){
	//falta um limitador no NUM, falta interesses, controlo se interesse existe mesmo || Tem de ser tudo junto
	var title = document.getElementById("title");
	var link = document.getElementById("link");

	r.getHot().map(post => post).then(show);
	
	function show(array){
		title.innerHTML = "Reddit: "+(array[num].title);
		var referencia = 'www.reddit.com'+array[num].permalink
		link.setAttribute('href', referencia);
		num++;
	}
}