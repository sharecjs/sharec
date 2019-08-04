BOLD=$(tput bold)
REGULAR=$(tput sgr0)
PREFIX="sharec-extractor:"

init_target() {
  CHECKER_SOURCES_DIR_CONTENT=$(find "$1/target" -name "package.json")

  if [ -r "$CHECKER_SOURCES_DIR_CONTENT" ]
  then
    echo "$PREFIX target package already has initialized!"
  else
    echo "$PREFIX initializing target package..."
    mkdir "$1/target"
    cd "$1/target"
    npm init -y
    echo "$PREFIX target package has initialized!"
  fi
}

install_config() {
  echo "$PREFIX installing local config..."
  cd "$1/target"
  npm add -D ../..
  echo "$PREFIX local config has installed!"
}

extract() {
  TARGET_DIR="$1"

  init_target $TARGET_DIR
  install_config $TARGET_DIR
}

extract $@
