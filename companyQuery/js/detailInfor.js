$(function(){
    var id = $.query.get("id");
    var url = "http://106.14.151.119:3000/api/findOne?id="+id;
    //发送数据请求
    $.get(url,function(data,status){
        console.log(data);
        addData(data);
    });
})
function addData(data){
    $('#titleInfor>h3').text(data[0].name);//公司名称
    $('#legalPersonName').text(data[0].legalPerson);//企业法人
    $('#address').text(data[0].address);//地址
    $('#registeredCapital').text(data[0].capital);//注册资本
    $('#RCapital').text(data[0].capital);//实缴资本
    $('#creditCode').text(data[0].creditCode);//注册号
    $('#setupTime').text(data[0].setupTime);//成立日期
    $('#scope').text(data[0].scope);//经营范围
    $('#type').text(data[0].type);//公司类型
    $('#province').text(data[0].province);//所属地区
    $('#mail').text(data[0].mail);//邮箱
    $('#phone').text(data[0].phone);//联系方式
    $('#morePhone').text(data[0].morePhone);//更多联系方式
    
}
//tab栏切换
// $('.tab-list>.list-item').mouseenter(function(){
//     $(this).addClass('selected').siblings('li').removeClass('selected');
//     var index = $(this).index();
//     $('.search-tabs>.tab-inforArea').eq(index).removeClass('hide').siblings('.tab-inforArea').addClass('hide');
// });




//三级页面搜索标签类切换
$('#boxTabs>ul>li').click(function(){
    $(this).addClass('tabsSelect').siblings('li').removeClass('tabsSelect');
    var index = $(this).index();
    console.log(index);
    $('.contentBox').eq(index).addClass('showBox').removeClass('hideBox').siblings('.contentBox').addClass('hideBox').removeClass('showBox');
})

