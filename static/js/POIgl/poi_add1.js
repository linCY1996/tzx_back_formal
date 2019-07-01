// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
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
    var ids = GetParameters('id')    //taskid
    var token = GetParameters('token')
    var can_edit = GetParameters('can_edit')   //是否具有权限编辑
    var E = window.wangEditor
    var ue3 = new E('#editor')
    // ue.create()
    var ue = new E('#editor1')
    var ue4 = new E('#editor4')   //默认对话
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
     ////////
     ue.customConfig.colors = [
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
    ue.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
     // 关闭粘贴样式的过滤
     ue.customConfig.pasteFilterStyle = false
     // 忽略粘贴内容中的图片
     ue.customConfig.pasteIgnoreImg = true
     // 自定义处理粘贴的文本内容
     ue.customConfig.pasteTextHandle = function (content) {
         // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
         return content
     }
     ////////
     ue3.customConfig.colors = [
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
    ue3.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana'
    ]
     // 关闭粘贴样式的过滤
     ue3.customConfig.pasteFilterStyle = false
     // 忽略粘贴内容中的图片
     ue3.customConfig.pasteIgnoreImg = true
     // 自定义处理粘贴的文本内容
     ue3.customConfig.pasteTextHandle = function (content) {
         // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
         return content
     }
    // ue3.create()
    var np = new Vue({
        el: '#tall',
        data: {
            bianji_show: true,
            add_show: false,
            b_Name: '',   //POI名字
            b_Type: '',   //POI类型
            b_Dubbing_content: '',   //默认对话
            b_Dubbing_video: '',  //默认对话语音
            b_Image: '',   //poi头像
            b_Imgs: [], //poi介绍图
            btn_Count: 0,   //点击添加poi介绍图的次数
            delIndex: -1,//删除poi介绍图的下标
            b_Introduction: '',     //详情页简介
            b_Label: '',  //poi标签
            b_Lat: '',   //维度
            b_Lon: '',   //经度
            b_PlayTime: '',   //建议游玩时间
            b_Price: '', //费用
            b_Region: '',  //任务触发范围
            b_ShopHours: '', //营业时间
            b_MultiIntro: '',  //poi弹窗介绍
            // b_cardtitle:'',  //poi故事标题
            b_Poi_One_link: '',   //Poi图标-未游玩
            b_Poi_One_width: '',   //Poi图标-未游玩宽
            b_Poi_One_height: '',  //Poi图标-未游玩高
            b_Poi_One_left: '',   //Poi图标-未游玩左
            b_Poi_One_top: '',   //Poi图标-未游玩上
            b_Poi_Two_link: '',   //Poi图标-已游玩
            b_Poi_Two_width: '',   //Poi图标-已游玩宽
            b_Poi_Two_height: '',  //Poi图标-已游玩高
            b_Poi_Two_left: '',   //Poi图标-已游玩左
            b_Poi_Two_top: '',   //Poi图标-已游玩上
            b_manual: '',  //是否可以手动触发
            // 新增
            map_scale: 1.00,   //地图得缩放比例
            // ****************************
            // 第二步
            editor: '',
            bianji_show: true,
            add_show: false,
            b_cardtitle: '',   //Poi故事标题
            b_cardImg1: '',  //poi故事卡片-未获得
            b_cardImg2: '',   //故事卡片-已获得
            b_cardMusic: '',   //音频链接
            b_cardMusicLen: '',  //音频时长
            b_cardDetail: '',  //故事正文
            // ************
            can_edit: true,  //是否具有编辑权限
            poiClass: '',   ///poi类型   1.有故事有任务   2.有故事无任务   4.无故事无任务
            showClass2: true,   //将2隐藏掉
            showClass4: true,   //将4隐藏掉

        },
        methods: {

            // 添加poi介绍图
            AddImgs: function () {
                np.btn_Count += 1
                var count = np.btn_Count
                np.b_Imgs.splice(20, 0, { imgs: '', index: count })
            },
            // 删除poi介绍图
            delImgs: function (e) {
                for (var i = 0; i < np.b_Imgs.length; i++) {
                    if (e == np.b_Imgs[i].index) {
                        np.delIndex = i
                    }
                }
                np.b_Imgs.splice(np.delIndex, 1)
            },
            showPoi: function () {
                var that = this
                axios.post(host + '/route/v1/api/poi/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    ue.create()
                    ue3.create()
                    ue4.create()
                    var dubbing = that.b64DecodeUnicode(res.data.Body.Dubbing)
                    var Dubbing = JSON.parse(dubbing)   //默认对话
                    var multiIntro = that.b64DecodeUnicode(res.data.Body.MultiIntro)
                    var MultiIntro = JSON.parse(multiIntro)
                    var MapArr = JSON.parse(res.data.Body.MapArr)
                    np.b_Name = res.data.Body.Name
                    np.b_Type = res.data.Body.Type
                    var content = JSON.stringify(Dubbing[0].text)
                    content = content.replace(/\\"/g,'"')
                    np.b_Dubbing_content = content.substring(1, content.length - 1)
                    ue4.txt.html(np.b_Dubbing_content)
                    np.b_Dubbing_video = Dubbing[0].audio
                    np.b_Image = res.data.Body.Image
                    var bian_imgs = JSON.parse(res.data.Body.Imgs)
                    for (var i = 0; i < bian_imgs.length; i++) {
                        np.b_Imgs.push({
                            imgs: bian_imgs[i],
                            index: i
                        })
                    }
                    np.b_Introduction = res.data.Body.Introduction
                    ue3.txt.html(np.b_Introduction)
                    np.b_Label = res.data.Body.Label
                    np.b_Lat = res.data.Body.Lat
                    np.b_Lon = res.data.Body.Lon
                    np.b_PlayTime = res.data.Body.PlayTime
                    np.b_Price = res.data.Body.Price
                    np.b_Region = res.data.Body.Region
                    np.b_ShopHours = res.data.Body.ShopHours
                    var mul = JSON.stringify(MultiIntro[0].content)
                    np.b_MultiIntro = mul.substring(1, mul.length - 1)
                    np.b_Poi_One_link = MapArr[0].url
                    np.b_Poi_One_width = MapArr[0].w
                    np.b_Poi_One_height = MapArr[0].h
                    np.b_Poi_One_left = MapArr[0].l
                    np.b_Poi_One_top = MapArr[0].t
                    np.b_Poi_Two_link = MapArr[1].url
                    np.b_Poi_Two_width = MapArr[1].w
                    np.b_Poi_Two_height = MapArr[1].h
                    np.b_Poi_Two_left = MapArr[1].l
                    np.b_Poi_Two_top = MapArr[1].t
                    var CardImg = JSON.parse(res.data.Body.CardImg)
                    var CardMusic = JSON.parse(res.data.Body.CardMusic)
                    np.b_cardtitle = res.data.Body.CardTitle
                    np.b_cardImg1 = CardImg[0]
                    np.b_cardImg2 = CardImg[1]
                    np.b_cardMusic = CardMusic.url
                    np.b_cardMusicLen = CardMusic.ln
                    np.b_cardDetail = res.data.Body.CardDetail
                    ue.txt.html(np.b_cardDetail);
                    np.b_manual = res.data.Body.Manual
                    np.map_scale = res.data.Body.scale
                    np.poiClass = res.data.Body.class
                    if (res.data.Body.class == 2) {
                        np.showClass2 = false   //
                    } else if (res.data.Body.class == 4) {
                        np.showClass4 = false
                    }
                    if (can_edit == null) {
                        np.can_edit = true
                    } else {
                        np.can_edit = eval(can_edit)
                    }
                })
            },

            // base64转码
            b64DecodeUnicode: function (str) {
                return decodeURIComponent(atob(str).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            },

            // 重置
            chongzhi: function () {
                window.location.reload()
            },

            // 保存
            saves: function () {
                var s = ue4.txt.html()
                var mr = s.replace(/=""/g,'')
                mr = mr.replace(/\"/g,'\\"')
                var mrDuihua = mr.replace(/\\&quot;/g,'')
                var dubbing = '[{"text":"' + mrDuihua + '","audio":"' + np.b_Dubbing_video + '"}]'
                if (np.b_Poi_One_width == '') {
                    np.b_Poi_One_width = 0
                }
                if (np.b_Poi_One_height == '') {
                    np.b_Poi_One_height = 0
                }
                if (np.b_Poi_One_left == '') {
                    np.b_Poi_One_left = 0
                }
                if (np.b_Poi_One_top == '') {
                    np.b_Poi_One_top = 0
                }
                if (np.b_Poi_Two_width == '') {
                    np.b_Poi_Two_width = 0
                }
                if (np.b_Poi_Two_height == '') {
                    np.b_Poi_Two_height = 0
                }
                if (np.b_Poi_Two_left == '') {
                    np.b_Poi_Two_left = 0
                }
                if (np.b_Poi_Two_top == '') {
                    np.b_Poi_Two_top = 0
                }

                var mapArr = '[ { "url": "' + np.b_Poi_One_link + '", "w": ' + np.b_Poi_One_width + ', "h": ' + np.b_Poi_One_height + ', "l": ' + np.b_Poi_One_left + ', "t": ' + np.b_Poi_One_top + '}, { "url": "' + np.b_Poi_Two_link + '", "w": ' + np.b_Poi_Two_width + ', "h": ' + np.b_Poi_Two_height + ', "l": ' + np.b_Poi_Two_left + ', "t": ' + np.b_Poi_Two_top + '} ]'
                var cardImg = '["' + np.b_cardImg1 + '","' + np.b_cardImg2 + '"]'

                if (np.b_cardMusicLen == '') {
                    np.b_cardMusicLen = 0
                }
                var cardMusic = '{"ln":' + np.b_cardMusicLen + ',"url":"' + np.b_cardMusic + '"}'
                var bmultiIntro = '[{"content":"' + np.b_MultiIntro + '","br":0,"color":"","bold":0}]'
                // 操作poi介绍图
                var bianjiImgs = ''
                for (var j = 0; j < np.b_Imgs.length; j++) {
                    bianjiImgs += np.b_Imgs[j].imgs + ','
                }
                var BImgs = bianjiImgs.substring(0, bianjiImgs.length - 1)
                if (ue3.txt.html() == '' || ue.txt.html() == '' || np.b_cardMusic == '' || np.b_Poi_Two_link == '' || np.b_cardMusic == '') {
                    alert('信息填写不完整。不允许提交')
                } else {
                    axios.post(host + '/route/v1/api/poi/update', {
                        id: parseInt(ids),
                        name: np.b_Name,
                        type: parseInt(np.b_Type),
                        dubbing: dubbing,
                        image: np.b_Image,
                        imgs: JSON.stringify(BImgs.split(',')),
                        introduction: ue3.txt.html(),
                        label: np.b_Label,
                        lat: np.b_Lat,
                        lon: np.b_Lon,
                        playTime: np.b_PlayTime,
                        price: np.b_Price,
                        region: parseInt(np.b_Region),
                        shopHours: np.b_ShopHours,
                        multiIntro: bmultiIntro,
                        mapArr: mapArr,
                        cardTitle: np.b_cardtitle,
                        cardImg: cardImg,
                        cardMusic: cardMusic,
                        cardDetail: ue.txt.html(),
                        server: server,
                        manual: eval(np.b_manual),
                        scale: parseFloat(np.map_scale),
                        token: token,
                        class:parseInt(1)
                    }).then((res) => {
                        if (res.data.Body == '没有编辑权限') {
                            alert("没有权限编辑，不能修改数据")
                            window.history.go(-1)
                        } else {
                            alert("编辑成功")
                            window.location.href = '/poiadd3?id=' + ids + '&token=' + token
                        }
                    })
                }

            },

        },
        mounted: function () {
            this.showPoi();
        }
    })
}