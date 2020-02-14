package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/url-shortener/lib/common"
)

// Link model
type Link struct {
	gorm.Model
	Original string
	UUID     string
}

// Serialize user data
func (link *Link) Serialize() common.JSON {
	return common.JSON{
		"created_at": link.CreatedAt,
		"uuid":       link.UUID,
		"original":   link.Original,
	}
}
