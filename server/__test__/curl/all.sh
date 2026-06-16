#!/usr/bin/env bash
# ============================================================
# SweetMedical — API Test Suite (orquestador)
# ============================================================
# Usage:
#   ./all.sh            → corre todos los módulos
#   ./all.sh seed       → corre solo el seeder
#   ./all.sh turnos     → corre solo turnos
#   ./all.sh medicos    → corre solo médicos
#   ./all.sh pacientes  → corre solo pacientes
#   ./all.sh notificaciones → corre solo notificaciones
# ============================================================
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"

sep()  { echo -e "\n\e[1;35m▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\e[0m"; }

if [[ "${1:-}" == "seed" ]]; then
    sep
    bash "$DIR/seeder.sh"
    exit 0
fi

if [[ $# -gt 0 ]]; then
    sep
    bash "$DIR/${1}.sh"
    exit 0
fi

sep
echo -e "\e[1;34m  SweetMedical API — Test Suite Completa\e[0m"
echo -e "\e[90m  Base URL: ${BASE_URL:-http://localhost:3000}\e[0m"

bash "$DIR/healthcheck.sh"
bash "$DIR/turnos.sh"
bash "$DIR/medicos.sh"
bash "$DIR/notificaciones.sh"
bash "$DIR/pacientes.sh"

sep
echo -e "\e[1;32m  ✓ Suite completa.\e[0m"
echo -e "\e[90m  IDs usados (definidos en _common.sh):\e[0m"
echo -e "\e[90m    PACIENTE_ID, MEDICO_ID, TURNO_ID, BLOQUE_ID, USER_ID\e[0m"
echo ""
echo -e "\e[33m  ⚠️  Casos de uso no cubiertos (sin endpoint):\e[0m"
echo -e "\e[33m     - Solicitar / Proponer Cambio de Fecha\e[0m"
