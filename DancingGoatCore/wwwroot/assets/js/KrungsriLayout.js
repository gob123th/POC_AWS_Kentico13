/*menu mobile*/
$(document).ready(function () {
    $('.menu--bars #btnNavbar').on('click', function () {
        var targetNavBar = $(this).attr('data-target');
        var isNavBarShow = $(targetNavBar).hasClass('show');
        if (isNavBarShow == true) {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-times');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-bars');
            //$('#btnMobileSearch').hide();
            //$('.menu--bars--search').hide();
            $('.menu--content-mobile').hide();
        } else {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-bars');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-times');
            $('.menu--content-mobile').show();
        }
    });
    $('.menu-item').on('click', function (event) {
        $("#accordionMenu").hide();
        $(".mobile-menu-extionsions").hide();
        $(".mobile-menu-languages").hide();
        $("." + $(this).attr('data-toggle')).addClass("active");
        $("." + $(this).attr('data-item')).addClass("active");
    });
    $('.sub-level2-back').on('click', function (event) {
        $("." + $(this).attr('data-parent')).removeClass("active");
        $(".menu-sub-level.active").removeClass("active");
        $("#accordionMenu").show();
        $(".mobile-menu-extionsions").show();
        $(".mobile-menu-languages").show();
    });
    $(".table-responsive").scroll(function () {
        $(this).find(".hand_touch").hide();
    });
    $(".table-responsive").click(function () {
        $(this).find(".hand_touch").hide();
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop()) {
        $('.gotoTop').fadeIn();
    } else {
        $('.gotoTop').fadeOut();
    }
});
$(document).ready(function () {
    /*active first menu*/
    if ($(".menu--customer-type").find('a.active').length == 0) {
        $(".menu--customer-type a:first-child").addClass("active");
        $(".submenu--content .group:first-child").addClass("active");
    }
    $('#dropdownMenuLink').on('click', function (event) {
        $(".submenu ").removeClass("active");
    });
    /*
     $('#navmain .item').on('click', function (event) {
         console.log($(this).attr('class'));
     if($(this).hasClass("active")) {
         // if it's open then just close it
         $(this).removeClass("active");
     $(".submenu-"+$(this).attr('id')).removeClass("active");
     event.stopPropagation();
       } else {
         // if it's closed, then close everything else and open it
         $("#navmain .item").removeClass("active");
     $(this).addClass("active");
     $(".submenu ").removeClass("active");
     $(".submenu-"+$(this).attr('id')).addClass("active");
     $(".ks-top-nav .submenu--content .menu--logon .dropdown .dropdown-menu").removeClass("show");
     event.stopPropagation();
       }
     });
     */
    //new mouseenter ---------------------------------

    $('#navmain .item').hover(function (event) {
        $("#navmain .item").removeClass("active");
        $(this).addClass("active");
        $(".submenu ").removeClass("active");
        //$(".submenu-"+$(this).attr('id')).addClass("active");
        var thissub = $("." + $(this).attr('id'));
        $(thissub).hide();
        $(thissub).addClass("active");
        window.setTimeout(function () {
            $(thissub).show();
        }, 300);
        $(".ks-top-nav .submenu--content .menu--logon .dropdown .dropdown-menu").removeClass("show");
        event.stopPropagation();
    }, function () {
        var thissub = $(".submenu-" + $(this).attr('id'));
        if ($(thissub).hasClass('hover')) { }
        else {
            $("#navmain .item").removeClass("active");
            $(".submenu ").removeClass("active");
            event.stopPropagation();
        }
    });

    $("#navBarContent .submenu--content .submenu").hover(function (event) {
        var substrclass = $(this).attr('class').substr('16').replace('active', '');
        $("#" + substrclass).addClass('active');
        $(this).addClass('active');
        $(this).addClass('hover');
        event.stopPropagation();
    }, function () {
        $("#navmain .item").removeClass("active");
        $(".submenu ").removeClass("active");
        $(".submenu ").removeClass('hover');
        event.stopPropagation();
    });

    //end new mouseenter ---------------------------
    $(document).click(function (event) {
        $("#navmain .item").removeClass("active");
        $(".submenu ").removeClass("active");
    });
    /*menu mobile*/
    $('.menu--bars #btnNavbar').on('click', function () {
        var targetNavBar = $(this).attr('data-target');
        var isNavBarShow = $(targetNavBar).hasClass('show');
        if (isNavBarShow == true) {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-times');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-bars');
            //$('#btnMobileSearch').hide();
            //$('.menu--bars--search').hide();
            $('.menu--content-mobile').hide();
            console.log('a');
        } else {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-bars');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-times');
            //$('#btnMobileSearch').show();
            $('.menu--content-mobile').show();
            console.log('b');
        }
    });
    $('.menu-item').on('click', function (event) {
        $("#accordionMenu").hide();
        $(".mobile-menu-extionsions").hide();
        $(".mobile-menu-languages").hide();
        /*$("#accordionMenu").animate({left:200, opacity:"hide"}, 100);*/
        $("." + $(this).attr('data-toggle')).addClass("active");
        $("." + $(this).attr('data-item')).addClass("active");
    });
    $('.sub-level2-back').on('click', function (event) {
        $("." + $(this).attr('data-parent')).removeClass("active");
        $(".menu-sub-level.active").removeClass("active");
        $("#accordionMenu").show();
        $(".mobile-menu-extionsions").show();
        $(".mobile-menu-languages").show();
    });
    $(".table-responsive").scroll(function () {
        $(this).find(".hand_touch").hide();
    });
    $(".table-responsive").click(function () {
        $(this).find(".hand_touch").hide();
    });
    //go to top
    $(".gotoTop").click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    $(".ui.dropdown").dropdown();

    BindAccordion();
    newPageViewId();
    $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(0)').click(function () {
        dataLayer.push({
            'event': 'track_event',
            'event_category': 'breadcrumb',
            'event_action': 'click',
            'event_label': $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(0)').text()
        });
    });
    $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(1)').click(function () {
        dataLayer.push({
            'event': 'track_event',
            'event_category': 'breadcrumb',
            'event_action': 'click',
            'event_label': $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(0)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(1)').text()
        });
    });
    $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(2)').click(function () {
        dataLayer.push({
            'event': 'track_event',
            'event_category': 'breadcrumb',
            'event_action': 'click',
            'event_label': $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(0)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(1)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(2)').text()
        });
    });
    $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(3)').click(function () {
        dataLayer.push({
            'event': 'track_event',
            'event_category': 'breadcrumb',
            'event_action': 'click',
            'event_label': $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(0)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(1)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(2)').text() + " > " + $('.container--breadcrumb a.CMSBreadCrumbsLink:eq(3)').text()
        });
    });
});
function BindCustomerType() {
    $('.menu--customer-type > a').on('click', function () {
        var subMenuTarget = $(this).attr('data-menu-target');
        if ($(this).attr('class') !== 'active') {
            $('.menu--customer-type > a').removeClass('active');
            $(this).addClass('active');
            $('.submenu--content .group').removeClass('active');
            $('#' + subMenuTarget).addClass('active');
            $('.submenu--content').hide();
            setTimeout(function () {
                $('.submenu--content').slideDown("fast");
            }, 100);
        }
    });
    $('.menu--content-mobile .customper-type').on('click', function () {
        var subMenuTarget = $(this).attr('data-menu-target');
        if (!$(this).hasClass('active')) {
            $('.menu--content-mobile .customper-type').removeClass('active');
            $(this).addClass('active');
            $('.submenu--content .group').removeClass('active');
            $('#' + subMenuTarget).addClass('active');
            $('.submenu--content').hide();
            setTimeout(function () {
                $('.submenu--content').slideDown("fast");
            }, 100);
        }
    });
    $('.menu--bars #btnNavbar').on('click', function () {
        var targetNavBar = $(this).attr('data-target');
        var isNavBarShow = $(targetNavBar).hasClass('show');
        if (isNavBarShow == true) {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-times');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-bars');
            //$('#btnMobileSearch').hide();
            //$('.menu--bars--search').hide();
            $('.menu--content-mobile').hide();
            console.log('a');
        } else {
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').removeClass('fa-bars');
            $('.menu--bars [data-target] > span, .menu--bars [data-target] > i').addClass('fa-times');
            //$('#btnMobileSearch').show();
            $('.menu--content-mobile').show();
            console.log('b');
        }
    });
}
function newPageViewId() {
    var pname = "PageViewId";
    var pid = getGUID();
    eraseStValue(pname);
    setStValue(pname, pid, 1);
    return pid;
}
function getPageViewId() {
    var pname = "PageViewId";
    return getStValue(pname);
}
function getGUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
function setStValue(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getStValue(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseStValue(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
function BindAccordion() {
    $('.collapse').on('show.bs.collapse', function (event) {
        var elementId = event.target.id;
        var prevElementId = $(this).prev().Id;
        console.debug('electmentId=', elementId);
        console.debug('prevElementId=', prevElementId);
        $(this).prev().addClass('active');
    });
    $('.collapse').on('hide.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });
}

//Share Bar
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

if (typeof ($jqHwcSoShare) == 'undefined') {
    $jqHwcSoShare = $;//$.noConflict(true);
}
$jqHwcSoShare.support.cors = true;

var prefixhttp = window.location.origin;

if (!window.location.origin) {
    prefixhttp = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

function socialShare(type) {
    switch (type) {
        default:
        case 'facebook':
            popupShare("https://web.facebook.com/sharer.php?u=");
            break;
        case 'google+':
            popupShare("https://plus.google.com/share?url=");
            break;
        case 'twitter':
            popupShare("https://twitter.com/intent/tweet?url=");
            break;
        case 'linkedin':
            popupShare("https://www.linkedin.com/shareArticle?url=");
            break;
        case 'line':
            var isMobile = "<%=Request.Browser.IsMobileDevice.ToString().ToLower()%>";
            var fullUrl = "";
            if (isMobile == "false") {
                fullUrl = "https://lineit.line.me/share/ui?url="
            }
            else {
                fullUrl = "http://line.me/R/msg/text/?"
            }
            popupShare(fullUrl);
            break;
    }
    ajaxShareActivity(type);
}

var shareWindow;
function popupShare(url) {
    shareWindow = window.open(url + window.location, 'popUpWindow', 'height=540,width=540')
}

function ajaxShareActivity(social, islike) {
    islike = islike == undefined ? false : islike;
    $jqHwcSoShare.ajax({
        type: "POST",
        url: prefixhttp + $jqHwcSoShare('#hdAppPath').val() + "/CMSWebparts/CM-SI/Social/SocialWebMethods.aspx/ShareActivity",
        data: "{'social':'" + social + "','docID':'" + $jqHwcSoShare('#hdDocID').val() + "','IsLike':'" + islike + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            //console.log(response.d);
        },
        failure: function (response) {

            //console.log('failed');
        },

    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: $jqHwcSoShare('#hdFbAppId').val(),
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.2' // use version 2.2
    });
};

$jqHwcSoShare(document).ready(function () {
    //getGoogleCountV2();
    //getLinkedInCountV2();
    //getFacebookCountV2();
    //try {
    //    window.matchMedia("(min-width: 400px)");
    //    $jqHwcSoShare('#divShareGPP2').hide();
    //    $jqHwcSoShare('#divShareGPP').show();
    //} catch (e) {
    //    $jqHwcSoShare('#divShareGPP').hide();
    //    $jqHwcSoShare('#divShareGPP2').show();
    //}

    $jqHwcSoShare("#txtUrl").val(window.location);

    /*
    $jqHwcSoShare(".socialShare .wrapper").mouseover(function () {
        $jqHwcSoShare('.socialShare .wrapper #main').hide();
        //$jqHwcSoShare('.socialShare .wrapper ').width(185);

    }).mouseout(function () {
        $jqHwcSoShare('.socialShare .wrapper #main').show();
        //$jqHwcSoShare('.socialShare .wrapper ').width(95);

    });
    */
});

var fbC = 0;
var liC = 0;
var ggC = 0;
function getGoogleCountV2() {
    var uri = window.location.href;

    $jqHwcSoShare.ajax({
        crossDomain: true,
        type: 'POST',
        url: 'https://clients6.google.com/rpc',
        processData: true,
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        traditional: true,
        crossDomain: true,
        jsonp: true,
        timeout: 5000,
        data: JSON.stringify({
            'method': 'pos.plusones.get',
            'id': uri,
            'params': {
                'nolog': true,
                'id': uri,
                'source': 'widget',
                'userId': '@viewer',
                'groupId': '@self'
            },
            'jsonrpc': '2.0',
            'key': 'p',
            'apiVersion': 'v1'
        }),
        success: function (response) {
            ggC = response.result.metadata.globalCounts.count;
            $jqHwcSoShare("#ggpCountV2").text(humanCount(response.result.metadata.globalCounts.count));
            if ($jqHwcSoShare("#ggpCountV2").text().length > 4)
                $jqHwcSoShare("#ggpCountV2").css('font-size', '10px');
            sumTotalShare();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);

        }
    });

}

function getLinkedInCountV2() {
    $jqHwcSoShare.getJSON('https://www.linkedin.com/countserv/count/share?url=' + window.location + '&callback=?', function (linkdindata) {
        liC = linkdindata.count;
        $jqHwcSoShare("#linkedinCountV2").text(humanCount(linkdindata.count));
        if ($jqHwcSoShare("#linkedinCountV2").text().length > 4)
            $jqHwcSoShare("#linkedinCountV2").css('font-size', '10px');
        sumTotalShare();
    });
}

function getFacebookCountV2() {
    //$jqHwcSoShare.getJSON('https://graph.facebook.com/?fields=share&id=' + window.location, function (fbdata) {
    //    $jqHwcSoShare("#fbCount").text(humanCount(fbdata.share.share_count));

    //});
    $jqHwcSoShare.ajax({
        type: "POST",
        url: prefixhttp + $jqHwcSoShare('#hdAppPath').val() + "/CMSWebparts/CM-SI/Social/SocialWebMethods.aspx/GetFacebookShareCount",
        data: "{'url':'" + window.location + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            fbC = response.d;
            $jqHwcSoShare("#fbCountV2").text(humanCount(response.d));
            if ($jqHwcSoShare("#fbCountV2").text().length > 4)
                $jqHwcSoShare("#fbCountV2").css('font-size', '10px');
            sumTotalShare();
            //console.log(response.d);
        },
        failure: function (response) {

            //console.log('failed');
        },

    });
}

function humanCount(bytes) {
    var thresh = 1000;
    if (Math.abs(bytes) < thresh) {
        return bytes + '';
    }
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);

    bytes = Math.floor(bytes);
    return bytes.toFixed(1).indexOf('.0') < 0 ? bytes.toFixed(1) + ' ' + units[u] : bytes.toFixed(0) + ' ' + units[u];
}

function sumTotalShare() {
    //var fbC = decodeUnite($jqHwcSoShare('#fbCountV2').text());
    //var liC = decodeUnite($jqHwcSoShare('#linkedinCountV2').text());
    //var ggC = decodeUnite($jqHwcSoShare('#ggpCountV2').text());
    $jqHwcSoShare('#spTotalShare').text(humanCount(fbC + ggC + liC));
}

function decodeUnite(val) {
    if (val.length <= 1) return parseInt(val);
    var sp = val.split(' ');
    if (sp.length > 1) {
        switch (sp[1]) {
            case 'k':
                return parseInt(sp[0]) * 1000;
                break;
            case 'M':
                return parseInt(sp[0]) * 1000000;
                break;
        }
    }
    return parseInt(val);
}

function copyClipboard() {
    var copyText = document.getElementById("txtUrl");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function ShowProgress() {
    setTimeout(function () {
        var lazyload = $(".page-lazyload");
        var loading = $(".loading");
        lazyload.show();
        loading.show();
        var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
        var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
        loading.css({ top: top, left: left });
    }, 200);
}

function HideProgress() {
    var lazyload = $(".page-lazyload");
    var loading = $(".loading");
    lazyload.fadeOut();
    loading.fadeOut();
}

/* Dialog info */
function ShowDialog(type, subject, content) {
    var lazyload = $(".page-lazyload");
    var dialog = $(".dialogbox");
    /*$('.dialog-icon').html('<i class="fal fa-exclamation-circle" style="padding-left:0px;"></i>');*/

    switch (type) {
        case 'warning': $('.dialog-icon').html('<i class="fal fa-exclamation-circle" style="padding-left:0px;"></i>');
            break;
        case 'success': $('.dialog-icon').html("<i class='fal fa-check-circle' style='padding-left:0px;'></i>");
            break;
        case 'fail': $('.dialog-icon').html("<i class='fal fa-times-circle' style='padding-left:0px;'></i>");
            break;
        case 'waiting': $('.dialog-icon').html("<i class='fal fa-check-circle' style='padding-left:0px;'></i>");
            $('#DialogSubmit').hide();
            $('#btnh').show();
            break;
    }

    if (subject == '' || subject == undefined) {
        $('dialog-subject').hide();
    }
    if (content == '' || content == undefined) {
        $('dialog-content').hide();
    }
    $('.dialog-close').on('click', CloseDialog());
    $('#lblDialogContent').html(content);
    $('#lblDialogSubject').html(subject);
    lazyload.fadeIn();
    dialog.fadeIn();
    var top = Math.max($(window).height() / 2 - dialog[0].offsetHeight / 2, 0);
    var left = Math.max($(window).width() / 2 - dialog[0].offsetWidth / 2, 0);
    dialog.css({ top: top, left: left });

}
function CloseDialog() {
    var lazyload = $(".page-lazyload");
    var dialog = $(".dialogbox");
    dialog.fadeOut();
    lazyload.fadeOut();
}

//dropdownlist
$(document).ready(function () {
    $('[id*=ddl]').dropdown();
    var num = 0, num2 = 0, num3 = 0, num4 = 0;
    $('.ui.ks.dropdown').on('click', function () {
        var item = $(this);
        if (item.find(".item.active").length > 0) {
            item.find(".menu").scrollTop(0)
            setTimeout(function () {
                item.find(".menu").scrollTop(item.find(".item.active").position().top);
            }, 200);
        } else {
            item.find(".menu").scrollTop(0)
        }
    });
});