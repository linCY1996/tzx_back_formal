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
    var channel_id = GetParameters('channel_id')
    var type = GetParameters('type')
    var routeid = GetParameters('routeid')
    var token = GetParameters('token')
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
                    server: server,
                    token:token
                }).then((res) => {
                    np.routeName = res.data.Body
                })
            },

            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 保存
            saves: function () {
                
                if (np.jump_type == 0) {
                    var current = -1
                    for(var i = 0;i<np.Poilist.length;i++){
                        if(np.Poilist[i].poi_id == np.Poi_choose){
                            current = i
                        }
                    }
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
                    } else if (np.yj_choose == 8) {
                        np.jump_url = '../videodetail/videodetail?travelid=' + np.route_id + '&share=no'
                    }
                }
                if (np.jump_type == 2) {
                    var current = -1
                    for(var i = 0;i<np.Poilist.length;i++){
                        if(np.Poilist[i].poi_id == np.Poi_choose){
                            current = i
                        }
                    }
                    if (np.yj_choose == 2) {   //指定个人卡包   ///////current  第几个poi
                        np.jump_url = '../cardpackage/cardpackage?travelid='+np.route_id+'&name='+np.Name+'&current='+current
                    } else if (np.yj_choose == 4) {
                        np.jump_url = '../journey/journey'
                    } else if (np.yj_choose == 5) {
                        np.jump_url = '../listshow/listshow?travelid=' + np.route_id
                    } else if (np.yj_choose == 7) {
                        np.jump_url = '../memory/memory'
                    }
                }
                if(np.img_url == ''){
                    alert("信息填写不完整，无法提交")
                } else {
                    axios.post(host + '/route/v1/api/homePage/create', {
                        channel_id:parseInt(channel_id),
                        img_url: np.img_url,
                        jump_type: parseInt(np.jump_type),
                        jump_url: np.jump_url,   ///////
                        sort: parseInt(np.sort),
                        type: type,
                        server:server,
                        route_id:parseInt(routeid),
                        token:token
                    }).then((res) => {
                        alert("添加成功")
                        window.history.go(-1)
                    })
                }
            },
        },
        mounted: function () {
            this.showRouteName();
        },
        watch: {
            route_id: function () {
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(np.route_id),
                    server: server,
                    token:token
                }).then((res) => {
                    np.Poilist = res.data.Body.poi_ids
                    np.Name = res.data.Body.Name
                })
            }
        }
    })
}