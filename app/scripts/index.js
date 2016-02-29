var $ = require('jQuery');
var handlebars = require('handlebars');
var _ = require('underscore');
console.log(handlebars);
var urlPage = 'https://api.github.com/users/annaimpson';
var urlRepo = 'https://api.github.com/users/annaimpson/repos';
var context;

console.log(urlRepo);

if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + token,
    }
  });
}
$.ajax(urlPage).then(start);
function start(data){
  console.log(data);
}

$('.repos').click(myRepos);


var source = $('#repo-template').html();
var template = handlebars.compile(source);
function myRepos(){
  $.ajax(urlRepo).then(repfunc);
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
}


function myFollowers(){
  var source = $('#followers-template').html();
  var template = handlebars.compile(source);
  $.ajax(urlPage).then(repnum);
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
}







// function displayRepo(data){
//   var myRepos = data.name;
//   myRepos.forEach(myRepos);
//   console.log(myRepos);
// }
