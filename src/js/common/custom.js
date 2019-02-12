$(function(){
  TABS_SLIDERS = [];
  $('.scrollto').q('scrollto');
  jQuery('.map-nav__scroll').scrollbar();
  $('input[type="tel"], input[name="tel"]').mask('+7(999)999-99-99');

  /* portfolio gal */

  
$('.fancybox-portfolio').fancybox({
  smallBtn: false,
  afterLoad: function(){
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 4,
      slidesPerView: 10,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        768: {
          slidesPerView: 6
        },
        575: {
          slidesPerView: 4
        }
      }
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '[data-next]',
        prevEl: '[data-prev]',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
  }
});
/* portfolio gal */
 
  $('.fancybox').fancybox({
    smallBtn: false,
    afterLoad: function(){
      setTimeout(function(){
        TABS_SLIDERS.forEach(function (slider) {
          slider.update();
        },100);
      })
      $('.fancybox').fancybox({
        smallBtn:false
      })
    }
  });
  $('[data-tabs]').q('tabs',{
    afterClick: function(){
      TABS_SLIDERS.forEach(function(slider){
        slider.update();
      });
    }
  });
  var slidersProps = {
    'about': {
      effect: 'fade'
    },
    'team':{
      breakpoints: {
        575: {
          slidesPerView: 2
        },
        375: {
          slidesPerView: 1
        }
      }
    }
  };
  $('[data-swiper-container]').each(function(){
    var $this = $(this),
        wrapper = $this.find('[data-swiper-wrapper]'),
        slide = $this.find('[data-swiper-slide]'),
        pagination = $this.find('[data-swiper-pagination]'),
        items = $this.data('swiper-items'),
        sliderName = $this.data('swiper-name');
        bulletClass = pagination.data('pagination-class'),
        bulletClassActive = pagination.data('pagination-active'),
        nextEl = $this.find('[data-next]'),
        prevEl = $this.find('[data-prev]'),
        swiper = null,
        sliderProps = slidersProps[sliderName],
        defaultProps = {  
          spaceBetween: 10,
          slidesPerView: items,
            pagination: {
              el: pagination,
              bulletActiveClass: bulletClassActive,
              bulletClass: bulletClass,
              clickable: true
            },
            navigation:{
              nextEl: nextEl,
              prevEl: prevEl,
              disabledClass: 'disabled'
            }
        },
        props = $.extend(defaultProps, sliderProps);

    if(slide.length>items){
      sliderInit();
      swiper = new Swiper($this, props);
      TABS_SLIDERS.push(swiper);
    }
    function sliderInit(){
      $this.addClass('swiper-container');
      wrapper.addClass('swiper-wrapper');
      slide.addClass('swiper-slide');
      pagination.show();
      wrapper.removeClass('row');
      slide.removeClass('col-3');
    }
  });

  /* map nav */
  (function(){
    var buttons = $('.map-nav__nav').children();
    buttons.filter('.map-nav__nav-left').click(function(){
      prev();
    });
    buttons.filter('.map-nav__nav-right').click(function(){
      next();
    });

    function next(){
      var active = $('.map__place_active');
      if(active.next().length){
        active.next().click();
      }
    }

    function prev(){
      var active = $('.map__place_active');
      if(active.prev().length){
        active.prev().click();
      }
    }
  }());
  /* map nav */


  /* map card */
  (function(){
    $('.map-card').outerWidth($(window).innerWidth() - $('.map-nav').innerWidth());
    $(window).on('resize', function(){
      $('.map-card').outerWidth($(window).innerWidth() - $('.map-nav').innerWidth());
    })
    $('.map-card__back').click(function(){
      $(this).closest('.map-card').removeClass('map-card_active');
    });
    $('.map-place-desc').click(function(){
      var image = $(this).data('image'),
          name = $(this).find('[data-name]').text(),
          detail = $(this).find('[data-detail]').html(),
          card = $(this).closest('.map-block').find('[data-card]'),
          cardImage = card.find('[data-image]'),
          cardName = card.find('[data-name]'),
          cardDetail = card.find('[data-detail]');
      cardImage.css('background-image', 'url('+image+')');
      cardName.text(name);
      cardDetail.html(detail);
      card.addClass('map-card_active');
    });
  }());
  /* map card */

  /* partners item */
  (function(){
    $('.partners__item').click(function(){
      $('.partners__item').removeClass('partners__item_active');
      $(this).addClass('partners__item_active');
    });
    $('.tooltip-partners-close').click(function(){
      $(this).closest('.partners__item').removeClass('partners__item_active');
      return false;
    })
  }());
  /* partners item */

  

  /*services detail */
  (function(){
    var servicesDetail = $('.services-detail'),
        servicesDetialImage = servicesDetail.find('[data-image]'),
        servicesDetialIName = servicesDetail.find('[data-name]'),
        servicesDetialDetail = servicesDetail.find('[data-detail]'),
        servicesDetailNav = servicesDetail.find('.slider-nav');
        servicesDetail.find('.services-detail__close').click(function(){
          servicesDetail.removeClass('services-detail_active');
          $('.service-item').removeClass('service-item_active');
        });
        servicesDetailNav.children().click(function(){
          if ($(this).is('.slider-nav__prev')){
            prev();
            $('.services-detail__content').scrollTop(0);
          }else{
            next();
            $('.services-detail__content').scrollTop(0);
          }
        });

        function prev(){
          var prev = $('.service-item_active').closest('.services__col').prev().find('.service-item');
          if(prev.length){
            $('.service-item').removeClass('service-item_active');
            prev.click();
          }
        }

        function next(){
          var next = $('.service-item_active').closest('.services__col').next().find('.service-item');
          if (next.length) {
            $('.service-item').removeClass('service-item_active');
            next.click();
          }

        }
    $('.service-item').click(function(){
      var $this = $(this),
          image = $this.find('[data-image]').data('image'),
          detail = $this.find('[data-detail]').html(),
          name = $this.find('[data-name]').text();
        servicesDetialImage.css('background-image','url('+image+')');
        servicesDetialIName.text(name);
        servicesDetialDetail.html(detail);
        servicesDetail.addClass('services-detail_active');
        $('.service-item').removeClass('service-item_active');
        $this.addClass('service-item_active');
        $('html, body').animate({
          scrollTop: $('.services').offset().top
        },1000)
        return false;
    });
  }());
  /*services detail */

  /*-- START: mobile nav --*/
  var MOBILE_NAV = (function () {
    var mobileNavClass = 'mobile-nav';
    var menus = [
      '.top-panel__nav .main-nav'
    ];
    var additionalBlocks = [
   
    ];
    var cnt = $('<div/>');

    for (var j = 0; j < additionalBlocks.length; j++) {
      if ($(additionalBlocks[j]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_add' + j);
        section.append($(additionalBlocks[j]).clone());
        cnt.append(section);
      }
    }

    for (var i = 0; i < menus.length; i++) {
      if ($(menus[i]).length) {
        var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_' + i);
        section.append(getItems(menus[i]));
        cnt.append(section);
      }
    }


    cnt.addClass(mobileNavClass);

    $('body').append(cnt);

    $('.header-mobile-wrap').click(function () {
      $('.' + mobileNavClass).toggleClass('active');
      $(this).toggleClass('active');
    });

    $('.mobile-nav-btn').click(function(){
      $(this).toggleClass('active');
      $('.mobile-nav').toggleClass('active');
    });


    function getItems(selector) {
      var clone = $(selector).clone();
      return clearClasses(clone);
    }

    function clearClasses(element) {
      var depth = 0;
      $(element).removeClass().addClass(mobileNavClass + '__list');
      clear($(element).children());

      function clear(childrens) {
        depth++;
        $(childrens).removeClass();
        $(childrens).each(function () {
          var $this = $(this);
          if ($this.is(':empty')) $(this).remove();
          if ($this.is('li')) $(this).addClass(mobileNavClass + '__item');
          if ($this.is('a')) $(this).addClass(mobileNavClass + '__link');
          if ($this.is('ul') && depth > 0) {
            var dropdownBtn = $('<button/>').addClass(mobileNavClass + '__dropdown-toggler');
            var parentLi = $(this).closest('li');
            dropdownBtn.click(function () {
              $this.toggleClass('active');
            });
            parentLi.append(dropdownBtn);

            $(this).addClass(mobileNavClass + '__dropdown');
            $(parentLi).addClass(mobileNavClass + '__parent');
          };
        });
        if ($(childrens).children().length) clear($(childrens).children());
      }
      return element;
    }
  }());

/*-- END: mobile nav --*/
});

