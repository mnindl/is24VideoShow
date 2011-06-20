if (!window.IS24Video) { var IS24Video = {}; }

IS24Video.videoTool = ( function () {
  var c = console;
  var item_height = 90;
  var show_items_height = 4*item_height;
  var list_height = parseInt($('.videos_holder_list ul').css('height'), 10);
  var max_scroll_down_height = -(list_height - show_items_height);
  // initial value for top (default ff is 0 ..other auto);
  $('.videos_holder_list ul').css('top', 0);
  c.log(max_scroll_down_height);
  function init () {
    var init_url = $('.videos_holder li').attr('data-videourl');
    $('#is24_video').attr('src', init_url);
    $('#videos_show_up').attr('disabled', 'disabled');
    $('#videos_show_down').css('top', show_items_height ).removeAttr('disabled');
    initEventHandler();
  }
  function initEventHandler () {
    $('.videos_holder li').click( function () {
      $('#is24_video').attr('src', $(this).attr('data-videourl'));
    });
    $('#videos_show_up').click( function (){
      $(this).attr('disabled', 'disabled');
      var top = parseInt($('.videos_holder_list ul').css('top'), 10);
      c.log(top);
      if (top < 0 ){
        $('.videos_holder_list ul').animate({ top: '+='+item_height+'px'},
        {
          duration: 'fast',
          complete: function() {
            //c.log("complete");
            $('#videos_show_up').removeAttr('disabled');
            $('#videos_show_down').removeAttr('disabled');
          }
        });
      }
    });
    $('#videos_show_down').click( function (){
      $(this).attr('disabled', 'disabled');
      //c.log($('.videos_holder_list ul').css('top'));
      var top = parseInt($('.videos_holder_list ul').css('top'), 10);
      c.log(top);
      if (top > max_scroll_down_height) {
        $('.videos_holder_list ul').animate({ top: '-='+item_height+'px'},
        {
          duration: 'fast',
          complete: function() {
            //c.log("complete");
            $('#videos_show_down').removeAttr('disabled');
            $('#videos_show_up').removeAttr('disabled');
          }
        });
      }

    });
  }
  return {
    init: function () {
      return init();
    }
  };
}());

if(window.jQuery) { IS24Video.videoTool.init(); }