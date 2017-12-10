var myApiKey = "3XNYENfF5yItpkHIsQxpKcfBICxZc2Sp7YNgoXzw";

$(document).ready(function () {
  loadGallery();
});

const loadGallery = async () =>{
  var today = new Date();
  today = await incrementDate(today, 0);
  var url = await buildApodUrl(today);
  await addImage(url);
  for (var i = 0; i <= 29; i++) {
  today = await incrementDate(today, -1);
  var url = await buildApodUrl(today);
  await addImage(url);
  }
}

function buildApodUrl(date) {
  var url = "https://api.nasa.gov/planetary/apod";
  url += "?date=" + date + "&api_key=" + myApiKey;
  //console.log(url);
  return url;
}


function incrementDate(dateInput,increment) {
        var dateFormatTotime = new Date(dateInput);
        var increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
        var formatedDate = increasedDate.toISOString().substring(0, 10);
        return formatedDate;
}

function addImage(url){

	$.getJSON(url, function (response) {
		var ytTest = response.url.substring(12, 19);
    	if (ytTest == "youtube") {
    	$('#main').append($("<a href= 'index.html?date="+ response.date +
        "'><div class='gallery-image' style='background-image:url(" + getYoutubeThumb(response.url) + 
        ")'><div class='content'>"+ response.title +"</div></div></a>"));
    		
    	}
      else if(ytTest == "er.vime"){
        setVimeoImg(response.date, response.title, response.url);
        //$('#main').append($("<a href= 'index.html?date="+ response.date +"'><div class='gallery-image' style='background-image:url(" + getVimeoThumb(response.url) + ")'><div class='content'>"+ response.title +"</div></div></a>"));
      }
    	else{
        $('#main').append($("<a href= 'index.html?date="+ response.date +
          "'><div class='gallery-image' style='background-image:url(" + response.url + ")'><div class='content'>"+ response.title +
          "</div></div></a>"));
    		//console.log("<a href= 'index.html?date="+ response.date +"'><div class='gallery-image' style='background-image:url(" + getYoutubeThumb(response.url) + ")''><div class='content'>"+ response.title +"</div></div></a>");
    		
    	}
		
		//$('#main').append($("<img class='gallery-image' src='" + response.url + "'/>"));
	});
	
}


function getYoutubeThumb(url){

  var youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

  if (youtube_video_id.length == 11) {
    var image = ('http://img.youtube.com/vi/'+youtube_video_id+'/0.jpg');
    console.log(image);
  } else {
  	image = 'youtube.png'
  }

  return image;
}

function setVimeoImg(date, title, url) {
  var match = /vimeo.*\/(\d+)/i.exec(url);
  if (match) {
    var vimeoVideoID = match[1];
    console.log(vimeoVideoID);
    $.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', { format: "json" }, function (data) {
      featuredImg = data[0].thumbnail_large;
      console.log(featuredImg);
      $('#main').append($("<a href= 'index.html?date="+ date +"'><div class='gallery-image' style='background-image:url(" +
        featuredImg + ")'><div class='content'>"+ title +"</div></div></a>"));
      });
    }
  };

