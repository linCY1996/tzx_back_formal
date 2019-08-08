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
    var is_super = GetParameters('is_super')
    var np = new Vue({
        el: '#tall',
        data: {
            qudaolist: [],   //渠道
            keyword: '',   //关键字
            chooseClass: '',//选择编辑类型
            qudaoId: '',   //渠道
            text: '',  //文字
            images: '',  //图片
            link_title: '',  //图片链接
            link_task: '',
            link_img: '',
            link_Links: '',
            mini_title: '',  //小程序页面
            mini_pages: '',
            mini_link: '',
        },
        methods: {
            
            showqudao: function (pindex, psize) {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    server: server,
                    token: token
                }).then((res) => {
                    np.qudaolist = res.data.Body.list
                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            saves: function () {
                // 默认回复
                var reply = ''
                switch (np.chooseClass) {
                    case "text":
                        reply = '{"msgtype":"text","text":{"content":"' + np.text + '"}}'
                        break
                    case "image":
                        reply = '{"msgtype":"image","image":{"media_id":"' + np.images + '"}}'
                        break
                    case "link":
                        reply = '{"msgtype":"link","link":{"title":"' + np.link_title + '","description":"' + np.link_task + '","url":"' + np.link_img + '","thumb_url":"' + np.link_Links + '"}}'
                        break
                    case "miniprogrampage":
                        reply = '{"msgtype":"miniprogrampage","miniprogrampage":{"title":"' + np.mini_title + '","pagepath":"' + np.mini_pages + '","thumb_media_id":"' + np.mini_link + '"}}'
                        break
                }
                axios.post(host + '/route/v1/api/keyReply/create', {
                    key: np.keyword,
                    server: server,
                    token: token,
                    channel_id:parseInt(np.qudaoId),
                    reply: reply
                }).then((res) => {
                    console.log(res.data.Body)
                    alert("编辑关键字回复成功")
                    window.history.go(-1)
                })
            }
        },
        mounted() {
            this.showqudao(1, 1000)
        }
    })
}