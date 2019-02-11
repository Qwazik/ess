$(function(){
  jQuery('.map-nav__scroll').scrollbar();
  $('input[type="tel"], input[name="tel"]').mask('+7(999)999-99-99');
  var TABS_SLIDERS = [];



 
$('.fancybox').fancybox();
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
    console.log($('.map-nav').innerWidth());
    $(window).on('resize', function(){
      $('.map-card').outerWidth($(window).innerWidth() - $('.map-nav').innerWidth());
    })
    $('.map-card__back').click(function(){
      $(this).closest('.map-card').hide();
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
      card.show();
    });
  }());
  /* map card */

  /* partners item */
  (function(){
    $('.partners__item').click(function(){
      $(this).addClass('partners__item_active');
    });
    $('.tooltip-partners-close').click(function(){
      $(this).parent().hide();
    })
  }());
  /* partners item */

  /* portfolio gal */
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 4,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
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
  /* portfolio gal */

  /*services detail */
  (function(){
    var servicesDetail = $('.services-detail'),
        servicesDetialImage = servicesDetail.find('[data-image]'),
        servicesDetialIName = servicesDetail.find('[data-name]'),
        servicesDetialDetail = servicesDetail.find('[data-detail]'),
        servicesDetailNav = servicesDetail.find('.slider-nav');
        servicesDetail.find('.services-detail__close').click(function(){
          servicesDetail.hide();
          $('.service-item').removeClass('service-item_active');
        });
        servicesDetailNav.children().click(function(){
          if ($(this).is('.slider-nav__prev')){
            prev();
          }else{
            next();
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
        servicesDetail.show();
        $('.service-item').removeClass('service-item_active');
        $this.addClass('service-item_active');
        return false;
    });
  }());
  /*services detail */
});

$.fn.q = function(action, params){  
  var actions = {
    tabs: tabs
  };
  actions[action](this, params);
  function tabs(el, params){
    $el = $(el);
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
  function isset(v){
    return (typeof v !== 'undefined')?true:false;
  }
}

