if (window.innerWidth > 1000) {
    $('nav').css('background-color', 'transparent');
    $('nav').removeClass('navbar-dark');
    $('nav').addClass('navbar-light');
} else {
    $('nav').css('background-color', '#00796b');
    $('nav').removeClass('navbar-light');
    $('nav').addClass('navbar-dark');
}

$(window).on('resize', function () {
    if (window.innerWidth > 1000) {
        $('nav').css('background-color', 'transparent');
        $('nav').removeClass('navbar-dark');
        $('nav').addClass('navbar-light');
    } else {
        $('nav').css('background-color', '#00796b');
        $('nav').removeClass('navbar-light');
        $('nav').addClass('navbar-dark');
    }
});

$(window).on('scroll', function () {
    if (window.innerWidth < 1000) {
        return false;
    }
    if (window.scrollY != 0) {
        $('nav').removeClass('navbar-light');
        $('nav').addClass('navbar-dark');
        $('nav').css('background-color', '#00796b');
    } else if (window.scrollY == 0) {
        $('nav').removeClass('navbar-dark');
        $('nav').css('background-color', 'transparent');
        $('nav').addClass('navbar-light');
    }
})