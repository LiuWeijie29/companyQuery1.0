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
    $('#titleInfor>h3').text(data[0].name);
    $('#legalPersonName').text(data[0].legalPerson);
    $('#registeredCapital').text(data[0].capital);
    $('#address').text(data[0].address);
    $('#RCapital').text(data[0].capital);



}
// //tab栏切换
// $('.tab-list>.list-item').mouseenter(function(){
//     $(this).addClass('selected').siblings('li').removeClass('selected');
//     var index = $(this).index();
//     $('.search-tabs>.tab-inforArea').eq(index).removeClass('hide').siblings('.tab-inforArea').addClass('hide');
// });

// //主页面搜索标签类切换
// $('.searchLi>li').mouseenter(function(){
//     $(this).addClass('seachSelected').siblings('li').removeClass('seachSelected');
//     var index = $(this).index();
//     var searchIpt = $('#search-ipt');
//     switch(index){
//         case 0:searchIpt.attr('placeholder','请输入企业名称，如腾讯科技有限公司');
//         break;
//         case 1:searchIpt.attr('placeholder','请输入企业注册号');
//         break;
//         case 2:searchIpt.attr('placeholder','请输入法人或股东的姓名');
//         break;
//         case 3:searchIpt.attr('placeholder','请输入企业地址');
//         break;
//         case 4:searchIpt.attr('placeholder','请输入企业电话或法人电话');
//         break;
//     }
// });


//三级页面搜索标签类切换
$('#boxTabs>ul>li').click(function(){
    $(this).addClass('tabsSelect').siblings('li').removeClass('tabsSelect');
    var index = $(this).index();
    
})

