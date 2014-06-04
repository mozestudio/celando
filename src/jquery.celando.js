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
  var List = function($container, $elements, $toggleButton, $toggleButtonPos, numItems) {
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

    this.toggle = function(label, animation, animationTime, onToggle) {
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

    this.animate = function(duration, options) {
      var $target = $container.children('.hide').length > 0 ? $container.not('.hide').first() : $elements.first();
      options = $.extend({ duration: duration }, options);

      $('html, body').animate({
        scrollTop: $target.offset().top
      }, options);
    };
  };

  var LazyList = function($container, $elements, $toggleButton, $toggleButtonPos, numItems) {
    var that = this;

    this.show = function() { };

    this.hide = function() { };

    this.toggle = function(label, animation, animationTime, onToggle) {
      if($toggleButtonPos !== undefined)
        $toggleButton.appendTo($('body'));

      onToggle(function() {
        if($toggleButtonPos !== undefined)
          $toggleButton.appendTo($toggleButtonPos);

        if(animation)
          that.animate(animationTime);
      });
    };

    this.animate = function(duration, options) {
      var $target = $container.children(':last');
      options = $.extend({ duration: duration }, options);

      $('html, body').animate({
        scrollTop: $target.offset().top
      }, options);
    };
  };

  var Paragraph = function($container, $paragraph, $toggleButton, $toggleButtonPos, length) {
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

    this.toggle = function(label, animation, animationTime, onToggle) {
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

    this.animate = function(duration, options) {
      options = $.extend({ duration: duration }, options);

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
      $container:       undefined,
      $toggleButton:    undefined,
      $toggleButtonPos: undefined,
      length:           300,
      numItems:         3,
      animation:        true,
      animationTime:    500,
      adapter:          undefined,
      force:            false,
      onToggle:         undefined,
      callback:         undefined,
      lazy:             false,
      label: {
        more: 'More',
        less: 'Less'
      }
    };

    var config = $.extend(defaults, options);
    var list   = isList($target);   
    
    if(config.lazy === false && config.force === false && list && $target.length <= config.numItems)
      return;

    if(config.$toggleButton === undefined) {
      if(config.$toggleButtonPos === undefined)
        config.$toggleButtonPos = list ? $target.parent() : $target;

      config.$toggleButton = $('<a href="#" class="more-less-toggle more-toggle">' + config.label.more + '</a>');
      config.$toggleButton.appendTo(config.$toggleButtonPos);
    }

    if(config.$container === undefined)
      config.$container = $target.parent();
    
    var klass = config.adapter === undefined ? (config.lazy === true ? LazyList : (list ? List : Paragraph)) : config.adapter;
        klass = new klass(config.$container, $target, config.$toggleButton, config.$toggleButtonPos, list ? config.numItems : config.length)

    klass.hide();
    
    config.$toggleButton.on('click', function(e) {
      e.preventDefault();

      klass.toggle(config.label, config.animation, config.animationTime, config.onToggle);
    });

    if(config.callback !== undefined)
      config.callback(klass, config);
  };
})(jQuery);
