;
(function ($) {
  $.fn.loadingLoop = function() {
    // 默认配置信息
    var defaultConfig = {
      bgColor:       "#555358",
      progressColor: "#F7B538",
      percent:       75,
      duration:      1500
    };
    $(this).each(function() {
      var $target = $(this);
      var color = $target.data("color");
      var percent = parseInt($target.data("percent"), 10);
      var duration = parseFloat($target.data("duration"), 10) * 1000;
      var bgColor, progressColor;
      if(color && color.split(",").length == 2) {
        var colorSet  = color.split(",");
        bgColor       = colorSet[0];
        progressColor = colorSet[1];
      } else {
        bgColor = defaultConfig.bgColor;
        progressColor = defaultConfig.progressColor;
      }

      if(!percent) {
        percent = defaultConfig.percent;
      }
      if(!duration) {
        duration = defaultConfig.duration;
      }

      $target.append("<div class='loop-progress-track'></div><div class='loop-progress-left'></div><div class='loop-progress-right'></div><div class='loop-progress-cover'></div>")

      var x = $target.find('.loop-progress-track').height(); // 触发 Layout
      // 触发Layout？
      // http://stackoverflow.com/questions/12088819/css-transitions-on-new-elements

      $target.find(".loop-progress-track, .loop-progress-cover").css("border-color", bgColor);
      $target.find(".loop-progress-left, .loop-progress-right").css("border-color", progressColor);

      console.log($target.find(".loop-progress-left").css("border-color"));

      // left rotate
      $target.find(".loop-progress-left").css({
        "transform": "rotate(" + percent*3.6 + "deg)",
        "-webkit-transform": "rotate(" + percent*3.6 + "deg)",
        "transition": "transform " + duration + "ms linear",
        "-webkit-transition": "transform " + duration + "ms linear",
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