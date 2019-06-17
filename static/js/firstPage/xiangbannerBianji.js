// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    // var ids = location.search.replace('?routeid=', "")
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('routeid')    //ids
    var token = GetParameters('token')
    var np = new Vue({
        el:'#tall',
        data: {
            banner:''
        },
        methods:{
            showbanner:function () {
                axios.post(host+'/route/v1/api/route/get',{
                    id:parseInt(ids),
                    server:server,
                    token:token
                }).then((res) => {
                    np.banner = res.data.Body.Banner
                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 保存
            saves:function () {
                axios.post(host+'/route/v1/api/detailBanner/update',{
                    banner:JSON.parse(np.banner),
                        route_id:parseInt(ids),
                        server:server,
                        token:token
                }).then((res) => {
                    alert("编辑成功")
                    window.history.go(-1)  
                })
            }
        },
        mounted:function () {
            this.showbanner();
        }
    })
}