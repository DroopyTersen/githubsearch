var api = {};
var request = require("request-promise");
// var request = require("request");
var baseUrl = "https://api.github.com";

var _getJSON = function(url, cb) {
	console.log(url);
	var options = {
		url: url,
		json: true,
		headers: {
			'User-Agent': 'request'
		}
	}
	return request.get(options).then(result => {
		if (cb) cb(result);
		return result;
	});
};

api.getProfile = function(user, cb) {
	 return _getJSON(baseUrl + "/users/" + user, cb);
};

api.getRepos = function(user, search, cb) {
	search = search || "";
	var url = `${baseUrl}/search/repositories?q=${search}+user:${user}`;
	return _getJSON(url, cb).then(result => {
		return result.items.sort( (a, b) => a.name < b.name ? -1 : 1);
	});
};

//Excluded code search folders
var excludedFolders = [
	"public/bower_components",
	"bower_components",
	"node_modules",
	"bower",
	"dist",
	"packages"
];

api.searchCode = function(snippet, user, cb) {
	var excludesQuery = "+-path:" + excludedFolders.join("+-path:");
	var url = `${baseUrl}/search/code?q=${snippet}+in:file+user:${user}${excludesQuery}`;
	return _getJSON(url, cb);
};

module.exports = api;