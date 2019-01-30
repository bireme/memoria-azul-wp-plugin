$ = jQuery;

var submitSearchBtn = $(".searchBarSearchIcon");
var searchBarInput  = $("#searchBarInput");
var clearSearchBtn  = $(".clearSearchBarField");
var searchForm = $("#searchForm");
var imageFlip  = ".image-flip";
var fsCard  =  ".frontside .card";
var bsCard  =  ".backside";
var colCard =  ".col .card";
var docCard =  ".doc .card";
var docMetaCard  =  ".doc-meta .card";
var colRedirect  =  colCard + " a.redirect";
var docRedirect  =  docCard + " a.redirect";
var docMetaRedirect = docMetaCard + " a.redirect";

var evento = "click";

$(document).ready(function() {
    searchBarInput.on('keyup focus', function() {
        if( $(this).val().length === 0 ) {
            clearSearchBtn.hide();
        } else {
            clearSearchBtn.show();
        }
    });

    $(document).on( evento, bsCard, function(e) {
        e.preventDefault();

        href = $(this).prev($(fsCard)).find('a.redirect.desktop').attr('href');

        if ( href ) {
            window.location.href = href;
        }
    });

    $(document).on( evento, fsCard, function(e) {
        e.preventDefault();
        window.location.href = $(this).find('a.redirect').attr('href');
    });

    $(document).on( evento, colCard, function(e) {
        e.preventDefault();
        window.location.href = $(this).find('a.redirect').attr('href');
    });

    $(document).on( evento, docMetaCard, function(e) {
        e.preventDefault();
        window.location.href = $(this).find('a.full-text').attr('href');
    });

    $(document).on( evento, docCard, function(e) {
        e.preventDefault();
        window.location.href = $(this).find('a.full-text').attr('href');
    });

    $(document).on( evento, docRedirect, function(e) {
        e.stopImmediatePropagation();
    });

    $(document).on( evento, docMetaRedirect, function(e) {
        e.stopImmediatePropagation();
    });

    submitSearchBtn.on( 'click', function(e) {
        searchForm.submit();
    });
});

$(function () {
    $('a[href=#top]').on( 'click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});

function resetInput() {
    clearSearchBtn.hide();
    searchBarInput.val('').focus();
}

function toggleCard(id) {
    $('body,html').find(imageFlip).removeClass('hover');
    $('#'+id).toggleClass('hover');
    $('#'+id).find('a.redirect').removeClass('desktop');
}
