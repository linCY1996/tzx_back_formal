// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
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
                    // console.log(res.data)
                    // alert("123")
                    if(res.data.Code == 10000) {

                        window.location.href = '/view?token='+res.data.Body.token+'&channel_id='+res.data.Body.channel_id
                    }else {
                        alert("账号或密码错误，请重新输入")
                    }
                })
            },
        },
        created () {
            document.onkeyup = function (params) {
                if(params.keyCode == 13) {
                    $("#btn").trigger("click")
                }
                // console.log(params)
            }
        }

    })
    
}