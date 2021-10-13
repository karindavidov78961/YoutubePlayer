command -v docker-compose >/dev/null 2>&1 || { echo >&2 "I require 'docker-compose' but it's not installed."; echo ""; exit 0; }
docker-compose -f "docker-compose.yml" up