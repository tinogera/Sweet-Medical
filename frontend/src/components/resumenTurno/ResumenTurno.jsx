import DetalleFila from "../detalleFila/DetalleFila";

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function ResumenTurno({ turno }) {
	const fecha = new Date(turno.fechaHora);
	const diaTexto = DIAS[fecha.getDay()];
	const diaNum = fecha.getDate();
	const mesTexto = MESES[fecha.getMonth()];
	const anio = fecha.getFullYear();
	const hora = fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });

	return (
		<div className="bg-surface rounded-xl p-8 mb-8 border border-outline-variant shadow-sm">
			<div className="flex flex-col gap-6">

				<DetalleFila icono="calendar_month" etiqueta="Fecha y Hora">
					<p className="font-h3-subtitle text-h3-subtitle text-on-surface">
						{diaTexto} {diaNum} de {mesTexto} de {anio}
					</p>
					<p className="font-body-main text-body-main text-text-secondary">{hora} hs</p>
				</DetalleFila>

				<hr className="border-outline-variant" />

				<DetalleFila icono="person" etiqueta="Profesional">
					<p className="font-h3-subtitle text-h3-subtitle text-on-surface">{turno.profesional}</p>
				</DetalleFila>

				<hr className="border-outline-variant" />

				<DetalleFila icono="medical_services" etiqueta="Servicio">
					<p className="font-h3-subtitle text-h3-subtitle text-on-surface">{turno.servicio}</p>
				</DetalleFila>

				<hr className="border-outline-variant" />

				<DetalleFila icono="location_on" etiqueta="Sede">
					<p className="font-h3-subtitle text-h3-subtitle text-on-surface">{turno.sede}</p>
				</DetalleFila>

				{turno.costo != null && (
					<>
						<hr className="border-outline-variant" />
						<DetalleFila icono="payments" etiqueta="Costo Estimado">
							<p className="font-h3-subtitle text-h3-subtitle text-on-surface">
								${turno.costo.toLocaleString('es-AR')}
							</p>
						</DetalleFila>
					</>
				)}
			</div>
		</div>
	);
}
