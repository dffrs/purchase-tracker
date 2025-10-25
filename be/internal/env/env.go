package env

import (
	"os"
	"strconv"
)

func GetEnvString(key string, defualtValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defualtValue
}

func GetEnvInt(key string, defualtValue int) int {
	if value, exists := os.LookupEnv(key); exists {
		if intValue, err := strconv.Atoi(value); err != nil {
			return intValue
		}
	}

	return defualtValue
}
