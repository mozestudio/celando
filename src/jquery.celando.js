/*
* Copyright (c) 2014, Giovanni Capuano, Moze, All rights reserved.
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 3.0 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library.
*/

(function($) {
  function List($elements, $toggleButton, $toggleButtonPos, numItems) {
    var that = this;

    this.show = function() {
      $elements.removeClass('hide').addClass('show');
    };

    this.hide = function() {
      if($toggleButtonPos !== undefined)
        $toggleButton.appendTo($('body'));

      $elements.slice(numItems).removeClass('show').addClass('hide');

      if($toggleButtonPos !== undefined)
        $toggleButton.appendTo($toggleButtonPos);
    };

    this.toggle = function(label, animation, animationTime) {
      if($elements.hasClass('hide')) {
        that.show();

        if(animation === true)
          that.animate(animationTime);

        $toggleButton.text(label.less).removeClass('more-toggle').addClass('less-toggle');
      }
      else {
        if(animation === true)
          that.animate(animationTime, {
            complete: function() {
              that.hide();
            }
          });
        else
          that.hide();

        $toggleButton.text(label.more).removeClass('less-toggle').addClass('more-toggle');
      }
    };

    this.animate = function(animationTime, options) {
      var element = $elements.children('.hide').length > 0 ? $elements.not('.hide').first() : $elements.first();
          options = $.extend({ duration: animationTime }, options);

      $('html, body').animate({
        scrollTop: element.offset().top
      }, options);
    };
  };

  function Paragraph($paragraph, $toggleButton, $toggleButtonPos, length) {
    var that = this;

    this.show = function() {
      $paragraph.children('p.hide').contents().unwrap();
    };

    this.hide = function() {
      $toggleButton.appendTo($('body'));

      var contents = $paragraph.html();
      $paragraph.html(contents.substring(0, length));
      $paragraph.append('<p class="hide">' + contents.substring(length) + '</p>');

      $toggleButton.appendTo($toggleButtonPos);
    };

    this.toggle = function(label, animation, animationTime) {
      if($paragraph.children('p.hide').length > 0) {
        that.show();

        if(animation === true)
          that.animate(animationTime)

        $toggleButton.text(label.less).removeClass('more-toggle').addClass('less-toggle');
      }
      else {
        if(animation === true)
          that.animate(animationTime, {
            complete: function() {
              that.hide();
            }
          });
        else
          that.hide();

        $toggleButton.text(label.more).removeClass('less-toggle').addClass('more-toggle');
      }
    };

    this.animate = function(animationTime, options) {
      options = $.extend({ duration: animationTime }, options);

      $('html, body').animate({
        scrollTop: $paragraph.offset().top
      }, options);
    };
  };

  var isList = function($target) {
    return $target.length > 1;
  };

  $.celando = function($target, options) {
    var defaults = {
      $toggleButton:    undefined,
      $toggleButtonPos: undefined,
      length:           300,
      numItems:         3,
      animation:        true,
      animationTime:    500,
      adapter:          undefined,
      force:            false,
      label: {
        more: 'More',
        less: 'Less'
      }
    };

    var config = $.extend(defaults, options);
    var list   = isList($target);   
    
    if(config.force === false && list && $target.length <= config.numItems)
      return;

    if(config.$toggleButton === undefined) {
      if(config.$toggleButtonPos === undefined)
        config.$toggleButtonPos = list ? $target.parent() : $target;

      config.$toggleButton = $('<a href="#" class="more-less-toggle more-toggle">' + config.label.more + '</a>');
      config.$toggleButton.appendTo(config.$toggleButtonPos);
    }
    
    var klass = config.adapter === undefined ? (list ? List : Paragraph) : adapter;
        klass = new klass($target, config.$toggleButton, config.$toggleButtonPos, list ? config.numItems : config.length)

    klass.hide();
    
    config.$toggleButton.on('click', function(e) {
      e.preventDefault();

      klass.toggle(config.label, config.animation, config.animationTime);
    });
  };
})(jQuery);
