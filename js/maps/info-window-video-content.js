var InfoWindowVideoContent = {
  display: function(index) {

    // grab the model so we can use it's data to search for videos
    var locations = AppDelegate.getModel();
    var thisLocation = locations[index];

    // build a list of queries
    var queries = [thisLocation.title, thisLocation.city, thisLocation.country];
    var  existingThumbs = [];
    this.queryAndDisplay(index, queries, []);
  },

	queryAndDisplay: function(index, queries, existingThumbs) {
    (function(index, queries) {
      // load matching lahash videos from vimeo
      var url = "https://api.vimeo.com/users/lahash/videos";
      url += '?' + $.param({
        'access_token': "56cf73847a95b1e6fef352aedc5bb1d5",
        // query the first item in the array
        'query': queries.splice(0,1)[0]
      })

      // fire off an ajax request for videos which match the serach term
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {

  		  var dataAry = result.data;
  		  if(dataAry.length > 0) {

          if(existingThumbs.length > 0){

            // compare thumbs found in previous queries to
            // those in the new search results
            // note: we're working from the end of dataAry
            // in order to avoid messing up our loop when removing items
            for (var i = dataAry.length - 1; i >= 0; --i) {
              if(existingThumbs.includes(dataAry[i].pictures.sizes[2].link)) {

                // since that result is already displayed, remove it from dataAry
                dataAry.splice(i,1);
              }
            }
          } else {

            // prepare to add the first group of thumbs
            $('.video-thumbs').css('height', '75px');
          }

          // make sure the above process was able to yeild new results
          if(dataAry.length > 0) {

            // add links to other videos below the embeded video
            for (var i = 0; i < dataAry.length; i++) {
              var data = dataAry[i];
              var spacer = '';
              var thumb = '<img id="thumb" class="video-thumb spacer" src="'+data.pictures.sizes[2].link+'">';
              $('.video-thumbs').append(thumb);

              // add a binding to each thumb
              (function(link){
                $('#thumb:last-child').click(function() {
                  AppDelegate.embedVideo(link);
                });
              })(data.link);
              existingThumbs = existingThumbs.concat(dataAry.map(function(x) {
                return x.pictures.sizes[2].link;
              }));
            }

            // If a video is not alread there, embed the first video from the results
            if($('.embeded-video').html() === '') {

              // fire off request to embed the first video
              AppDelegate.embedVideo(dataAry[0].link);
            }
          }
  		  }

        // restart the process using the next search term in the query list
        if(queries.length > 0) {
          AppDelegate.queryAndDisplayVideos(index, queries, existingThumbs);
        }
      }).fail(function(err) {
        console.log("something went wrong");
      });
    })(index, queries);
	},

  embedVideo: function(link) {
    var oembedURL = "https://vimeo.com/api/oembed.json";
    var height = 360;
    var width = 640;
    var windowWidth = $( window ).width();
    // console.log('window width is '+windowWidth);

    // adjust for mobile screens
    if(windowWidth < 400){
      height = 117;
      width = 208;
    } else if(windowWidth < 600) {
      height = 180;
      width = 320;
    }
    // console.log('requesting height:'+height+' width:'+width);

    oembedURL += '?' + $.param({
      'url': link,
      'height': height,
      'width': width
    });
    // console.log('oembedURL: '+oembedURL);


    $.ajax({
      url: oembedURL,
      method: 'GET',
    }).done(function(oembedResult) {
      // console.log('result: '+oembedResult.html);

      // clear the currently embeded video
      $('.embeded-video').html('');
      $('.video-thumbs').css('width', width+'px');

      // embed the new video
      $('.embeded-video').append(oembedResult.html);
    }).fail(function(err){
      console.log("OEMBED: something went wrong");
    });

  }
}