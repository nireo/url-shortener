package common

import (
	"github.com/teris-io/shortid"
)

// GenerateUUID creates a short uuid
func GenerateUUID() string {
	sid, err := shortid.New(1, shortid.DefaultABC, 2222)
	if err != nil {
		panic(err)
	}

	uuid, err := sid.Generate()
	if err != nil {
		panic(err)
	}

	return uuid
}
