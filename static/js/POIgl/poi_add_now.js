// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var token = location.search.replace('?token=', "")
    var ue1 = UE.getEditor('editor1')   //添加故事详情
    var ue2 = UE.getEditor('editor2')   //添加详情页简介
    var np = new Vue({
        el: '#tall',
        data: {

            // 添加
            a_Name: '',   //POI名字
            a_Type: 0,   //POI类型
            a_Dubbing_content: '',   //默认对话
            a_Dubbing_video: '',  //默认对话语音
            a_Image: '',   //poi头像
            a_Imgs: '', //poi介绍图
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
            map_scale:1.00,    //地图缩放比例

            // 添加
            a_cardtitle: '',   //Poi故事标题
            a_cardImg1: '',  //poi故事卡片-未获得
            a_cardImg2: '',   //故事卡片-已获得
            a_cardMusic: '',   //音频链接
            a_cardMusicLen: '',  //音频时长
            a_cardDetail: '',  //故事正文


        },
        methods: {

            // 重置
            chongzhi: function () {
                window.location.reload()
            },

            // 添加
            posts: function () {
                // console.log(token)
                var add_dubbing = '[{"text":[{"content":"' + np.a_Dubbing_content + '","br":0,"color":"","bold":0}],"audio":"' + np.a_Dubbing_video + '"}]'
                if(np.a_Poi_One_width == '') {
                    np.a_Poi_One_width = 0
                }
                if(np.a_Poi_One_height == '') {
                    np.a_Poi_One_height = 0
                }
                if(np.a_Poi_One_left == '') {
                    np.a_Poi_One_left = 0
                }
                if(np.a_Poi_One_top == '') {
                    np.a_Poi_One_top = 0
                }
                if(np.a_Poi_Two_width == '') {
                    np.a_Poi_Two_width = 0
                }
                if(np.a_Poi_Two_height == '') {
                    np.a_Poi_Two_height = 0
                }
                if(np.a_Poi_Two_left == '') {
                    np.a_Poi_Two_left = 0
                }
                if(np.a_Poi_Two_top == '') {
                    np.a_Poi_Two_top = 0
                }
                var add_mapArr = '[ { "url": "' + np.a_Poi_One_link + '", "w": ' + np.a_Poi_One_width + ', "h": ' + np.a_Poi_One_height + ', "l": ' + np.a_Poi_One_left + ', "t": ' + np.a_Poi_One_top + '}, { "url": "' + np.a_Poi_Two_link + '", "w": ' + np.a_Poi_Two_width + ', "h": ' + np.a_Poi_Two_height + ', "l": ' + np.a_Poi_Two_left + ', "t": ' + np.a_Poi_Two_top + '} ]'
                var add_cardImg = '["' + np.a_cardImg1 + '","' + np.a_cardImg2 + '"]'
                
                if(np.a_cardMusicLen == '') {
                    np.a_cardMusicLen = 0
                }
                var add_cardMusic = '{"ln":' + np.a_cardMusicLen + ',"url":"' + np.a_cardMusic + '"}'
                var multiIntro = '[{"content":"' + np.a_MultiIntro + '","br":0,"color":"","bold":0}]'
                var a_Imgs = np.a_Imgs.split(',')
                if (ue2.getContent() == '' || ue1.getContent() == '' || np.a_cardMusic == '' || np.a_Poi_Two_link == '' || np.a_Poi_One_link == '') {
                    alert('信息填写不完整,无法提交')
                } else {
                    axios.post(host + '/route/v1/api/poi/create', {
                        name: np.a_Name,
                        type: parseInt(np.a_Type),
                        dubbing: add_dubbing,
                        image: np.a_Image,
                        imgs: JSON.stringify(a_Imgs),      
                        introduction: ue2.getContent(),
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
                        cardDetail: ue1.getContent(),
                        server: server,
                        manual: eval(np.a_manual),
                        scale:parseInt(np.map_scale),
                        token:token
                    }).then((res) => {
                        console.log(res.data.Body)
                        // alert("添加成功")
                        var id = res.data.Body.Id
                        window.location.href = '/poiadd3?id=' + id+'&token='+token
                    })
                }

            },
        },
        mounted: function () {
        }
    })
}