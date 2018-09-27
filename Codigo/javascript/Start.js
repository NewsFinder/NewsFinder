
(function(){
	window.addEventListener("load", main);
}());

function main(){
	var blogin = document.getElementById("BLogin");
	var bsign = document.getElementById("BSignUp");

	blogin.addEventListener("click", bLoginPressed);
	bsign.addEventListener("click", bSignPressed);

	function bLoginPressed(){
		window.location.href = "../html/Login.html"
	}

	function bSignPressed(){
		window.location.href = "../html/SignUp.html"
	}


}
