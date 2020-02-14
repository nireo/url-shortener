package link

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/database/models"
	"github.com/nireo/url-shortener/lib/common"
)

// Link type alias
type Link = models.Link

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	type RequestBody struct {
		Original string `json:"original" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(401)
		return
	}

	uuid := common.GenerateUUID()

	link := Link{
		Original: requestBody.Original,
		UUID:     uuid,
	}

	db.NewRecord(link)
	db.Create(&link)

	c.JSON(200, link.Serialize())
}
