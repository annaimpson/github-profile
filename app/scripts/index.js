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

$.ajax(urlRepo).done(function(data){
  console.log(data);
  myRepos(data);
});



//bringing in avatar
function avatarTemplate (data){
  var source = $('#small-profile').html();
  var template = handlebars.compile(source);
  var compiledTemplate = template(data);
  $('.small-profile').html(compiledTemplate);
}
function sideBar (data){
  var sourcetwo = $('#profile-template').html();
  var templatetwo = handlebars.compile(sourcetwo);
  var compiledTemplatetwo = templatetwo(data);
  $('.sidebar').html(compiledTemplatetwo);
}
$.ajax(urlPage).done(function(data){
  avatarTemplate(data);
  sideBar(data);
});

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
