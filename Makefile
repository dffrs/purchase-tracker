.DEFAULT_GOAL := run

.PHONY: clean fmt vet build-be build-be-win build-fe run-be-mac run-be-lin run-be-win runFE desktop-lin desktop-win desktop-mac

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

# macOS backend binary
build-be-mac: vet
	@echo "Building backend for macOS..."
	cd be && $(SQLITE_FLAGS) GOOS=darwin GOARCH=amd64 go build -o ../$(BIN_DIR)/be $(BACKEND_SRC)

# linux backend binary
build-be-lin: vet
	@echo "Building backend for linux..."
	cd be && $(SQLITE_FLAGS) GOOS=linux GOARCH=amd64 go build -o ../$(BIN_DIR)/be $(BACKEND_SRC)

# Windows backend binary
build-be-win: vet
	@echo "Building backend for Windows..."
	cd be && $(SQLITE_FLAGS) GOOS=windows GOARCH=amd64 go build -o ../$(BIN_DIR)/be.exe $(BACKEND_SRC)


### ───────── FRONTEND ─────────

build-fe:
	cd fe && npm run build


### ───────── DEV MODE ─────────

run-be-mac: build-be-mac
	cd $(BIN_DIR) && ./be

run-be-lin: build-be-lin
	cd $(BIN_DIR) && ./be

run-be-win: build-be-win
	cd $(BIN_DIR) && ./be

runFE:
	cd fe && npm run dev


### ───────── DESKTOP PACKAGE ─────────

desktop-mac: build-be-mac build-fe
	@echo "Desktop app built"

desktop-lin: build-be-lin build-fe
	@echo "Desktop app built"

desktop-win: build-be-win build-fe
	@echo "Desktop app built"
