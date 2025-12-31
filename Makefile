.DEFAULT_GOAL := run

.PHONY: clean fmt vet build-be build-be-win build-fe runBE runFE run desktop

SQLITE_FLAGS=CGO_ENABLED=1 CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" CGO_LDFLAGS="-lm"

BIN_DIR=fe/bin
BACKEND_SRC=./cmd/api/*

### ───────── DATABASE ─────────

upDB:
	cd be && $(SQLITE_FLAGS) go run ./cmd/migrate/main.go up

downDB:
	cd be && $(SQLITE_FLAGS) go run ./cmd/migrate/main.go down

resetDB: downDB upDB

seedDB:
	cd be && $(SQLITE_FLAGS) go run ./cmd/seed/main.go


### ───────── BACKEND ─────────

clean:
	cd be && rm -f ../$(BIN_DIR)/be ../$(BIN_DIR)/be.exe

fmt: clean
	cd be && go fmt ./cmd/... ./internal/...

vet: fmt
	cd be && go vet ./cmd/... ./internal/...

# macOS / Linux backend binary
build-be: vet
	@echo "Building backend for macOS/Linux..."
	cd be && $(SQLITE_FLAGS) GOOS=darwin GOARCH=amd64 go build -o ../$(BIN_DIR)/be $(BACKEND_SRC)

# Windows backend binary
build-be-win: vet
	@echo "Building backend for Windows..."
	cd be && $(SQLITE_FLAGS) GOOS=windows GOARCH=amd64 go build -o ../$(BIN_DIR)/be.exe $(BACKEND_SRC)


### ───────── FRONTEND ─────────

build-fe:
	cd fe && npm run build


### ───────── DEV MODE ─────────

runBE: build-be
	cd $(BIN_DIR) && ./be

runFE:
	cd fe && npm run dev

run:
	@echo "Starting Backend + Frontend..."
	@trap 'echo "\nStopping..."; kill 0' SIGINT SIGTERM; \
	$(MAKE) runBE & \
	$(MAKE) runFE & \
	wait


### ───────── DESKTOP PACKAGE ─────────

desktop: build-be build-fe
	@echo "Desktop app built"
