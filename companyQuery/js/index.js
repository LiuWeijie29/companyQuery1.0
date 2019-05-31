// //首页导航切换
// $('.nav>li').click(function(){
//     $(this).addClass('navSelected').siblings('li').removeClass('navSelected');
//     var index = $(this).index();

// });

//tab栏切换
$('.tab-list>.list-item').click(function(){
    $(this).addClass('selected').siblings('li').removeClass('selected');
    var index = $(this).index();
    $('.search-tabs>.tab-inforArea').eq(index).removeClass('hide').siblings('.tab-inforArea').addClass('hide');
});


//主页面搜索标签类切换
$('.searchLi>li').click(function(){
    $(this).addClass('seachSelected').siblings('li').removeClass('seachSelected');
    var index = $(this).index();
    var searchIpt = $('#search-ipt');
    switch(index){
        case 0:searchIpt.attr('placeholder','请输入企业名称，如腾讯科技有限公司');
        break;
        case 1:searchIpt.attr('placeholder','请输入企业统一社会信用代码');
        break;
        case 2:searchIpt.attr('placeholder','请输入法人或股东的姓名');
        break;
        case 3:searchIpt.attr('placeholder','请输入企业地址');
        break;
        case 4:searchIpt.attr('placeholder','请输入企业电话或法人电话');
        break;
    }
});

//搜索栏点击按钮，点击搜索
$('#searchBtn').on('click',function(){
    
    // location.href = url;
    //获取用户输入的内容
    var words = $('#search-ipt').val();
    //要跳转的带参地址
    var url = '../html/searchResult.html?';
    //判断用户要查询的类型，对应发送不同的请求
    var searchType = $('.searchLi>li').filter('.seachSelected').index();
    console.log(searchType);
    switch(searchType){
        case 0:location.href = url+'name='+encodeURI(words);
        break;
        case 1:location.href = url+'creditCode='+encodeURI(words);
        break;
        case 2:location.href = url+'legalPerson='+encodeURI(words);
        break;
        case 3:location.href = url+'address='+encodeURI(words);
        break;
        case 4:location.href = url+'phone='+encodeURI(words);
        break;
    }

})

//tab栏 按区域查询 点击传递城市
$('.cityList>li').on('click',function(){
    var address = $(this).text();
    var url = '../html/searchResult.html?'+'address='+encodeURI(address);
    location.href = url;

})
$('.industryList>li').on('click',function(){
    var scope = $(this).text();
    var url = '../html/searchResult.html?'+'scope='+encodeURI(scope);
    location.href = url;

})
