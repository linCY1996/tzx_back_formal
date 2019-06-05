// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    var np = new Vue({
        el: '#tall',
        data: {
                // guideMsg:[],  //导游信息
                qudao: [],   //渠道信息
                daoyouname: [],   //导游名字
                checkedNames:[],   //选择的Point
                Poilist:[],
                jump_class:1,   //跳转目录时   跳转选择
                yj_choose:1,   //一级选项卡
    
                qudao_Id: '',  //渠道id
                qudao_Name: '',  //渠道名字
                xianlu_Id: '', //线路id
                xianlu_Name: '', //线路名称
                City: '',  //城市
                dName: '',   //导游名字1
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
                dujia_word: '',  //独家回忆引导文案
                dujia_showtitle: '',  //独家回忆分享标题
                dujia_showPage: '',  //独家回忆分享图片
                dujia_btnmsg: '',   //体验按钮文案
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
                // 编辑信息
                bianji_show: true,
                add_show: false,
                // **********************************1
                // 添加信息
                qudao_Id_add: '',  //渠道id
                qudao_Name_add: '',  //渠道名字
                xianlu_Id_add: '',
                xianlu_Name_add: '',
                City_add: '',
                dName_add: '',   //导游名字1
                xianlu_Poi_add: '',
                Price_add: '',
                xianlu_Label_add: '',
                xiangq_Banner_add: '',
                zhifu_Img_add: '',
                xiangqing_ShowImg_add: '',
                xianlu_Icon_add: '',
                xingcheng_End_add: '',
                dujia_InImg_add: '',
                dujia_fengImg_add: '',
                dujia_word_add: '',  //独家回忆引导文案
                dujia_showtitle_add: '',  //独家回忆分享标题
                dujia_showPage_add: '',  //独家回忆分享图片
                dujia_btnmsg_add: '',   //体验按钮文案
                dujia_Go_imgs: '',  //形成开始页配置--图片
                dujia_Go_audio: '',  //形成开始页配置  --音频
                dujia_end_audio_add: '',  //行程结束页配置--音频
                dujia_end_img_add: '',  //行程结束页配置--图片
                dujia_end_Class_add: '',  //行程结束页配置--跳转类型
                dujia_end_link_add: '',  //行程结束页配置--跳转链接
                dujia_Mapbg_add: '',  //地图背景
                dujia_niceroad_add: '', //推荐路线
                dujia_lat_leftUp_add: [],  //地图坐标--左上
                dujia_lat_rightUp_add: [],  //地图坐标--右上
                dujia_lat_rightDown_add: [],  //地图坐标--右下
                dujia_lat_leftDown_add: [],  //地图坐标--左下
    
        },
        methods: {
            bianjishow: function () {
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(ids),
                    server: server
                }).then((res) => {
                    console.log(res.data.Body)
                    np.qudao_Id = res.data.Body.ChannelId
                    np.qudao_Name = res.data.Body.ChannelName
                    np.xianlu_Id = res.data.Body.Id
                    np.xianlu_Name = res.data.Body.Name
                    np.City = res.data.Body.City
                    np.dName = res.data.Body.guide_name
                    np.checkedNames = res.data.Body.poi_ids
                    np.Price = res.data.Body.Price
                    np.xianlu_Label = JSON.parse(res.data.Body.Label)
                    var Imgs = JSON.parse(res.data.Body.Imgs)
                    np.xiangq_Banner = Imgs.slice(4, Imgs.length)   //第5张开始
                    np.zhifu_Img = Imgs[1]
                    np.xiangqing_ShowImg = res.data.Body.jump_url
                    np.xianlu_Icon = JSON.parse(res.data.Body.Honor)
                    np.xingcheng_End = res.data.Body.end_words
                    np.dujia_InImg = Imgs[2]
                    np.dujia_fengImg = Imgs[3]
                    np.dujia_word = res.data.Body.MemMsg
                    np.dujia_showtitle = res.data.Body.MemTitle
                    np.dujia_showPage = JSON.parse(res.data.Body.MemImgs) /// 
                    np.dujia_btnmsg = res.data.Body.PriceText
                    var Go_Start = JSON.parse(res.data.Body.Start)
                    console.log(Go_Start)
                    np.dujia_Go_imgs = Go_Start.image
                    np.dujia_Go_audio = Go_Start.audio

                    var finish = JSON.parse(res.data.Body.Finish)
                    console.log(finish)
                    np.dujia_end_audio = finish.audio
                    np.dujia_end_img = finish.image
                    np.dujia_end_Class = finish.type
                    np.dujia_end_link = finish.jump
                    var Entity = JSON.parse(res.data.Body.Entity)
                    console.log(Entity)
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
                })
            },
            // 显示所有渠道
            showqudao: function () {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: 1,
                        page_size: 50
                    },
                    server: server
                }).then((res) => {
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
                    server: server

                }).then((resp) => {
                        np.daoyouname = resp.data.Body.list
                })
            },
            // 所有poi
            showPoilist:function () {
                axios.post(host+'/route/v1/api/poi/list',{
                    page:{
                        page_index:1,
                        page_size:1000
                    },
                    type:-1,
                    server:server
                }).then((res) => {
                    np.Poilist = res.data.Body.list
                    console.log("hahahah", res.data.Body.list)
                  
                })
            },
              // 保存
              saves: function () {
                var imgsOne = 'http://imgs1.tuzuu.com/12_zhifu.jpg'
                var imims = JSON.stringify(np.xiangq_Banner)
                console.log("imgs",imims)
                var imss = imims.slice(1, imims.length - 1)
                console.log(imss)
                var imgsAll = '["' + imgsOne + '","' + np.zhifu_Img + '","' + np.dujia_InImg + '","' + np.dujia_fengImg + '",' + imss + ']'   //拼接imgs
                console.log("imgsAll", imgsAll)
                var Start = '{"image":"' + np.dujia_Go_imgs + '","audio":"' + np.dujia_Go_audio + '"}'
                console.log("Start", Start)
                var Finish = '{"image":"' + np.dujia_end_img + '","audio":"' + np.dujia_end_audio + '","type":' + np.dujia_end_Class + ',"jump":"' + np.dujia_end_link + '"}'
                console.log(Finish)
                var Entity = '{ "url": "' + np.dujia_niceroad + '", "bg": "' + np.dujia_Mapbg + '", "rect": [ { "lon":' + np.dujia_lat_leftUp_lon + ', "lat": ' + np.dujia_lat_leftUp_lat + ' }, { "lon": ' + np.dujia_lat_rightUp_lon + ', "lat": ' + np.dujia_lat_rightUp_lat + ' }, { "lon": ' + np.dujia_lat_rightDown_lon + ', "lat": ' + np.dujia_lat_rightDown_lat + ' }, { "lon": ' + np.dujia_lat_leftDown_lon + ', "lat": ' + np.dujia_lat_leftDown_lat + ' } ] }'
                console.log(Entity)

                // var label = np.xianlu_Label.split(',')
                // console.log(label)
                // console.log("导游名字", np.dName)
                axios.post(host + '/route/v1/api/route/update', {
                    channelId: parseInt(np.qudao_Id),   //渠道id
                    id: parseInt(ids),
                    name: np.xianlu_Name,
                    city: np.City,
                    guide_name: np.dName,    //导游名字
                    poi_ids: np.checkedNames,  //线路POi   ////[]
                    price: parseInt(np.Price),
                    label: JSON.stringify(np.xianlu_Label),
                    honor: JSON.stringify(np.xianlu_Icon),
                    imgs: imgsAll,
                    end_words: np.xingcheng_End,  //x行程结束语  []
                    memMsg: np.dujia_word,
                    priceText: np.dujia_btnmsg,
                    memTitle: np.dujia_showtitle,
                    memImgs: '["' + np.dujia_showPage + '"]',
                    start: Start,
                    finish: Finish,
                    entity: Entity,
                    server: server,
                }).then((res) => {
                    console.log(res.data)
                    alert("保存成功")
                    window.history.go(-1)
                })
            },
           
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
         
        },
        mounted: function () {
            this.bianjishow();
            this.showqudao();
            this.showdaoyouname();
            this.showPoilist();
        }
    })
}