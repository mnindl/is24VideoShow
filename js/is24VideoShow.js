if (!window.IS24Video) { var IS24Video = {}; }

IS24Video.videoTool = (function () {
  var item_height = '70',
      show_items = 5,
      show_items_height = show_items * parseInt(item_height, 10) + 25,
      list_height = parseInt($('.videos_holder_list ul').css('height'), 10),
      max_scroll_down_height = -(list_height - show_items_height);
  // initial value for top (default ff is 0 ..other auto);
  $('.videos_holder_list ul').css('top', 0);
  console.log(max_scroll_down_height);

  function initEventHandler () {
    $('.videos_holder li').click( function () {
      $('#is24_video').attr('src', $(this).attr('data-videourl'));
      $('.video_holder h1').html($(this).find('h3').html());
      $('.video_holder p').html($(this).find('p').html());
      $('.videos_holder li .border_holder').removeClass('active').addClass('inactive');
      $(this).prev().find('.border_holder').removeClass('inactive');
      $(this).find('.border_holder').removeClass('inactive').addClass('active');
    });
    $('#videos_show_up').click( function (){
      $(this).attr('disabled', 'disabled');
      var top = parseInt($('.videos_holder_list ul').css('top'), 10);
      //console.log(top);
      if (top < 0 ){
        $('.videos_holder_list ul').animate({ top: '+='+item_height+'px'},
        {
          duration: 'fast',
          complete: function() {
            if ( $('#videos_show_down').attr('disabled') ) {
              $('#videos_show_down').removeAttr('disabled').css({
                                                  cursor: 'pointer',
                                                  backgroundPosition: '0 -85px'
                                                  });
            }
            var top = parseInt($('.videos_holder_list ul').css('top'), 10);
            //console.log(top);
            if (top === 0) {
              $('#videos_show_up').css({
                     cursor: 'default',
                     backgroundPosition: '0 -54px'
                    });
            } else {
              $('#videos_show_up').removeAttr('disabled');
            }
          }
        });
      }
    });
    $('#videos_show_down').click( function (){
      $(this).attr('disabled', 'disabled');
      //console.log($('.videos_holder_list ul').css('top'));
      var top = parseInt($('.videos_holder_list ul').css('top'), 10);
      //console.log(top);
      if (top > max_scroll_down_height) {
        $('.videos_holder_list ul').animate({ top: '-='+item_height+'px'},
        {
          duration: 'fast',
          complete: function() {
            $('#videos_show_up').removeAttr('disabled').css({
                                              cursor: 'pointer',
                                              backgroundPosition: '0 2px'
                                              }).hover(
                                              function () {
                                                $(this).css( 'background-position', '0 -26px');
                                              },
                                               function () {
                                                $(this).css( 'background-position', '0 2px');
                                              });
            var top = parseInt($('.videos_holder_list ul').css('top'), 10);
            console.log(top);
            if (top <= max_scroll_down_height) {
              $('#videos_show_down').css({
                     cursor: 'default',
                     backgroundPosition: '0 -141px'
                    });
            } else {
              $('#videos_show_down').removeAttr('disabled');
            }
          }
        });
      }
    });
  }
  function init () {
    $('.videos_holder li').eq(0).find('.border_holder').removeClass('inactive').addClass('active');
    var init_url = $('.videos_holder li').eq(0).attr('data-videourl');
    $('.video_holder h1').html($('.videos_holder li h3').eq(0).html());
    $('.video_holder p').html($('.videos_holder li p').eq(0).html());
    $('#is24_video').attr('src', init_url);
    $('.video_holder .pdf_link').attr('href', $('.videos_holder li .pdf_link').eq(0).attr('href'));
    $('.video_holder .contenturl').attr('href', $('.videos_holder li').eq(0).attr('data-contenturl'));
    $('.video_holder .contenturl').html($('.videos_holder li').eq(0).attr('data-contenturl_text'));
    $('#videos_show_up').attr('disabled', 'disabled').css({
                                                       cursor: 'default',
                                                       backgroundPosition: '0 -54px'
                                                      });
    console.log($('.videos_holder li').size());
    if ( $('.videos_holder li').size() > 5 ) {
      $('#videos_show_down').css('top', show_items_height ).removeAttr('disabled').hover(
      function () {
        $(this).css( 'background-position', '0 -113px');
      },
       function () {
        $(this).css( 'background-position', '0 -85px');
      });
    } else {
      $('#videos_show_down').css('top', show_items_height ).css({
                                                           cursor: 'default',
                                                           backgroundPosition: '0 -141px'
                                                          });
    }
    initEventHandler();
  }  
  return {
    init: function () {
      return init();
    }
  };
}());

if(window.jQuery) { IS24Video.videoTool.init(); }