#!/usr/bin/env bash
# ============================================================
# SweetMedical — Turnos (búsqueda, generación, actualización)
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

# --- Búsqueda ---
sep
echo -e "\e[1;34m Búsqueda de turnos\e[0m"

run "GET /turnos — buscar turnos disponibles (sin filtros)" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&pagina=1&limite=5"

run "GET /turnos — buscar con filtro por sede" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&sede=Central"

run "GET /turnos — buscar con filtro por especialidad" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&especialidad=cardiologia"

run "GET /turnos — buscar ordenado por costo descendente" \
    -X GET "$BASE/turnos?idPaciente=$PACIENTE_ID&ordenarPor=costo&direccion=desc"

# --- Generación ---
sep
echo -e "\e[1;34m Generación de turnos (sistema)\e[0m"

run "POST /turnos/generar — generar turnos internamente" \
    -X POST "$BASE/turnos/generar"

# --- Actualización de estado ---
sep
echo -e "\e[1;34m Actualización de estado\e[0m"

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
