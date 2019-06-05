// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    var ue = UE.getEditor('editor')   //编辑故事详情
    var ue3 = UE.getEditor('editor3')   //编辑详情页简介
    
    var np = new Vue({
        el:'#tall',
        data:{
            bianji_show: true,
            add_show: false,
            b_Name:'',   //POI名字
            b_Type:'',   //POI类型
            b_Dubbing_content:'',   //默认对话
            b_Dubbing_video:'',  //默认对话语音
            b_Image:'',   //poi头像
            b_Imgs:'', //poi介绍图
            b_Introduction:'',     //详情页简介
            b_Label:'',  //poi标签
            b_Lat:'',   //维度
            b_Lon:'',   //经度
            b_PlayTime:'',   //建议游玩时间
            b_Price:'', //费用
            b_Region:'',  //任务触发范围
            b_ShopHours:'', //营业时间
            b_MultiIntro:'',  //poi弹窗介绍
            // b_cardtitle:'',  //poi故事标题
            b_Poi_One_link:'',   //Poi图标-未游玩
            b_Poi_One_width:'',   //Poi图标-未游玩宽
            b_Poi_One_height:'',  //Poi图标-未游玩高
            b_Poi_One_left:'',   //Poi图标-未游玩左
            b_Poi_One_top:'',   //Poi图标-未游玩上
            b_Poi_Two_link:'',   //Poi图标-已游玩
            b_Poi_Two_width:'',   //Poi图标-已游玩宽
            b_Poi_Two_height:'',  //Poi图标-已游玩高
            b_Poi_Two_left:'',   //Poi图标-已游玩左
            b_Poi_Two_top:'',   //Poi图标-已游玩上
            b_manual:'',  //是否可以手动触发
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


        },
        methods:{
            showPoi:function () {
                var that = this
                axios.post(host+'/route/v1/api/poi/get', {
                    id:parseInt(ids),
                    server:server
                }).then((res) => {
                    var dubbing = that.b64DecodeUnicode(res.data.Body.Dubbing)
                    var Dubbing = JSON.parse(dubbing)   //默认对话
                    var multiIntro = that.b64DecodeUnicode(res.data.Body.MultiIntro)
                    var MultiIntro = JSON.parse(multiIntro)

                    var MapArr = JSON.parse(res.data.Body.MapArr)
                    np.b_Name = res.data.Body.Name
                    np.b_Type = res.data.Body.Type
                    var content = JSON.stringify(Dubbing[0].text[0].content)
                    np.b_Dubbing_content = content.substring(1,content.length-1)
                    np.b_Dubbing_video = Dubbing[0].audio
                    np.b_Image = res.data.Body.Image
                    var b_imgs = res.data.Body.Imgs
                    np.b_Imgs = b_imgs.substring(1,b_imgs.length-1)
                    np.b_Introduction = res.data.Body.Introduction
                    ue3.setContent(np.b_Introduction)
                    np.b_Label = res.data.Body.Label
                    np.b_Lat = res.data.Body.Lat
                    np.b_Lon = res.data.Body.Lon
                    np.b_PlayTime = res.data.Body.PlayTime
                    np.b_Price = res.data.Body.Price
                    np.b_Region = res.data.Body.Region
                    np.b_ShopHours = res.data.Body.ShopHours
                    // console.log("mul", typeof res.data.Body.MultiIntro)
                    var mul = JSON.stringify(MultiIntro[0].content)
                    np.b_MultiIntro = mul.substring(1,mul.length-1)
                    // np.b_cardtitle = res.data.Body.CardTitle
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
                    ue.setContent(np.b_cardDetail);
                    np.b_manual = res.data.Body.Manual
                })
            },

            // base64转码
            b64DecodeUnicode: function (str) {
                return decodeURIComponent(atob(str).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            },

            // 重置
            chongzhi: function () {
                window.location.reload()
            },
          
             // 保存
             saves: function () {
                var dubbing = '[{"text":[{"content":"'+np.b_Dubbing_content+'","br":0,"color":"","bold":0}],"audio":"'+np.b_Dubbing_video+'"}]'
                var mapArr = '[ { "url": "'+np.b_Poi_One_link+'", "w": '+np.b_Poi_One_width+', "h": '+np.b_Poi_One_height+', "l": '+np.b_Poi_One_left+', "t": '+np.b_Poi_One_top+'}, { "url": "'+np.b_Poi_Two_link+'", "w": '+np.b_Poi_Two_width+', "h": '+np.b_Poi_Two_height+', "l": '+np.b_Poi_Two_left+', "t": '+np.b_Poi_Two_top+'} ]'
                var cardImg = '["'+np.b_cardImg1+'","'+np.b_cardImg2+'"]'
                var cardMusic = '{"ln":'+np.b_cardMusicLen+',"url":"'+np.b_cardMusic+'"}'
                var bmultiIntro = '[{"content":"'+np.b_MultiIntro+'","br":0,"color":"","bold":0}]'
                if(ue3.getContent() == '' || ue.getContent() == '') {
                    alert('富文本信息为空，请重试')
                }else {
                    axios.post(host+'/route/v1/api/poi/update' ,{
                        id:parseInt(ids),
                        name:np.b_Name,
                        type:parseInt(np.b_Type),
                        dubbing:dubbing,
                        image:np.b_Image,
                        imgs:'['+np.b_Imgs+']',      ////////??
                        introduction:ue3.getContent(),
                        label:np.b_Label,
                        lat:np.b_Lat,
                        lon:np.b_Lon,
                        playTime:np.b_PlayTime,
                        price:np.b_Price,
                        region:parseInt(np.b_Region),
                        shopHours:np.b_ShopHours,
                        multiIntro:bmultiIntro,
                        mapArr:mapArr,
                        cardTitle:np.b_cardtitle,
                        cardImg:cardImg,
                        cardMusic:cardMusic,
                        cardDetail:ue.getContent(),
                        server:server,
                        manual:eval(np.b_manual)
                    }).then((res)=> {
                        // console.log(res.data)
                        alert("编辑成功")
                        window.location.href = '/poiadd3?id=' + ids
                    })
                }
                
               
            },
          
        },
        mounted:function () {
            this.showPoi();
        }
    })
}