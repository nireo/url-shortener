package auth

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/database/models"
	"github.com/nireo/url-shortener/lib/common"
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

func generateToken(data common.JSON) (string, error) {
	date := time.Now().Add(time.Hour * 24 * 7)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": data,
		"exp":  date.Unix(),
	})

	tokenString, err := token.SignedString([]byte("temporary secret"))
	return tokenString, err
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
	if err := db.Where("username = ?", requestBody.Username).First(&exists).Error; err == nil {
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

	serialized := user.Serialize()
	token, err := generateToken(serialized)

	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(200, common.JSON{
		"user":  serialized,
		"token": token,
	})
}

func login(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var user User
	if err := db.Where("username = ?", body.Username).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if !checkHash(body.Password, user.Password) {
		c.AbortWithStatus(401)
		return
	}

	serialized := user.Serialize()
	token, err := generateToken(serialized)

	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	c.JSON(200, common.JSON{
		"user":  user.Serialize(),
		"token": token,
	})
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	db.Delete(&user)
	c.Status(204)
}
