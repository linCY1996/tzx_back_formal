package main

import (
	"net/http"
	"tzx_back_test/control"
)

func main() {
	http.Handle(`/static/`, http.StripPrefix(`/static/`, http.FileServer(http.Dir("static"))))

	http.HandleFunc(`/login`, control.Login)
	http.HandleFunc(`/view`, control.View)
	//导游管理
	http.HandleFunc(`/dygl`, control.Dygl)
	http.HandleFunc(`/bianji`, control.Bianji)
	http.HandleFunc(`/dygladd`, control.Dygl_add)
	http.HandleFunc(`/dyglchaxun`, control.Dygl_chaxun)
	//POI管理
	http.HandleFunc(`/poigl`, control.POIgl)
	http.HandleFunc(`/poibianji`, control.POIbianji)
	http.HandleFunc(`/poiadd1`, control.POI_add1)
	http.HandleFunc(`/poiadd2`, control.POI_add2)
	http.HandleFunc(`/poiadd3`, control.POI_add3)
	http.HandleFunc(`/poiaddtask`, control.POIAddTask)
	http.HandleFunc(`/poinowadd1`, control.POI_now_Add1)
	http.HandleFunc(`/poichaxun`, control.POI_chaxun)
	//线路管理
	http.HandleFunc(`/lxgl`, control.Lxgl)
	http.HandleFunc(`/lxbianji`, control.Lxbianji)
	http.HandleFunc(`/lxadd`, control.Lxadd)
	http.HandleFunc(`/lxdetail`, control.LxDetail)
	http.HandleFunc(`/lxchaxun`, control.Lxchaxun)
	//首页&详情页管理
	http.HandleFunc(`/firstPage`, control.FirstPagegl)
	http.HandleFunc(`/firstPagebianji`, control.FirstPagebianji)
	http.HandleFunc(`/firstPagexq`, control.FirstPageXQ)
	http.HandleFunc(`/firstPageadd`, control.FirstPageadd)
	http.HandleFunc(`/firchaxun`, control.FirstPagechaxun)
	http.HandleFunc(`/firstxiangbianji`, control.FirstPagexiangbianji)
	//渠道管理
	http.HandleFunc(`/qudaogl`, control.Qudaogl)
	http.HandleFunc(`/qudaobianji`, control.Qudaobianji)
	http.HandleFunc(`/qudaoadd`, control.Qudaoadd)
	http.HandleFunc(`/qudaochaxun`, control.Qudaochaxun)
	//版本控制
	http.HandleFunc(`/banben`, control.Banben)
	http.HandleFunc(`/banbenadd`, control.Banbenadd)
	http.HandleFunc(`/banbenbianji`, control.Banbainji)
	//账号管理
	http.HandleFunc(`/loginCon`, control.LoginCon)
	http.HandleFunc(`/loginBianji`, control.LoginConBianji)

	http.ListenAndServe(`:6933`, nil)
	//正式服

}
