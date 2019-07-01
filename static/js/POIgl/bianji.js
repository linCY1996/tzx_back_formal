// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
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
    var ids = GetParameters('id')    //taskid
    var poiId = GetParameters('poiId')    //poiID
    var token = GetParameters('token')
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
            label: 0,   //沉浸式任务下标
            Addchenjinshow: true,   //显示添加沉浸的点击图标
            delChen: false,   //删除沉浸任务得子任务得删除图标显示
            delIndex: -1,   //删除沉浸子任务
            //上传图片任务
            work_Imgs: '',  //任务配图
            // //文字选择任务
            // choose_wenzi: [],
            //图片选择任务
            choose_Img: [],
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
                np.choose_chenjin.splice(5, 0, { ctx: '', target: '', thumb: '', fore: '', back: '', ln: parseInt(0), url: '', delIndex: np.label })
                if (np.choose_chenjin.length >= 4) {
                    np.Addchenjinshow = false
                }
            },
            // 删除沉浸任务中得子任务
            delChenjin: function (e) {
                for (var i = 0; i < np.choose_chenjin.length; i++) {
                    if (e == np.choose_chenjin[i].delIndex) {
                        np.delIndex = i
                    }
                }
                np.choose_chenjin.splice(np.delIndex, 1)
                if (np.choose_chenjin.length != 4) {
                    np.Addchenjinshow = true
                }
            },
            showMsg: function () {
                var that = this
                axios.post(host + '/route/v1/api/task/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    ue.create()
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
                    } else if (workClass == 16) {
                        np.chooseMsg = '16-沉浸式任务'
                    }
                    np.workSort = res.data.Body.Sort
                    np.workBtn = res.data.Body.ButtonCopy
                    var wAudio = JSON.parse(res.data.Body.TaskCopy)
                    np.workAudio = wAudio[0].audio
                    var imgArr = res.data.Body.ImgArr
                    if (imgArr == '[]') {
                        np.work_Imgs = ''
                    } else {
                        np.work_Imgs = imgArr.substring(2, imgArr.length - 2)
                    }
                    np.work_Msg = wAudio[0].text
                    ue.txt.html(np.work_Msg)

                    if (workClass == 1) {
                        // console.log(JSON.stringify(res.data.Body.OptArr))
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        np.wenziTaskId = OptArr[0].target
                    } else if (workClass == 2) {
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        np.imgTaskId = OptArr[0].target
                    } else if (workClass == 4) {
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        for (var i = 0; i < OptArr.length; i++) {
                            np.choose_wenzi[i].ctx = OptArr[i].ctx
                            np.choose_wenzi[i].target = OptArr[i].target
                        }
                    } else if (workClass == 8) {
                        var OptArr = JSON.parse(res.data.Body.OptArr)
                        for (var i = 0; i < OptArr.length; i++) {
                            np.choose_Img[i].ctx = OptArr[i].ctx
                            np.choose_Img[i].target = OptArr[i].target
                        }
                    } else if (workClass == 16) {
                        var optArr = res.data.Body.OptArr
                        var OptArr = JSON.parse(optArr)
                        var choose_chenjin = []
                        for (var i = 0; i < OptArr.length; i++) {
                            choose_chenjin.push({
                                ctx: OptArr[i].ctx,
                                target: OptArr[i].target,
                                thumb: OptArr[i].thumb,
                                fore: OptArr[i].fore,
                                back: OptArr[i].back,
                                ln: OptArr[i].ln,
                                url: OptArr[i].url,
                                delIndex: i
                            })
                        }
                        np.choose_chenjin = choose_chenjin
                        np.label = OptArr.length
                        if (np.label == 4) {
                            np.Addchenjinshow = false
                        } else {
                            np.Addchenjinshow = true
                        }
                        if (np.label == 1) {
                            np.delChen = false
                        } else {
                            np.delChen = true
                        }
                    }
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
            // 保存
            saves: function () {
                var workImgs = '["' + np.work_Imgs + '"]'
                if (workImgs == '[""]') {
                    workImgs = '[]'
                }
                var s = ue.txt.html()
                var mr = s.replace(/\"/g, '\\"')
                var mrDuihua = mr.replace(/\\&quot;/g, '')
                if (np.chooseMsg == '1-文字说明任务') {
                    if (np.wenziTaskId == '') {
                        np.wenziTaskId = -2
                    }
                    axios.post(host + '/route/v1/api/task/update', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(poiId),
                        id: parseInt(ids),
                        server: server,
                        sort: parseInt(np.workSort),
                        optArr: '[{"ctx":"好的","target":' + parseInt(np.wenziTaskId) + '}]',
                        taskCopy: '[{"text":"' + mrDuihua + '","audio":"' + np.workAudio + '"}]',
                        token: token
                    }).then((res) => {
                        alert("编辑成功")
                        window.history.go(-1)
                    })
                } else if (np.chooseMsg == '2-上传图片任务') {
                    if (np.imgTaskId == '') {
                        np.imgTaskId = -2
                    }
                    axios.post(host + '/route/v1/api/task/update', {
                        buttonCopy: np.workBtn,
                        class: parseInt(np.chooseMsg.slice(0, 1)),
                        imgArr: workImgs,
                        poiId: parseInt(poiId),
                        id: parseInt(ids),
                        server: server,
                        sort: parseInt(np.workSort),
                        optArr: '[{"ctx":"好的","target":' + parseInt(np.imgTaskId) + '}]',
                        taskCopy: '[{"text":"' + mrDuihua + '","audio":"' + np.workAudio + '"}]',
                        token: token
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
                            taskCopy: '[{"text":"' + mrDuihua + '","audio":"' + np.workAudio + '"}]',
                            token: token
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
                            taskCopy: '[{"text":"' + mrDuihua + '","audio":"' + np.workAudio + '"}]',
                            token: token
                        }).then((res) => {
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                } else if (np.chooseMsg == '16-沉浸式任务') {
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
                    if (choose_chenjin[chenjin_length - 1].ctx == '' || String(choose_chenjin[chenjin_length - 1].target) == 'NaN' || choose_chenjin[chenjin_length - 1].thumb == '' || choose_chenjin[chenjin_length - 1].back == '' || String(choose_chenjin[chenjin_length - 1].ln) == 'NaN' || choose_chenjin[chenjin_length - 1].url == '') {
                        alert("信息填写不完整，请把信息填写完整后再提交")
                    } else {
                        axios.post(host + '/route/v1/api/task/update', {
                            buttonCopy: '任务按钮',
                            class: parseInt(np.chooseMsg.slice(0, 2)),
                            imgArr: workImgs,
                            poiId: parseInt(poiId),
                            server: server,
                            id: parseInt(ids),
                            optArr: JSON.stringify(choose_chenjin),
                            sort: parseInt(np.workSort),
                            taskCopy: '[{"text":"' + mrDuihua + '","audio":"' + np.workAudio + '"}]',
                            token: token
                        }).then((res) => {
                            alert("编辑成功")
                            window.history.go(-1)
                        })
                    }
                }
            },

        },
        mounted: function () {
            this.showMsg();
            // this.addchenjinshow();
        },
        watch: {
            delChen: function () {
                if (np.label == 1) {
                    np.delChen = false
                }
            }
        }
    })
}