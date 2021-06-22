// 2013.04.03 : 이옥희
// 모바일에서 주소창 숨기기2
setTimeout(function () {
    window.scrollTo(0, 1);
}, 0);
// 공통함수
function goPage(url) { // 페이지 이동
    location.href = url;
}

// selectbox // onChange="location.href=this.value"
function goUrl(el) {
    var jumpWrap = document.getElementById(el);
    var selectbox = jumpWrap.getElementsByTagName("SELECT")[0];
    var button = jumpWrap.getElementsByTagName("INPUT")[0];

    button.onclick = function () {
        var opt = selectbox.options;
        window.open(opt[opt.selectedIndex].value);
        return false;
    }
}

// 토글
function toggle(selector) {
    $(selector).find('>*').click(function () {
        // $(this).addClass('on').siblings().removeClass();
    });
}

// list toggle
var slideToggle = function (el) {
    var speed = 200;
    $('.updown li.on').find('>div').slideDown(speed);
    el.on('click', 'a', function () {
        var $this = $(this);
        if ($this.parent().hasClass('on')) {
            $this.parent().removeClass('on').find('>div').slideUp(speed);
        } else {
            $this.parent().addClass('on').find('>div').slideDown(speed);
            $this.parent().siblings().removeClass('on').find('>div').slideUp(speed);
        }
    });
}
slideToggle($('.updown li'));

// 탭 처리
function tabs() {
    var tabs = $('.tabs'),
        tabs_a = tabs.find('a');

    tabs.each(function (i) {
        var $this = $(this).find('.on a').attr('href');
        $($this).show();
        if ($(this).find('li').length <= 3) {
            $(this).parent('.slider_tab').addClass('none');
        }
    });
    tabs_a.click(function (e) {
        $(this).parent().addClass('on').siblings().removeClass('on');
        var target = $(this).attr('href');
        $(target).show().siblings('[id^=tab]').hide();
        //e.preventDefault();
    });
}
tabs();

// 약관 스크롤
$('.scroll.vbox').height($(window).height() - ($('header').height() + $('footer').height() + 30));

//약관토글
var terms_btn = $('.termsOn input:last-child');
terms_btn.click(function () {
    $(this).parents('.termsOn').toggleClass('on');
    var t = $(this).val();
    $(this).val((t.match('열기')) ? t.replace('열기', '닫기') : t.replace('닫기', '열기'));
})

// 모달창
function modal(url) {
    $('body').append('<div class="modal" /><div class="mask" />');
    $('.modal').load(url + ' .modal>*', function () {
        var $modal = $('.modal');
        $modal.css({
            marginTop: -$modal.height() / 2
        });
        $modal.css({
            marginLeft: -$modal.width() / 2
        });
        $(document).keydown(function (e) {
            if (e.keyCode == 27) { // ESCAPE key pressed
                modal_close();
            }
        });
        $('.modal .close').click(function (e) {
            modal_close();
        });
        if ($('.modal>h2+p').length > 0) {
            $('.modal').addClass('type2');
        }
    });
}

function modal_close() {
    var $modal = $('.modal,.mask');
    $modal.remove();
}

// 폰트 확대축소
function fontSize() {
    var _root = this;
    var arr = new Array();
    arr[2] = '120%';
    arr[1] = '110%';
    arr[0] = '100%';

    this.getCookie = function (name) {
        var allCookies = decodeURIComponent(document.cookie);
        var pos = allCookies.indexOf(name + "=");

        if (pos == -1) return undefined;

        var start = pos + (name.length + 1);
        var end = allCookies.indexOf(';', start);
        if (end == -1) end = allCookies.length;
        var value = allCookies.substring(start, end);
        return value = decodeURIComponent(value);
    }
    this.setCookie = function (name, value, cPath) {
        var pathStr = (cPath) ? "; path=" + cPath : "; path=/";
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + pathStr;
    }
    var loop = this.getCookie('fontControl') || 0; // 배열 초기값
    document.body.style.fontSize = arr[loop];

    this.btnMinus = function () {
        if (loop > 0) {
            loop--;
            document.body.style.fontSize = arr[loop];
            _root.setCookie('fontControl', loop);
        }
    }
    this.btnPlus = function () {
        if (loop < (arr.length - 1)) {
            loop++;
            document.body.style.fontSize = arr[loop];
            _root.setCookie('fontControl', loop);
        }
    }
}
//실행
var fontSize = new fontSize();

// 메인 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$('.slide_product a:gt(4)').hide();

// 프로토타이핑용 : 아래내용은 개발시 무조건 삭제 ++++++++++++++++++++++++++++++++++++
// header
if ($('header').length == 0) {
    $('#wrapper').prepend('<header />');
    $('header').load('../guide/inc.html header>*', function () {
        $('header .list').attr('onClick', 'goPage("/MSB/map.html")');
        // 문서경로 출력 // 개발에 붙히지 마세욧!!!
        var url = window.location.pathname;
        $('header').prepend('<span style="position:absolute; top:0; left:0;padding:2px; z-index:9999; font-size:11px; line-height:1.2; background-color:#000; color:yellow">' + url + '</span>');
    });
}
// .gnb
if ($('.main').length == 0 && $('.gnb').length == 0) {
    $('section').prepend('<div class="gnb" />');
    $('.gnb').load('../guide/inc.html .gnb>*', function () {
        tabs();
        // gnb 활성화
        var location = $('.location a:first-child').text();
        if (location.indexOf('금융상품') != -1) {
            $('.tabs li:eq(0)').addClass('on');
        } else if (location.indexOf('금융조회') != -1) {
            $('.tabs li:eq(1)').addClass('on');
        } else if (location.indexOf('은행소개') != -1) {
            $('.tabs li:eq(2)').addClass('on');
        }
    });
}
// footer
if ($('footer').length == 0) {
    $('#wrapper').append('<footer />');
    $('footer').load('../guide/inc.html footer>*', function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 100) {
                $(".fixed").fadeIn();
            } else {
                $(".fixed").fadeOut();
            }
        });
        $('.top').click(function (e) {
            $('html,body').animate({
                scrollTop: 0
            }, '400');
        });
    });





}