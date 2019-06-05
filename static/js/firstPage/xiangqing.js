// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")

    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]); //解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('id') //pname
    var fir_show = GetParameters('fshow')
    var Sec_show = GetParameters('sshow')
    var np = new Vue({
        el: '#tall',
        data: {
            // yaduo: false,      //亚朵
            bianji_show: true,
            add_show: false,
            first_Img: '', //首页信息
            detail_Img: [],
            tan_show: false,
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

        },
        methods: {

            firListshow: function () {
                axios.post(host + '/route/v1/api/homePage/getRouteIdList', {
                    channel_id: parseInt(ids),
                    server: server

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
                                    banner: plist[i].banner
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
                    server: server
                }).then((res) => {
                    np.tan_show = false
                    that.firListshow()
                    that.showfirstImgs()
                })
            },

            //添加首页banner
            addshouBanner: function () {
                var type = 'banner'
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids
            },

            //添加首页imgarr
            addshouImgArr: function () {
                var type = 'imgarr'
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids
            },
            // 详情页banner
            ImgsxiangBannerBian: function (e) {
                window.location.href = '/firstxiangbianji?routeid=' + e
            },
            // 详情页说明页
            addxiangqingDetail: function (e) {
                var type = ""
                window.location.href = '/firstPageadd?type=' + encodeURI(type) + '&channel_id=' + ids+'&routeid='+e
            },

            // 首页信息显示
            shou_show: function () {
                np.first_page_show = true
                np.xiangqing_page_show = false
            },
            detail_show: function () {
                np.first_page_show = false
                np.xiangqing_page_show = true
            },
            // 点击进入详情图片得编辑
            ImgsBian: function (e, e1) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1)
            },
            // 编辑详情页说明图
            Imgsxiangshuo:function (e,e1,e2) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1)+'&routeid='+e2
            },
            shouImgsBian: function (e, e1) {
                window.location.href = '/firstPagebianji?id=' + e + '&channel_id=' + ids + '&type=' + encodeURI(e1)
            }
        },
        mounted: function () {
            this.firListshow();
            this.showfirstImgs();
        }
    })


}