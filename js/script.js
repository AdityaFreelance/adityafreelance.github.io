// This script initializes the AOS library, which provides animations on scroll.

AOS.init({
    // The duration of the animation in milliseconds.
    duration: 1000,
    // The easing function to use for the animation.
    easing: 'ease-in-out',
    // Whether the animation should only happen once.
    once: true,
});

// Slick Slider Initialization
$(document).ready(function() {
    // This function will be called after the DOM is ready.
    // The testimonial slider content is populated by dynamic-content.js.
    // We need to ensure the slider is initialized after its content is available.
    // Since dynamic-content.js runs before script.js, the content should be there.

    var slider = $('.testimonial-slider');
    var slides = slider.children().length;
    var slidesToShow = 3;

    // Clone slides if necessary for infinite loop with centerMode
    // This logic was previously in slick-init.js and is now moved here.
    if (slides > 0 && slides < slidesToShow) {
        for (var i = 0; i < slidesToShow - slides; i++) {
            slider.append($(slider.children()[i % slides]).clone());
        }
    }

    // Initialize Slick
    slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        infinite: true,
        centerMode: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false
                }
            }
        ]
    });
});