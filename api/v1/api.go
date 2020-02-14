package api

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/url-shortener/api/v1/auth"
	"github.com/nireo/url-shortener/api/v1/link"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.Engine) {
	routes := r.Group("/api")
	{
		auth.ApplyRoutes(routes)
		link.ApplyRoutes(routes)
	}
}
