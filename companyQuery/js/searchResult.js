var companyObj = new Object();//该对象存储name和id关键信息
var resultNumber;//发送请求返回的数据条数
var resultData;//请求到的数据
$(function(){
    //按企业名称搜索
    if($.query.get("name")!=''){
        //获取传递过来的name值
        var name = $.query.get("name");
        console.log("获取到的数据："+ name);
        //发送ajax请求申请数据
        var url = "http://106.14.151.119:3000/api/search?name="+name;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
    }
    //按地址搜索
    if($.query.get("address")!=''){
        var address = $.query.get("address");
        console.log("获取到的数据："+ address);
        var url = "http://106.14.151.119:3000/api/search?address="+address;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
    }
    //按联系方式搜索
    if($.query.get("phone")!=''){
        //获取传递过来的phone值
        var phone = $.query.get("phone");
        console.log("获取到的数据："+ phone);
        //发送ajax请求申请数据
        var url = "http://106.14.151.119:3000/api/search?phone="+phone;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
    }
    //按法人股东名搜索
    if($.query.get("legalPerson")!=''){
        //获取传递过来的legalPerson值
        var legalPerson = $.query.get("legalPerson");
        console.log("获取到的数据："+ legalPerson);
        //发送ajax请求申请数据
        var url = "http://106.14.151.119:3000/api/search?legalPerson="+legalPerson;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
    }
    //按统一社会信用代码搜索
    if($.query.get("creditCode")!=''){
        //获取传递过来的creditCode值
        var creditCode = $.query.get("creditCode");
        console.log("获取到的数据："+ creditCode);
        //发送ajax请求申请数据
        var url = "http://106.14.151.119:3000/api/search?creditCode="+creditCode;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
    }
    //按行业搜索
    if($.query.get("scope")!=''){
        //获取传递过来的name值
        var scope = $.query.get("name");
        console.log("获取到的数据："+ scope);
        //发送ajax请求申请数据
        var url = "http://106.14.151.119:3000/api/search?scope="+scope;
        $.get(url,function(data,status){
            resultData = data;
            console.log(resultData);
            resultNumber = data[0]['数量'];//返回的结果数量
            $('#resultNumber').text(resultNumber);
            createList(resultNumber);//动态创建列表
            addDataToList(resultData);//动态加载数据  
        })
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
    var listBox = $("<div class='inforBox center'><div class='imgBox'></div><div class='titleInfor'><h3 class='titleName' onclick='toDetailPage(this.innerHTML)'></h3><ul><li>法定代表人：<span class='legalPersonName'></span></li><li>注册资本：<span class='registeredCapital'></span></li><li>地址：<span class='address'></span></li></ul></div></div>");
    $('#inforListContainer').append(listBox);
    
}
function addDataToList(resultData){
    var imgNode = $(" <img src='../img/企业.png' width='160px' height='160px' alt='企业'>");
    $('.imgBox').append(imgNode);
    for(var i = 1;i<resultData.length;i++){
        document.getElementsByClassName("titleName")[i-1].innerHTML=resultData[i].name;
        document.getElementsByClassName("legalPersonName")[i-1].innerHTML=resultData[i].legalPerson;
        document.getElementsByClassName("registeredCapital")[i-1].innerHTML=resultData[i].capital;
        document.getElementsByClassName("address")[i-1].innerHTML=resultData[i].address;
        companyObj[resultData[i].name] = resultData[i]._id;
    }
    console.log(companyObj);
}

//点击列表标题进入公司详情页：
function toDetailPage(name){
    var url = "../html/detailInfor.html"+'?id='+encodeURI(companyObj[name]);
    location.href = url;
}
