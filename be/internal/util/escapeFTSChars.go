package internal

import (
	"fmt"
	"strings"
)

func EscapeFTSChars(arg string) string {
	escaped := strings.ReplaceAll(arg, "\"", "\"\"")

	return fmt.Sprintf("\"%s\"", escaped)
}
