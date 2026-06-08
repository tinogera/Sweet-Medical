#!/usr/bin/env bash
# ============================================================
# SweetMedical — Healthcheck
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

sep
run "Healthcheck" \
    -X GET "$BASE/healthcheck"
