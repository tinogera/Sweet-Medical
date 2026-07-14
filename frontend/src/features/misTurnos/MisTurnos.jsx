import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMisTurnos, splitUpcomingPast } from "../../service/misTurnosService";
import HeaderMisTurnos from "./components/HeaderMisTurnos";
import ProximosTurnosSection from "./components/ProximosTurnosSection";
import TurnosPasadosSection from "./components/TurnosPasadosSection";

export default function MisTurnos() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState({ upcoming: [], past: [] });

	useEffect(() => {
		let cancelled = false;

		const fetchTurnos = async () => {
			setCargando(true);
			setError(null);
			try {
				const { turnos } = await getMisTurnos(id);
				if (!cancelled) {
					setData(splitUpcomingPast(turnos));
				}
			} catch (e) {
				console.error(e);
				if (!cancelled) {
					setError(e);
				}
			} finally {
				if (!cancelled) {
					setCargando(false);
				}
			}
		};

		fetchTurnos();

		return () => {
			cancelled = true;
		};
	}, [id]);

	return (
		<div className="py-4 md:py-20 flex flex-col gap-10 max-w-300 mx-auto">
			<HeaderMisTurnos />

			<ProximosTurnosSection
				loading={cargando}
				error={error}
				upcoming={data.upcoming}
				onNuevoTurno={() => navigate("/")}
			/>

			<TurnosPasadosSection
				loading={cargando}
				error={error}
				past={data.past}
			/>
		</div>
	);
}
