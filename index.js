(function ($) {
  $.fn.xclick = function (num, handler) {
    var self = this;
    $.data(self, 'times', 0);
    $.data(self, 'iter', 1);
    $(document).on('mousemove', function () {
      $.data(self, 'times', 0);
    });
    self.on('click', function () {
      $.data(self, 'times', $.data(self, 'times') + 1);
      const currentTimes = $.data(self, 'times');
      const currentIter = $.data(self, 'iter');
      if ($.data(self, 'times') === num) {
        handler();
        $.data(self, 'iter', $.data(self) + 1);
        $.data(self, 'times', 0);
      } else {
        setTimeout(() => {
          if (
            $.data(self, 'times') === currentTimes &&
            $.data(self, 'iter') == currentIter
          ) {
            $.data(self, 'times', 0);
          }
        }, 500);
      }
    });
  };
})(jQuery);
