.DEFAULT_GOAL := run

.PHONY: clean fmt vet build upDB downDB resetDB runBE runFE run

upDB:
			@cd be && go run ./cmd/migrate/main.go up
downDB:
			@cd be && go run ./cmd/migrate/main.go down
resetDB: downDB upDB

clean:
			@cd be && go clean
fmt: clean
			@cd be && go fmt ./cmd/* ./internal/*
vet: fmt
			@cd be && go vet ./cmd/* ./internal/*
build: vet
			@cd be && go build -o main ./cmd/api/*
runBE: build 
			@cd be && ./main
runFE:
			@cd fe && npm run dev

run: runBE runFE
