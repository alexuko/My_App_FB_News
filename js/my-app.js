// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');

///////////    BEGINING OF FACEBOOK LOGIN//////////////////

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1537153306379165',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.10'
    });
      
    FB.AppEvents.logPageView();   
      
  };
/*
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
*/

/*(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10&appId=1537153306379165';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

function checkLoginState() {
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

  function testAPI() {
   
   console.log('Welcome!  Fetching your information.... ');

   FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    
    
    });
  }

function logoutPerson(){
    FB.logout(function(response) {      
    document.getElementById('status').innerHTML =
         response.name + ' You are now Logged Out!';
    });
}
 
///////////    END OF FACEBOOK LOGIN//////////////////

$$.getJSON("https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=7c233e4663f04bcc8bf20c818fcf538d", function( data ) {
    console.log(data.articles);
    var art = data.articles;
    var tit = data.articles[0].title;
    var artTit= [];
       
    for(var i = 0; i < data.articles.length; i++){
     artTit.push(data.articles[i].title);
        console.log(data.articles[i].author);
        console.log(data.articles[i].title);
        console.log(data.articles[i].description);
        console.log(data.articles[i].url);
        console.log(data.articles[i].urlToImage);
        console.log(data.articles[i].publishedAt);
        
        }
    
 });

    
      
