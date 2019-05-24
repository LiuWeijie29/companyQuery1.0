var companyObj = new Object();//该对象存储name和id关键信息
var resultNumber;//发送请求返回的数据条数
var resultData;//请求到的数据
var paramType,
    paramName,
    paramAddress,
    paramPhone,
    paramLegalPerson,
    paramCreditCode,
    paramScope;
function requestParam(paramType,param,pageIndex){

    var url = "http://106.14.151.119:3000/api/search?"+paramType+"="+param+"&page="+pageIndex;
    console.log(url);
    $.get(url,function(data,status){
        resultData = data;
        console.log(resultData);
        resultNumber = data[0]['数量'];  //返回的结果数量
        $('#resultNumber').text(resultNumber);
        //动态创建列表
        createList(resultNumber);
        addDataToList(resultData);//动态加载数据  
    })
}

$(function(){
    //按企业名称搜索
    if($.query.get("name")!=''){
        paramType = 'name';
        paramName = $.query.get("name");
        console.log("获取到的数据："+ paramName);
        requestParam(paramType,paramName,1);


    }
    //按地址搜索
    if($.query.get("address")!=''){
        paramType    = 'address';
        paramAddress = $.query.get("address");
        console.log("获取到的数据："+ paramAddress);
        requestParam(paramType,paramAddress,1);
    }
    //按联系方式搜索
    if($.query.get("phone")!=''){
        //获取传递过来的phone值
        paramType  = 'phone';
        paramPhone = $.query.get("phone");
        console.log("获取到的数据："+ paramPhone);
        requestParam(paramType,paramPhone,1);
        
    }
    //按法人股东名搜索
    if($.query.get("legalPerson")!=''){
        paramType        = 'legalPerson';
        paramLegalPerson = $.query.get("legalPerson");
        console.log("获取到的数据："+ paramLegalPerson);
        requestParam(paramType,paramLegalPerson,1);
        
    }
    //按统一社会信用代码搜索
    if($.query.get("creditCode")!=''){
        paramType       = 'creditCode';
        paramCreditCode = $.query.get("creditCode");
        console.log("获取到的数据："+ paramCreditCode);
        requestParam(paramType,paramCreditCode,1);
    }
    //按行业搜索
    if($.query.get("scope")!=''){
        //获取传递过来的name值
        paramType  = 'scope';
        paramScope = $.query.get("scope");
        console.log("获取到的数据："+ paramScope);
        requestParam(paramType,paramScope,1);
    }
    
});

function createList(number){
    if(number>10){
        //显示翻页框


        
    }
    //生成列表
    for(var i = 0;i<number;i++){
        listDOM();
    }
}
//表的组件
function listDOM(){
    //创建空盒子
    var listBox = $("<div class='inforBox center'><div class='imgBox'></div><div class='titleInfor'><h3 class='titleName' onclick='toDetailPage(this.innerHTML)'></h3><ul><li>法定代表人：<span class='legalPersonName'></span></li><li>注册资本：<span class='registeredCapital'></span></li><li>地址：<span class='address'></span></li></ul></div></div>");
    $('#inforListContainer').append(listBox);
    
}

//往空盒子里面塞数据
function addDataToList(resultData){
    var imgNode = $(" <img src='../img/company.png' width='160px' height='160px' alt='企业'>");
    $('.imgBox').append(imgNode);
    for(var i = 1;i<resultData.length;i++){
        document.getElementsByClassName("titleName")[i-1].innerHTML         = resultData[i].name;
        document.getElementsByClassName("legalPersonName")[i-1].innerHTML   = resultData[i].legalPerson;
        document.getElementsByClassName("registeredCapital")[i-1].innerHTML = resultData[i].capital;
        document.getElementsByClassName("address")[i-1].innerHTML           = resultData[i].address;
        companyObj                     [resultData[i].name]                 = resultData[i]._id;
    }
    console.log(companyObj);
}

//点击列表标题进入公司详情页：
function toDetailPage(name){
    var url           = "../html/detailInfor.html"+'?id='+encodeURI(companyObj[name]);
        location.href = url;
}
