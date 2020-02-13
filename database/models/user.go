package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/lib/common"
)

// User model
type User struct {
	gorm.Model
	Username string
	Password string
}

// Serialize user data
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"id":       user.ID,
		"username": user.Username,
	}
}

func (user *User) Read(m common.JSON) {
	user.ID = m["id"].(uint)
	user.Username = m["username"].(string)
}
