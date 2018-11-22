require('../css/index.css');
var showContent = {};
showContent.show = function(){
	console.log("show");
	console.log("1234");
	sessionStorage.setItem("name","xiaoming");
	console.log(sessionStorage.getItem("name"));
};
showContent.show();
module.exports = showContent;