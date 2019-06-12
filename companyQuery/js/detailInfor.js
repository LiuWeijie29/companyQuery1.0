var company = {};
var mychart;
var mainCompanyPoint;//主公司的高德地图坐标

$(function(){
    var id  = $.query.get("id");
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
    $('#capital').text(data[0].capital);//注册资本
    // $('#RCapital').text(data[0].RCapital);//实缴资本
    $('#creditCode').text(data[0].creditCode);//统一社会信用代码
    $('#setupTime').text(data[0].setupTime);//成立日期
    $('#scope').text(data[0].scope);//经营范围
    $('#type').text(data[0].type);//公司类型
    $('#province').text(data[0].province);//所属地区
    $('#mail').text(data[0].mail);//邮箱
    $('#phone').text(data[0].phone);//联系方式
    $('#morePhone').text(data[0].morePhone);//更多联系方式
    company.name              = data[0].name;
    company.legalPerson       = data[0].legalPerson;
    company.address           = data[0].address;;
    company.capital           = data[0].capital;
    // company.RCapital          = data[0].capital;
    company.creditCode        = data[0].creditCode;
    company.setupTime         = data[0].setupTime;
    company.scope             = data[0].scope;
    company.province          = data[0].province;
    company.mail              = data[0].mail;
    company.phone             = data[0].phone;
    company.morePhone         = data[0].morePhone;
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
var map;
$('#boxTabs>ul>li').eq(1).on('click',function(){
    map = new AMap.Map('mapBox', {
        zoom        : 11,
        rotateEnable: true,
        pitch:65,
        viewMode:'3D',
        mapStyle: 'amap://styles/grey', //设置地图的显示样式
    });
    map.setFeatures(["road","bg","building","point"]);
    getAddressLocation(company.address);//以企业地址为依据定位
    var inforWindow;//信息窗格
    console.log(AMap);
    function inforShow(marker,company){
        var info = [];
        info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>"+company.name+"</h4>");
        info.push("<p class='input-item'>企业法人 :"+ company.legalPerson);
        info.push("<p class='input-item'>联系电话 :"+ company.phone +"/"+company.morePhone);
        info.push("<p class='input-item'>社会统一信用代码 :"+ company.creditCode);
        // info.push("<p class='input-item'>成立日期 :"+ company.data);
        // info.push("<p class='input-item'>注册资本 :"+ company.capital);
        info.push("<p class='input-item'>地址 :"+company.address+"</p>");
        info.push("<p class='input-item'>经营范围 :"+company.scope+"</p>");
        var url = "../html/searchResult.html?name="+company.name;
        // var url = "../html/detailInfor.html?id="+company.id;
        info.push("<p class='input-item'><a id='inforBoxToFind' href='"+url+"' target='blank'>查询该公司</a></p></div></div>");
        inforWindow = new AMap.InfoWindow({
            //设置位置锚点
            anchor : 'bottom-left',
            content: info.join(""),   //使用默认信息窗体框样式，显示信息内容
        })

        inforWindow.open(map,marker.getPosition());
    }
    //如果点击了信息窗格中的“查询该公司”，则跳转到该公司的页面
    
    //加载地图后标记到定位点。将企业的名称转化为地图坐标并定位
    //异步函数
     function getAddressLocation(name){
        var geocoder = new AMap.Geocoder();
        geocoder.getLocation(name,function(status,result){
            if(status === 'complete'&&result.geocodes.length){
                console.log("地址转化成功："+result);
                var point = result.geocodes[0].location;
                mainCompanyPoint = point;
                console.log(point);
                var marker = new AMap.Marker({
                    icon:'../img/pos.png',
                    title:'点击查看基本信息',
                    offset: new AMap.Pixel(-16, -32),
                });
                map.add(marker);
                marker.setPosition(point);
                map.setFitView(marker);
                //给标记添加事件，让其显示信息窗格，显示公司信息
                AMap.event.addListener(marker,'click',function(){
                    console.log(marker.getPosition());
                    inforShow(marker,company);
                })
                return point;
            }
            if(status === 'err'){
                console.log("发生错误:"+JSON.stringify(result));
            }
        });
    }
    
    // 若定位失败则以改企业名为定位依据
    $('#notFindPos').on('click',function(){
        getAddressLocation(company.name);
    });

    //更改主题色
    var themeFlag = true;
    $('#changeTheme').on('click',function(){

        if(themeFlag == true){
            map.setMapStyle('amap://styles/normal');
            
            console.log(themeFlag);
            themeFlag = false;
        }
        else if(themeFlag == false){
            map.setMapStyle('amap://styles/grey');
            
            console.log(themeFlag);
            themeFlag = true;
        }
    });


    //添加比例尺
     map.plugin('AMap.Scale',function(){
         var scale = new AMap.Scale();
         map.addControl(scale);
     });
     //添加工具栏
     map.plugin('AMap.ToolBar',function(){
        var tool = new AMap.ToolBar();
        map.addControl(tool);
    });
 

    //该函数用于将其他公司地址转化为高德地图经纬度坐标,并且连线
    //异步函数
    function getOtherCompanyAddress(address,targetCompany){
        var geocoder = new AMap.Geocoder();
        geocoder.getLocation(address,function(status,result){
            if(status === 'complete'&&result.geocodes.length){
                console.log("地址转化成功："+result);
                var point = result.geocodes[0].location;
                console.log(point);
                //新建标记
                var marker = new AMap.Marker({
                    icon:'../img/pos.png',
                    title:'点击查看基本信息',
                    offset: new AMap.Pixel(-16,-32),
                });
                map.add(marker);
                marker.setPosition(point);
                //给标记添加事件，让其显示信息窗格，显示公司信息
                AMap.event.addListener(marker,'click',function(){
                    console.log(marker.getPosition());
                    inforShow(marker,targetCompany);
                })
                //新建同主公司的连线
                var path = [
                    new AMap.LngLat(point.lng,point.lat),
                    new AMap.LngLat(mainCompanyPoint.lng,mainCompanyPoint.lat)
                ] ;
                var polyline = new AMap.Polyline({
                    path: path,  
                    borderWeight: 1, // 线条宽度，默认为 1
                    strokeColor: 'blue', // 线条颜色
                    strokeWeight:2,
                });
                //添加连线
                map.add(polyline);
                //设置文本
                createLineText(mainCompanyPoint,point,'相同法人')
                return point;
            }
            if(status === 'err'){
                console.log("发生错误:"+JSON.stringify(result));
            }
        });
    }

    //创建连线之间的文本
    function createLineText(point1,point2,word){
        var textPos = point1.divideBy(2).add(point2.divideBy(2));
        var distance = Math.round(point1.distance(point2));
        text = new AMap.Text({
            text:word+'(两地相距'+ distance +'米)',
            position:textPos,
            map:map,
            style:{
                'background-color':'#29b6f6',
                'border-color':'#e1f5fe',
                'color':'#fff',
                'font-size':'10px',
            }
        })
    }

    //查找其他相关公司
    $('#findOtherBtn').click(function(){
        var url = "http://106.14.151.119:3000/api/search?legalPerson="+company.legalPerson;
        //获取法人名字，发送查找该法人旗下的公司的请求
        $.get(url,function(data,status){
            //获取到公司数据
            if(data[0]['数量'] == 1){
                alert("暂无其他该法人下的企业");
                return;
            }
            console.log(data);
            //在地图上查找这些公司并给他们标点，添加marker
            for(var i = 1;i<data.length;i++){
                //转化地址并添加标记
                getOtherCompanyAddress(data[i].address,data[i]);
            }
            //地图缩放到全局
            map.setZoom(7);
        })
    })
       //浏览器定位
    // map.plugin('AMap.Geolocation',function(){
    //     var geolocation = new AMap.Geolocation({
    //         // 是否使用高精度定位，默认：true
    //         enableHighAccuracy: true,
    //         // 设置定位超时时间，默认：无穷大
    //         timeout: 10000,
    //         // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
    //         buttonOffset: new AMap.Pixel(10, 20),
    //         //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //         zoomToAccuracy: true,     
    //         //  定位按钮的排放位置,  RB表示右下
    //         buttonPosition: 'RB'
    //     })
    //     map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, 'complete', onComplete)
    //     AMap.event.addListener(geolocation, 'error', onError)

    //     function onComplete (data) {
    //         console.log(data)
    //     }

    //     function onError (data) {
    //         // 定位出错
    //         console.log("定位出错")
    //     }
    // });
});





//企业图谱
function dataViewShow(){
    mychart = echarts.init(document.getElementById('dataView'));  //mychart是全局变量
    // 指定图表的配置项和数据
    //配置悬浮提示框样式
    myTooltipStyle={
            //formatter:标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
            formatter:function(e){
                if(e.value == '经营范围'){
                    return e.name
                }
                return e.value
            },
            showDelay:2000,                                  //浮层显示的延迟，单位为 ms
            hideDelay:1000,                                //浮层隐藏的延迟，单位为 ms
            enterable:true,                             //鼠标是否可进入提示框浮层中
    }
    //标题样式
    myTitleStyle = {
        text: '企业信息图谱',
        textStyle:{
            color:"#fff"
        }
    }
    //配置线条样式
    myLineStyle = {
        normal: {
            opacity  : 0.9,
            width    : 2,
            curveness: 0
        }
    }
    //配置标签样式
    myLabelStyle={
        normal: {
            show: true,
            formatter:function(e){
                if(e.name.length>50){//如果长度太长 则让悬浮框显示全部内容
                    return e.value;
                }
                return e.value+": "+e.name
            },
        }
    }
    //力导向图配置
    myForce={
        repulsion: 6500,
        edgeLength: 150,
    }
    option = {
        title:myTitleStyle,
        tooltip:myTooltipStyle,
        animationDurationUpdate: 1500,
        animationEasingUpdate  : 'quinticInOut',
        series                 : [
            {
                type: 'graph',
                layout    : 'force',
                force: myForce,
                draggable:true, //节点时候可拖拽，
                symbolSize: 90,
                roam      : 'true',
                label:myLabelStyle,
                edgeSymbol    : ['circle', 'arrow'],
                edgeSymbolSize: [1, 10],
                itemStyle: {
                    normal: {
                        color: 'rgb(47,52,180)'
                    }
                },//圆圈样式
                symbol    : "circle",   //图形形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: 100,        //圈圈大小
                edgeLabel:{
                    normal:{
                        show:true,
                        formatter:'名下公司'
                    },
                },
                lineStyle:myLineStyle,

                data: [{
                    name      : company.name,
                    value     :'公司名',
                    symbolSize: 100,
                    itemStyle : {
                        normal: {
                            color: 'darkblue',
                        }
                    }

                }, {
                    name     :company.legalPerson,
                    value    : '企业法人',
                    itemStyle: {
                        normal: {
                            color: 'darkblue'
                        }
                    }
                }, {
                    name : company.address,
                    value: '公司地址',
                    
                }, {
                    name : company.capital,
                    value: '注册资本',
                    
                },{
                    name : company.creditCode,
                    value: '信用代码',
                    
                },{
                    name : company.setupTime,
                    value: '成立时间',
                    
                },{
                    name : company.scope,
                    value: '经营范围',
                    
                },{
                    name : company.province,
                    value: '所属省份',
                    
                },{
                    name : company.mail,
                    value: '邮箱',
                    
                },{
                    name : company.phone,
                    value: '联系方式',
                    
                },{
                    name : company.morePhone,
                    value: '更多联系方式',
                    
                }],
                links: [{
                    source: company.legalPerson,
                    target: company.name,
                }, {
                    source: company.address,
                    target: company.name,
                }, {
                    source: company.setupTime,
                    target: company.name
                }, {
                    source: company.phone,
                    target: company.name
                }, {
                    source: company.scope,
                    target: company.name
                }, {
                    source: company.province,
                    target: company.name
                },{
                    source: company.morePhone,
                    target: company.name
                },{
                    source: company.capital,
                    target: company.name
                },{
                    source: company.mail,
                    target: company.name
                },{
                    source: company.creditCode,
                    target: company.name
                }],
         
            }
        ]
    };
    // //点击跳转
    mychart.on('click',function(e){
        // console.log(e.value); 
        //如果点击了企业法人，那么搜索该企业法人的数据并且返回新图谱   
        if(e.value == '企业法人'){
            clickLegalPerson(e)
        }
        //if点击了其他
        if(e.value == '公司名'){
            clickCompanyName(e)
        }
    })
    mychart.setOption(option);
}



//点击企业法人后触发的图谱变化
function clickLegalPerson(e){
    mychart.showLoading();
    console.log(e.name);
    $.get('http://106.14.151.119:3000/api/search?legalPerson='+e.name).done(function(data){
        console.log(e.name);
        mychart.hideLoading();
        var searchData = data;
        console.log(searchData);
        var dataArr = [{
            name     : e.name,
            value    : '企业法人',
            itemStyle: {
                normal: {
                    color: 'darkblue'
                }
            },
            symbolSize: 150,
        }];
        var linkArr = []
        

        //遍历接收返回数据中的公司名
        for(var i = 1;i<searchData.length;i++){
            console.log(searchData[i].name)
            var companyObj = {
                name      : searchData[i].name,
                value     : '公司名',
                symbolSize: 100,
                itemStyle : {
                    normal: {
                        color: 'darkblue'
                    }
                },
            }
            var linkObj = {
                source: e.name,
                target: searchData[i].name,
            }
            dataArr.push(companyObj)
            linkArr.push(linkObj)
        }
        console.log(dataArr)
        console.log(linkArr)


        mychart.setOption({
            title:myTitleStyle,
            tooltip:myTooltipStyle,
            animationDurationUpdate: 2500,
            animationEasingUpdate  : 'quinticInOut',
            lineStyle:myLineStyle,
            series                 : [
                {
                    name              : '企业法人',
                    type              : 'graph',
                    layout    : 'force',
                    force: myForce,
                    draggable:true, //节点时候可拖拽，
                    symbolSize        : 90,
                    roam              : true,
                    focusNodeAdjacency: true,
                    label             : myLabelStyle,
    
                    edgeSymbol    : ['circle', 'arrow'],
                    edgeSymbolSize: [1, 10],
                    edgeLabel:{
                        normal:{
                            show:true,
                            formatter:'名下公司'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(47,52,180)'
                        }
                    },//圆圈样式
                    symbol    : "circle",
                    symbolSize: 100,        //圈圈大小
                    data : dataArr,   //数据
                    links: linkArr,   //关系
                }
            ]
        });

    })
}
//点击公司名后图谱发生的变化
function clickCompanyName(e){
    mychart.showLoading();
    console.log(e.name);
    $.get('http://106.14.151.119:3000/api/search?name='+e.name).done(function(data){
        console.log("搜索："+e.name);
        mychart.hideLoading();
        var searchData = data[1];  //获取以name准确查询到的公司数据
        console.log(searchData);
        var newOption = {
            title:myTitleStyle,
            tooltip:myTooltipStyle,
            animationDurationUpdate: 1500,
            animationEasingUpdate  : 'quinticInOut',
            series                 : [
                {   
                    type: 'graph',
                    layout    : 'force',
                    force: myForce,
                    draggable:true, //节点时候可拖拽，
                    symbolSize: 90,
                    roam      : 'true',
                    label:myLabelStyle,
                    edgeSymbol    : ['circle', 'arrow'],
                    edgeSymbolSize: [1, 15],
                    itemStyle: {
                        normal: {
                            color: 'rgb(47,52,180)'
                        }
                    },//圆圈样式
                    symbol    : "circle",   //图形形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    symbolSize: 100,        //圈圈大小
                    lineStyle:myLineStyle,
    
                    data: [{
                        name      : searchData.name,
                        value     : '公司名',
                        symbolSize: 100,
                        itemStyle : {
                            normal: {
                                color: 'darkblue'
                            }
                        }
                    }, {
                        name     : searchData.legalPerson,
                        value    : '企业法人',
                        itemStyle: {
                            normal: {
                                color: 'darkblue'
                            }
                        }
                    }, {
                        name : searchData.address,
                        value: '公司地址',
                        
                    }, {
                        name : searchData.capital,
                        value: '注册资本',
                        
                    },{
                        name : searchData.creditCode,
                        value: '信用代码',
                        
                    },{
                        name : searchData.setupTime,
                        value: '成立时间',
                        
                    },{
                        name : searchData.scope,
                        value: '经营范围',
                    },{
                        name : searchData.province,
                        value: '所属省份',
                        
                    },{
                        name : searchData.mail,
                        value: '邮箱',
                        
                    },{
                        name : searchData.phone,
                        value: '联系方式',
                        
                    },{
                        name : searchData.morePhone,
                        value: '更多联系方式',
                        
                    }],
                    links: [{
                        source: searchData.legalPerson,
                        target: searchData.name,
                    }, {
                        source: searchData.address,
                        target: searchData.name,
                    }, {
                        source: searchData.setupTime,
                        target: searchData.name
                    }, {
                        source: searchData.phone,
                        target: searchData.name
                    }, {
                        source: searchData.morePhone,
                        target: searchData.name
                    }, {
                        source: searchData.scope,
                        target: searchData.name
                    },{
                        source: searchData.province,
                        target: searchData.name
                    },{
                        source: searchData.capital,
                        target: searchData.name
                    },{
                        source: searchData.creditCode,
                        target: searchData.name
                    },{
                        source: searchData.mail,
                        target: searchData.name
                    }],
                   
                }
            ]
        }
        mychart.setOption(newOption);
    })

    
}