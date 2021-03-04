function setMap() {

    var map = new AMap.Map('map');
    map.setZoom(20);
    // map.plugin(['AMap.Scale'], function () {
    //     var scale = new AMap.Scale({});
    //     map.addControl(scale);
    // });
    getMap(map);

}
function getMap(map){
    // var timer=setInterval(function(){
    map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,// 是否使用高精度定位，默认：true
            convert:true,
            showMarker:true,
            panToLocation:true,
            timeout: 10000
        });

        // setInterval(function(){
        geolocation.getCurrentPosition();
        geolocation.accuracy=2;
        map.addControl(geolocation);
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
            // data是具体的定位信息
            console.log(data)
            console.log(data.position.lat,data.position.lng)
                var ajaxd = new XMLHttpRequest();
                ajaxd.open('get','https://restapi.amap.com/v3/geocode/regeo?key=46a506b48883b440df2fe636586ea681&location='+data.position.lng+','+data.position.lat+'&poitype=&radius=0&extensions=all&batch=false&roadlevel=0');
                ajaxd.send();
                ajaxd.onreadystatechange = function () {
                    if (ajaxd.readyState===4 && ajaxd.status===200) {
                        console.log(JSON.parse(ajaxd.response).regeocode.formatted_address);
                    }
                };
                var ajax = new XMLHttpRequest();
                ajax.open('get',`https://devapi.heweather.net/v7/weather/now?location=${data.position.lng},${data.position.lat}&key=1d152acf5de540a8a91099f5730640da`);
                ajax.send();
                ajax.onreadystatechange = function () {
                    if (ajax.readyState===4 && ajax.status===200) {
                        console.log(JSON.parse(ajax.response).now.text);
                        var feelsLike=JSON.parse(ajax.response).now.feelsLike;
                    }
                }

            // window.alert("定位成功！");
        }

        function onError(data) {
            errsec=true;
            // 定位出错
            // window.alert("定位出错！");
        }
        // },1000);
    })
}