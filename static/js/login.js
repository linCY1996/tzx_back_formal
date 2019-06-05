// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var np = new Vue({
        el:'#tall',
        data:{
          name:'',  //用户名
          passNum:'',  //密码  
        },
        methods:{
            logins:function () {
                axios.post(host+'/user/v1/api/admin/login',{
                    name:np.name,
                    pwd:np.passNum,
                    server:server
                }).then((res) => {
                    if(res.data.Code == 10000) {
                        window.location.href = '/view?token='+res.data.Body.token
                    }else {
                        alert("请核对信息")
                    }
                })
            }
        }

    })
}