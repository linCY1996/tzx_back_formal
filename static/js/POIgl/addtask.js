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
    var id = GetParameters('id')    //
    var count = GetParameters('count')
    var token = GetParameters('token')
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
            wenziTaskId: '',   //文字跳转得任务id   ////// 
            imgTaskId: '',   //图片跳转得任务id     //////

            // 沉浸式
            label: 1,   //沉浸式任务下标
            Addchenjinshow: true,   //显示添加沉浸的点击图标
            delChen: false,   //删除沉浸任务得子任务得删除图标显示

            //上传图片任务
            work_Imgs: '',  //任务配图
            choose_wenzi: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],
            //图片选择任务
            choose_Img: [{ ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }, { ctx: '', target: '' }],
            // 沉浸式任务
            choose_chenjin: [{ ctx: '', target: '', thumb: '', fore: '', back: '', ln: 0, url: '', delIndex: 0 }],
            // 默认给任务1/2  
            chooses: [{ ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }, { ctx: '', target: -2 }],
        },
        methods: {
            // 添加沉浸式任务

            addChenjin: function () {
                np.label += 1
                if (np.label == 4) {
                    np.Addchenjinshow = false
                }
                if (np.label == 1) {
                    np.choose_chenjin = [{ ctx: '', target: '', thumb: '', fore: '', back: '', ln: parseInt(0), url: '', delIndex: 0 }]
                } else if (np.label == 2) {
                    for (var i = 0; i < 1; i++) {
                        np.choose_chenjin = [{ ctx: np.choose_chenjin[0].ctx, target: np.choose_chenjin[0].target, thumb: np.choose_chenjin[0].thumb, fore: np.choose_chenjin[0].fore, back: np.choose_chenjin[0].back, ln: parseInt(np.choose_chenjin[0].ln), url: np.choose_chenjin[0].url, delIndex: 0 }, { ctx: '', target: '', thumb: '', fore: '', back: '', ln: parseInt(0), url: '', delIndex: 1 }]
                        np.delChen = true
                    }
                } else if (np.label == 3) {
                    for (var i = 0; i < 2; i++) {
                        np.choose_chenjin = [{ ctx: np.choose_chenjin[0].ctx, target: np.choose_chenjin[0].target, thumb: np.choose_chenjin[0].thumb, fore: np.choose_chenjin[0].fore, back: np.choose_chenjin[0].back, ln: parseInt(np.choose_chenjin[0].ln), url: np.choose_chenjin[0].url, delIndex: 0 }, { ctx: np.choose_chenjin[1].ctx, target: np.choose_chenjin[1].target, thumb: np.choose_chenjin[1].thumb, fore: np.choose_chenjin[1].fore, back: np.choose_chenjin[1].back, ln: parseInt(np.choose_chenjin[1].ln), url: np.choose_chenjin[1].url, delIndex: 1 }, { ctx: '', target: '', thumb: '', fore: '', back: '', ln: parseInt(0), url: '', delIndex: 2 }]
                    }
                    np.delChen = true
                } else if (np.label == 4) {
                    for (var i = 0; i < 3; i++) {
                        np.choose_chenjin = [{ ctx: np.choose_chenjin[0].ctx, target: np.choose_chenjin[0].target, thumb: np.choose_chenjin[0].thumb, fore: np.choose_chenjin[0].fore, back: np.choose_chenjin[0].back, ln: parseInt(np.choose_chenjin[0].ln), url: np.choose_chenjin[0].url, delIndex: 0 }, { ctx: np.choose_chenjin[1].ctx, target: np.choose_chenjin[1].target, thumb: np.choose_chenjin[1].thumb, fore: np.choose_chenjin[1].fore, back: np.choose_chenjin[1].back, ln: parseInt(np.choose_chenjin[1].ln), url: np.choose_chenjin[1].url, delIndex: 1 }, { ctx: np.choose_chenjin[2].ctx, target: np.choose_chenjin[2].target, thumb: np.choose_chenjin[2].thumb, fore: np.choose_chenjin[2].fore, back: np.choose_chenjin[2].back, ln: parseInt(np.choose_chenjin[2].ln), url: np.choose_chenjin[2].url, delIndex: 2 }, { ctx: '', target: '', thumb: '', fore: '', back: '', ln: parseInt(0), url: '', delIndex: 3 }]
                    }
                    np.delChen = true
                }
            },
            // 删除沉浸式任务得子任务
            delChenjin: function (e) {
                var index = parseInt(e)
                np.choose_chenjin.splice(index,1)
                np.label = np.choose_chenjin.length
                if(np.choose_chenjin.length == 1) {
                    np.delChen = false
                }else {
                    np.delChen = true
                }
                if(np.label == 4){
                    np.Addchenjinshow = false
                }else {
                    np.Addchenjinshow = true
                }
            },
            saves: function () {
                // console.log(parseInt(np.chooseMsg.slice(0,1)))
                var workimg = np.work_Imgs.split(',')
                var workImgs = JSON.stringify(workimg)
                var sorts = np.workSort == '' ? count++ : np.workSort   //三元

                if (np.chooseMsg == '1-文字说明任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    if(np.wenziTaskId == '') {
                        np.wenziTaskId = -2
                    }
                    axios.post(host + '/route/v1/api/task/create', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(ids),
                        server: server,
                        optArr: '[{"ctx":"好的","target":' + parseInt(np.wenziTaskId) + '}]',
                        sort: parseInt(sorts),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]',
                        token: token
                    }).then((res) => {
                        // console.log(res)
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '2-上传图片任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    if(np.imgTaskId == '') {
                        np.imgTaskId = -2
                    }
                    axios.post(host + '/route/v1/api/task/create', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(ids),
                        server: server,
                        optArr: '[{"ctx":"好的","target":' + parseInt(np.imgTaskId) + '}]',
                        sort: parseInt(sorts),
                        taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]',
                        token: token
                    }).then((res) => {
                        // console.log(res)
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '4-文字选择任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
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
                            server: server,
                            optArr: JSON.stringify(choose_wenzi),
                            sort: parseInt(sorts),
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]',
                            token: token
                        }).then((res) => {
                            // console.log(res)
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                } else if (np.chooseMsg == '8-图片选择任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
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
                            taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]',
                            token: token
                        }).then((res) => {
                            // console.log(res)
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                } else if (np.chooseMsg == '16-沉浸式任务') {
                    if (workImgs == '[""]') {
                        workImgs = '[]'
                    }
                    var chenjin_length = np.choose_chenjin.length
                    var choose_chenjin = []
                    for (var i = 0; i < chenjin_length; i++) {
                        choose_chenjin.push({
                            ctx: np.choose_chenjin[i].ctx,
                            target: parseInt(np.choose_chenjin[i].target),
                            thumb: np.choose_chenjin[i].thumb,
                            fore: np.choose_chenjin[i].fore,
                            back: np.choose_chenjin[i].back,
                            ln: parseInt(np.choose_chenjin[i].ln),
                            url: np.choose_chenjin[i].url
                        })
                    }
                    // console.log(choose_chenjin)
                    // for(var j = 0;j<chenjin_length;j++) {
                        if(choose_chenjin[chenjin_length-1].ctx == '' || String(choose_chenjin[chenjin_length-1].target) == 'NaN' || choose_chenjin[chenjin_length-1].thumb == '' || choose_chenjin[chenjin_length-1].back == '' || String(choose_chenjin[chenjin_length-1].ln) == 'NaN' || choose_chenjin[chenjin_length-1].url == '') {
                            alert("信息填写不完整，请把信息填写完整后再提交")
                        } else {
                            axios.post(host + '/route/v1/api/task/create', {
                                buttonCopy: '任务按钮',
                                class: parseInt(np.chooseMsg.slice(0, 2)),
                                imgArr: workImgs,
                                poiId: parseInt(ids),
                                server: server,
                                optArr: JSON.stringify(choose_chenjin),
                                sort: parseInt(sorts),
                                taskCopy: '[{"text":[{"content":"' + np.work_Msg + '","br":0,"color":"","bold":0}],"audio":"' + np.workAudio + '"}]',
                                token: token
                            }).then((res) => {
                                console.log(res.data.Body)
                                alert("编辑成功")
                                window.history.go(-1)
                            })
                        }
                    // }
                   
                }
            },

        },
        mounted: function () {
        },
        watch: {

        }
    })
}