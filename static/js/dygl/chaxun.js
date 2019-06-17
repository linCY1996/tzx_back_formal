// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    var name = decodeURI(ids)
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var name = GetParameters('id')    //taskid
    var token = GetParameters('token')    //taskid
    var nm = new Vue({
        el: '#tall',
        data: {
            tan_show_list:false,
            total: 0,
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show: false,   //弹窗
            Id: -1,    //点击删除得Id
            chaxun: '',  //条件查询信息
            checkId:[],  //选择

        },
        methods: {
            // 显示查询结果
            showchaxun: function () {
                axios.post(host + '/route/v1/api/get/guide/list', {
                    guide_name:name,
                    page:{
                        page_index:1,
                        page_size:50
                    },
                    server: server,
                    token:token
                }).then((res) => {
                    nm.chaxun = res.data.Body.list
                    nm.total = res.data.Body.pager.total


                })
            },
            // 删除导游
            del: function (e) {
                var that = this
                nm.Id = e
                nm.tan_show = true

            },
            // 点击取消
            Cancels: function () {
                nm.tan_show = false
            },

            // 点击确认
            Confirms: function () {
                var that = this
                axios.post(host + '/route/v1/api/guide/del', {
                    id: parseInt(nm.Id),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showchaxun()
                    nm.tan_show = false
                })
            },
             // 跳转页面
             btn_link: function (e) {
                window.location.href = '/bianji?id=' + e +'&token='+token
            },
            // 批量删除
            delete:function (e) {
                var that = this
                axios.post(host + '/route/v1/api/guide/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showchaxun()
                    
                })
            },
            delAll:function () {
                nm.tan_show_list = true
                
            },
            Refuse:function () {
                nm.tan_show_list = false
            },
            Delete:function () {
                var that = this
                // nm.tan_show = true
                nm.tan_show_list = false
                for(var i = 0;i<nm.checkId.length;i++){
                    that.delete(nm.checkId[i])
                }
            },
        },
        mounted: function () {
            this.showchaxun()
        },
        
    })
}