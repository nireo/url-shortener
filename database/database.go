package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // sqlite config
	"github.com/nireo/url-shortener/database/models"
)

// InitDB Initializes the database
func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", "./url.db")
	if err != nil {
		panic(err)
	}

	db.LogMode(true)
	models.Migrate(db)
	return db, err
}
