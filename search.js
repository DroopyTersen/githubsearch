var $ = require("jQuery");
var templating = require("droopy-templating");
var request = require("request")
var template = $("#result-template").html();
var $results = $("#results");
var $form = $("form");
var chrome = require("./chrome");

var handleSearchResults = function(data) {
	console.log(data);
	var html = data.items.reduce( (html, item) => {
		return html + templating.renderTemplate(template, item)
	}, "");
	console.log(html);
	$results.html(html);
}

$results.on("click", ".chrome-link", function(e) {
	e.preventDefault();
	chrome.launch($(this).attr("href"));
});

$form.on('submit', function(e) {
	e.preventDefault();
	var value = $("#searchInput").val();
	var url = `https://api.github.com/search/code?q=${value}+in:file+user:DroopyTersen+-path:public/bower_components+-path:bower`;
	var options = {
		url: url,
		json: true,
		headers: {
			'User-Agent': 'request'
		}
	}
	request.get(options, function(err, resp, body) {
		if (err) console.log(err);
		else handleSearchResults(body);
	});
});