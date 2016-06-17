$(function() {

    // Hamburger menu
    var hamburgerIcon = $("#hamburger")
    var hamburgerMenu = $(".menu");

    hamburgerIcon.on("click", function() {
        $(".main-bg").toggleClass("hidden");

        hamburgerMenu.toggleClass("visible");

    });

    // Learn more button
    var learnMoreBtn = $(".about-content").find("a");
    var ContentDiv = $(".about-content");
    var ContentTxtDiv = $(".about-content-text");
    var ContentHidden = ContentTxtDiv.find(".hidden");

    learnMoreBtn.on("click", function() {
        ContentDiv.toggleClass("about-content-full about-content");
        ContentTxtDiv.toggleClass("about-content-text-full about-content-text");
        ContentHidden.toggleClass("hidden");
    });

    // Team members slider
    var prevMemberBtn = $("#prevMember");
    var nextMemberBtn = $("#nextMember");
    var teamMembersSlider = $(".team-members-slider")
    var members = teamMembersSlider.find("li");
    var currentPicture = 0;
    var imageWidth = members.eq(currentPicture).width();
    var membersList = teamMembersSlider.find("ul");

    membersList.width(imageWidth * members.length);

    nextMemberBtn.on("click", function() {

        if (currentPicture < (members.length - 1) && (members.last().offset().left - (teamMembersSlider.offset().left + teamMembersSlider.width() - imageWidth)) != 0) {
            currentPicture++;
            membersList.animate({
                left: "-=" + imageWidth
            }, 1000);
        };
    });

    prevMemberBtn.on("click", function() {

        if (currentPicture > 0 && currentPicture < (members.length)) {
            currentPicture--;
            membersList.animate({
                left: "+=" + imageWidth
            }, 1000);
        };
    });

    // Skills-animation & Sticky menu

    var allSpans = $('.skill-show').find('span');
    var webDesign = allSpans.eq(0);
    var graphicDesign = allSpans.eq(1);
    var htmlCss = allSpans.eq(2);
    var uiUx = allSpans.eq(3);
    var skillSection = $(".skill-section");
    var wasAnimated = false;

    var stickyMenu = $(".sticky-menu");
    var shortDescSection = $(".shortDesc-section");
    var stickyMenuTrigger = shortDescSection.offset().top;

    $(window).scroll(function(event) {
        var currPosition = (skillSection.offset().top) + skillSection.height() - ($(window).innerHeight() * 0.85);

        if ($(window).scrollTop() > currPosition && !wasAnimated) {
            webDesign.addClass("animate web-design");
            htmlCss.addClass("animate html-css");
            graphicDesign.addClass("animate graphic-design");
            uiUx.addClass("animate ui-ux");

            $(".counter").css("font-size", "1.6rem").counterUp({
                time: 1500
            });
            wasAnimated = true;
        }

        if ($(window).scrollTop() > stickyMenuTrigger) {
            stickyMenu.addClass("sticky");
        } else {
            stickyMenu.removeClass("sticky");
        }
    }).on("resize", function() {
        resizeSlider();
    });

    // Citations slider

    resizeSlider();

    var currentClickedElement = 0;

    function resizeSlider() {
        var citSliderBtns = $(".slider-citations-btns").find("span");
        var citSliderPictures = $(".slider-citations").find("li");
        var citCurrentPicture = 0;
        var citImageWidth = citSliderPictures.eq(citCurrentPicture).width();
        var citPicturesList = $('.slider-citations').find("ul");

        citPicturesList.width(citImageWidth * citSliderPictures.length);

        citPicturesList.css("left", -(currentClickedElement * citImageWidth));

        citSliderBtns.off('click').on("click", function() {

            var currIndex = $(this).index();
            currentClickedElement = currIndex;

            citSliderBtns.removeClass("active");
            $(this).toggleClass("active");

            citPicturesList.animate({
                left: -($(this).index() * citImageWidth)
            }, 1000);

        });
    }

    // Portfolio gallery
    var portfolioImages = $(".img-container").find("img");
    var portfolioOverlay = $('.galleryOverlay');

    var isFullscreen = false;
    var clonedElement;

    portfolioImages.on("click", function() {
        stickyMenu.addClass("sticky");

        if (isFullscreen == true) {
            $(this).removeClass("fullScreen");
            portfolioOverlay.hide();
            clonedElement.remove();
            isFullscreen = false;
        } else {
            clonedElement = $(this).clone().appendTo($(this).parent());
            stickyMenu.removeClass("sticky");
            clonedElement.add();
            $(this).addClass("fullScreen");
            portfolioOverlay.show();
            isFullscreen = true;
        }

        $('html').one('click', function() {
            stickyMenu.addClass("sticky");

            portfolioImages.removeClass("fullScreen");
            portfolioOverlay.hide();
            clonedElement.remove();
            isFullscreen = false;
        });

        event.stopPropagation();

    });

    // Scroll into view
    var stickyMenuBtns = $(".sticky-menu").find("a");
    var mobileMenuBtns = $(".mobile-menu").find("a");
    var menuBtns = $(".nav-buttons").find("a");
    var scrollTopArrow = $(".scrollTop-arrow");
    var scrollBottomArrow = $(".scroller").find("a");

    menuBtns.add(mobileMenuBtns).add(stickyMenuBtns).add(scrollTopArrow).add(scrollBottomArrow).on("click", function(event) {

        var scrollToId = $(this).attr('href');
        var sectionOffset = $(scrollToId).offset().top;
        var stickyMenuHeight = stickyMenu.outerHeight();
        event.preventDefault();

        if ($(window).width() >= 751) {
            $('body').stop().animate({
                scrollTop: sectionOffset - 80
            }, 500, 'swing');
        } else {
            $('body').stop().animate({
                scrollTop: sectionOffset
            }, 500, 'swing');
        }
    });

    // Gallery filter

    var galleryButtons = $(".gallery-buttons");
    var galleryImages = $(".img-container").find("figure");

    galleryButtons.on("click", function() {
        var clicked = $(this);
        var galleryBtnTag = $(this).data("tag");

        event.preventDefault();
        if (clicked.index() == 0) {
            galleryImages.removeClass("hide");
        } else {
            galleryImages.each(function() {
                var img = $(this);
                var imgTag = img.data("tag");

                if (imgTag.indexOf(galleryBtnTag) == -1) {
                    img.addClass("hide");
                } else {
                    img.removeClass("hide");

                }
            });
        }
    });

    var watchMoreBtn = $("#watch-more");
    var hiddenImages = $(".images-hidden");

    watchMoreBtn.on("click", function() {
        event.preventDefault();
        hiddenImages.toggle();

    });
});
