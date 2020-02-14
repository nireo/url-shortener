package link

import (
	"github.com/gin-gonic/gin"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/link")
	{
		auth.POST("/create", create)
		auth.DELETE("/:id", delete)
		auth.GET("/:id", getLink)
	}
}
