$(document).ready(function() {
  //using longform instead of getJSON because of header requirement
  var userSearch = "";
  // this responds with an object with a lot of information including a snippet but no title
  var searchPrefix = "?action=query&list=search&format=json&srsearch=";
  var urlBase = "https://en.wikipedia.org/w/api.php"
    //needed since i'm cross-site requesting w codepen.io per https://www.mediawiki.org/wiki/API:Cross-site_requests
  var urlSuffix = "&callback=?"
    //this is used in the getWikiLink function. pulling a link is necessary because the search api gives a title but no link.
  var requestLinkPrefix = "?action=query&prop=info&format=json&inprop=url&titles=";
  //for randomizer. note that this only gets a title so we need to get the snippet elsewhere
  var randomLinkPrefix = "?action=query&list=random&format=json&rnlimit=10";
  //for snippet for randomizer. a title needs to be added to the end
  var randomLinkMoreInfoPrefix = "?action=query&prop=extracts&format=json&exsentences=2&explaintext=&exsectionformat=plain&titles="
  var suggestPrefix = "?action=opensearch&limit=5&namespace=0&format=json&search="
  var remoteUrl;
  //this array will be filled with WikiEntry objects
  var searchResults = [];
  //define the information that i want to have
  var WikiEntry = function() {
    this.title;
    this.fullUrl;
    this.snippet;
  }

  //call auto complete. 
  suggest();
  //autocomplete function
  function suggest() {
    $(".input-box").autocomplete({
      source: function (request, response) {
         // request.term is the term searched for.
         // response is the callback function you must call to update the autocomplete's 
         // suggestion list.
         $.ajax({
             url: urlBase+suggestPrefix+urlSuffix,
             //the data is automatically appended to the above (thanks Jquery UI!);
             data: { search: request.term },
             dataType: "jsonp",
             success: function(data) {
               
               response(data[1]);
               console.log(data);
             },
             error: function () {
               //always must pass something back. in case of error, an empty array
               response([])
             }
         });
        
      },
      minLength: 3,
      delay: 100
    })
  }

  //when the user clicks "find", this happens  
  $(".find-button").click(function() {
    $("#search-results").css("display", "block");
    $("#search-results .inner-box").html(""); //clear the search results
    userSearch = $(".input-box").val();
    remoteUrl = urlBase + searchPrefix + userSearch + urlSuffix;
    callWiki(remoteUrl);
  })

  //when the user clicks "surprise me"
  $(".surprise-me-button").click(function() {
    $("#search-results").css("display", "block");
    $("#search-results .inner-box").html(""); //clear the search results
    remoteUrl = urlBase + randomLinkPrefix + urlSuffix;
    console.log(remoteUrl);
    randomLinks(remoteUrl);
  })

  //the main program function
  function callWiki(url) {
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        headers: {
          'Api-User-Agent': 'Wikipedia Search Tool for FreeCodeCamp challenge/0.1; contact progmacattack at GitHub'
        },
        success: function(data) {
          //build an object for each result and put in array
          $.each(data.query.search, function(i, item) {
            searchResults[i] = new WikiEntry();
            searchResults[i].title = item.title;
            searchResults[i].snippet = item.snippet;
            getWikiLink(i, item.title); //get the link and continue from there
          })
        }
      });

    } //end callWiki

  //this function gets the link from each search result. it is called by a loop within callWiki() 
  function getWikiLink(i, itemTitle) {
      $.ajax({
        //see variables defined above. only itemTitle is sent
        url: urlBase + requestLinkPrefix + itemTitle + urlSuffix,
        dataType: 'json',
        type: 'POST',
        headers: {
          'Api-User-Agent': 'Wikipedia Search Tool for FreeCodeCamp challenge/0.1; contact progmacattack at GitHub'
        },
        success: function(data) {
          $.each(data.query.pages, function(j, item) {
            searchResults[i].fullUrl = item.fullurl;
            //display the search result in HTML
            displayResult(searchResults[i]);
          })
        }
      })
    } //end getWikiLink

  function randomLinks(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      headers: {
        'Api-User-Agent': 'Wikipedia Search Tool for FreeCodeCamp challenge/0.1; contact progmacattack at GitHub'
      },
      success: function(data) {
        console.log(url);
        //console.log(data);
        //build an object for each result and put in array
        $.each(data.query.random, function(i, item) {
          searchResults[i] = new WikiEntry();
          searchResults[i].title = item.title;
          $.ajax({
              url: urlBase + randomLinkMoreInfoPrefix + item.title + urlSuffix,
              dataType: 'json',
              type: 'POST',
              headers: {
                'Api-User-Agent': 'Wikipedia Search Tool for FreeCodeCamp challenge/0.1; contact progmacattack at GitHub'
              },
              success: function(data) {
                //pull the pageId
                var pageId = Object.keys(data.query.pages);
                //access the object using [] notation to allow the variable pageId to be used to construct the request. ultimately what we want is the extract
                searchResults[i].snippet = (data["query"]["pages"][pageId]["extract"]);
                getWikiLink(i, item.title); //get the link and continue from there. i did this in the last ajax to avoid promises and all that.
              }
            })
            //console.log(searchResults[i]);

        })
      }
    })
  }

  //function to display a result on the web page
  function displayResult(obj) {
    console.log(obj)
    $('<article class = "search-result"><h1><a href="' + obj.fullUrl + '" target="_blank">' + obj.title + '</h1></a><p>' + obj.snippet + '</p></article>').appendTo("#search-results .inner-box");
  }
})