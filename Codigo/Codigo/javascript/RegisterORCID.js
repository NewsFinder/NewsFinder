const caract = "1234567890`~!@#$%^&*()-_+={[}]|:;'/?.>,<€ "+'"';

(function(){
	window.addEventListener("load", main);
}());

function main(){

	var register_ORCID_l = document.getElementById("BRegisterORCID");
	
	register_ORCID_l.addEventListener("click", link_to_ORCID);
	
	function link_to_ORCID(){
			alert(" The truth is that You, will be redirected to Google website.");
			window.location.href = "http://www.google.com"				//ORCID website
		
	}
	
	// mais funções para fazer posteriormente o pretendido (obter dados do site ORCID, etc....)
	
}