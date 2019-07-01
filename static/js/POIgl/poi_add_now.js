// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
window.onload = function () {
    var token = location.search.replace('?token=', "")
    // var ue1 = UE.getEditor('editor1')   //添加故事详情
    // var ue2 = UE.getEditor('editor2')   //添加详情页简介
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
            // 添加
            a_cardtitle: '',   //Poi故事标题
            a_cardImg1: '',  //poi故事卡片-未获得
            a_cardImg2: '',   //故事卡片-已获得
            a_cardMusic: '',   //音频链接
            a_cardMusicLen: '',  //音频时长
            a_cardDetail: '',  //故事正文


        },
        methods: {
            // 预加载富文本
            showFwb: function () {
                ue1.create()
                ue2.create()
                ue4.create()
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
                // console.log(ue1.txt.html())
                // console.log(ue2.txt.html())
                // console.log(typeof parseFloat(np.map_scale).toFixed(2))
                if (ue2.txt.html() == '' || ue1.txt.html() == '' || np.a_cardMusic == '' || np.a_Poi_Two_link == '' || np.a_Poi_One_link == '') {
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
                        class:parseInt(1)
                    }).then((res) => {
                        // alert("添加成功")
                        var id = res.data.Body.Id
                        window.location.href = '/poiadd3?id=' + id + '&token=' + token
                    })
                }

            },
        },
        mounted: function () {
            this.showFwb()
        }
    })
}