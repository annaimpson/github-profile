var $ = require('jQuery');
var handlebars = require('handlebars');
var _ = require('underscore');
var urlPage = 'https://api.github.com/users/annaimpson';
var urlRepo = 'https://api.github.com/users/annaimpson/repos';
var context;

console.log(urlRepo);

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


var source = $('#repo-template').html();
var template = handlebars.compile(source);
function myRepos(){
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

function myFollowers(){
  source = $('#followers-template').html();
  template = handlebars.compile(source);
  function repnum(data){
    console.log(data);
    _.each(data, function(element){
      context = {
        Followers: element.followers,
        Starred: element.starred_url,
        Following: element.following,
      };
      $('.js-followers').append(template(context));
    });
  }
  $.ajax(urlPage).then(repnum);
}
