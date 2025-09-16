$(window).on('load', function() {
    var slider = $('.testimonial-slider');
    var slides = slider.children().length;
    var slidesToShow = 3; // Keep this for initial calculation

    // Clone slides if necessary for infinite loop with centerMode
    if (slides < slidesToShow) {
        for (var i = 0; i < slidesToShow - slides + 1; i++) { // +1 for centerMode
            slider.append(slider.children().clone()[i]);
        }
    }

    slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true, // Enabled arrows
        infinite: true,
        centerMode: true,
        variableWidth: true, // Added for better spacing with centerMode
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false // Disable variable width on small screens
                }
            }
        ]
    });
});