#!/usr/bin/env bash
# ============================================================
# SweetMedical — Médicos (disponibilidad + servicios)
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/_common.sh"

# --- Disponibilidad ---
# sep
# echo -e "\e[1;34m Disponibilidad horaria\e[0m"
# 
# run "GET /medicos/:id/disponibilidad — obtener agenda" \
#     -X GET "$BASE/medicos/$MEDICO_ID/disponibilidad"
# 
# run "GET /medicos/:id/disponibilidad — filtrar por sede" \
#     -X GET "$BASE/medicos/$MEDICO_ID/disponibilidad?sede=Central"
# 
run "POST /medicos/:id/disponibilidad — agregar bloque horario" \
    -X POST "$BASE/medicos/$MEDICO_ID/disponibilidad" \
    -H "Content-Type: application/json" \
    -d '{"fecha":"2026-06-15","horaInicio":"09:00","horaFin":"13:00","sedeName":"Sede Central - Palermo"}'

run "DELETE /medicos/:id/disponibilidad/:bloqueId — eliminar bloque" \
     -X DELETE "$BASE/medicos/$MEDICO_ID/disponibilidad/$BLOQUE_ID"
 
# --- Servicios ---
# sep
# echo -e "\e[1;34m Gestión de servicios\e[0m"
# 
# run "GET /medicos/:id/servicios — listar servicios" \
#     -X GET "$BASE/medicos/$MEDICO_ID/servicios"
# 
# run "POST /medicos/:id/servicios — alta de servicio" \
#     -X POST "$BASE/medicos/$MEDICO_ID/servicios" \
#     -H "Content-Type: application/json" \
#     -d '{"tipoServicio":"ESPECIALIDAD","nombre":"Cardiologia","precio":5000,"duracion":30}'
# 
# run "PATCH /medicos/:id/servicios/:nombre — modificar servicio" \
#     -X PATCH "$BASE/medicos/$MEDICO_ID/servicios/Cardiologia" \
#     -H "Content-Type: application/json" \
#     -d '{"precio":5500,"duracion":45}'
# 
# run "DELETE /medicos/:id/servicios/:nombre — baja de servicio" \
#     -X DELETE "$BASE/medicos/$MEDICO_ID/servicios/Cardiologia"
