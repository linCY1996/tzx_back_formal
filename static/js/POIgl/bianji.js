// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    // var ids = location.search.replace('?id=', "")
    // console.log(ids)

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
    console.log("id", ids)
    var poiId = GetParameters('poiId')    //poiID
    console.log("poiId", poiId)

    var np = new Vue({
        el: '#tall',
        data: {
            show_wenzi_shouming: false,
            show_tupian_shouming: false,
            show_wenzi_choose: false,
            show_tupian_choose: false,
            workId: '',   //任务ID
            chooseMsg: '',   //任务选择类型
            workSort: '',  //任务排序
            work_Msg: '',  //任务内容
            workBtn: '', //任务按钮文字
            workAudio: '',  //任务语音

            //上传图片任务
            work_Imgs: '',  //任务配图
            // //文字选择任务
            // choose_wenzi: [],
            //图片选择任务
            choose_Img: [],
            choose_wenzi: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],
            //图片选择任务
            choose_Img: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],

            // 默认给任务1/2  
            chooses: [{ ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }],
        },
        methods: {
            showMsg: function () {
                var that = this
                axios.post(host + '/route/v1/api/task/get', {
                    id: parseInt(ids),
                    server: server
                }).then((res) => {
                    np.workId = res.data.Body.Id
                    var workClass = res.data.Body.Class
                    if (workClass == 1) {
                        np.chooseMsg = '1-文字说明任务'
                    } else if (workClass == 2) {
                        np.chooseMsg = '2-上传图片任务'
                    } else if (workClass == 4) {
                        np.chooseMsg = '4-文字选择任务'
                    } else if (workClass == 8) {
                        np.chooseMsg = '8-图片选择任务'
                    }
                    np.workSort = res.data.Body.Sort
                    np.workBtn = res.data.Body.ButtonCopy
                    var wAudio = res.data.Body.TaskCopyStruct
                    np.workAudio = wAudio[0].audio
                    var imgArr = res.data.Body.ImgArr
                    np.work_Imgs = imgArr.substring(1,imgArr.length-1)
                    var work_Msgs = JSON.stringify(that.b64DecodeUnicode(wAudio[0].text[0].content))
                    np.work_Msg = work_Msgs.substring(1,work_Msgs.length-1)
                    if (workClass == 4) {
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        for(var i = 0;i<OptArr.length;i++) {
                            np.choose_wenzi[i].ctx = OptArr[i].ctx
                            np.choose_wenzi[i].target = OptArr[i].target
                        }
                    } else if (workClass == 8) {
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        for(var i = 0;i<OptArr.length;i++) {
                            np.choose_Img[i].ctx = OptArr[i].ctx
                            np.choose_Img[i].target = OptArr[i].target
                        }
                    }
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
                var workImgs = '['+np.work_Imgs+']'
                if(np.chooseMsg == '1-文字说明任务'){
                    axios.post(host + '/route/v1/api/task/update', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(poiId),
                        id: parseInt(ids),
                        server: server,
                        sort: parseInt(np.workSort),
                        optArr: JSON.stringify(np.chooses),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                    }).then((res) => {
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '2-上传图片任务') {
                    axios.post(host + '/route/v1/api/task/update', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(poiId),
                        id: parseInt(ids),
                        server: server,
                        sort: parseInt(np.workSort),
                        optArr: JSON.stringify(np.chooses),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                    }).then((res) => {
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '4-文字选择任务') {
                    var t = 0   //选择文字
                    var choose_wenzi = []
                    for (var i = 0; i < np.choose_wenzi.length; i++) {
                        if (np.choose_wenzi[i].ctx != '') {
                            t = i
                        }
                    }
                    for (var j = 0; j < t + 1; j++) {
                        choose_wenzi.push({
                            ctx: np.choose_wenzi[j].ctx,
                            target: parseInt(np.choose_wenzi[j].target)
                        })
                    }
                    // console.log("4=",workImgs)
                    
                    if (np.choose_wenzi[t].target == '') {
                        alert("请补全跳转id")
                    } else {
                        axios.post(host + '/route/v1/api/task/update', {
                            buttonCopy: "任务按钮",
                            class: parseInt(np.chooseMsg.slice(0, 1)),
                            imgArr: workImgs,
                            poiId: parseInt(poiId),
                            id: parseInt(ids),
                            server: server,
                            optArr: JSON.stringify(choose_wenzi),
                            sort: parseInt(np.workSort),
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                        }).then((res) => {
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                } else if (np.chooseMsg == '8-图片选择任务') {
                    // 选择图片
                    var p = 0
                    var choose_Img = []
                    for (var i = 0; i < np.choose_Img.length; i++) {
                        if (np.choose_Img[i].ctx != '') {
                            p = i
                        }
                    }
                    for (var x = 0; x < p + 1; x++) {
                        choose_Img.push({
                            ctx: np.choose_Img[x].ctx,
                            target: parseInt(np.choose_Img[x].target)
                        })
                    }
                    console.log("8=",workImgs)
                    if (np.choose_Img[p].target == '') {
                        alert("请补全跳转id")
                    } else {
                        axios.post(host + '/route/v1/api/task/update', {
                            buttonCopy: "任务按钮",
                            class: parseInt(np.chooseMsg.slice(0, 1)),
                            imgArr: workImgs,
                            poiId: parseInt(poiId),
                            id: parseInt(ids),
                            server: server,
                            optArr: JSON.stringify(choose_Img),
                            sort: parseInt(np.workSort),
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                        }).then((res) => {
                            console.log(res.data)
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                }
            },
        },
        mounted: function () {
            this.showMsg()
        },
        watch: {

        }
    })
}