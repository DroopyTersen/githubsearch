var currentUser = require("./shared/currentUser");
var chrome = require("./shared/chrome");
var profileScreen = require("./screens/profile");
var codeScreen = require("./screens/codesearch");
var repoScreen = require("./screens/repos");
var $ = window.jQuery = require("jquery");
var user = currentUser.getUser();

var init = () => {
	bindEvents();
	if (!user) {
		currentUser.setUser("DroopyTersen", initScreens);
	} else {
		initScreens();
	}

};

var initScreens = function() {
	profileScreen.init();
	codeScreen.init();
	repoScreen.init();
}

var bindEvents = () => {
	$("body").on("click", ".chrome-link", (e) => {
		e.preventDefault();
		chrome.launch($(e.currentTarget).attr("href"));
	})	
};

init();