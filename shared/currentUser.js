var githubApi = require("./githubApi");

var LOCAL_STORAGE_KEY = "githubsearcher_user";
var currentUser = {};

currentUser.setUser = function(newUser, cb) {
	return githubApi.getProfile(newUser)
		.then(profile => {
			console.log(profile);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
			if (cb) cb(profile);
			return profile;
		})
		.catch( error => {
			alert("User not found");
			console.log(arguments);
		});
};

currentUser.getUser = () => {
	var valueStr = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (valueStr) {
		return JSON.parse(valueStr);
	}
	return null;
};

module.exports = currentUser;