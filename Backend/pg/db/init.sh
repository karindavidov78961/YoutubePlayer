#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "docker" --dbname "docker" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS playlist;
  COMMIT;
EOSQL