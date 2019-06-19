// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    // var ids = location.search.replace('?id=', "")
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('id')    //管理员id
    var token = GetParameters('token')
    var ue = UE.getEditor('editor')   //编辑故事详情
    var np = new Vue({
        el: '#tall',
        data: {
            qudao: [],   //渠道信息
            daoyouname: [],   //导游名字
            checkedNames: [],   //选择的Point
            Poilist: [],
            yj_choose: 7,   //一级选项卡
            route_id: '',  //跳转的routeid
            Poilist: [],  //对应routeid下得poi列表
            Poi_choose: '',  //选择得Poi得id
            Name: '',   //行程名字
            jump_url: '',  //跳转
            jump_type: 2,  //跳转类型
            routeName: [],   //渠道下所有routeName
            qudao_Id: '',  //渠道id
            qudao_Name: '',  //渠道名字
            xianlu_Id: '', //线路id
            xianlu_Name: '', //线路名称
            City: '',  //城市
            dNames: '',   //导游名字1
            xianlu_Poi: '',  //线路POI
            Price: '',  //价格
            xianlu_Label: '',   //线路标签
            xiangq_Banner: '',  //详情页banner
            zhifu_Img: '', //支付页图片
            xiangqing_ShowImg: '',  //详情页展示图
            xianlu_Icon: '',   //线路盖章图
            xingcheng_End: '',   //行程结束语
            dujia_InImg: '',   //独家回忆入口图
            dujia_fengImg: '',   //独家回忆封面图
            // *********新增
            viewCount:'',  //热度值
            dujia_word: '',  //独家回忆引导文案
            dujia_showtitle: '',  //独家回忆分享标题
            dujia_showPage: '',  //独家回忆分享图片
            dujia_btnmsg: '马上体验',   //体验按钮文案
            dujia_Go_imgs: '',
            dujia_Go_audio: '',
            dujia_end_audio: '',  //行程结束页配置--音频
            dujia_end_img: '',  //行程结束页配置--图片
            dujia_end_Class: -1,  //行程结束页配置--跳转类型
            dujia_end_link: '',  //行程结束页配置--跳转链接
            dujia_Mapbg: '',  //地图背景
            dujia_niceroad: '', //推荐路线
            dujia_lat_leftUp_lon: '',  //地图坐标--左上  lon
            dujia_lat_leftUp_lat: '',  //地图坐标--左上  lat
            dujia_lat_rightUp_lon: '',  //地图坐标--右上 lon
            dujia_lat_rightUp_lat: '',  //地图坐标--右上 lat
            dujia_lat_rightDown_lon: '',  //地图坐标--右下  lon
            dujia_lat_rightDown_lat: '',  //地图坐标--右下  lat
            dujia_lat_leftDown_lon: '',  //地图坐标--左下  lon
            dujia_lat_leftDown_lat: '',  //地图坐标--左下  lat
            // 新增
            is_cur_location:'',   //是否显示当前位置


        },
        methods: {
            bianjishow: function () {
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(ids),
                    server: server,
                    token:token
                }).then((res) => {
                    console.log(res.data.Body)
                    np.qudao_Id = res.data.Body.ChannelId
                    np.qudao_Name = res.data.Body.ChannelName
                    np.xianlu_Id = res.data.Body.Id
                    np.xianlu_Name = res.data.Body.Name
                    np.City = res.data.Body.City
                    np.dNames = res.data.Body.guide_name + "," + res.data.Body.GuideId
                    // console.log("daoyou",np.dNames)
                    var cName = res.data.Body.poi_ids
                    console.log("poi=",cName)
                    var chName = []
                    for (var i = 0; i < cName.length; i++) {
                        chName[i] = cName[i].poi_id + ',' + cName[i].poi_name
                    }
                    np.checkedNames = chName
                    np.viewCount = res.data.Body.ViewCount
                    np.Price = res.data.Body.Price
                    np.xianlu_Label = res.data.Body.Label.substring(1,res.data.Body.Label.length-1)
                    np.zhifu_Img = res.data.Body.pay_url
                    var xiangzhan = JSON.stringify(res.data.Body.jump_url)
                    np.xiangqing_ShowImg = xiangzhan.substring(1,xiangzhan.length-1)  ////////////////////// 详情页展示图：根据route@tzx_route表中的id关联img_jump@tzx_route表中的route_id，查询img_jump@tzx_route表中type为空的img_url
                    // console.log("详情页展示图",np.xiangqing_ShowImg)
                    var honor = res.data.Body.Honor
                    np.xianlu_Icon = honor.substring(1,honor.length-1)
                    np.xingcheng_End = res.data.Body.end_words
                    np.dujia_InImg = res.data.Body.MemInlet
                    np.dujia_fengImg = res.data.Body.MemCover
                    np.dujia_word = res.data.Body.MemMsg
                    np.dujia_showtitle = res.data.Body.MemTitle
                    var dujia_IMGs = res.data.Body.MemImgs
                    np.dujia_showPage = dujia_IMGs.substring(1,dujia_IMGs.length-1) /// 
                    np.dujia_btnmsg = res.data.Body.PriceText
                    var Go_Start = JSON.parse(res.data.Body.Start)
                    // console.log(Go_Start)
                    np.dujia_Go_imgs = Go_Start.image
                    np.dujia_Go_audio = Go_Start.audio

                    var finish = JSON.parse(res.data.Body.Finish)
                    // console.log(finish)
                    np.dujia_end_audio = finish.audio
                    np.dujia_end_img = finish.image
                    np.jump_type = finish.type
                    np.jump_url = finish.jump
                    var Entity = JSON.parse(res.data.Body.Entity)
                    // console.log(Entity)
                    np.dujia_Mapbg = Entity.bg
                    np.dujia_niceroad = Entity.url

                    np.dujia_lat_leftUp_lon = Entity.rect[0].lon
                    np.dujia_lat_leftUp_lat = Entity.rect[0].lat
                    np.dujia_lat_rightUp_lon = Entity.rect[1].lon
                    np.dujia_lat_rightUp_lat = Entity.rect[1].lat
                    np.dujia_lat_rightDown_lon = Entity.rect[2].lon
                    np.dujia_lat_rightDown_lat = Entity.rect[2].lat
                    np.dujia_lat_leftDown_lon = Entity.rect[3].lon
                    np.dujia_lat_leftDown_lat = Entity.rect[3].lat
                    np.is_cur_location = res.data.Body.show_place
                    // 新增    详情页富文本  /   /////////////////
                    var detail_multi = res.data.Body.rich
                    ue.setContent(detail_multi);
                    // ue.setContent();   //显示富文本信息
                    // ue.getContent();    //获取富文本信息

                    // 获取所有的routeName
                    axios.post(host + '/route/v1/api/channel/routeList', {
                        channel_id: parseInt(np.qudao_Id),
                        server: server,
                        token:token
                    }).then((res) => {
                        //   console.log("sd==",res.data.Body)
                        np.routeName = res.data.Body
                    })
                })
            },
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
            // 显示所有渠道
            showqudao: function () {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: 1,
                        page_size: 50
                    },
                    server: server,
                    token:token
                }).then((res) => {
                    console.log("=",res.data.Body.list)
                    np.qudao = res.data.Body.list
                })
            },
            // 显示所有导游名字
            showdaoyouname: function () {
                // var that = this
                axios.post(host + '/route/v1/api/get/guide/list', {
                    page: {
                        page_index: 1,
                        page_size: 1000
                    },
                    server: server,
                    token:token

                }).then((resp) => {
                    np.daoyouname = resp.data.Body.list
                })
            },
            // 保存
            saves: function () {
                // console.log("==详情==",'['+np.xiangqing_ShowImg+']')
                if (np.jump_type == 0) {
                    var current = -1
                    for (var i = 0; i < np.Poilist.length; i++) {
                        if (np.Poilist[i].poi_id == np.Poi_choose) {
                            current = i
                        }
                    }
                    if (np.yj_choose == 0) {
                        np.jump_url = '../detail/detail?routeid=' + np.route_id
                    } else if (np.yj_choose == 1) {
                        np.jump_url = '../advice/advice'
                    } else if (np.yj_choose == 3) {  ///////name    poi的名字
                        np.jump_url = '../routekabao/routekabao?routeid=' + np.route_id + '&name=' + np.Poilist[current].poi_name
                    } else if (np.yj_choose == 6) {
                        np.jump_url = '../listshowroute/listshowroute?routeid=' + np.route_id
                    } else if (np.yj_choose == 9) {  ///poiid   index(表示第几个poi，从0开始)
                        np.jump_url = '../poidetail/poidetail?poiid=' + np.Poi_choose + '&index=' + current
                    } else if (np.yj_choose == 10) {
                        np.jump_url = '../travelmap/travelmap?routeid=' + np.route_id
                    } else if (np.yj_choose == 8) {
                        np.jump_url = '../videodetail/videodetail?travelid=' + np.route_id + '&share=no'
                    }
                }
                if (np.jump_type == 2) {
                    var current = -1
                    for (var i = 0; i < np.Poilist.length; i++) {
                        if (np.Poilist[i].poi_id == np.Poi_choose) {
                            current = i
                        }
                    }
                    console.log("current=", current)
                    if (np.yj_choose == 2) {   //指定个人卡包   ///////current  第几个poi
                        np.jump_url = '../cardpackage/cardpackage?travelid=' + np.route_id + '&name=' + np.Name + '&current=' + current
                    } else if (np.yj_choose == 4) {
                        np.jump_url = '../journey/journey'
                    } else if (np.yj_choose == 5) {
                        np.jump_url = '../listshow/listshow?travelid=' + np.route_id
                    } else if (np.yj_choose == 7) {
                        np.jump_url = '../memory/memory'
                    }
                }
                var dname = np.dNames.split(',')
                var imgsOne = 'http://imgs1.tuzuu.com/12_zhifu.jpg'
                var imgsAll = '["' + imgsOne + '","' + np.zhifu_Img + '","' + np.dujia_InImg + '","' + np.dujia_fengImg + '"]'   //拼接imgs
                var Start = '{"image":"' + np.dujia_Go_imgs + '","audio":"' + np.dujia_Go_audio + '"}'
                var Finish = '{"image":"' + np.dujia_end_img + '","audio":"' + np.dujia_end_audio + '","type":' + np.jump_type + ',"jump":"' + np.jump_url + '"}'
                var Entity = '{ "url": "' + np.dujia_niceroad + '", "bg": "' + np.dujia_Mapbg + '", "rect": [ { "lon":' + np.dujia_lat_leftUp_lon + ', "lat": ' + np.dujia_lat_leftUp_lat + ' }, { "lon": ' + np.dujia_lat_rightUp_lon + ', "lat": ' + np.dujia_lat_rightUp_lat + ' }, { "lon": ' + np.dujia_lat_rightDown_lon + ', "lat": ' + np.dujia_lat_rightDown_lat + ' }, { "lon": ' + np.dujia_lat_leftDown_lon + ', "lat": ' + np.dujia_lat_leftDown_lat + ' } ] }'
                var poi_ids = []
                for (var i = 0; i < np.checkedNames.length; i++) {
                    poi_ids.push({
                        poi_id: parseInt(np.checkedNames[i].split(',')[0]),
                        poi_name: np.checkedNames[i].split(',')[1]
                    })
                }

                // 更新独家回忆展示图
                var dujia_Imgs = '["' + np.dujia_InImg + '","' + np.dujia_fengImg + '"]'
                if (dujia_Imgs == '') {
                    alert("不能传入空字段")
                } else {
                    axios.post(host + '/route/v1/api/memImgs/update', {
                        banner: JSON.parse(dujia_Imgs),
                        route_id: parseInt(ids),
                        server: server
                    }).then((res) => {})
                }
                axios.post(host + '/route/v1/api/route/update', {
                    channelId: parseInt(np.qudao_Id),   //渠道id
                    id: parseInt(ids),
                    name: np.xianlu_Name,
                    city: np.City,
                    guide_name: dname[0],    //导游名字
                    guideId: parseInt(dname[1]),
                    poi_ids: poi_ids,  //线路POi   ////[]
                    price: parseInt(np.Price),
                    label: '['+np.xianlu_Label+']',
                    honor: '['+np.xianlu_Icon+']',
                    imgs: imgsAll,
                    memInlet:np.dujia_InImg,    //独家回忆入口图
                    memCover:np.dujia_fengImg,   //独家回忆封面图
                    pay_url:np.zhifu_Img,   //支付页图片
                    viewCount:parseInt(np.viewCount),
                    memMsg: np.dujia_word,
                    priceText: np.dujia_btnmsg,
                    memTitle: np.dujia_showtitle,
                    memImgs: '[' + np.dujia_showPage + ']',
                    jump_url:[],
                    start: Start,
                    finish: Finish,
                    entity: Entity,
                    show_place:eval(np.is_cur_location),
                    server: server,
                    rich:ue.getContent(),   //详情页富文本
                    token:token
                }).then((res) => {
                    if(res.data.Body == '没有编辑权限') {
                        alert("没有编辑权限，不能编辑信息")
                    }else {
                        alert("保存成功")
                    }
                    window.history.go(-1)
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
                np.bianji_show = false,
                    np.add_show = true
            }
        },
        mounted: function () {
            this.bianjishow();
            this.showqudao();
            this.showdaoyouname();
            this.showPoilist();
            // this.showRouteName();
        },
        watch: {
            route_id: function () {
                // console.log("___", np.route_id)
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(np.route_id),
                    server: server,
                    token:token
                }).then((res) => {
                    // console.log("=====", res.data.Body)
                    np.Poilist = res.data.Body.poi_ids
                    np.Name = res.data.Body.Name
                })
            }
        }
    })
}