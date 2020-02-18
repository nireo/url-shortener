package link

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/url-shortener/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/link")
	{
		auth.POST("/create", middlewares.Authorized, create)
		auth.POST("/anonymous", anonymous)
		auth.DELETE("/:id", delete)
		auth.GET("/:id", getLink)
		auth.GET("/", middlewares.Authorized, getUserLink)
	}
}
