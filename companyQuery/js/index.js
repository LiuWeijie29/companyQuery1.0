
var mySwiper = new Swiper('.swiper-container', {
    autoplay: 4000,//可选选项，自动滑动
    loop:true,
    pagination : '.swiper-pagination',
});

$('.tab-list>.list-item').mouseenter(function(){
    $(this).addClass('selected').siblings('li').removeClass('selected');
    var index = $(this).index();
    $('.search-tabs>.tab-inforArea').eq(index).removeClass('hide').siblings('.tab-inforArea').addClass('hide');
});
