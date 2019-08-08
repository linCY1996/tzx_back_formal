// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {

    // $("#colla-titles").click(function () {
    //     $("#colla-contents").toggle();
    // });
    var ids = location.search.replace('?id=', "")
    // var ue = UE.getEditor('editor')   //编辑故事详情
    var E = window.wangEditor
    var ue = new E('#editor')
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
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]); //解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('id') //
    var fir_show = GetParameters('fshow')
    var Sec_show = GetParameters('sshow')
    var token = GetParameters('token')
    var np = new Vue({
        el: '#tall',
        data: {
            // yaduo: false,      //亚朵
            bianji_show: true,
            add_show: false,
            first_Img: '', //首页信息
            detail_Img: [],
            tan_show: false,    //针对于一般情况
            tan_shows: false,    //针对于详情页banner
            Id: -1,
            first_page_show: true, //首页信息显示
            xiangqing_page_show: false, //详情信息显示
            shouBanner: [], //首页banner
            shouimgarr: [], //首页说明图
            detailBanner: [], //详情页banner
            detailimgarr: [], //详情页说明图
            daishen: false, //审核标题
            guanfang: false, //官方标题
            routeName: [],
            // 编辑富文本信息所需要字段
            can_edit_guide: [],
            can_edit_poi: [],
            can_edit_route: [],
            can_use_guide: [],
            can_use_poi: [],
            can_use_route: [],
            name: '',
            page_url: '',
            // 折叠面板
            XQRouteId: '',   //编辑详情页图片
            XQIndex: '',   //删除详情页banner图片

        },
        methods: {
            //隐藏面板
            titles: function (index) {
                this.detailimgarr[index].showContent = !this.detailimgarr[index].showContent
            },
            // 通过id来获取rich信息
            showRich: function () {
                axios.post(host + '/route/v1/api/channel/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    ue.create()
                    //   console.log(res.data.Body)
                    np.can_edit_guide = res.data.Body.can_edit_guide
                    np.can_edit_poi = res.data.Body.can_edit_poi
                    np.can_edit_route = res.data.Body.can_edit_route
                    np.can_use_guide = res.data.Body.can_use_guide
                    np.can_use_poi = res.data.Body.can_use_poi
                    np.can_use_route = res.data.Body.can_use_route
                    np.name = res.data.Body.name
                    np.page_url = res.data.Body.page_url
                    var rich = res.data.Body.rich
                    ue.txt.html(rich)
                })
            },
            saves: function () {
                // console.log(typeof np.can_edit_guide)
                axios.post(host + '/route/v1/api/channel/update', {
                    can_edit_guide: JSON.parse(np.can_edit_guide),
                    can_edit_poi: JSON.parse(np.can_edit_poi),
                    can_edit_route: JSON.parse(np.can_edit_route),
                    can_use_guide: JSON.parse(np.can_use_guide),
                    can_use_poi: JSON.parse(np.can_use_poi),
                    can_use_route: JSON.parse(np.can_use_route),
                    id: parseInt(ids),
                    name: np.name,
                    page_url: np.page_url,
                    server: server,
                    rich: ue.txt.html()
                }).then((res) => {
                    // console.log(res.data.Body)
                    alert("富文本信息保存成功")
                })
            },
            firListshow: function () {
                axios.post(host + '/route/v1/api/homePage/getRouteIdList', {
                    channel_id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    if (ids == 0) {
                        np.guanfang = true
                    } else if (ids == -1) {
                        np.daishen = true
                    }
                    np.first_page_show = eval(fir_show)
                    np.xiangqing_page_show = eval(Sec_show)
                    var plist = res.data.Body
                    var detailimgarr = [] //详情页说明图
                    var arr = []
                    for (var i = 0; i < plist.length; i++) {
                        if (plist[i].RouteId != 0) {
                            arr.push(plist[i].RouteId)
                        }
                    }
                    var min = -1
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = i; j < arr.length; j++) {
                            if (arr[i] > arr[j]) {
                                min = arr[j];
                                arr[j] = arr[i];
                                arr[i] = min;
                            }
                        }
                    }
                    for (var j = 0; j < arr.length; j++) {
                        for (var i = 0; i < plist.length; i++) {
                            if (arr[j] == plist[i].RouteId) {
                                detailimgarr.push({
                                    RouteId: arr[j],
                                    Data: plist[i].Data,
                                    route_name: plist[i].route_name,
                                    banner: plist[i].banner,
                                    showContent: true
                                })
                            }
                        }
                    }
                    np.detailimgarr = detailimgarr
                })
            },

            // 显示首页banner和说明图
            showfirstImgs: function () {
                axios.post(host + '/route/v1/api/channel/jumpList', {
                    channel_id: parseInt(ids),
                    // route_id:parseInt(),
                    server: server
                }).then((res) => {
                    var shouBanner = [] //首页banner
                    var shouimgarr = [] //首页说明图
                    var plist = res.data.Body
                    for (var i = 0; i < plist.length; i++) {
                        if (plist[i].type == "banner") {
                            shouBanner.push({
                                id: plist[i].id,
                                img_url: plist[i].img_url,
                                jump_type: plist[i].jump_type,
                                jump_url: plist[i].jump_url,
                                sort: plist[i].sort,
                                type: plist[i].type
                            })
                        } else if (plist[i].type == "imgarr") {
                            shouimgarr.push({
                                id: plist[i].id,
                                img_url: plist[i].img_url,
                                jump_type: plist[i].jump_type,
                                jump_url: plist[i].jump_url,
                                sort: plist[i].sort,
                                type: plist[i].type
                            })
                        }
                    }
                    np.shouBanner = shouBanner.reverse()
                    np.shouimgarr = shouimgarr.reverse()
                    // console.log(np.shouBanner)
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

            // 删除图片
            del: function (e) {
                np.Id = e
                np.tan_show = true

            },

            // 点击取消
            Cancels: function () {
                np.tan_show = false
            },

            // 点击确认
            Confirms: function () {
                var that = this
                axios.post(host + '/route/v1/api/homePage/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token: token
                }).then((res) => {
                    np.tan_show = false
                    that.firListshow()
                    that.showfirstImgs()
                })
            },
            // 删除详情页banner
            delxqBanner: function (e, e1) {
                // console.log(e)
                // console.log(e1)
                np.XQRouteId = e
                np.XQIndex = e1
                np.tan_shows = true
            },
            // 点击取消
            XQCancels: function () {
                np.tan_shows = false
            },

            // 点击确认
            XQConfirms: function () {
                var that = this
                var index = -2
                for (var i = 0; i < np.detailimgarr.length; i++) {
                    if (np.XQRouteId == np.detailimgarr[i].RouteId) {
                        index = i
                    }
                }
                var banner = np.detailimgarr[index].banner
                banner.splice(np.XQIndex, 1)
                axios.post(host + '/route/v1/api/route/updateBanner', {
                    server: server,
                    banner: JSON.stringify(banner),
                    route_id: parseInt(np.XQRouteId)
                }).then((res) => {
                    np.tan_shows = false
                    that.firListshow()
                    that.showfirstImgs()
                })
            },
            //添加首页banner
            addshouBanner: function () {
                var type = 'banner'
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids + '&token=' + token
            },

            //添加首页imgarr
            addshouImgArr: function () {
                var type = 'imgarr'
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids + '&token=' + token
            },
            // 详情页banner
            ImgsxiangBannerBian: function (e, e1) {
                window.location.href = '/firstxiangbianji?routeid=' + e + '&token=' + token + '&index=' + e1
            },
            // 详情页说明页
            addxiangqingDetail: function (e) {
                var type = "detail"
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids + '&routeid=' + e + '&token=' + token
            },
          
            // 首页信息显示
            shou_show: function () {
                // console.log("1111")
                np.first_page_show = true
                np.xiangqing_page_show = false
            },
            detail_show: function () {
                np.first_page_show = false
                np.xiangqing_page_show = true
            },
            // 点击进入详情图片得编辑
            ImgsBian: function (e, e1) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1) + '&token=' + token
            },
            // 编辑详情页说明图
            Imgsxiangshuo: function (e, e1, e2) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1) + '&routeid=' + e2 + '&token=' + token
            },
            shouImgsBian: function (e, e1) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1) + '&token=' + token
            }
        },
        mounted: function () {
            this.firListshow();
            this.showfirstImgs();
            this.showRich();
        }
    })

}