$.fn.q = function(action, params){  
  var actions = {
    tabs: tabs,
    scrollto: scrollto
  };
  actions[action](this, params);
  function tabs(el, params){
    var $el = $(el);
    $el.each(function(){
      var $this = $(this),
          $thisNav = $this.find('[data-tabs-nav]'),
          $thisContent = $this.find('[data-tabs-content]'),
          navActiveClass = $thisNav.data('tabs-active'),
          contentActiveClass = $thisContent.data('tabs-active');
      $thisNav.children().click(function(){
        $(this).siblings().removeClass(navActiveClass);
        $(this).addClass(navActiveClass);
        $thisContent.children().removeClass(contentActiveClass);
        $thisContent.children().eq($(this).index()).addClass(contentActiveClass);
        if (isset(params.afterClick)) {
          params.afterClick();
        }
      }).eq(0).click();     
    });
  }
  function scrollto(el, params){
    var $el = $(el);
    $el.each(function(){
      var $this = $(this);
      var $target = $($(this).attr('href'));
      $this.click(function(){
        if ($target.length) {
          $('html, body').stop(true, true).animate({
            scrollTop: $target.offset().top
          }, 1000);
        }
      });
    });
  }
  function isset(v){
    return (typeof v !== 'undefined')?true:false;
  }
}

