// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var token = GetParameters('token')
    var first_page_show = GetParameters('fshow')
    var xiangqing_page_show = GetParameters('xshow')
    var channel_id = GetParameters('channel_id')
    var E = window.wangEditor
    var ue2 = new E('#editor')
    var ue1 = new E('#editor1')
    var ue4 = new E('#editor4')   //默认对话
    ue1.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ]
    ue1.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
    // 关闭粘贴样式的过滤
    ue1.customConfig.pasteFilterStyle = false
    // 忽略粘贴内容中的图片
    ue1.customConfig.pasteIgnoreImg = true
    // 自定义处理粘贴的文本内容
    ue1.customConfig.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        return content
    }
    ////////
    ue2.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ]
    ue2.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
    // 关闭粘贴样式的过滤
    ue2.customConfig.pasteFilterStyle = false
    // 忽略粘贴内容中的图片
    ue2.customConfig.pasteIgnoreImg = true
    // 自定义处理粘贴的文本内容
    ue2.customConfig.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        return content
    }
    ////////
    ue4.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ]
    ue4.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
    // 关闭粘贴样式的过滤
    ue4.customConfig.pasteFilterStyle = false
    // 忽略粘贴内容中的图片
    ue4.customConfig.pasteIgnoreImg = true
    // 自定义处理粘贴的文本内容
    ue4.customConfig.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        return content
    }
    var np = new Vue({
        el: '#tall',
        data: {

            // 添加
            a_Name: '',   //POI名字
            a_Type: 0,   //POI类型
            a_Dubbing_content: '',   //默认对话
            a_Dubbing_video: '',  //默认对话语音
            a_Image: '',   //poi头像
            a_Imgs: [{ imgs: '', index: 0 }], //poi介绍图
            btn_Count: 0,   //点击添加poi介绍图的次数
            delIndex: -1,//删除poi介绍图的下标
            a_Introduction: '',     //详情页简介
            a_Label: '',  //poi标签
            a_Lat: '',   //维度
            a_Lon: '',   //经度
            a_PlayTime: '',   //建议游玩时间
            a_Price: '', //费用
            a_Region: '',  //任务触发范围
            a_ShopHours: '', //营业时间
            a_MultiIntro: '',  //poi弹窗介绍
            a_Poi_One_link: '',   //Poi图标-未游玩
            a_Poi_One_width: '',   //Poi图标-未游玩宽
            a_Poi_One_height: '',  //Poi图标-未游玩高
            a_Poi_One_left: '',   //Poi图标-未游玩左
            a_Poi_One_top: '',   //Poi图标-未游玩上
            a_Poi_Two_link: '',   //Poi图标-已游玩
            a_Poi_Two_width: '',   //Poi图标-已游玩宽
            a_Poi_Two_height: '',  //Poi图标-已游玩高
            a_Poi_Two_left: '',   //Poi图标-已游玩左
            a_Poi_Two_top: '',   //Poi图标-已游玩上
            a_manual: '',  //是否可以手动触发
            // 新增
            map_scale: "1.00",    //地图缩放比例
            a_cardtitle: '',   //Poi故事标题
            a_cardImg1: '',  //poi故事卡片-未获得
            a_cardImg2: '',   //故事卡片-已获得
            a_cardMusic: '',   //音频链接
            a_cardMusicLen: '',  //音频时长
            a_cardDetail: '',  //故事正文
            poiClass: 1,   ///poi类型   1.有故事有任务   2.有故事无任务   4.无故事无任务
            showClass2: true,   //将2隐藏掉
            showClass4: true,   //将4隐藏掉
            showClass8: false,   //将8隐藏掉
            confirmCD: false,   //控制监听挂在富文本ue1
            first_page_show: false, //首页信息显示
            xiangqing_page_show: false, //详情信息显示
            xiangqing_page_show_bianji: false,  //编辑POI任务
            mengban: false,   //跳转编辑POI任务蒙版
            Id: '',//新增POI得主键id
            // 场景poi
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
            Chan: [],   //存放所有的POi
            pid: '',   //存放上级poiId
            closePoiGuanlian:true,   ///当选择上级poi之后，隐藏  建议游玩时间/费用/营业时间
            is_cur_location:'',  //是否显示当前位置
            show_cur_location:false,  //当为class = 8时显示
        },
        methods: {
            showmengben: function () {
                var that = this
                that.mengban = true
                if (first_page_show == null) {
                    that.first_page_show = true
                } else {
                    that.first_page_show = eval(first_page_show)
                }
                that.xiangqing_page_show = eval(xiangqing_page_show)
            },
            // 预加载富文本
            showFwb: function () {
                ue1.create()
                ue2.create()
                ue4.create()
            },
            showQuDao: function () {
                var chanId = []
                axios.post(host + '/route/v1/api/channel/get', {
                    id: parseInt(channel_id),
                    server: server,
                    token: token
                }).then((res) => {
                    np.pid = 0
                    var poiid = JSON.parse(res.data.Body.can_use_poi)
                    for (var j = 0; j < poiid.length; j++) {
                        if(poiid[j].class == 8) {
                            chanId.push(poiid[j])
                        }
                    }
                    var Chanel = '{"id":0,"name":"无","class":0}'
                    var Chanels = JSON.parse(Chanel)
                    chanId.push(Chanels)
                    np.Chan = chanId.reverse()
                })
            },
            // 添加poi介绍图
            AddImgs: function () {
                np.btn_Count += 1
                var count = np.btn_Count
                np.a_Imgs.splice(20, 0, { imgs: '', index: count })
            },
            // 删除poi介绍图
            delImgs: function (e) {
                for (var i = 0; i < np.a_Imgs.length; i++) {
                    if (e == np.a_Imgs[i].index) {
                        np.delIndex = i
                    }
                }
                np.a_Imgs.splice(np.delIndex, 1)
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 添加
            posts: function () {
                // console.log(token)
                if(np.poiClass == 1 || np.poiClass == 2 || np.poiClass == 4) {
                    np.a_PlayTime == '20'
                    np.a_Price == '免费'
                    np.a_ShopHours == '全天'
                }
                var s = ue4.txt.html()
                var mr = s.replace(/\"/g, '\\"')
                var mrDuihua = mr.replace(/\\&quot;/g, '')
                var add_dubbing = '[{"text":"' + mrDuihua + '","audio":"' + np.a_Dubbing_video + '"}]'
                if (np.a_Poi_One_width == '') {
                    np.a_Poi_One_width = 0
                }
                if (np.a_Poi_One_height == '') {
                    np.a_Poi_One_height = 0
                }
                if (np.a_Poi_One_left == '') {
                    np.a_Poi_One_left = 0
                }
                if (np.a_Poi_One_top == '') {
                    np.a_Poi_One_top = 0
                }
                if (np.a_Poi_Two_width == '') {
                    np.a_Poi_Two_width = 0
                }
                if (np.a_Poi_Two_height == '') {
                    np.a_Poi_Two_height = 0
                }
                if (np.a_Poi_Two_left == '') {
                    np.a_Poi_Two_left = 0
                }
                if (np.a_Poi_Two_top == '') {
                    np.a_Poi_Two_top = 0
                }
                var add_mapArr = '[ { "url": "' + np.a_Poi_One_link + '", "w": ' + np.a_Poi_One_width + ', "h": ' + np.a_Poi_One_height + ', "l": ' + np.a_Poi_One_left + ', "t": ' + np.a_Poi_One_top + '}, { "url": "' + np.a_Poi_Two_link + '", "w": ' + np.a_Poi_Two_width + ', "h": ' + np.a_Poi_Two_height + ', "l": ' + np.a_Poi_Two_left + ', "t": ' + np.a_Poi_Two_top + '} ]'
                var add_cardImg = '["' + np.a_cardImg1 + '","' + np.a_cardImg2 + '"]'

                if (np.a_cardMusicLen == '') {
                    np.a_cardMusicLen = 0
                }
                var add_cardMusic = '{"ln":' + np.a_cardMusicLen + ',"url":"' + np.a_cardMusic + '"}'
                var multiIntro = '[{"content":"' + np.a_MultiIntro + '","br":0,"color":"","bold":0}]'
                // var a_Imgs = np.a_Imgs.split(',')
                // poi介绍图的操作
                var allImgs = ''
                for (var j = 0; j < np.a_Imgs.length; j++) {
                    allImgs += np.a_Imgs[j].imgs + ','
                }
                var jianqieIMgs = allImgs.substring(0, allImgs.length - 1)
                var Entity = '{ "url": "' + np.dujia_niceroad + '", "bg": "' + np.dujia_Mapbg + '", "rect": [ { "lon":' + np.dujia_lat_leftUp_lon + ', "lat": ' + np.dujia_lat_leftUp_lat + ' }, { "lon": ' + np.dujia_lat_rightUp_lon + ', "lat": ' + np.dujia_lat_rightUp_lat + ' }, { "lon": ' + np.dujia_lat_rightDown_lon + ', "lat": ' + np.dujia_lat_rightDown_lat + ' }, { "lon": ' + np.dujia_lat_leftDown_lon + ', "lat": ' + np.dujia_lat_leftDown_lat + ' } ] }'
                if (np.poiClass == 1) {
                    if (ue2.txt.html() == '' || np.a_Poi_One_link == '' || np.a_Label == '' || np.a_Lat == '' || np.a_Lon == '') {
                        alert('信息填写不完整,无法提交')
                    } else {
                        axios.post(host + '/route/v1/api/poi/create', {
                            name: np.a_Name,
                            type: parseInt(np.a_Type),
                            dubbing: add_dubbing,
                            image: np.a_Image,
                            imgs: JSON.stringify(jianqieIMgs.split(',')),
                            introduction: ue2.txt.html(),
                            label: np.a_Label,
                            lat: np.a_Lat,
                            lon: np.a_Lon,
                            playTime: np.a_PlayTime,
                            price: np.a_Price,
                            region: parseInt(np.a_Region),
                            shopHours: np.a_ShopHours,
                            multiIntro: multiIntro,
                            mapArr: add_mapArr,
                            cardTitle: np.a_cardtitle,
                            cardImg: add_cardImg,
                            cardMusic: add_cardMusic,
                            cardDetail: ue1.txt.html(),
                            server: server,
                            manual: eval(np.a_manual),
                            scale: parseFloat(np.map_scale),
                            token: token,
                            class: parseInt(1),
                            entity: Entity,
                            pid: parseInt(np.pid),
                            show_place:false
                        }).then((res) => {
                            alert("添加成功")
                            np.Id = res.data.Body.Id
                            window.location.href = '/poiadd3?id=' + np.Id + '&token=' + token
                        })
                    }
                } else if (np.poiClass == 2 || np.poiClass == 4) {
                    // if(ue2.txt.html() == '' || np.a_Poi_One_left == '' || np.a_Poi_One_top == '' || np.a_Poi_One_height == '' || np.a_Poi_One_width == '' || np.a_Poi_Two_height == '' || np.a_Poi_Two_left == '' || np.a_Poi_Two_top == '' || np.a_Poi_Two_width == ''){
                        axios.post(host + '/route/v1/api/poi/create', {
                            name: np.a_Name,
                            type: parseInt(np.a_Type),
                            dubbing: add_dubbing,
                            image: np.a_Image,
                            imgs: JSON.stringify(jianqieIMgs.split(',')),
                            introduction: ue2.txt.html(),
                            label: np.a_Label,
                            lat: np.a_Lat,
                            lon: np.a_Lon,
                            playTime: np.a_PlayTime,
                            price: np.a_Price,
                            region: parseInt(np.a_Region),
                            shopHours: np.a_ShopHours,
                            multiIntro: multiIntro,
                            mapArr: add_mapArr,
                            cardTitle: np.a_cardtitle,
                            cardImg: add_cardImg,
                            cardMusic: add_cardMusic,
                            cardDetail: ue1.txt.html(),
                            server: server,
                            manual: eval(np.a_manual),
                            scale: parseFloat(np.map_scale),
                            token: token,
                            class: parseInt(np.poiClass),
                            entity: Entity,
                            pid: parseInt(np.pid),
                            show_place:false
                        }).then((res) => {
                            alert("添加成功")
                            np.Id = res.data.Body.Id
                            window.history.go(-1)
                            // window.location.href = '/poiadd3?id=' + id + '&token=' + token
                        })
                    // }
                } else if (np.poiClass == 8) {
                    // var Entity = '{ "url": "' + np.dujia_niceroad + '", "bg": "' + np.dujia_Mapbg + '", "rect": [ { "lon":' + np.dujia_lat_leftUp_lon + ', "lat": ' + np.dujia_lat_leftUp_lat + ' }, { "lon": ' + np.dujia_lat_rightUp_lon + ', "lat": ' + np.dujia_lat_rightUp_lat + ' }, { "lon": ' + np.dujia_lat_rightDown_lon + ', "lat": ' + np.dujia_lat_rightDown_lat + ' }, { "lon": ' + np.dujia_lat_leftDown_lon + ', "lat": ' + np.dujia_lat_leftDown_lat + ' } ] }'
                    if (ue2.txt.html() == '' || np.a_Label == '' || np.a_Lat == '' || np.a_Lon == '') {
                        alert('信息填写不完整,无法提交')
                    } else {
                        axios.post(host + '/route/v1/api/poi/create', {
                            name: np.a_Name,
                            type: parseInt(np.a_Type),
                            dubbing: add_dubbing,
                            image: np.a_Image,
                            imgs: JSON.stringify(jianqieIMgs.split(',')),
                            introduction: ue2.txt.html(),
                            label: np.a_Label,
                            lat: np.a_Lat,
                            lon: np.a_Lon,
                            playTime: np.a_PlayTime,
                            price: np.a_Price,
                            region: parseInt(np.a_Region),
                            shopHours: np.a_ShopHours,
                            multiIntro: multiIntro,
                            mapArr: add_mapArr,
                            cardTitle: np.a_cardtitle,
                            cardImg: add_cardImg,
                            cardMusic: add_cardMusic,
                            cardDetail: ue1.txt.html(),
                            server: server,
                            manual: eval(np.a_manual),
                            scale: parseFloat(np.map_scale),
                            token: token,
                            class: parseInt(8),
                            entity: Entity,
                            pid: parseInt(np.pid),
                            show_place:eval(np.is_cur_location)
                        }).then((res) => {
                            // console.log(res.data.Body)
                            alert("添加成功")
                            np.Id = res.data.Body.Id
                            window.history.go(-1)
                            // window.location.href = '/poiadd3?id=' + id + '&token=' + token
                        })
                    }
                }
            },
            GotoTask:function () {
               // console.log(token)
               var s = ue4.txt.html()
               var mr = s.replace(/\"/g, '\\"')
               var mrDuihua = mr.replace(/\\&quot;/g, '')
               var add_dubbing = '[{"text":"' + mrDuihua + '","audio":"' + np.a_Dubbing_video + '"}]'
               if (np.a_Poi_One_width == '') {
                   np.a_Poi_One_width = 0
               }
               if (np.a_Poi_One_height == '') {
                   np.a_Poi_One_height = 0
               }
               if (np.a_Poi_One_left == '') {
                   np.a_Poi_One_left = 0
               }
               if (np.a_Poi_One_top == '') {
                   np.a_Poi_One_top = 0
               }
               if (np.a_Poi_Two_width == '') {
                   np.a_Poi_Two_width = 0
               }
               if (np.a_Poi_Two_height == '') {
                   np.a_Poi_Two_height = 0
               }
               if (np.a_Poi_Two_left == '') {
                   np.a_Poi_Two_left = 0
               }
               if (np.a_Poi_Two_top == '') {
                   np.a_Poi_Two_top = 0
               }
               var add_mapArr = '[ { "url": "' + np.a_Poi_One_link + '", "w": ' + np.a_Poi_One_width + ', "h": ' + np.a_Poi_One_height + ', "l": ' + np.a_Poi_One_left + ', "t": ' + np.a_Poi_One_top + '}, { "url": "' + np.a_Poi_Two_link + '", "w": ' + np.a_Poi_Two_width + ', "h": ' + np.a_Poi_Two_height + ', "l": ' + np.a_Poi_Two_left + ', "t": ' + np.a_Poi_Two_top + '} ]'
               var add_cardImg = '["' + np.a_cardImg1 + '","' + np.a_cardImg2 + '"]'

               if (np.a_cardMusicLen == '') {
                   np.a_cardMusicLen = 0
               }
               var add_cardMusic = '{"ln":' + np.a_cardMusicLen + ',"url":"' + np.a_cardMusic + '"}'
               var multiIntro = '[{"content":"' + np.a_MultiIntro + '","br":0,"color":"","bold":0}]'
               // var a_Imgs = np.a_Imgs.split(',')
               // poi介绍图的操作
               var allImgs = ''
               for (var j = 0; j < np.a_Imgs.length; j++) {
                   allImgs += np.a_Imgs[j].imgs + ','
               }
               var jianqieIMgs = allImgs.substring(0, allImgs.length - 1)
               var Entitys = '{ "url": "' + np.dujia_niceroad + '", "bg": "' + np.dujia_Mapbg + '", "rect": [ { "lon":' + np.dujia_lat_leftUp_lon + ', "lat": ' + np.dujia_lat_leftUp_lat + ' }, { "lon": ' + np.dujia_lat_rightUp_lon + ', "lat": ' + np.dujia_lat_rightUp_lat + ' }, { "lon": ' + np.dujia_lat_rightDown_lon + ', "lat": ' + np.dujia_lat_rightDown_lat + ' }, { "lon": ' + np.dujia_lat_leftDown_lon + ', "lat": ' + np.dujia_lat_leftDown_lat + ' } ] }'
                if (np.a_Lat == '' || np.a_Lon == '') {
                    alert('信息填写不完整,无法提交')
                } else {
                    axios.post(host + '/route/v1/api/poi/create', {
                        name: np.a_Name,
                        type: parseInt(np.a_Type),
                        dubbing: add_dubbing,
                        image: np.a_Image,
                        imgs: JSON.stringify(jianqieIMgs.split(',')),
                        introduction: ue2.txt.html(),
                        label: np.a_Label,
                        lat: np.a_Lat,
                        lon: np.a_Lon,
                        playTime: np.a_PlayTime,
                        price: np.a_Price,
                        region: parseInt(np.a_Region),
                        shopHours: np.a_ShopHours,
                        multiIntro: multiIntro,
                        mapArr: add_mapArr,
                        cardTitle: np.a_cardtitle,
                        cardImg: add_cardImg,
                        cardMusic: add_cardMusic,
                        cardDetail: ue1.txt.html(),
                        server: server,
                        manual: eval(np.a_manual),
                        scale: parseFloat(np.map_scale),
                        token: token,
                        class: parseInt(1),
                        entity: Entitys,
                        pid: parseInt(np.pid),
                        show_place:false
                    }).then((res) => {
                        alert("添加成功")
                        np.Id = res.data.Body.Id
                        window.location.href = '/poiadd3?id=' + np.Id + '&token=' + token+'&pid='+np.pid
                    })
                }
            },
            // 首页信息显示
            shou_show: function () {
                np.first_page_show = true
                np.xiangqing_page_show = false
                np.xiangqing_page_show_bianji = false
            },
            detail_show: function () {
                if (!np.showClass4 || np.pid != 0) {
                    alert("该类型不需要编辑此页面")
                } else {
                    np.first_page_show = false
                    np.xiangqing_page_show = true
                    np.xiangqing_page_show_bianji = false
                }
            },
            bian_show: function () {
                if (np.poiClass == 1) {
                    // np.mengban = true
                    if (np.Id == '') {
                        alert("需要先将POI编辑完成提交才可编辑Task任务")
                    } else {
                        np.first_page_show = false
                        np.xiangqing_page_show = false
                        np.xiangqing_page_show_bianji = true
                        window.location.href = '/poiadd3?id=' + np.Id + '&token=' + token
                    }
                } else {
                    alert("该类型不需要编辑此页面")
                }
            }
        },
        mounted: function () {
            this.showQuDao()    
            this.showmengben()
            this.showFwb()
        },
        watch: {
            poiClass: function () {
                if (np.poiClass == 2) {
                    np.showClass4 = true
                    np.showClass2 = false
                    np.confirmCD = true
                    np.showClass8 = false
                    np.show_cur_location = false
                    if(np.pid != 0) {
                        np.closePoiGuanlian = false
                    }
                } else if (np.poiClass == 4) {
                    np.showClass2 = true
                    np.showClass4 = false
                    np.confirmCD = true
                    np.showClass8 = false
                    np.show_cur_location = false
                    if(np.pid != 0) {
                        np.closePoiGuanlian = false
                    }
                } else if (np.poiClass == 1 && np.confirmCD == true) {
                    np.showClass2 = true
                    np.showClass4 = true
                    np.showClass8 = false
                    np.show_cur_location = false
                    if(np.pid != 0) {
                        np.closePoiGuanlian = false
                    }
                } else if (np.poiClass == 8) {
                    np.showClass2 = true
                    np.showClass4 = true
                    np.showClass8 = true
                    np.confirmCD = true
                    np.show_cur_location = true
                    np.closePoiGuanlian = true
                }
            },
            pid:function () {
                if(np.poiClass == 1 || np.poiClass == 2 || np.poiClass == 4) {
                    if(np.pid != 0) {
                        np.closePoiGuanlian = false
                    }else {
                        np.closePoiGuanlian = true
                    }
                }
            }
        }
    })
}