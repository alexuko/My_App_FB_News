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
var view5 = myApp.addView('#view-5', {
    domCache: true //enable inline pages
});
var view6 = myApp.addView('#view-6');


/////////// Global Variables   ///////////////////
var sportNews_A;
var businessNews_A;
var financialNews_A;
var myStories;
var myAuthors;
var alexStories;
var faceBookId;


///////////    BEGINING OF FACEBOOK LOGIN//////////////////
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1537153306379165',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.10'
    });
        
    FB.AppEvents.logPageView();   
    checkLoginState();
  };

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10&appId=1537153306379165';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
    var myId='';
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status == 'connected') {
        // activate NavBar, logOut button and hide logIn button
      document.getElementById('inMsj').innerHTML='WELCOME';    
      document.getElementById('fBlogOut').style.display = 'inline';
      document.getElementById('toolB').style.display = 'inline';
      document.getElementById('fBlogIn').style.display = 'none';
      // gathering info from Facebook.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        myId = response.id;
        faceBookId = myId;
        console.log('User ID: ', myId);
        var myPicLink=" https://graph.facebook.com/"+myId+"/picture?type=large";
        console.log('Successful login for: ' + response.name);
        //document.getElementById("welcome").style.textShadow = "2px 5px 5px red";
        
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
        
        document.getElementById('fbPic').innerHTML = "<img src="+ myPicLink +" width='200' height='200'>";
                
    });
        // Get the news from source and store them in its variable
        
        getNews('business');
        getNews('sports');
        getNews('financial');
        getOtherNews('top10');
        getOtherNews('authors');
        getOtherNews('myNewStories');
    
    } else {
      // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
}

function logMeIn(){
    FB.login(function(response) {
    document.getElementById('status').innerHTML =
         response.name + ' You are now Logged In!';
            window.location.reload();
    });
}

function logMeOut(){
    console.log('Logging Out......');
    alert('You have been Logged out');
    FB.logout(function(response) { 
        document.getElementById('status').innerHTML = 'You have been Logged out';
        document.getElementById('fBlogIn').style.display = 'inline';
        document.getElementById('fBlogOut').style.display = 'none';
        document.getElementById('toolB').style.display = 'none';     document.getElementById('fbPic').style.display = 'none';
           window.location.reload();
        });
  }
 
function getNews(news){
    var label='';
    switch(news){
        
        case "business":
            label = "Business";     
            newsType = "https://newsapi.org/v2/top-headlines?sources=bloomberg&apiKey=7c233e4663f04bcc8bf20c818fcf538d";
            break;
        case "sports":
            label = "Sports";    
            newsType = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=7c233e4663f04bcc8bf20c818fcf538d";
            break;
        case "financial":
            label = "Financial";
            newsType = "https://newsapi.org/v2/top-headlines?sources=financial-post&apiKey=7c233e4663f04bcc8bf20c818fcf538d";
            break;
        default:
            break;
               }
    
    $$.getJSON(newsType, function( data ) {
       var articlesList= data.articles;
        
        switch(label){
           case 'Business':
               console.log('Getting...',label);
               window.businessNews_A = articlesList;
               break;
           case 'Sports':
               console.log('Getting...',label);
               window.sportNews_A = articlesList;
               break;
           case 'Financial':
               console.log('Getting...',label);
               window.financialNews_A = articlesList; 
               break;
           default:
                  break;
        }
        
    }); 
    
}

function getOtherNews(newsReq){
   var typeOfQuery;
    var obj;
    switch(newsReq){
        case 'top10':
            console.log('Getting...',newsReq);
              $.get( "http://52.48.79.163/db.php", { type: 'top10stories' } ).done(function( data ) {
                obj = jQuery.parseJSON(data);
                  myStories = obj.news;
                });
            break;
        case 'authors':
            console.log('Getting...',newsReq);
             $.get( "http://52.48.79.163/db.php", { type: 'currentauthors' } ).done(function( data ) {
                obj = jQuery.parseJSON(data);
                  myAuthors = obj.authors;
                });
            break;
        case 'myNewStories':
            console.log('Getting...',newsReq);
             $.get( "http://52.48.79.163/db.php", { type: 'getmystories', id: 1741544372545982 } ).done(function( data ) {
                 obj = data;
                 alexStories = obj;
             });
            break;
        default:
            alert('something wrong happend');
            break;
                  }
}

function displayNews(newsTag){
     var selectedNews, 
         forView='';
     
        switch(newsTag){
               case 'Business':
                    selectedNews = businessNews_A;
                    break;
               case 'Sports':
                    selectedNews = sportNews_A;
                 break;
               case 'Financial':
                    selectedNews = financialNews_A;
                 break;
               default:
                break;
            }
    
   
   for(var i = 0; i < selectedNews.length; i++){
   forView = forView + "<h2 align='middle'>" + selectedNews[i].title + "</h2>" 
                     + "<p> <b>Author: </b>" + selectedNews[i].author + "</p>"
                     + "<img src=" + selectedNews[i].urlToImage + " width='200' height='200'>"
                     + "<p> <b>Description: </b>" + selectedNews[i].description + "</p>"
                     + "<p> <b>Published Date: </b>" + selectedNews[i].publishedAt + "</p>"              
                     + "<p><a class='button button-fill link external' target='_blank' href="+selectedNews[i].url+">Link to Source</a></p>    <br>";
    }
       document.getElementById(newsTag).innerHTML = forView;

     
 }

function showCctNews(type){
    var selectedNews; 
    var forView='';
            switch(type){
               case 'stories':
                    selectedNews = myStories.story;
                    break;
               case 'authors':
                    selectedNews = myAuthors.author;
                    break;
                case 'myNews':
                    selectedNews = alexStories;
                    break;
               default:
                console.log('Something went wrong')
                break;
            }
    if(type === 'myNews'){
        console.log(selectedNews);
        forView = forView   + '<li><div class="item-content"><div class="item-inner">'
                            + '<div class="item-title">'+ selectedNews +'</div>'
                            + '</div></div></li>';
    }else{
        for(var i = 0; i < selectedNews.length; i++){
             forView = forView + '<li><div class="item-content"><div class="item-inner">'
                               + '<div class="item-title">'+ selectedNews[i] +'</div>'
                               + '</div></div></li>';
        }
    }
    document.getElementById(type).innerHTML = forView;
}

function generateJson(){
var myJsonArrays ={ Business: businessNews_A, 
                    Sports: sportNews_A, 
                    Financial:financialNews_A, 
                    Top10News:myStories,
                    Authors:myAuthors,
                    MyStories:alexStories
                  };
var allJsonNews = JSON.stringify(myJsonArrays,null,'\f');
    $("#jsonOutput").html(allJsonNews);  
}

function sendStory(){
    var story = document.getElementsByName('myStory')[0].value;
    var encStory = encodeURI(story);
    var converge = 'http://52.48.79.163/db.php?type=newstory&data='+encStory+'&id='+faceBookId;
    
    if(story === ""){
       document.getElementById('label').innerHTML='Field cannot be empty!';
       }else{
        console.log(converge);
        document.getElementById('label').innerHTML='This is your story: '+story; 
            $.get(converge, function( data ) {
                
            });
           document.getElementById("myForm").reset();
           document.getElementsByName('myStory')[0].setAttribute('placeholder', 'Type another story!')
       }
}
