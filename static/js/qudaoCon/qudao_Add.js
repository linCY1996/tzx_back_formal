// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    var token = location.search.replace('?token=', "")
    var np = new Vue({
        el: '#tall',
        data: {
            a_qudao_name: '', //添加渠道名称
            Poilist:[],  //显示所有poi
            qudao:[],   //显示所有渠道
            qudaoName:'',   //选择渠道id
            daoyou:[],  //导游列表
            luxian:[],   //路线列表
            chooseTouer:[],  //选择可用导游
            bianjiTouer:[],  //可编辑导游
            choosePoi:[],  //选择可用Poi
            bianjiPoi:[],  //可编辑Poi
            chooseLuxian:[],   //选择可用路线
            bianjiLuxian:[],   //可编辑路线
            chooseClass:0,   //选择回复类型
            mr_Text:'',   //1
            mr_Link:'',   //2
            mr_MsgTitle:'',  //3
            mr_MsgTalk:'',
            mr_Image:'',
            mr_ImageLink:'',  
            mr_mn_title:'',   //4
            mr_page:'',
            mr_mn_ImgsLink:'',
            DLat:'',   //新增定位lat
            DLon:'',   //新增定位lon
        },
        methods: {
            // 显示路线列表
            showluxian:function () {
                axios.post(host+'/route/v1/api/route/list',{
                    page:{
                        page_index:1,
                        page_size:100
                    },
                    server:server,
                    token:token
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
                    token:token
                }).then((resp) => {
                    np.daoyou = resp.data.Body.list
                })
            },
             // 显示所有渠道
            //  showqudao: function () {
            //     axios.post(host + '/route/v1/api/channel/list', {
            //         page: {
            //             page_index: 1,
            //             page_size: 50
            //         },
            //         server: server,
            //         token:token
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
                    token:token
                }).then((res) => {
                    np.Poilist = res.data.Body.list
                    // console.log("hahahah", res.data.Body.list)

                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 编辑
            bianji: function () {
                np.bianji_show = true
                np.add_show = false
            },
            // 添加
            add: function () {
                np.bianji_show = false
                np.add_show = true
            },
            // 添加
            posts: function () {
                var chooseTouer = []
                var bianjiTouer = []
                var choosePoi = []
                var bianjiPoi = []
                var chooseLuxian = []
                var bianjiLuxian = []
                // 选择可用导游
                for(var i = 0;i<np.chooseTouer.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    chooseTouer.push({
                        id:parseInt(np.chooseTouer[i].split(',')[0]),
                        name:np.chooseTouer[i].split(',')[1]
                    })
                }
                // console.log("chooseTouer",chooseTouer)
                // 选择可编辑导游
                for(var i = 0;i<np.bianjiTouer.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiTouer.push({
                        id:parseInt(np.bianjiTouer[i].split(',')[0]),
                        name:np.bianjiTouer[i].split(',')[1]
                    })
                }
                // console.log("bianjiTouer",bianjiTouer)
                // 选择可用POi
                for(var i = 0;i<np.choosePoi.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    choosePoi.push({
                        id:parseInt(np.choosePoi[i].split(',')[0]),
                        name:np.choosePoi[i].split(',')[1]
                    })
                }
                // 选择可编辑导游
                for(var i = 0;i<np.bianjiPoi.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiPoi.push({
                        id:parseInt(np.bianjiPoi[i].split(',')[0]),
                        name:np.bianjiPoi[i].split(',')[1]
                    })
                }
                // 选择可用线路
                for(var i = 0;i<np.chooseLuxian.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    chooseLuxian.push({
                        id:parseInt(np.chooseLuxian[i].split(',')[0]),
                        name:np.chooseLuxian[i].split(',')[1]
                    })
                }
                // console.log("chooseLuxian",chooseLuxian)
                // 选择可编辑路线
                for(var i = 0;i<np.bianjiLuxian.length;i++) {
                    // poi_id[i] = np.checkedNames[i].split(',')[0]
                    bianjiLuxian.push({
                        id:parseInt(np.bianjiLuxian[i].split(',')[0]),
                        name:np.bianjiLuxian[i].split(',')[1]
                    })
                }
                // 默认回复
                var reply = ''
                switch(np.chooseClass) {
                    case "text":
                        reply = '{"msgtype":"text","text":{"content":"'+np.mr_Text+'"}}'
                        break
                    case "image":
                        reply = '{"msgtype":"image","image":{"media_id":"'+np.mr_Link+'"}}'
                        break
                    case "link":
                        reply = '{"msgtype":"link","link":{"title":"'+np.mr_MsgTitle+'","description":"'+np.mr_MsgTalk+'","url":"'+np.mr_Image+'","thumb_url":"'+np.mr_ImageLink+'"}}'
                        break
                    case "miniprogrampage":
                        reply = '{"msgtype":"miniprogrampage","miniprogrampage":{"title":"'+np.mr_mn_title+'","pagepath":"'+np.mr_page+'","thumb_media_id":"'+np.mr_mn_ImgsLink+'"}}'
                        break
                }
                var lat = '{"lon": '+np.DLon+',"lat": '+np.DLat+'}'
                axios.post(host + '/route/v1/api/channel/create', {
                    can_edit_guide:bianjiTouer,
                    can_edit_poi:bianjiPoi,
                    can_edit_route:bianjiLuxian,
                    can_use_guide:chooseTouer,
                    can_use_poi:choosePoi,
                    can_use_route:chooseLuxian,
                    page_url:'..pages/index/index?channel='+np.qudao_Id,
                    name: np.qudaoName,
                    server: server,
                    reply:reply,
                    token:token,
                    local:lat
                }).then((res) => {
                    alert("添加成功")
                    window.history.go(-1)
                })
            },
        },
        mounted: function () {
            // this.showqudao();
            this.showPoilist();
            this.showdaoyou();
            this.showluxian();
        }
    })
}