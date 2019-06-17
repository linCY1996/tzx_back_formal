// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
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
    var token = GetParameters('token')    //taskid
    var np = new Vue({
        el: '#tall',
        data: {
            bianji_show: true,
            add_show: false,
            d_Name: '',
            d_Imgs: '',
        },
        methods: {
            bianjishow: function () {
                axios.post(host + '/route/v1/api/guide/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    np.d_Name = res.data.Body.Name
                    np.d_Imgs = res.data.Body.Img
                })
            },
            // 保存
            saves: function () {
                axios.post(host + '/route/v1/api/guide/update', {
                    name: np.d_Name,
                    img: np.d_Imgs,
                    server: server,
                    id: parseInt(ids),
                    token: token
                }).then((res) => {
                    console.log(res.data.Body)
                    alert("保存成功")
                    window.history.go(-1)
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
            // 添加
            add: function () {
                np.bianji_show = false
                np.add_show = true
            }
        },
        mounted: function () {
            this.bianjishow()
        }
    })
}