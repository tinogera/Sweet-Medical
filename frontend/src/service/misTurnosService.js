import axios from "axios";
import { API_BASE_URL } from "../config";

const TZ = "America/Argentina/Buenos_Aires";

export const MESES = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic",
];

export const ESTADO_MAP = {
	REALIZADO: "asistio",
	CANCELADO: "cancelado",
	RESERVADO: "pendiente",
	CONFIRMADO: "pendiente",
};

const UPCOMING_ESTADOS = ["RESERVADO", "CONFIRMADO"];

/**
 * @param {string | Date} iso
 * @returns {{ y: number, m: number, d: number, dateKey: string, hora: string }}
 */
export const fechaLocalAR = (iso) => {
	const date = typeof iso === "string" ? new Date(iso) : iso;

	const dateKey = new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: TZ,
	}).format(date);

	const hora = `${date.toLocaleTimeString("es-AR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: TZ,
	})} hs`;

	const [y, m, d] = dateKey.split("-").map(Number);
	return { y, m, d, dateKey, hora };
};

/**
 * @param {string} pacienteId
 * @returns {Promise<{ turnos: object[], paginacion: object }>}
 */
export const getMisTurnos = async (pacienteId) => {
	const { data } = await axios.get(
		`${API_BASE_URL}/pacientes/${pacienteId}/turnos`,
		{ params: { pagina: 1, limite: 100 } },
	);
	return data;
};

/**
 * @param {object} t
 * @returns {object}
 */
export const mapTurnoToCard = (t) => {
	const { _y, m, d, dateKey, hora } = fechaLocalAR(t.fechaHora);
	return {
		id: t.id,
		profesional: t.profesional,
		especialidad: t.servicio,
		fecha: dateKey,
		dia: String(d),
		mes: MESES[m - 1].toUpperCase(),
		hora,
		sede: t.sede,
		modalidad: "presencial",
	};
};

/**
 * @param {object} t
 * @returns {object}
 */
export const mapTurnoToPastRow = (t) => {
	const { m, d, hora } = fechaLocalAR(t.fechaHora);
	return {
		id: t.id,
		profesional: t.profesional,
		especialidad: t.servicio,
		fechaCorta: `${d} ${MESES[m - 1]}`,
		hora,
		sede: t.sede,
		estado: ESTADO_MAP[t.estadoTurno],
	};
};

/**
 * @param {object[]} turnos
 * @returns {{ upcoming: object[], past: object[] }}
 */
export const splitUpcomingPast = (turnos) => {
	const { dateKey: todayKey } = fechaLocalAR(new Date());

	const upcoming = [];
	const past = [];

	for (const t of turnos) {
		const { dateKey } = fechaLocalAR(t.fechaHora);
		const isUpcoming =
			UPCOMING_ESTADOS.includes(t.estadoTurno) && dateKey >= todayKey;

		if (isUpcoming) {
			upcoming.push(t);
		} else {
			past.push(t);
		}
	}

	return {
		upcoming: upcoming.map(mapTurnoToCard),
		past: past.map(mapTurnoToPastRow),
	};
};
