var enabledNational = true,  data = {};

$(document).ready(function(){
  // Display date and time in the header
  var date = new Date();
  var day = date.getDate(),
      month = date.getMonth()+1,
      year = date.getFullYear(),
      hours = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
  var today = month + "/" + day + "/" + year;
  var cur_time = hours + ":" + min + ":" + sec;

  $('.date').text(today);
  $('.time').text(cur_time);

  $.get('/getJSON', (news_data) => {
    data = news_data;
    getNewsdata();
    getAllTitles();
  });

  handleClickOfTabs();
});
function handleClickOfTabs(){
  // Toggle between national and international tabs
  $('#national').on('click', function(){
    enabledNational = true;
    getNewsdata();
    getAllTitles();
    $('#national').removeClass('disableButton');
    $('#international').addClass('disableButton');
  });
  $('#international').on('click', function(){
    enabledNational = false;
    getNewsdata();
    getAllTitles();
    $('#national').addClass('disableButton');
    $('#international').removeClass('disableButton');
  });
  //scroll to the news title when a link under Feed is clicked.
  $(document).on('click', 'a', function(){
    var customData = $(this).attr('data-id');
    $('html, body').animate({
      scrollTop: $('#'+customData).offset().top
    }, 2000);
  });
}

//get news title and description in the news_content
function getNewsdata(){
    var arr = [], html = '';
    if(enabledNational){
      html = '';
      arr = data.national;;
    }else{
      html = '';
      arr = data.international;
    }
    for(var i = 0; i<arr.length; i++){
      html += '<h4 class="title" id='+ arr[i].id +'>' + arr[i].title + '</h4>'; // adding title
      html += '<p>' + arr[i].description + '</p>'
    }
    $('#news_content').html(html);
}

function getAllTitles(){
  //get all the titles under feeds

  var arr_data = {}, html_title = '';
  if(enabledNational){
    arr_data = data.national
  }else{
    arr_data = data.international
  }
  for(var i=0; i< arr_data.length; i++){
    html_title += '<p><a href="#" data-id='+ arr_data[i].id +'>' + arr_data[i].title + '</a></p>';
  }
  $('.all_titles').html(html_title);
}
