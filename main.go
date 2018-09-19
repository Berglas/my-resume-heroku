package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"time"
)

//var gConn *sql.DB
var gTempData templateData

type templateData struct {
	Version string
}

func main() {
	//設定資料庫
	// gConn = sqlutil.Conn("host=127.0.0.1 port=5433 dbname=resume user=postgres password=1234 sslmode=disable")
	// if gConn == nil {
	// 	return
	// }
	// defer gConn.Close()

	//設定路由/路徑
	fmt.Println("start")
	http.HandleFunc("/", Home)
	http.Handle("/css/", http.FileServer(http.Dir("")))
	http.Handle("/js/", http.FileServer(http.Dir("")))
	http.Handle("/image/", http.FileServer(http.Dir("")))
	http.Handle("/fonts/", http.FileServer(http.Dir("")))
	//設定Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "443"
	}
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	gTempData.Version = time.Now().Format("20180911010203")
	t, _ := template.ParseFiles("Home.html")
	t.Execute(w, gTempData)
}
