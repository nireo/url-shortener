package main

import (
	"github.com/gin-gonic/gin"
	v1 "github.com/nireo/url-shortener/api/v1"
	"github.com/nireo/url-shortener/database"
)

func main() {
	port := "8080"
	db, err := database.InitDB()
	if err != nil {
		panic(err)
	}

	app := gin.Default()
	app.Use(database.Inject(db))
	v1.ApplyRoutes(app)
	app.Run(":" + port)
}
