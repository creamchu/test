/* tnb 말풍선 */
$(function () {
  function slideMenu() {
    var activeState = $("#menu-container .menu-list").hasClass("active");
    $("#menu-container .menu-list").animate({ right: activeState ? "0%" : "-100%" }, 400);
  }
  $("#menu-wrapper").click(function (event) {
    event.stopPropagation();
    $("#hamburger-menu").toggleClass("open");
    $("#menu-container .menu-list").toggleClass("active");
    slideMenu();

    $("body").toggleClass("overflow-hidden");
  });
  $(".menu-list .bk_bg").click(function (event) {
    event.stopPropagation();
    $("#hamburger-menu").toggleClass("open");
    $("#menu-container .menu-list").toggleClass("active");
    slideMenu();

    $("body").toggleClass("overflow-hidden");
  });

  $(".menu-list").find(".accordion-toggle").click(function () {
    $(this).next().toggleClass("open").slideToggle("fast");
    $(this).toggleClass("active-tab").find(".menu-link").toggleClass("active");

    $(".menu-list .accordion-content").not($(this).next()).slideUp("fast").removeClass("open");
    $(".menu-list .accordion-toggle").not(jQuery(this)).removeClass("active-tab").find(".menu-link").removeClass("active");
  });
});

/* 인풋텍스트박스 활성화 */
$(function () {
  $(".input_pw, .input_line").on("keyup", function () {
    if ($(this).val() == "") {
      $(this).removeClass("on");
    }
  });

  $(".input_pw, .input_line").on("keydown", function () {
    if ($(this).val() == "") {
      $(this).addClass("on");
    }
  });
});

/* 텍스트카운트 */
$(function () {
  // 100단위
  $('.text_counter').keyup(function (e) {
    var content = $(this).val();
    $('#counter').html(content.length + '/100');
  });
  $('.text_counter').keyup();
  
  // 10단위
  $('.text_counter_10').keyup(function (e) {
    var content = $(this).val();
    $('#counter').html(content.length + '/10');
  });
  $('.text_counter_10').keyup();
  
  // 17단위 /* 2021-06-30 추가 */
  $('.text_counter_17').keyup(function (e) {
    var content = $(this).val();
    $('.text_counter_17').siblings('.number').html(content.length + '/17');
  });
  $('.text_counter_17').keyup();

  // input 초기화
  $("input ~ .btn_init").on("click", function(){
    $(this).siblings("input").val("");
    $(this).siblings('#counter').html('0/10');
    $(this).siblings('label').find('#counter').html('0/100');
  });
});

//카드레이어 말풍선
$(document).ready(function(){
  $(document).on("click", ".openLayerdot", function(){
    $(".layer_dot").removeClass("open");
    $(this).siblings(".layer_dot").addClass("open");
    //$("#columns").sortable("enable");
    //$("#columns").sortable();
  });

  $(document).on("click", function(event){
    if ($(event.target).siblings(".layer_dot").length === 0){
      $(".layer_dot").removeClass("open");
      //$("#columns").sortable("disable");
      console.log("AAA");
    }
    event.stopPropagation();
  });
});

/* 체크박스시 보더 */
$(document).ready(function () {
  $('.all').on('click', function () {
    if ($(this).is(':checked')) { $('.line').addClass('on') }
    else { $('.line').removeClass('on') }
  });
})

/* ie browser sticky */
$(document).ready(function () {
  var agent = navigator.userAgent.toLowerCase();
  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) { // IE 일 경우
    if($(".pc_sticky1").length > 0){
      var element = document.querySelector('.pc_sticky1');
      Stickyfill.add(element);
    }
    if($(".pc_sticky2").length > 0){
      var element = document.querySelector('.pc_sticky2');
      Stickyfill.add(element);
    }
    if($(".title_sticky").length > 0){
      var element = document.querySelector('.title_sticky');
      Stickyfill.add(element);
    }
    if($(".sticky2").length > 0){
      var element = document.querySelector('.sticky2');
      Stickyfill.add(element);
    }
    return;
  }
});

/* 전체약관 동의 */
$(function () {
  function allCheck() {
    var st = $(".all").is(":checked");
    if (st) {
      $(".b_org_big_btm").prop("disabled", false);
    } else {
      $(".b_org_big_btm").prop("disabled", true);
    }
  }
  
  //체크박스 전체선택 및 전체해제
  $(".all").on('click', function () {
    if($(this).is(":checked")){
      $('.line').addClass('on');
      $(".each").prop("checked", true);
    }
    else{
      $('.line').removeClass('on');
      $(".each").prop("checked", false);
    }
    allCheck();
  });
      
  // 한개의 체크박스 선택 해제시 전체선택 체크박스도 해제
  $(".each").on('click', function () {
      if($(".each:checked").length == $(".each").length){
          $(".all").prop("checked", true);
      }else{
          $(".all").prop("checked", false);
      }
      allCheck();
  });

  
	//카드비밀번호입력
  var nowNum = $(".inp-password").val();
  $(document).on('click', '.inp-password', function() {
    $(this).closest(".password").addClass("active");
  });
	$(document).on("click", function(event){
		if ($(event.target).closest(".password").length === 0){
			$(".password").removeClass("active");
		}
		event.stopPropagation();
	});

  $(document).on('keyup', '.inp-password', function() {
    $(this).val($(this).val().replace(/[^0-9]/g,""));
    if ($(this).val() == "") {
      $(this).closest(".password").removeClass("active");
    }
    nowNum = $(".inp-password").val()
    onstar();
  });
  $(document).on('keydown', '.inp-password', function() {
    if ($(this).val() == "") {
      $(this).closest(".password").addClass("active");
    }
  });
  function onstar(){
    $(".password .item span").removeClass("active");

    for ( var i = 0 ; i < nowNum.length ; i++ ){
      $(".password .item span").eq(i).addClass("active");
    }
  }

});

/* 모바일 웹뷰 input maxlength 이슈 */
function maxLengthCheck(object){
	if(object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}