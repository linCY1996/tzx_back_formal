// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    var np = new Vue({
        el: '#tall',
        data: {
            a_qudao_name: '', //添加渠道名称

        },
        methods: {

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
            },
            // // 保存
            // saves: function () {
            //     axios.post(host+'/route/v1/api/channel/update',{
            //         id:parseInt(np.b_jingqu_id),
            //         name: np.b_jingqu_name,
            //         server:"dev"
            //     }).then((res) => {
            //         alert("添加成功")
            //         window.history.go(-1)
            //     })
            // },
            // 添加
            posts: function () {
                axios.post(host + '/route/v1/api/channel/create', {
                    // id:parseInt(np.a_qudao_id),
                    name: np.a_qudao_name,
                    server: server
                }).then((res) => {
                    alert("添加成功")
                    window.history.go(-1)
                })
            },
        },
        mounted: function () {
            // this.showqudao();
        }
    })
}