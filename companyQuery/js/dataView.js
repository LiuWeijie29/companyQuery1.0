
var companyData=[];//存放地图数据可视化的点
//控制tab栏切换
var tabControl = new Vue({
    el:'#dataViewContainer',
    data:{
        index:1
    },
    
})

//地图
window.onload = gaodePosTrans();

//地图经纬度转化函数--》地址转高德地图经纬度
function gaodePosTrans(){
    // 1.发送请求
    var url = 'http://106.14.151.119:3000/api/all'
    $.get(url,function(data,status){
        // console.log(data)
        // 2.调用转化器
        for(var i = 1;i<data.length;i++){
            getAddressLocation(data[i].address,data[i].name,function(addressData){
                //添加数据
                companyData.push(addressData);
                //如果数据都加载完成，则生成地图
                if(companyData.length == data.length-1){
                    gaodeMapInit(companyData)//生成地图
                }
                
            })
            
        }
    })
}

//地址转化器
function getAddressLocation(address,companyName,callback){
    var geocoder = new AMap.Geocoder();
    geocoder.getLocation(address,function(status,result){
        if(status === 'complete'&&result.geocodes.length){
            // console.log("地址转化成功："+result);
            var point = result.geocodes[0].location;
            // console.log(point);
            var addressData = {
                "lnglat":[point.lng,point.lat],
                "name":companyName,
                "style":2
            }
            callback(addressData);
            return addressData;
        }
        if(status === 'err'){
            console.log("发生错误:"+JSON.stringify(result));
        }
    });
}    

//生成数据可视化地图
function gaodeMapInit(data){
    var map = new AMap.Map('mapContainer',{
        center:[115.857963,28.683016],
        zoom        : 10,
        rotateEnable: true,
        mapStyle: 'amap://styles/grey',
    })
    const layer = new Loca.ScatterPointLayer({
        map: map
    });
    // var data = [
    //     { "lnglat": [113.147849, 26.706318], "name": "杨梅山", "style": 2 }, 
    //     { "lnglat": [114.979819, 27.432686], "name": "下曾家", "style": 2 }, 
    //     // ...更多数据
    // ]
    layer.setData(data, {
        lnglat: 'lnglat'   // 指定坐标数据的来源，数据格式: 经度在前，维度在后，数组格式。
    });
    // 配置样式
    layer.setOptions({
        unit: 'px',
        style: {
            radius: 6,     // 圆形半径，单位像素
            color: '#b7eff7', // 填充颜色
            borderWidth: 2.5,   // 边框宽度
            borderColor: '#ffffff'  // 边框颜色
        }
    });
    layer.render();
}