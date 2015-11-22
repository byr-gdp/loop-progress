;
(function ($) {
  $.fn.loadingLoop = function() {
    // 默认配置信息
    var defaultConfig = {
      bgColor:       "#555358",
      progressColor: "#F7B538",
      percent:       75,
      duration:      1500,
      timeing:       "ease-in-out",
      border_width:  20,
      // size:          150
    };
    $(this).each(function() {
      var $target = $(this);
      var percent = parseInt($target.data("percent"), 10);
      var duration = parseFloat($target.data("duration"), 10) * 1000;
      var bgColor = $target.data("bg");
      var progressColor = $target.data("progress");
      var timing = $target.data("timing");
      var border_width = $target.data("border-width");
      // var size = $target.data("size");
      if(!percent) {
        percent = defaultConfig.percent;
      }
      if(!duration) {
        duration = defaultConfig.duration;
      }
      
      switch(timing) {
        case "linear":
        case "ease-in":
        case "ease-out":
        case "ease-in-out":
          break;
        default:
          timing = defaultConfig.timing;
          break;
      }
      console.log('width:', border_width);
      if(isNaN(border_width) || border_width <= 0) {
        border_width = defaultConfig.border_width;
      }
      console.log('width:', border_width);

      $target.append("<div class='loop-progress-track'></div><div class='loop-progress-left'></div><div class='loop-progress-right'></div><div class='loop-progress-cover'></div><span class='loop-progress-text'></span>")

      var x = $target.find('.loop-progress-track').height(); // 触发 Layout
      // 触发Layout
      // http://stackoverflow.com/questions/12088819/css-transitions-on-new-elements

      $target.find(".loop-progress-track, .loop-progress-cover").css("border-color", bgColor);
      $target.find(".loop-progress-left, .loop-progress-right").css("border-color", progressColor);
      
      $target.find("div").css("border-width", border_width + "px");
      var interval = duration/percent;
      var current = 0;
      var end = percent;
      var t = setInterval(function add() {
        $target.find(".loop-progress-text").text(current);
        current++;
        if(current > end) {
          clearInterval(t);
        }
      }, interval);

      // rotate 
      $target.find(".loop-progress-left").css({
        "transform": "rotate(" + percent*3.6 + "deg)",
        "-o-transform": "rotate(" + percent*3.6 + "deg)",
        "-ms-transform": "rotate(" + percent*3.6 + "deg)",
        "-webkit-transform": "rotate(" + percent*3.6 + "deg)",
        "transition": "transform " + duration + "ms " + timing,
        "-webkit-transition": "transform " + duration + "ms " + timing,
      })

      if(percent > 50) {
        var animation = "toggle " + (duration * 50 / percent) + "ms";
        $target.find(".loop-progress-right").css({
          "opacity": 1,
          "animation": animation,
          "animation-timing-function": "step-end"
        });
        $target.find(".loop-progress-cover").css({
          "opacity": 0,
          "animation": animation,
          "animation-timing-function": "step-start"
        })
      }
    })
  };
})(jQuery)