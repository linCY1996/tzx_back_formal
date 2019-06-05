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
            tan_show_list:false,
            bianji_show: true,
            add_show: false,
            work: [],  //任务列表
            tan_show: false,   //弹出
            Id: -1,
            checkId:[],  //批量删除
            count:0,   //任务数量
        },
        methods: {
            showwork: function () {
                var that = this
                axios.post(host + '/route/v1/api/task/list', {
                    page: {
                        page_index: 1,
                        page_size: 50
                    },
                    poi_id: parseInt(ids),
                    server: server
                }).then((res) => {
                    np.work = res.data.Body.list
                    console.log(np.work)
                    // for(var j = 0;j<np.work.length;j++) {
                    //     np.work.push({
                    //         Id:np.work[j].Id,
                    //         Class:np.work[j].Class,
                    //         Sort:np.work[j].Sort,
                    //         ImgArr:np.work[j].ImgArr,
                    //         ButtonCopy:np.work[j].ButtonCopy,
                    //         Audio:np.work[j].TaskCopyStruct[0].audio,
                    //         Content:np.work[j].TaskCopyStruct[0].text
                    //     })
                    // }
                    var works = np.work
                    for(var i = 0;i < np.work.length; i++) {
                        np.work[i].TaskCopyStruct[0].text[0].content = JSON.stringify(that.b64DecodeUnicode(np.work[i].TaskCopyStruct[0].text[0].content))
                        if(works[i].Class == 1) {
                            np.work[i].Class = '1-文字说明任务'
                        }else if(works[i].Class == 2) {
                            np.work[i].Class = '2-上传图片任务'
                        }else if(works[i].Class == 4) {
                            np.work[i].Class = '4-文字选择任务'
                        }else if(works[i].Class == 8) {
                            np.work[i].Class = '8-图片选择任务'
                        }
                    }

                    
                    console.log("=",np.work)
                    np.count = np.work.length
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
            // 编辑
            bianji: function () {
                np.bianji_show = true
                np.add_show = false
            },
            // 添加
            add: function () {
                np.bianji_show = false
                np.add_show = true
                window.location.href = '/poiaddtask?id='+ids+'&count='+np.count
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
                    server: server
                }).then((res) => {
                    // alert("删除成功")
                    that.showwork()
                    np.tan_show = false
                })
            },
            bian_link: function (e) {
                
                window.location.href = '/poibianji?id=' + e+'&poiId='+ids
            },
             // 批量删除
             delete:function (e) {
                var that = this
                console.log("e",e)
                axios.post(host + '/route/v1/api/task/del', {
                    id: parseInt(e),
                    server: server
                }).then((res) => {
                    console.log(res.data)
                    that.showwork()
                    
                })
            },
            delAll:function () {
                np.tan_show_list = true
                
            },
            Refuse:function () {
                np.tan_show_list = false
            },
            Delete:function () {
                var that = this
                // nm.tan_show = true
                np.tan_show_list = false
                console.log("checkId:",np.checkId)
                for(var i = 0;i<np.checkId.length;i++){
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
            },
        },
        mounted: function () {
            this.showwork()
        }
    })
}