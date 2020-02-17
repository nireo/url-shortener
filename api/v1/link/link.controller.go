package link

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/database/models"
	"github.com/nireo/url-shortener/lib/common"
)

// Link type alias
type Link = models.Link

// User type alias
type User = models.User

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	type RequestBody struct {
		Original string `json:"original" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	uuid := common.GenerateUUID()

	link := Link{
		Original: requestBody.Original,
		UUID:     uuid,
		User:     user,
		UserID:   user.ID,
	}

	db.NewRecord(link)
	db.Create(&link)

	c.JSON(200, link.Serialize())
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var link Link
	if err := db.Where("uuid = ?", id).First(&link).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&link)
	c.Status(204)
}

func getLink(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var link Link
	if err := db.Where("uuid = ?", id).First(&link).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	c.Redirect(302, link.Original)
}

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	type RequestBody struct {
		Original string `json:"original" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var link Link
	if err := db.Where("uuid = ?", id).First(&link).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	link.Original = requestBody.Original

	db.Save(&link)
	c.JSON(200, link.Serialize())
}

func anonymous(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	type RequestBody struct {
		Original string `json:"original" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(401)
		return
	}

	// get the anonymous user
	var user User
	if err := db.Where("id = ?", 1).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	uuid := common.GenerateUUID()
	link := Link{
		Original: requestBody.Original,
		UUID:     uuid,
		UserID:   user.ID,
		User:     user,
	}

	db.NewRecord(link)
	db.Create(&link)
	c.JSON(200, link.Serialize())
}

func getUserLink(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	var links []Link
	if err := db.Model(&user).Related(&links).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	serialized := make([]common.JSON, len(links), len(links))
	for index := range links {
		serialized[index] = links[index].Serialize()
	}

	c.JSON(200, serialized)
}
