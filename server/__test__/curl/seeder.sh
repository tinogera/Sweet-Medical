#!/usr/bin/env bash
# ============================================================
# SweetMedical — Seeder
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

sep
echo -e "\e[1;34m Seeder\e[0m"

run "POST /seeder — cargar datos de prueba" \
    -X POST "$BASE/seeder"

echo -e "\n\e[33m► IDs generados. Reemplazá los placeholders en _common.sh y corré: ./all.sh\e[0m"
