#!/usr/bin/env bash
# ============================================================
# SweetMedical — API Endpoint Tests
# ============================================================
# Usage:
#   1. Seedear la DB primero:   ./all.sh seed
#   2. Después correr todos:    ./all.sh
# ============================================================
set -euo pipefail

BASE="${BASE_URL:-http://localhost:3000}"

# IDs de prueba (reemplazar con los reales después del seed)
PACIENTE_ID="<PACIENTE_ID>"
MEDICO_ID="<MEDICO_ID>"
TURNO_ID="<TURNO_ID>"
BLOQUE_ID="<BLOQUE_ID>"
USER_ID="<USER_ID>"

sep() { echo -e "\n\e[1;36m══════════════════════════════════════════════\e[0m"; }
ok()  { echo -e "  \e[32m✓ $1\e[0m"; }
err() { echo -e "  \e[31m✗ $1\e[0m"; }

run() {
    local desc="$1"; shift
    echo -e "\n\e[33m▸ $desc\e[0m"
    echo -e "\e[90m  \$ $*\e[0m"
    local code
    code=$(curl -s -o /tmp/resp.json -w "%{http_code}" "$@")
    echo -e "  Status: $code"
    if command -v jq &>/dev/null; then
        jq -C '.' /tmp/resp.json 2>/dev/null || cat /tmp/resp.json
    else
        cat /tmp/resp.json
    fi
}

# ============================================================
# SEEDER (opcional)
# ============================================================
if [[ "${1:-}" == "seed" ]]; then
    sep
    run "Seeder — cargar datos de prueba" \
        -X POST "$BASE/seeder"
    echo -e "\n\e[33m► Ahora corré: ./all.sh\e[0m"
    exit 0
fi

sep
echo -e "\e[1;34m SweetMedical API — Test Suite\e[0m"
echo -e " Base URL: $BASE"
echo ""

# ============================================================
# HEALTHCHECK
# ============================================================
sep
run "Healthcheck" \
    -X GET "$BASE/healthcheck"

# ============================================================
# TURNOS — Búsqueda
# ============================================================
sep
run "GET /turnos — buscar turnos disponibles (sin filtros)" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&pagina=1&limite=5"

run "GET /turnos — buscar con filtro por sede" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&sede=Central"

run "GET /turnos — buscar con filtro por especialidad" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&especialidad=cardiologia"

run "GET /turnos — buscar ordenado por costo descendente" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&ordenarPor=costo&direccion=desc"

# ============================================================
# TURNOS — Generar
# ============================================================
sep
run "POST /turnos/generar — generar turnos internamente" \
    -X POST "$BASE/turnos/generar"

# ============================================================
# TURNOS — Actualizar estado
# ============================================================
sep
run "PATCH /turnos/:id — reservar turno" \
    -X PATCH "$BASE/turnos/$TURNO_ID" \
    -H "Content-Type: application/json" \
    -d "{\"estado\":\"RESERVADO\",\"responsableId\":\"$PACIENTE_ID\"}"

run "PATCH /turnos/:id — confirmar turno (médico)" \
    -X PATCH "$BASE/turnos/$TURNO_ID" \
    -H "Content-Type: application/json" \
    -d '{"estado":"CONFIRMADO"}'

run "PATCH /turnos/:id — cancelar turno (paciente)" \
    -X PATCH "$BASE/turnos/$TURNO_ID" \
    -H "Content-Type: application/json" \
    -d '{"estado":"CANCELADO","rol":"PACIENTE","motivo":"No puedo asistir"}'

run "PATCH /turnos/:id — cancelar turno (médico)" \
    -X PATCH "$BASE/turnos/$TURNO_ID" \
    -H "Content-Type: application/json" \
    -d '{"estado":"CANCELADO","rol":"MEDICO","motivo":"El médico no estará disponible"}'

run "PATCH /turnos/:id — marcar como realizado" \
    -X PATCH "$BASE/turnos/$TURNO_ID" \
    -H "Content-Type: application/json" \
    -d '{"estado":"REALIZADO"}'

# ⚠️  "Solicitar / Proponer Cambio de Fecha" no tiene endpoint en la API actual.
#     Requeriría un nuevo endpoint, ej: POST /turnos/:id/cambio-fecha

# ============================================================
# MÉDICOS — Disponibilidad
# ============================================================
sep
run "GET /medicos/:id/disponibilidad — obtener agenda" \
    -X GET "$BASE/medicos/$MEDICO_ID/disponibilidad"

run "GET /medicos/:id/disponibilidad — filtrar por sede" \
    -X GET "$BASE/medicos/$MEDICO_ID/disponibilidad?sede=Central"

run "POST /medicos/:id/disponibilidad — agregar bloque" \
    -X POST "$BASE/medicos/$MEDICO_ID/disponibilidad" \
    -H "Content-Type: application/json" \
    -d '{"fecha":"2026-06-15","horaInicio":"09:00:00","horaFin":"13:00:00","sedeName":"Central"}'

run "DELETE /medicos/:id/disponibilidad/:bloqueId — eliminar bloque" \
    -X DELETE "$BASE/medicos/$MEDICO_ID/disponibilidad/$BLOQUE_ID"

# ============================================================
# MÉDICOS — Servicios
# ============================================================
sep
run "GET /medicos/:id/servicios — listar servicios" \
    -X GET "$BASE/medicos/$MEDICO_ID/servicios"

run "POST /medicos/:id/servicios — agregar servicio" \
    -X POST "$BASE/medicos/$MEDICO_ID/servicios" \
    -H "Content-Type: application/json" \
    -d '{"tipoServicio":"ESPECIALIDAD","nombre":"Cardiologia","precio":5000,"duracion":30}'

run "PATCH /medicos/:id/servicios/:nombre — actualizar servicio" \
    -X PATCH "$BASE/medicos/$MEDICO_ID/servicios/Cardiologia" \
    -H "Content-Type: application/json" \
    -d '{"precio":5500,"duracion":45}'

run "DELETE /medicos/:id/servicios/:nombre — eliminar servicio" \
    -X DELETE "$BASE/medicos/$MEDICO_ID/servicios/Cardiologia"

# ============================================================
# NOTIFICACIONES
# ============================================================
sep
run "GET /notificaciones/:idUser — listar notificaciones" \
    -X GET "$BASE/notificaciones/$USER_ID"

run "GET /notificaciones/:idUser — filtrar no leídas" \
    -X GET "$BASE/notificaciones/$USER_ID?leidas=false"

run "PATCH /notificaciones/:idUser/:idNotificacion — marcar como leída" \
    -X PATCH "$BASE/notificaciones/$USER_ID/1"

# ============================================================
# PACIENTES
# ============================================================
sep
run "GET /pacientes/:id/turnos — listar turnos del paciente" \
    -X GET "$BASE/pacientes/$PACIENTE_ID/turnos?pagina=1&limite=5"

sep
echo -e "\e[1;32m✓ Suite completa.\e[0m"
echo -e "\e[90m  IDs usados:"
echo -e "    PACIENTE_ID = $PACIENTE_ID"
echo -e "    MEDICO_ID   = $MEDICO_ID"
echo -e "    TURNO_ID    = $TURNO_ID"
echo -e "    BLOQUE_ID   = $BLOQUE_ID"
echo -e "    USER_ID     = $USER_ID"
echo -e "\e[0m"
