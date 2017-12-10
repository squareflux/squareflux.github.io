var myApiKey = "3XNYENfF5yItpkHIsQxpKcfBICxZc2Sp7YNgoXzw";

$(document).ready(function () {
  handleRedirect();
  handleUpdate();
  nextButtonChecker();
  fillDatepicker();
});

function handleUpdate(event) {
  var date = getUrlVars()["date"];
  
  console.log(date);
  var url = buildApodUrl(date);
  $.getJSON(url, function (response) {
    var linkTest = response.url.substring(12, 19);
    if (linkTest === "youtube" || linkTest==="er.vime") {
      
      $("#apod-video").attr("src", response.url);
      $("#apod-image").attr("src", "");
      $("#apod-video").css({ display: "inline-block" });
      console.log(response.url);
    } 
    else{
      $("#apod-video").attr("src", "");
      $("#apod-image").attr("src", response.url);
      $("#apod-image").attr("alt", response.title);
      $("#image-link").attr("href", response.url);
      
    }
    
    
    $("#apod-title").html(response.title);
    $("#apod-desc").html(response.explanation);

  });
}

function buildApodUrl(date) {
  var url = "https://pseudorandombits.com/jccc/apod.php";
  url += "?date=" + date + "&api_key=" + myApiKey;
  return url;
}

 $('div.next_btn').click(function () {
      var date = incrementDate(new Date(), 0);
      var currentImage = getUrlVars()['date'];
      if (date !== currentImage) {
        next();
      }
       

    });

  $('div.previous_btn').click(function () {
        previous();
    });

function next(){
  var date = new Date(getUrlVars()["date"]);
  var newDate = incrementDate(date,1);
  var url = window.location.href.substring(0, window.location.href.indexOf('?'));

  $(location).attr('href', url + '?date=' + newDate);
}

function nextButtonChecker(){
  var date = incrementDate(new Date(), 0);
      var currentImage = getUrlVars()['date'];
      if (date == currentImage) {
        $(".next_btn").addClass("disabled_btn");

      }
}

function previous(){
  var date = new Date(getUrlVars()["date"]);
  var newDate = incrementDate(date,-1);
  var url = window.location.href.substring(0, window.location.href.indexOf('?'));

  $(location).attr('href', url + '?date=' + newDate);
}

 function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function incrementDate(dateInput,increment) {
        var dateFormatTotime = new Date(dateInput);
        var increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
        var formatedDate = increasedDate.toISOString().substring(0, 10);
        return formatedDate;
    }

function handleRedirect(){
  date = getUrlVars()['date'];
  if (date === undefined) {
    var today = new Date();
    var formatedDate = today.toISOString().substring(0, 10);
    var url = window.location.href.substring(0, window.location.href.indexOf('?'));
    $(location).attr('href', url + '?date=' + formatedDate);
  }
}

function fillDatepicker(){
  var date = getUrlVars()["date"];
  var today = incrementDate(new Date(), 0);
  $('.date').attr('max', today);
  $('.date').attr('value', date);
}

$('input[type="date"]').change(function(){
    var inputDate = new Date(this.value);
    inputDate = incrementDate(inputDate, 0);
    var url = window.location.href.substring(0, window.location.href.indexOf('?'));
    $(location).attr('href', url + '?date=' + inputDate);
});


$(document).keydown(function(e){
  if (e.keyCode == 37) { 
       previous();
    }
  if (e.keyCode == 39){
      var date = incrementDate(new Date(), 0);
      var currentImage = getUrlVars()['date'];
      if (date !== currentImage) {
        next();
      }
    }
})