(function ($) {
  $.fn.xclick = function (num, handler) {
    var self = this;
    $.data(self, 'times', 0);
    $.data(self, 'iter', 1);
    $(document).mousemove(function () {
      $.data(self, 'times', 0);
    });
    self.click(function () {
      const currentTimes = $.data(self, 'times');
      const currentIter = $.data(self, 'iter');
      $.data(self, 'times', $.data(self, 'times') + 1);
      if ($.data(self, 'times') === num) {
        handler();
        $.data(self, 'iter', $.data(self) + 1);
        $.data(self, 'times', 0);
      } else {
        setTimeout(() => {
          if ($.data(self, 'times') === currentTimes && $.data(self, 'iter') == currentIter) {
            $.data(self, 'times', 0);
          }
        }, 100);
      }
    });
  };
  $('button').xclick(10, () => alert('bro'));
})(jQuery);
