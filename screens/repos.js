var $ = require("jQuery");
var templating = require("droopy-templating");
var moment = require("moment");

var currentUser = require("../shared/currentUser");
var githubApi = require("../shared/githubApi")

var template = $("#repo-result-template").html();
var $container = $("#repo-results");



var init = function() {
	githubApi.getRepos(currentUser.getUser().login).then(render);
	$("#repo-input").on("keyup", submitRepoSearch)
	$("form.repo-search").on("submit", e => e.preventDefault());
};

var render = function(repos) {
	var html = "";
	if (repos) {
		var html = repos.reduce((html, repo) => {
			repo.created = moment(repo.created_at).fromNow();
			repo.lastUpdated = moment(repo.updated_at).fromNow();
			return html + templating.renderTemplate(template, repo);
		});		
	}

	$container.html(html);
}

var submitRepoSearch = function(e) {
	var user = currentUser.getUser();
	var value = $("#repo-input").val();
	githubApi.getRepos(user.login, value).then(render);
};

module.exports = {
	init: init
}