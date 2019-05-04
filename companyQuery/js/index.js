
//tab栏切换
$('.tab-list>.list-item').mouseenter(function(){
    $(this).addClass('selected').siblings('li').removeClass('selected');
    var index = $(this).index();
    $('.search-tabs>.tab-inforArea').eq(index).removeClass('hide').siblings('.tab-inforArea').addClass('hide');
});

//主页面搜索标签类切换
$('.searchLi>li').mouseenter(function(){
    $(this).addClass('seachSelected').siblings('li').removeClass('seachSelected');
    var index = $(this).index();
    var searchIpt = $('#search-ipt');
    switch(index){
        case 0:searchIpt.attr('placeholder','请输入企业名称，如腾讯科技有限公司');
        break;
        case 1:searchIpt.attr('placeholder','请输入企业注册号');
        break;
        case 2:searchIpt.attr('placeholder','请输入法人或股东的姓名');
        break;
        case 3:searchIpt.attr('placeholder','请输入企业地址');
        break;
        case 4:searchIpt.attr('placeholder','请输入企业电话或法人电话');
        break;
    }
});

$('#searchBtn').on('click',function(){
    var name =  $('#search-ipt').val();
    var url = '../html/searchResult.html?'+'name='+encodeURI(name);
    location.href = url;
})
$('.cityList>li').on('click',function(){
    var address = $(this).text();
    var url = '../html/searchResult.html?'+'address='+encodeURI(address);
    location.href = url;
})
