# ============================================================
# Shared config and helpers — sourced by all test scripts
# ============================================================
set -euo pipefail

BASE="${BASE_URL:-http://localhost:3000}"

# IDs de prueba (reemplazar con los reales después del seed)
PACIENTE_ID="<PACIENTE_ID>"
MEDICO_ID="<MEDICO_ID>"
TURNO_ID="<TURNO_ID>"
BLOQUE_ID="<BLOQUE_ID>"
USER_ID="<USER_ID>"
SERVICIO_ID="<SERVICIO_ID>"

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
