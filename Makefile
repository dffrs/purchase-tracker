.DEFAULT_GOAL := run

.PHONY: clean fmt vet build upDB downDB resetDB runBE runFE run

SQLITE_FLAGS=CGO_ENABLED=1 CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" CGO_LDFLAGS="-lm"

upDB:
			@cd be && $(SQLITE_FLAGS) go run ./cmd/migrate/main.go up
downDB:
			@cd be && $(SQLITE_FLAGS) go run ./cmd/migrate/main.go down
resetDB: downDB upDB
seedDB:
			@cd be && $(SQLITE_FLAGS) go run ./cmd/seed/main.go

clean:
			@cd be && rm -f main
fmt: clean
			@cd be && go fmt ./cmd/* ./internal/*
vet: fmt
			@cd be && go vet ./cmd/* ./internal/*
build: vet
			@cd be && $(SQLITE_FLAGS) go build -o main ./cmd/api/*
runBE: build 
			@cd be && ./main
runFE:
			@cd fe && npm run dev

run:
	@echo "Starting Backend and Frontend..."
	@trap 'echo "\nStopping processes..."; kill 0' SIGINT SIGTERM; \
	$(MAKE) runBE & \
	$(MAKE) runFE & \
	wait
