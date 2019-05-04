$(function(){
    if($.query.get("name")!=''){
        //获取传递过来的name值
        var name = $.query.get("name");
        console.log("获取到的数据："+ name);
        //发送ajax请求申请数据

    }
    if($.query.get("address")!=''){
        var address = $.query.get("address");
        console.log("获取到的数据："+ address);
        $.get("http://106.14.151.119:3000/api/search?address=瑶湖西&page=2",function(data,status){
            console.log(data);
            $('#resultNumber').text(data[0]['数量']);
        })
    }
    
    
})
