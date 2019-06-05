// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('id')    //pname
    var channel_id = GetParameters('channel_id')
    var type = GetParameters('type')
    var np = new Vue({
        el: '#talls',
        data: {
            bianji_show: true,
            add_show: false,
            yj_choose: 1,
            routeName: [],   //渠道下所有routeName
            img_url: '',   //显示图片链接
            sort: '',   //排序
            jump_type: '',  //跳转类型
            route_id: '',  //跳转的routeid
            Poilist: [],  //对应routeid下得poi列表
            Poi_choose: '',  //选择得Poi得id
            Name:'',   //行程名字
            jump_url:'',  //跳转

        },
        methods: {

            // 获取线路name
            showRouteName: function () {
                axios.post(host + '/route/v1/api/channel/routeList', {
                    channel_id: parseInt(channel_id),
                    server: server
                }).then((res) => {
                    np.routeName = res.data.Body
                })
            },
            // 显示图片信息
            async showImgMsg() {
                await axios.post(host + '/route/v1/api/homePage/get', {
                    id: parseInt(ids),
                    server: server
                }).then((res) => {
                    console.log("=说明=", res.data.Body)
                    np.jump_url = res.data.Body.jump_url
                    var jump_url = res.data.Body.jump_url
                    np.route_id = jump_url.charAt(jump_url.length - 1)
                    var jump_class = jump_url.match(/\/(\S*)\//)[1];   //正则截取
                    np.img_url = res.data.Body.img_url
                    np.sort = res.data.Body.sort
                    np.jump_type = res.data.Body.jump_type
                    if (np.jump_type == 0) {
                        if (jump_class == "detail") {
                            np.yj_choose = 0
                        } else if (jump_class == "advice") {
                            np.yj_choose = 1
                        } else if (jump_class == "routekabao") {
                            np.yj_choose = 3
                        } else if (jump_class == "listshowroute") {
                            np.yj_choose = 6
                        } else if (jump_class == "poidetail") {
                            np.yj_choose = 9
                        } else if (jump_class == "travelmap") {
                            np.yj_choose = 10
                        }
                    }
                    if (np.jump_type == 2) {
                        if (jump_class == "cardpackage") {
                            np.yj_choose = 2
                        } else if (jump_class == "journey") {
                            np.yj_choose = 4
                        } else if (jump_class == "listshow") {
                            np.yj_choose = 5
                        } else if (jump_class == "memory") {
                            np.yj_choose = 7
                        } else if (jump_class == "videodetail") {
                            np.yj_choose = 8
                        }
                    }
                })
            },

            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 保存
            saves: function () {
                var current = -1
                for(var i = 0;i<np.Poilist.length;i++){
                    if(np.Poilist[i].poi_id == np.Poi_choose){
                        current = i
                    }
                }
                console.log("current=",current)        
                if (np.jump_type == 0) {
                    if (np.yj_choose == 0) {
                        np.jump_url = '../detail/detail?routeid=' + np.route_id
                    } else if (np.yj_choose == 1) {
                        np.jump_url = '../advice/advice' 
                    } else if (np.yj_choose == 3) {  ///////name    poi的名字
                        np.jump_url = '../routekabao/routekabao?routeid=' + np.route_id + '&name='+np.Poilist[current].poi_name
                    } else if (np.yj_choose == 6) {
                        np.jump_url = '../listshowroute/listshowroute?routeid=' + np.route_id
                    } else if (np.yj_choose == 9) {  ///poiid   index(表示第几个poi，从0开始)
                        np.jump_url = '../poidetail/poidetail?poiid='+np.Poi_choose+'&index='+current
                    } else if (np.yj_choose == 10) {
                        np.jump_url = '../travelmap/travelmap?routeid=' + np.route_id
                    }
                }
                if (np.jump_type == 2) {
                    if (np.yj_choose == 2) {   //指定个人卡包   ///////current  第几个poi
                        np.jump_url = '../cardpackage/cardpackage?travelid='+np.route_id+'&name='+np.Name+'&current='+current
                    } else if (np.yj_choose == 4) {
                        np.jump_url = '../journey/journey'
                    } else if (np.yj_choose == 5) {
                        np.jump_url = '../listshow/listshow?travelid=' + np.route_id
                    } else if (np.yj_choose == 7) {
                        np.jump_url = '../memory/memory'
                    } else if (np.yj_choose == 8) {
                        np.jump_url = '../videodetail/videodetail?travelid=' + np.route_id + '&share=no'
                    }
                }
                if(np.img_url == '' || np.jump_url == ''){
                    alert("信息填写不完整，无法提交")
                } else {
                    axios.post(host + '/route/v1/api/homePage/update', {
                        // channel_id:parseInt(channel_id),
                        id: parseInt(ids),
                        img_url: np.img_url,
                        jump_type: parseInt(np.jump_type),
                        jump_url: np.jump_url,   ///////
                        sort: parseInt(np.sort),
                        type: type,
                        server:server
                    }).then((res) => {
                        console.log(res.data)
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                }
            },

        },
        mounted: function () {
            this.showRouteName();
            this.showImgMsg();
            // this.showPoilist();
        },
        watch: {
            route_id: function () {
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(np.route_id),
                    server: server
                }).then((res) => {
                    np.Poilist = res.data.Body.poi_ids
                    np.Name = res.data.Body.Name
                })
            }
        }
    })
}