// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
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
    var pid = GetParameters('pid')
    var channel_id = GetParameters('channel_id')
    var np = new Vue({
        el: '#tall',
        data: {
            tan_show_list: false,
            bianji_show: true,
            add_show: false,
            work: [],  //任务列表
            tan_show: false,   //弹出
            Id: -1,
            checkId: [],  //批量删除
            count: 0,   //任务数量
            first_page_show: false, //首页信息显示
            xiangqing_page_show: false, //详情信息显示
            xiangqing_page_show_bianji:true,  //编辑POI任务
            mengban:false,
        },
        methods: {
            showmengben:function () {
                var that = this
                that.mengban = true
            },
            showwork: function () {
                var that = this
                axios.post(host + '/route/v1/api/task/list', {
                    page: {
                        page_index: 1,
                        page_size: 50
                    },
                    poi_id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    np.mengban = false
                    np.work = res.data.Body.list
                    var works = np.work
                    for (var i = 0; i < np.work.length; i++) {
                        // np.work[i].TaskCopyStruct[0].text[0].content = JSON.stringify(that.b64DecodeUnicode(np.work[i].TaskCopyStruct[0].text[0].content))
                        np.work[i].TaskCopy = JSON.parse(that.b64DecodeUnicode(np.work[i].TaskCopy))
                        if (works[i].Class == 1) {
                            np.work[i].Class = '1-文字说明任务'
                        } else if (works[i].Class == 2) {
                            np.work[i].Class = '2-上传图片任务'
                        } else if (works[i].Class == 4) {
                            np.work[i].Class = '4-文字选择任务'
                        } else if (works[i].Class == 8) {
                            np.work[i].Class = '8-图片选择任务'
                        } else if (works[i].Class == 16) {
                            np.work[i].Class = '16-沉浸式任务'
                        }
                        np.work[i].OptArr = JSON.parse(works[i].OptArr)
                    }
                    console.log(np.work)
                    np.count = np.work.length
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
            // 编辑
            bianji: function () {
                np.bianji_show = true
                np.add_show = false
            },
            // 添加
            add: function () {
                np.bianji_show = false
                np.add_show = true
                window.location.href = '/poiaddtask?id=' + ids + '&count=' + np.count + '&token=' + token
            },
            // 保存
            saves: function () {
                // window.location.href = '/poiadd3'
            },
            // 添加
            posts: function () {
                // window.location.href = '/poiadd3'
            },
            // 删除导游
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
                // console.log(np.Id)
                var that = this
                axios.post(host + '/route/v1/api/task/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token: token
                }).then((res) => {
                    // alert("删除成功")
                    that.showwork()
                    np.tan_show = false
                })
            },
            bian_link: function (e) {

                window.location.href = '/poibianji?id=' + e + '&poiId=' + ids + '&token=' + token
            },
            // 批量删除
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/task/del', {
                    id: parseInt(e),
                    server: server,
                    token: token
                }).then((res) => {
                    that.showwork()

                })
            },
            delAll: function () {
                np.tan_show_list = true

            },
            Refuse: function () {
                np.tan_show_list = false
            },
            Delete: function () {
                var that = this
                // nm.tan_show = true
                np.tan_show_list = false
                for (var i = 0; i < np.checkId.length; i++) {
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
            },
             // 首页信息显示
             shou_show: function () {
                np.first_page_show = true
                np.xiangqing_page_show = false
                np.xiangqing_page_show_bianji = false
                window.location.href = '/poiadd1?id='+ids+'&token='+token+'&fshow='+np.first_page_show+'&xshow='+np.xiangqing_page_show+'&channel_id='+channel_id
            },
            detail_show: function () {
                if(pid != 0) {
                    alert("该类型不需要编辑此页面")
                }else {
                    np.first_page_show = false
                    np.xiangqing_page_show = true
                    np.xiangqing_page_show_bianji = false
                    window.location.href = '/poiadd1?id='+ids+'&token='+token+'&fshow='+np.first_page_show+'&xshow='+np.xiangqing_page_show+'&channel_id='+channel_id
                }
            },
            bian_show:function () {
                if(np.poiClass == 1) {
                    np.first_page_show = false
                    np.xiangqing_page_show = false
                    np.xiangqing_page_show_bianji = true
                    window.location.href = '/poiadd3?id=' + ids + '&token=' + token+'&channel_id='+channel_id
                }else {
                    alert("该类型不需要编辑此页面")
                }
            }
        },
        mounted: function () {
            this.showmengben()
            this.showwork()
        }
    })
}