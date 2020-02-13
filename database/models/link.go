package models

import (
	"github.com/jinzhu/gorm"
)

// Link model
type Link struct {
	gorm.Model
	Original string
	UUID     string
}
