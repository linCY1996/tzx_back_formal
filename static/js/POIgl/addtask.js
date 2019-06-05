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
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var id = GetParameters('id')    //pname
    console.log("id", id)
    var count = GetParameters('count')
    console.log("count", count)
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
            choose_wenzi: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],
            //图片选择任务
            choose_Img: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],

             // 默认给任务1/2  
             chooses: [{ ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }],
        },
        methods: {

            saves: function () {
                // console.log(parseInt(np.chooseMsg.slice(0,1)))
                var workimg = np.work_Imgs.split(',')
                var workImgs = JSON.stringify(workimg)
                console.log("workimg",workimg) 
                var sorts = np.workSort == '' ? count++ : np.workSort   //三元

                if (np.chooseMsg == '1-文字说明任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    axios.post(host + '/route/v1/api/task/create', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(ids),
                        server: server,
                        optArr: JSON.stringify(np.chooses),
                        sort: parseInt(sorts),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                    }).then((res) => {
                        // console.log(res)
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '2-上传图片任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    axios.post(host + '/route/v1/api/task/create', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(ids),
                        server: server,
                        optArr: JSON.stringify(np.chooses),
                        sort: parseInt(sorts),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                    }).then((res) => {
                        // console.log(res)
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '4-文字选择任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    // console.log("====",workImgs)
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
                    if (np.choose_wenzi[t].target == '') {
                        alert("请补全跳转id")
                    } else {
                        axios.post(host + '/route/v1/api/task/create', {
                            buttonCopy: "任务按钮",
                            class: parseInt(np.chooseMsg.slice(0, 1)),
                            imgArr: workImgs,
                            poiId: parseInt(ids),
                            server:server,
                            optArr: JSON.stringify(choose_wenzi),
                            sort: parseInt(sorts),
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                        }).then((res) => {
                            // console.log(res)
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
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    if (np.choose_Img[p].target == '') {
                        alert("请补全跳转id")
                    } else {
                        axios.post(host + '/route/v1/api/task/create', {
                            buttonCopy: "任务按钮",
                            class: parseInt(np.chooseMsg.slice(0, 1)),
                            imgArr: workImgs,
                            poiId: parseInt(ids),
                            server: server,
                            optArr: JSON.stringify(choose_Img),
                            sort: parseInt(sorts),
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]'
                        }).then((res) => {
                            // console.log(res)
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                }
            },

        },
        mounted: function () {
        },
        watch: {

        }
    })
}