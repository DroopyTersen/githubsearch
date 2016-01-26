var exec = require('child_process').exec;
var exePath = '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"'

var launchChrome = function(url) {
	exec(exePath + " " + url, function(err) {
		if (err) console.log(err);
	});
};

module.exports = {
	launch: launchChrome
};