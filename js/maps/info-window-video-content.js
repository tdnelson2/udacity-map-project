var InfoWindowVideoContent = {

  // render result of video search using an arry of search terms
  render: function(locationKO, thumbsKO, embeddedVideoKO) {
    var searchTerms = [locationKO().title,
              locationKO().city,
              locationKO().country];
    this.addFromQuery(searchTerms, thumbsKO, embeddedVideoKO);
  },

  // add results from searching the next item in the searchTerms list
  addFromQuery: function(searchTerms, thumbsKO, embeddedVideoKO) {
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
          InfoWindowVideoContent.embedVideo(dataAry[0].link, embeddedVideoKO);
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
                          embeddedVideoKO);
      };
    });
  },

  // using a link as an input, generate an embedded video
  embedVideo: function(link, embeddedVideoKO) {
    var url = "https://vimeo.com/api/oembed.json";

    url += '?' + $.param({
      'url': link,
      'height': 360,
      'width': 640
    });

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      embeddedVideoKO(result.html);
    });
  }
}