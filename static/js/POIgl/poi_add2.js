const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
// const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
window.onload = function () {
    var ue = UE.getEditor('editor')   //编辑
    var ue1 = UE.getEditor('editor1')   //添加

    function GetParameters(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return decodeURI(r[2]);//解决中文乱码
            
        }else{
             return null;
        }
    }
    var ids = GetParameters('id')    
    var b_name = GetParameters('b_name')
    var b_type = GetParameters('b_type')
    var b_image = GetParameters('b_image')
    var b_imgs = GetParameters('b_imgs')
    var b_introduction = GetParameters('b_introduction')
    var b_label = GetParameters('b_label')
    var b_lat = GetParameters('b_lat')
    var b_lon = GetParameters('b_lon')
    var b_playtime = GetParameters('b_playtime')
    var b_price = GetParameters('b_price')
    var b_regin = GetParameters('b_regin')
    var b_shophours = GetParameters('b_shophours')
    var b_multiIntro = GetParameters('b_multiIntro')
    console.log(b_name)
    console.log(b_type)
    console.log(b_image)
    console.log(b_imgs)
    console.log(b_introduction)
    console.log(b_label)
    console.log(b_lat)
    console.log(b_lon)
    console.log(b_playtime)
    console.log(b_price)
    console.log(b_regin)
    console.log(b_shophours)
    console.log(b_multiIntro)


    // var ids = location.search.replace('?id=', "")
    // var b_Name = location.search.replace('&b_name=', "")
    // console.log(b_Name)
    var np = new Vue({
        el: '#tall',
        data: {
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
            // 添加
            a_cardtitle: '',   //Poi故事标题
            a_cardImg1: '',  //poi故事卡片-未获得
            a_cardImg2: '',   //故事卡片-已获得
            a_cardMusic: '',   //音频链接
            a_cardMusicLen: '',  //音频时长
            a_cardDetail: '',  //故事正文
        },
        methods: {
            showpoiMsg: function () {
                axios.post(host + '/route/v1/api/poi/get', {
                    id: parseInt(ids),
                    server: "dev"
                }).then((res) => {
                    console.log(res.data.Body)
                    var CardImg = JSON.parse(res.data.Body.CardImg)
                    console.log(CardImg)
                    var CardMusic = JSON.parse(res.data.Body.CardMusic)
                    console.log("=", CardMusic)
                    np.b_cardtitle = res.data.Body.CardTitle
                    np.b_cardImg1 = CardImg[0]
                    np.b_cardImg2 = CardImg[1]
                    np.b_cardMusic = CardMusic.url
                    np.b_cardMusicLen = CardMusic.ln
                    np.b_cardDetail = res.data.Body.CardDetail
                    ue.setContent(np.b_cardDetail);
                })
            },


            // 重置
            chongzhi: function () {
                console.log("here")
                window.location.reload()
            },
            // 编辑
            bianji: function () {
                np.bianji_show = true,
                    np.add_show = false
            },
            // 添加
            add: function () {
                np.bianji_show = false,
                    np.add_show = true
            },
            // 保存
            saves: function () {
                window.location.href = '/poiadd3?id=' + ids
                // console.log(ue.getContent())
            },
            // 添加
            posts: function () {
                window.location.href = '/poiadd3?id=' + ids
            },

        },
        mounted: function () {
            this.showpoiMsg();

            // np.editor = UE.getEditor('editor');
            // const _this = this;
            // this.editor = UE.getEditor('editor'); // 初始化UE
            // _this.editor.addListener("ready", function () {
            //     _this.editor.setContent(); // 确保UE加载完成后，放入内容。
            // });
        },
        // components: {
        //     'UE': { //组件
        //         template: '<script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>'
        //     },

        // }
    })


}