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
var pageNumber,lastPageItem,page_index;//总页数,最后一页的项数，请求的页码（给当前页添加active状态）

function requestParam(paramType,param,pageIndex){

    var url        = "http://106.14.151.119:3000/api/search?"+paramType+"="+param+"&page="+pageIndex;
        page_index = pageIndex;
    console.log(url);
    $.get(url,function(data,status){

        resultData   = data;
        resultNumber = data[0]['数量'];               //返回的结果数量,只用于显示，实际上一页只返回10条，尾页返回余数
        pageNumber   = Math.ceil(resultNumber/10);  //每页10条，计算总页数
        lastPageItem = resultNumber%10;             //最后一页的页数
        console.log(pageNumber+"页"+"最后一页有"+lastPageItem+"条");
        if(resultNumber == 0){
            $('#noneResult').removeClass('hideResult').siblings('h3').addClass('hideResult');
        }else{
            $('#resultNumber').text(resultNumber);
        }
        

        console.log(resultData);
        
        //如果是第一页
        if(pageIndex == 1 || pageIndex == ''){
            for(var i = 0;i<resultData.length-1;i++){
                //动态创建列表
                listDOM();
                //动态加载数据
                document.getElementsByClassName("titleName")[i].innerHTML         = resultData[i+1].name;
                document.getElementsByClassName("legalPersonName")[i].innerHTML   = resultData[i+1].legalPerson;
                document.getElementsByClassName("registeredCapital")[i].innerHTML = resultData[i+1].capital;
                document.getElementsByClassName("address")[i].innerHTML           = resultData[i+1].address;
                companyObj                     [resultData[i+1].name]             = resultData[i+1]._id;
            }
        }//如果是中间页
        else if(pageIndex < pageNumber && pageIndex>1){
            //动态加载数据
            console.log("其他页")
            for(var i = 0;i<resultData.length-1;i++){
                //这里不需要再创建列表，直接将前面的数据替换
                // listDOM();
                //动态加载数据
                document.getElementsByClassName("titleName")[i].innerHTML         = resultData[i+1].name;
                document.getElementsByClassName("legalPersonName")[i].innerHTML   = resultData[i+1].legalPerson;
                document.getElementsByClassName("registeredCapital")[i].innerHTML = resultData[i+1].capital;
                document.getElementsByClassName("address")[i].innerHTML           = resultData[i+1].address;
                companyObj                     [resultData[i+1].name]             = resultData[i+1]._id;
            }
        }//如果是最后一页
        else if(pageIndex!=1 && pageIndex == pageNumber ){
            console.log("最后一页")
            //把之前创建的dom抹除，
            $('.inforBox').remove();
            //再把余数给dom创建出来
            for(var i = 0;i<resultData.length-1;i++){
                listDOM();
                //动态加载数据
                document.getElementsByClassName("titleName")[i].innerHTML         = resultData[i+1].name;
                document.getElementsByClassName("legalPersonName")[i].innerHTML   = resultData[i+1].legalPerson;
                document.getElementsByClassName("registeredCapital")[i].innerHTML = resultData[i+1].capital;
                document.getElementsByClassName("address")[i].innerHTML           = resultData[i+1].address;
                companyObj                     [resultData[i+1].name]             = resultData[i+1]._id;
            }
        }
        


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


//动态生成数据条盒子
function listDOM(){
    //创建空盒子
    var listBox = $("<div class='inforBox center'><div class='imgBox'><img src='../img/company.png' width='160px' height='160px' alt='企业'></div><div class='titleInfor'><h3 class='titleName' onclick='toDetailPage(this.innerHTML)'></h3><ul><li>法定代表人：<span class='legalPersonName'></span></li><li>注册资本：<span class='registeredCapital'></span></li><li>地址：<span class='address'></span></li></ul></div></div>");
    $('#inforListContainer').append(listBox);
    
}

//往空盒子里面塞数据
// function addDataToList(resultData){
//     for(var i = 1;i<resultData.length;i++){
//         document.getElementsByClassName("titleName")[i-1].innerHTML=resultData[i].name;
//         document.getElementsByClassName("legalPersonName")[i-1].innerHTML=resultData[i].legalPerson;
//         document.getElementsByClassName("registeredCapital")[i-1].innerHTML=resultData[i].capital;
//         document.getElementsByClassName("address")[i-1].innerHTML=resultData[i].address;
//         companyObj[resultData[i].name] = resultData[i]._id;
//     }
//     console.log(companyObj);
// }

//点击列表标题进入公司详情页：
function toDetailPage(name){
    var url           = "../html/detailInfor.html"+'?id='+encodeURI(companyObj[name]);
        location.href = url;
}

//bootstrap分页控制器
function fenyeControll(){
    console.log(pageNumber,lastPageItem,page_index);
};