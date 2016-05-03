var $ = require('jQuery');
var handlebars = require('handlebars');
var _ = require('underscore');
var urlPage = 'https://api.github.com/users/annaimpson';
var urlRepo = 'https://api.github.com/users/annaimpson/repos';
// var token = require('./githubtoken.js').token;
var context;
var context2;


if (typeof (githubtoken) !== 'undefined') {
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + token,
    }
  });
}
function start(data){
}
$.ajax(urlPage).then(start);



function myFollowers(){
  var source2 = $('#followers-template').html();
  var template2 = handlebars.compile(source2);
  function repnum(data){
    console.log(data);
    _.each(data, function(element){
      context2 = {
        followers: element.followers,
        starred: element.starred_url,
        following: element.following,
      };
      $('.js-followers').append(template(context2));
    });
  }
  $.ajax(urlPage).then(repnum);
}

function myRepos(){
  var source = $('#repo-template').html();
  var template = handlebars.compile(source);
  function repfunc(data){
    console.log(data);
    _.each(data, function(element){
      context = {
        name: element.name,
        updated: element.updated_at,
        stargazersCount: element.stargazers_count,
        forks: element.forks_count,
        language: element.language,
      };
      $('.repo-space').append(template(context));
    });
  }
  $.ajax(urlRepo).then(repfunc);
}
$('.repos').click(myRepos);
