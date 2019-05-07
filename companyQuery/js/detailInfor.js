var address,companyName;
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
    companyName = data[0].name;
    $('#legalPersonName').text(data[0].legalPerson);//企业法人
    $('#address').text(data[0].address);//地址
    address = data[0].address;
    $('#registeredCapital').text(data[0].capital);//注册资本
    $('#RCapital').text(data[0].capital);//实缴资本
    $('#creditCode').text(data[0].creditCode);//统一社会信用代码
    $('#setupTime').text(data[0].setupTime);//成立日期
    $('#scope').text(data[0].scope);//经营范围
    $('#type').text(data[0].type);//公司类型
    $('#province').text(data[0].province);//所属地区
    $('#mail').text(data[0].mail);//邮箱
    $('#phone').text(data[0].phone);//联系方式
    $('#morePhone').text(data[0].morePhone);//更多联系方式
    
}




//三级页面搜索标签类切换
$('#boxTabs>ul>li').click(function(){
    $(this).addClass('tabsSelect').siblings('li').removeClass('tabsSelect');
    var index = $(this).index();
    console.log(index);
    $('.contentBox').eq(index).addClass('showBox').removeClass('hideBox').siblings('.contentBox').addClass('hideBox').removeClass('showBox');
})

//地图模块
//点击tabs栏切换按钮加载地图模块
$('#boxTabs>ul>li').eq(1).on('click',function(){
    var map = new AMap.Map('mapBox', {
        // center:
        zoom:11
     });
     //加载地图后标记到定位点。将企业的名称转化为地图坐标并定位
     function getAddressLocation(name){
        var geocoder =  new AMap.Geocoder();
        geocoder.getLocation(name,function(status,result){
            if(status === 'complete'&&result.geocodes.length){
                console.log("地址转化成功："+result);
                var point = result.geocodes[0].location;
                console.log(point);
                var marker = new AMap.Marker();
                map.add(marker);
                marker.setPosition(point);
                map.setFitView(marker);
                return point;
            }
            if(status === 'err'){
                console.log("发生错误:"+JSON.stringify(result));
            }
        });
    }
     var addressPoint = getAddressLocation(companyName);//定位企业名
     
     //某些企业已经注销或未登记，地图上搜索不到该企业，则以改企业地址为定位点
     $('#notFindPos').on('click',function(){
         var addressPoint = getAddressLocation(address);
     });
     
});


