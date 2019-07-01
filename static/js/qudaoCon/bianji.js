// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
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
    var ids = GetParameters('id')    //id
    var token = GetParameters('token')  //token
    var np = new Vue({
        el: '#tall',
        data: {
            Poilist: [],  //显示所有poi
            qudao: [],   //显示所有渠道
            qudaoName: '',   //渠道名称
            daoyou: [],  //导游列表
            luxian: [],   //路线列表
            chooseTouer: [],  //选择可用导游
            bianjiTouer: [],  //可编辑导游
            choosePoi: [],  //选择可用Poi
            bianjiPoi: [],  //可编辑Poi
            chooseLuxian: [],   //选择可用路线
            bianjiLuxian: [],   //可编辑路线
        },
        methods: {
         
            // 先显示对应渠道id下边的信息
            showFirMsgs: function () {
                axios.post(host + '/route/v1/api/channel/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    var can_use_guide = []
                    var cName = JSON.parse(res.data.Body.can_use_guide)
                    for (var i = 0; i < cName.length; i++) {
                        can_use_guide[i] = cName[i].id+','+cName[i].name
                    }
                    np.chooseTouer = can_use_guide

                    var can_edit_guide = []
                    var cEditguide = JSON.parse(res.data.Body.can_edit_guide)
                    for (var i = 0; i < cEditguide.length; i++) {
                        can_edit_guide[i] = cEditguide[i].id+','+cEditguide[i].name
                    }
                    np.bianjiTouer = can_edit_guide

                    var can_use_poi = []
                    var cPoi = JSON.parse(res.data.Body.can_use_poi)
                    for (var i = 0; i < cPoi.length; i++) {
                        can_use_poi[i] = cPoi[i].id+','+cPoi[i].name
                    }
                    np.choosePoi = can_use_poi
                    
                    var can_edit_poi = []
                    var cEditPoi = JSON.parse(res.data.Body.can_edit_poi)
                    for (var i = 0; i < cEditPoi.length; i++) {
                        can_edit_poi[i] = cEditPoi[i].id+','+cEditPoi[i].name
                    }
                    np.bianjiPoi = can_edit_poi

                    var can_use_route = []
                    var cRoute = JSON.parse(res.data.Body.can_use_route)
                    for (var i = 0; i < cRoute.length; i++) {
                        can_use_route[i] = cRoute[i].id+','+cRoute[i].name
                    }
                    np.chooseLuxian = can_use_route

                    var can_edit_route = []
                    var cEditRoute = JSON.parse(res.data.Body.can_edit_route)
                    for (var i = 0; i < cEditRoute.length; i++) {
                        can_edit_route[i] = cEditRoute[i].id+','+cEditRoute[i].name
                    }
                    np.bianjiLuxian = can_edit_route

                    np.qudaoName = res.data.Body.name
                })
            },
            // 显示路线列表
            showluxian: function () {
                axios.post(host + '/route/v1/api/route/list', {
                    page: {
                        page_index: 1,
                        page_size: 100
                    },
                    server: server,
                    token: token
                }).then((res) => {
                    // console.log(res.data.Body)
                    np.luxian = res.data.Body.list
                })
            },
            // // 显示导游管理列表
            showdaoyou: function () {
                var that = this
                axios.post(host + '/route/v1/api/get/guide/list', {
                    page: {
                        page_index: 1,
                        page_size: 100
                    },
                    server: server,
                    token: token
                }).then((resp) => {
                    np.daoyou = resp.data.Body.list
                })
            },
            // // 显示所有渠道
            // showqudao: function () {
            //     axios.post(host + '/route/v1/api/channel/list', {
            //         page: {
            //             page_index: 1,
            //             page_size: 500
            //         },
            //         server: server,
            //         token: token
            //     }).then((res) => {
            //         np.qudao = res.data.Body.list
            //     })
            // },
            // 显示所有poi
            showPoilist: function () {
                axios.post(host + '/route/v1/api/poi/list', {
                    page: {
                        page_index: 1,
                        page_size: 1000
                    },
                    type: -1,
                    server: server,
                    token: token
                }).then((res) => {
                    np.Poilist = res.data.Body.list
                    // console.log("hahahah", res.data.Body.list)

                })
            },
            // // 显示对应id下边的渠道信息
            // showqudao: function () {
            //     axios.post(host + '/route/v1/api/channel/get', {
            //         id: parseInt(ids),
            //         server: server,
            //         token: token
            //     }).then((res) => {
            //         np.b_jingqu_name = res.data.Body.name
            //     })
            // },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },

            // 保存
            saves: function () {
                // console.log(np.chooseTouer)
                var chooseTouer = []
                var bianjiTouer = []
                var choosePoi = []
                var bianjiPoi = []
                var chooseLuxian = []
                var bianjiLuxian = []
                // 选择可用导游
                for (var i = 0; i < np.chooseTouer.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    chooseTouer.push({
                        id: parseInt(np.chooseTouer[i].split(',')[0]),
                        name: np.chooseTouer[i].split(',')[1]
                    })
                }
                // console.log("chooseTouer", chooseTouer)
                // 选择可编辑导游
                for (var i = 0; i < np.bianjiTouer.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiTouer.push({
                        id: parseInt(np.bianjiTouer[i].split(',')[0]),
                        name: np.bianjiTouer[i].split(',')[1]
                    })
                }
                // console.log("bianjiTouer", bianjiTouer)
                // 选择可用POi
                for (var i = 0; i < np.choosePoi.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    choosePoi.push({
                        id: parseInt(np.choosePoi[i].split(',')[0]),
                        name: np.choosePoi[i].split(',')[1]
                    })
                }
                // console.log("choosePoi", choosePoi)
                // 选择可编辑导游
                for (var i = 0; i < np.bianjiPoi.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiPoi.push({
                        id: parseInt(np.bianjiPoi[i].split(',')[0]),
                        name: np.bianjiPoi[i].split(',')[1]
                    })
                }
                // console.log("bianjiPoi", bianjiPoi)
                // 选择可用线路
                for (var i = 0; i < np.chooseLuxian.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    chooseLuxian.push({
                        id: parseInt(np.chooseLuxian[i].split(',')[0]),
                        name: np.chooseLuxian[i].split(',')[1]
                    })
                }
                // console.log("chooseLuxian", chooseLuxian)
                // 选择可编辑路线
                for (var i = 0; i < np.bianjiLuxian.length; i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiLuxian.push({
                        id: parseInt(np.bianjiLuxian[i].split(',')[0]),
                        name: np.bianjiLuxian[i].split(',')[1]
                    })
                }
                // console.log("bianjiLuxian", bianjiLuxian)
                axios.post(host + '/route/v1/api/channel/update', {
                    id: parseInt(ids),
                    can_edit_guide: bianjiTouer,
                    can_edit_poi: bianjiPoi,
                    can_edit_route: bianjiLuxian,
                    can_use_guide: chooseTouer,
                    can_use_poi: choosePoi,
                    can_use_route: chooseLuxian,
                    page_url: '..pages/index/index?channel=' + ids,
                    name: np.qudaoName,
                    server: server,
                    token: token
                }).then((res) => {
                    alert("修改成功")
                    window.history.go(-1)
                })
            },

        },
        mounted: function () {
            // this.showqudao();
            this.showPoilist();
            this.showdaoyou();
            this.showluxian();
            this.showFirMsgs();
        }
    })
}