.DEFAULT_GOAL := build

.PHONY: clean fmtt vet build

upDB:
			go run ./cmd/migrate/main.go up
downDB:
			go run ./cmd/migrate/main.go down
resetDB: downDB upDB

reset:
			go run ./cmd/migrate/main.go up
clean:
			go clean
fmt: clean
			go fmt ./cmd/* ./internal/*
vet: fmt
			go vet ./cmd/* ./internal/*
build: vet
			go build -o main ./cmd/api/*
