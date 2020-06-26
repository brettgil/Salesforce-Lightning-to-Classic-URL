// Copyright (c) 2020 All rights reserved.

var count = 0;
var urlStore = [];
var redirectUrl;

// https://www.abeautifulsite.net/parsing-urls-in-javascript
function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}


// Grabs URLs 
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {

    //alert("Lightning intercepted: " + info.url);

    //Stores all the urls during the redirect to the not allowed page.
    count++;
    urlStore[count] = info.url;

    //alert(urlStore[count]);
    parsedUrl = parseURL(urlStore[count]);

    //check if url is access denied page
    if(parsedUrl.pathname == "/lightning/access/userAccessDenied.jsp"){
      //alert("redirecting "+urlStore[count-1]);
      //get SF 18 or 15 digit ID
      getID = urlStore[count-1].match("[a-zA-Z0-9]{18}|[a-zA-Z0-9]{15}");
      
      //rebuild classic url
      redirectUrl = parsedUrl.protocol+"//"+parsedUrl.host+"/"+getID;
      //alert(redirectUrl);

      //redirect to classic url
      return {redirectUrl: redirectUrl};
    }
  },
  // filters
  {
    urls: [
      "*://*.my.salesforce.com/lightning/access/userAccessDenied.jsp",
      "*://*.lightning.force.com/*"
    ]
  },
  // extraInfoSpec
  ["blocking"]);