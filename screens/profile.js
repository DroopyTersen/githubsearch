var $ = require("jQuery");
var templating = require("droopy-templating");
var currentUser = require("../shared/currentUser");
var template = $("#profile-template").html();
var $container = $("#profile-container");

var init = () => {
	render();
	$("form.switch-profile").on("submit", switchProfile);
};

var render = () => {
	var profile = currentUser.getUser();
	var html = templating.renderTemplate(template, profile);
	$container.html(html);
	$("#profile-input").val("")
};

var switchProfile = (e) => {
	e.preventDefault();
	var username = $("#profile-input").val()
	currentUser.setUser(username).then(() => window.location.reload());
};

module.exports = {
	init: init
};