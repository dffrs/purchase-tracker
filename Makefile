.DEFAULT_GOAL := run

.PHONY: clean fmt vet build upDB downDB resetDB runBE runFE run

SQLITE_FLAGS=CGO_ENABLED=1 CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" CGO_LDFLAGS="-lm"
BIN_DIR=fe/bin
BACKEND_SRC=./cmd/api/*

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
			@echo "building backend..."
			@cd be && $(SQLITE_FLAGS) go build -o ../$(BIN_DIR)/be $(BACKEND_SRC)
			@echo "bin moved to $(BIN_DIR)"
runBE: build 
			@cd $(BIN_DIR) && ./be
runFE:
			@cd fe && npm run dev
run:
	@echo "Starting Backend and Frontend..."
	@trap 'echo "\nStopping processes..."; kill 0' SIGINT SIGTERM; \
	$(MAKE) runBE & \
	$(MAKE) runFE & \
	wait
desktop: build
		@cd fe && npm run build
