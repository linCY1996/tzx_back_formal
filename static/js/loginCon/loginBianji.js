// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
window.onload = function () {
    // 1:修改密码
    // 2：添加账号
    // 3：编辑账号
    // 4：重置密码
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]); //解决中文乱码

        } else {
            return null;
        }
    }
    var id = GetParameters('id') //管理员id
    var Class = GetParameters('class')
    var token = GetParameters('token')
    var channel_id = GetParameters('channel_id')
    var np = new Vue({
        el: '#tall',
        data: {
            addNum: false, //添加账号
            bianjiNum: true, //编辑账号
            modifyPwd: false, //修改密码
            rewritePwd: false, //重置密码
            qudao: [], //展示所有渠道
            channel_id: '', //选择的渠道id
            TouerNum: '', //添加账号
            new_Pwd: '', //重置密码第一次输入
            again_Pwd: '', //重置密码第二次输入
            old_Pwd: '', //修改密码的原密码
            uploadNew_Pwd: '', //修改密码的第一次输入的新密码
            uploadAgain_Pwd: '', //修改密码的第二次输入的新密码
            bianji_channel_id: '', //编辑账号   渠道id
            bianjiName: '', //编辑账号    账号
            Id: '', //对应的用户id
            bianjiNames: '', //修改密码的账户名
            userPwd: '', //编辑账号对应用户的密码
        },
        methods: {
            // 显示所有渠道
            showqudao: function () {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: 1,
                        page_size: 1000
                    },
                    server: server,
                    token: token
                }).then((res) => {
                    np.qudao = res.data.Body.list
                })
            },
            // 选择类型
            show_Class: function () {
                var that = this
                if (Class == '1') {
                    that.addNum = false
                    that.bianjiNum = false
                    that.modifyPwd = true
                    that.rewritePwd = false
                } else if (Class == '2') {
                    that.addNum = true
                    that.bianjiNum = false
                    that.modifyPwd = false
                    that.rewritePwd = false
                } else if (Class == '3') {
                    that.addNum = false
                    that.bianjiNum = true
                    that.modifyPwd = false
                    that.rewritePwd = false
                } else if (Class == '4') {
                    that.addNum = false
                    that.bianjiNum = false
                    that.modifyPwd = false
                    that.rewritePwd = true
                }
            },
            // 显示用户对应的信息
            showAdminster: function () {
                axios.post(host + '/user/v1/api/admin/get', {
                    id: parseInt(id),
                    server: server,
                    token: token
                }).then((res) => {
                    np.bianji_channel_id = res.data.Body.channel_id
                    np.bianjiName = res.data.Body.name
                    np.Id = res.data.Body.id
                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 添加账号
            addNums: function () {
                axios.post(host + '/user/v1/api/admin/add', {
                    channel_id: parseInt(np.channel_id),
                    name: np.TouerNum,
                    pwd: 'guest123',
                    server: server,
                    token: token
                }).then((res) => {
                    alert("添加成功")
                    window.history.go(-1)
                })
            },
            // 通过id来获取对应渠道用户的信息
            showQudaoUserMsgs: function () {
                axios.post(host + '/user/v1/api/admin/get', {
                    id: parseInt(id),
                    server: server
                }).then((res) => {
                    np.userPwd = res.data.Body.pwd
                })
            },
            // 编辑账号    
            saves: function () {
                axios.post(host + '/user/v1/api/admin/update', {
                    channel_id: parseInt(np.bianji_channel_id),
                    id: parseInt(id),
                    name: np.bianjiName,
                    pwd: np.userPwd,
                    server: server,
                    token: token
                }).then((res) => {
                    alert("编辑账号成功")
                    window.history.go(-1)
                })
            },
            // 修改密码
            updataPwd: function () {
                if (np.uploadNew_Pwd == np.uploadAgain_Pwd) {
                    axios.post(host + '/user/v1/api/admin/resetPwd', {
                        admin_id: parseInt(id),
                        // name: np.bianjiName, 
                        old_pwd:np.old_Pwd, 
                        confirm_pwd: np.uploadNew_Pwd,
                        new_pwd: np.uploadAgain_Pwd,
                        server: server,
                        token: token
                    }).then((res) => {
                        if(res.data.Body == '旧密码不对') {
                            alert(res.data.Body)
                        }else {
                            alert("密码修改成功")
                            window.history.go(-1)
                        }
                        // alert("重置密码成功")
                    })
                } else {
                    alert("请核对输入的密码是否一致")
                }
            },
            // 获取对应管理员账户信息
            getUserMsgs: function () {
                // console.log(token)
                axios.post(host + '/user/v1/api/admin/getByToken', {
                    server: server,
                    token: token
                }).then((res) => {
                    np.bianjiNames = res.data.Body.name
                })
            },

            // 重置密码
            chongzhiPwd: function () {
                if (np.new_Pwd == np.again_Pwd) {
                    axios.post(host + '/user/v1/api/admin/updatePwd', {
                        admin_id: parseInt(id),
                        name: np.bianjiName,
                        confirm_pwd: np.new_Pwd,
                        new_pwd: np.again_Pwd,
                        server: server,
                    }).then((res) => {
                        alert("修改密码成功")
                        window.history.go(-1)
                    })
                } else {
                    alert("请核对输入的密码是否一致")
                }
            }
        },
        mounted: function () {
            this.showqudao();
            this.show_Class();
            this.showAdminster();
            this.getUserMsgs();
            this.showQudaoUserMsgs();
        }
    })
}