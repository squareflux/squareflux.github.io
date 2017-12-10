$(document).ready(function () {
  checkNightmode();
});


$('.switch').click(function () {
  if ($('#nightmode').is(":checked")) {
    localStorage.setItem("nightmode", "true");
  }else{
    localStorage.setItem("nightmode", "false");
  }
  checkNightmode();
});

function checkNightmode(){
  if (localStorage.getItem("nightmode") == "true") {
    $('body').addClass('nightmode');
    $('.previous_btn').addClass('nightButton');
    $('.next_btn').addClass('nightButton');
  }else{
    $('body').removeClass('nightmode');
    $('.previous_btn').removeClass('nightButton');
    $('.next_btn').removeClass('nightButton');
  }
  if (localStorage.getItem("nightmode") == "true" && $('#nightmode').not(":checked")) {
      $('#nightmode').prop('checked', true);

  }
}

$('a.icon').click(function () {
 	console.log('responsive clicked');
  var x = document.getElementById("nav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  };
})

 $('.switch').click(function () {
  setNightmode();
  });

function setNightmode(){
  if ($('#nightmode').is(":checked")) {
    localStorage.setItem("nightmode", "true");
  }else{
    localStorage.setItem("nightmode", "false");
  }
  checkNightmode();

}

function checkNightmode(){
  if (localStorage.getItem("nightmode") == "true") {
    $('body').addClass('nightmode');
    $('.previous_btn').addClass('nightButton');
    $('.next_btn').addClass('nightButton');
  }else{
    $('body').removeClass('nightmode');
    $('.previous_btn').removeClass('nightButton');
    $('.next_btn').removeClass('nightButton');
  }

  if (localStorage.getItem("nightmode") == "true" && $('#nightmode').not(":checked")) {
      $('#nightmode').prop('checked', true);

  } else if (localStorage.getItem("nightmode") == "false" && $('#nightmode').is(":checked")){
      $('#nightmode').prop('checked', false);
  }
}

 $(document).keydown(function(e){
  if(!$('.feedback-input').is(":focus") ){
  if (e.keyCode == 78) { 
    console.log('n');
    if (localStorage.getItem("nightmode") == "true") {
      localStorage.setItem('nightmode', 'false');
  }else{
      localStorage.setItem('nightmode', 'true');
    }
    checkNightmode();
}
  }

});

