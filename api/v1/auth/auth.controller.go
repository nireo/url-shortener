package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/database/models"
	"golang.org/x/crypto/bcrypt"
)

// User type alias
type User = models.User

func hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func checkHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func register(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var exists User
	if err := db.Where("username = ?", requestBody.Username).First(&exists).Error; err != nil {
		c.AbortWithStatus(409)
		return
	}

	hash, err := hash(requestBody.Password)
	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	user := User{
		Username: requestBody.Username,
		Password: hash,
	}

	db.NewRecord(user)
	db.Create(&user)

	c.JSON(200, user.Serialize())
}

func login(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody).Error; err != nil {
		c.AbortWithStatus(401)
		return
	}

	var user User
	if err := db.Where("username = ?", requestBody.Username).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !checkHash(requestBody.Password, user.Password) {
		c.AbortWithStatus(401)
		return
	}

	c.JSON(200, user.Serialize())
}
