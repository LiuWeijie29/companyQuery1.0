var company = {};
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
    $('#creditCode').text(data[0].creditCode);//统一社会信用代码
    $('#setupTime').text(data[0].setupTime);//成立日期
    $('#scope').text(data[0].scope);//经营范围
    $('#type').text(data[0].type);//公司类型
    $('#province').text(data[0].province);//所属地区
    $('#mail').text(data[0].mail);//邮箱
    $('#phone').text(data[0].phone);//联系方式
    $('#morePhone').text(data[0].morePhone);//更多联系方式
    company.name = data[0].name;
    company.legalPerson = data[0].legalPerson;
    company.address = data[0].address;;
    company.registeredCapital= data[0].capital;
    company.RCapital= data[0].capital;
    company.creditCode= data[0].creditCode;
    company.setupTime= data[0].setupTime;
    company.scope= data[0].scope;
    company.province= data[0].province;
    company.mail= data[0].mail;
    company.phone= data[0].phone;
    company.morePhone= data[0].morePhone;
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
     var addressPoint = getAddressLocation(company.name);//定位企业名
     
     //某些企业已经注销或未登记，地图上搜索不到该企业，则以改企业地址为定位点
     $('#notFindPos').on('click',function(){
         var addressPoint = getAddressLocation(company.address);
     });
     
});

// //企业图谱轮播栏
// var mySwiper = new Swiper ('.swiper-container', {
//     direction: 'horizontal',//横向
//     autoplay:true,
//     loop: true,
//     speed:300,
//     initialSlide :1,//初始化指定index
//     // 如果需要分页器
//     pagination: '.swiper-pagination',
    
//     // 如果需要前进后退按钮
//     nextButton: '.swiper-button-next',
//     prevButton: '.swiper-button-prev',
//     width:1100,
//     height:750

//   })        

//企业图谱
function dataViewShow(){
    var mychart = echarts.init(document.getElementById('dataView'));
    // 指定图表的配置项和数据
    option = {
        title: {
            text: '企业信息图谱'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name:'基本信息',
                type: 'graph',
                layout: 'circular',
                symbolSize: 90,
                roam: true,
                focusNodeAdjacency:true,
                label: {
                    normal: {
                        show: true,
                        formatter:'{c}'       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                    }
                },

                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [1, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'lightblue'
                    }
                },//圆圈样式
                symbol:"circle",       //图形形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolSize: 100,//圈圈大小


                data: [{
                    name: company.name,
                    value:'公司名',
                    symbolSize: 100,
                    itemStyle: {
                        normal: {
                            color:'darkblue'
                        }
                    }

                }, {
                    name: company.legalPerson,
                    value:'企业法人',
                    itemStyle: {
                        normal: {
                            color:'darkblue'
                        }
                    }
                }, {
                    name: company.address,
                    value:'公司地址',
                    
                }, {
                    name: company.registeredCapital,
                    value:'注册资本',
                    
                },{
                    name: company.creditCode,
                    value:'信用代码',
                    
                },{
                    name: company.setupTime,
                    value:'成立时间',
                    
                },{
                    name: company.scope,
                    value:'经营范围',
                    
                },{
                    name: company.province,
                    value:'所属省份',
                    
                },{
                    name: company.mail,
                    value:'邮箱',
                    
                },{
                    name: company.phone,
                    value:'联系方式',
                    
                },{
                    name: company.morePhone,
                    value:'更多联系方式',
                    
                }],
                // links: [],
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
                    source:  company.scope,
                    target: company.name
                }, {
                    source: company.province,
                    target: company.name
                },{
                    source: company.morePhone,
                    target: company.name
                },{
                    source: company.registeredCapital,
                    target: company.name
                },{
                    source: company.mail,
                    target: company.name
                }],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };
    
    mychart.setOption(option);
}


// //点击跳转
// mychart.on('click',function(e){
//     // console.log(e.value); 
//     //如果点击了企业法人，那么搜索该企业法人的数据并且返回新图谱
//     if(e.value == '企业法人'){
//         mychart.showLoading();
//         console.log(e.name);
//         $.get('http://106.14.151.119:3000/api/search?legalPerson='+e.name).done(function(data){
//             console.log(e.name);
//             mychart.hideLoading();
//             // var mychart2 = echarts.init(document.getElementById('dataView'))
//             var searchData = data;
//             console.log(searchData);
//             var dataArr = [{
//                 name: e.name,
//                 value:'企业法人',
//                 itemStyle: {
//                     normal: {
//                         color:'darkblue'
//                     }
//                 },
//                 symbolSize: 200,
//             }];
//             var linkArr = []
            

//             //遍历接收返回数据中的公司名
//             for(var i = 1;i<searchData.length;i++){
//                 console.log(searchData[i].name)
//                 var companyObj = {
//                     name: searchData[i].name,
//                     value:'名下公司',
//                     symbolSize: 100,
//                 }
//                 var linkObj = {
//                     source: e.name,
//                     target: searchData[i].name,       
//                 }
//                 dataArr.push(companyObj)
//                 linkArr.push(linkObj)
//             }
//             console.log(dataArr)
//             console.log(linkArr)


//             mychart.setOption({
//                 title: {
//                     text: '企业法人'
//                 },
//                 tooltip: {},
//                 animationDurationUpdate: 2500,
//                 animationEasingUpdate: 'quinticInOut',
//                 series : [
//                     {
//                         name:'企业法人',
//                         type: 'graph',
//                         layout: 'circular',
//                         symbolSize: 90,
//                         roam: true,
//                         focusNodeAdjacency:true,
//                         label: {
//                             normal: {
//                                 show: true,
//                                 formatter:'{c}'       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
//                             }
//                         },
        
//                         edgeSymbol: ['circle', 'arrow'],
//                         edgeSymbolSize: [1, 10],
//                         edgeLabel: {
//                             normal: {
//                                 textStyle: {
//                                     fontSize: 20
//                                 }
//                             }
//                         },
//                         itemStyle: {
//                             normal: {
//                                 color: 'lightblue'
//                             }
//                         },//圆圈样式
//                         symbol:"circle", 
//                         symbolSize: 100,//圈圈大小


//                         data:dataArr,//数据
//                         links: linkArr,//关系


//                         lineStyle: {
//                             normal: {
//                                 opacity: 0.9,
//                                 width: 2,
//                                 curveness: 0
//                             }
//                         }
//                     }
//                 ]
//             });

//         })
//     }
//     //if点击了其他
// })

