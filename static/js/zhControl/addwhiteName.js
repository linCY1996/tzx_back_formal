// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
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
    var token = GetParameters('token')
    var np = new Vue({
        el:'#tall',
        data:{
            uid:'',
        },
        methods:{
            posts:function () {
                axios.post(host+'/route/v1/api/bw/add',{
                    server:server,
                    token:token,
                    uid:parseInt(np.uid)
                }).then((res) => {
                    if(res.data.Body = "ok") {
                        alert("添加成功")
                        window.history.go(-1)
                    }else {
                        alert("没有该用户，添加失败")
                    }
                })
            },
             // 重置
             chongzhi: function () {
                window.location.reload()
            },
        },
        mounted() {
            
        }
    })

}