#!/usr/bin/env bash
# ============================================================
# SweetMedical — Notificaciones
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

sep
echo -e "\e[1;34m Notificaciones\e[0m"

run "GET /notificaciones/:idUser — listar todas" \
    -X GET "$BASE/notificaciones/$USER_ID"

run "GET /notificaciones/:idUser — filtrar no leídas" \
    -X GET "$BASE/notificaciones/$USER_ID?leidas=false"

run "PATCH /notificaciones/:idUser/:idNotificacion — marcar como leída" \
    -X PATCH "$BASE/notificaciones/$USER_ID/4"
