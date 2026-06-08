#!/usr/bin/env bash
# ============================================================
# SweetMedical — Pacientes (historial de turnos)
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

sep
echo -e "\e[1;34m Historial de turnos del paciente\e[0m"

run "GET /pacientes/:id/turnos — listar turnos" \
    -X GET "$BASE/pacientes/$PACIENTE_ID/turnos?pagina=1&limite=5"
