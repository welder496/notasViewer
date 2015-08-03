$('.nav li a').on('click', function() {
    $(this).parent().parent().find('.active').removeClass('active');
    $(this).parent().addClass('active');
});

