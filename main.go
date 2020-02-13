package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.Default()
	port := "8080"

	app.Run(":" + port)
}
