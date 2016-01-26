var $ = require("jQuery");
var templating = require("droopy-templating");
var currentUser = require("../shared/currentUser");
var githubApi = require("../shared/githubApi")

var template = $("#codesearch-result-template").html();
var $container = $("#codesearch-results");

var init = () => {
	$("form.code-search").on('submit', submitCodeSearch);
};

var renderSearchResults = function(data) {
	var html = data.items.reduce( (html, item) => {
		return html + templating.renderTemplate(template, item)
	}, "");
	$container.html(html);
};

var submitCodeSearch = function(e) {
	e.preventDefault();
	var user = currentUser.getUser();
	var value = $("#codesearch-input").val();
	githubApi.searchCode(value, user.login).then(renderSearchResults);
};

module.exports = {
	init: init
};

