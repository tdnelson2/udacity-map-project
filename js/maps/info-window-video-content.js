var InfoWindowVideoContent = {

  // render result of video search using an arry of search terms
  render: function(locationKO, thumbsKO, embeddedVideoKO, mapIsFullScreenKO) {
    var searchTerms = [locationKO().title,
              locationKO().city,
              locationKO().country];
    this.addFromQuery(searchTerms, thumbsKO, embeddedVideoKO, mapIsFullScreenKO);
  },

  // add results from searching the next item in the searchTerms list
  addFromQuery: function(searchTerms, thumbsKO, embeddedVideoKO, mapIsFullScreenKO) {
    var url = "https://api.vimeo.com/users/lahash/videos";
    url += '?' + $.param({
      'access_token': "56cf73847a95b1e6fef352aedc5bb1d5",
      'query': searchTerms.splice(0,1)[0]
    });

    // fetch videos matching the search term
    $.ajax({
      url: url
    }).done(function(result) {
      var dataAry = result.data;
      if(dataAry.length > 0) {
        if(embeddedVideoKO() === '') {
          InfoWindowVideoContent.embedVideo(dataAry[0].link, embeddedVideoKO, mapIsFullScreenKO);
        };
        dataAry.map(function(x) {
          var currentThumbs = thumbsKO().map(function(x) { return x.url });
          var thumbURL = x.pictures.sizes[2].link;
          if(!currentThumbs.includes(thumbURL)) {
            thumbsKO.push({ url: thumbURL,
                    link: x.link} );
          };
        });
      };
      if(searchTerms.length > 0) {
        InfoWindowVideoContent.addFromQuery(searchTerms,
                          thumbsKO,
                          embeddedVideoKO, 
                          mapIsFullScreenKO);
      };
    }).fail(function(err) {
      embeddedVideoKO(document.getElementById('embed-video-error'));
    });
  },

  // using a link as an input, generate an embedded video
  embedVideo: function(link, embeddedVideoKO, mapIsFullScreenKO) {
    var url = "https://vimeo.com/api/oembed.json";
    var sidebarwidth = mapIsFullScreenKO() ? 0 : 300;
    var windowWidth = $( window ).width();
    var width = windowWidth > 900 ? 640 : Math.floor((windowWidth-sidebarwidth)*0.7);
    var height = windowWidth > 900 ? 360 : Math.floor(width*9/16);

    console.log("width: "+width+" height: "+height);

    url += '?' + $.param({
      'url': link,
      'height': height,
      'width': width
    });

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      embeddedVideoKO(result.html);
    }).fail(function(err) {
      embeddedVideoKO(document.getElementById('embed-video-error'));
    });
  }
}