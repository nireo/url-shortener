package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // sqlite config
)

// InitDB Initializes the database
func InitDB() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", "./forms.db")
	if err != nil {
		panic(err)
	}

	return db, err
}
