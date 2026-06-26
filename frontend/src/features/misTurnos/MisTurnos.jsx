import { useEffect, useState } from "react";
import { Alert, Button, Card, Skeleton } from "@heroui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getMisTurnos, splitUpcomingPast } from "../../service/misTurnosService";
import TurnoAgendadoCard from "./TurnoAgendadoCard";
import TurnosPasados from "./TurnosPasados";

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
			<div>
				<h1 className="font-sans text-4xl md:text-5xl font-extrabold text-surface-foreground mb-4">
					Mis Turnos
				</h1>
				<p className="font-sans text-lg text-muted max-w-2xl">
					Gestioná tus próximas consultas y revisá tu historial de atención
					médica.
				</p>
			</div>

			<section>
				<div className="flex justify-between items-end mb-8 border-b border-border pb-4">
					<h2 className="font-sans text-2xl md:text-3xl font-semibold text-surface-foreground">
						Próximos Turnos
					</h2>
					<Button
						variant="ghost"
						className="hover:text-blue-900"
						onPress={() => navigate("/")}
					>
						<span className="material-symbols-outlined" aria-hidden="true">
							add_circle
						</span>
						Nuevo Turno
					</Button>
				</div>

				{cargando ? (
					<div className="grid gap-6 lg:grid-cols-2">
						{Array.from({ length: 2 }).map((_, i) => (
							<Card key={i} className="flex flex-col md:flex-row gap-6 p-6">
								<Skeleton className="rounded-lg h-20 w-25" />
								<div className="flex-1 space-y-3">
									<Skeleton className="h-5 w-24 rounded" />
									<Skeleton className="h-4 w-40 rounded" />
									<Skeleton className="h-4 w-32 rounded" />
								</div>
								<Skeleton className="h-10 w-32 rounded-full" />
							</Card>
						))}
					</div>
				) : error ? (
					<Alert color="danger" title="No pudimos cargar tus turnos">
						Verificá tu conexión e intentá nuevamente.
					</Alert>
				) : data.upcoming.length === 0 ? (
					<p className="font-sans text-base text-muted">
						No tiene próximos turnos
					</p>
				) : (
					<div className="grid gap-6 lg:grid-cols-2">
						{data.upcoming.map((turno) => (
							<TurnoAgendadoCard key={turno.id} turno={turno} />
						))}
					</div>
				)}
			</section>

{error ? null : cargando ? (
			<section className="flex flex-col gap-4">
				<div className="border-b border-border pb-4">
					<h2 className="font-sans text-2xl font-semibold text-surface-foreground">
						Turnos Pasados{" "}
						<span className="text-base font-normal text-muted ml-2">
							(Últimos 3 meses)
						</span>
					</h2>
				</div>
				<div className="border border-border rounded-lg overflow-hidden">
					<div className="grid grid-cols-5 gap-4 p-4 border-b border-border bg-surface-secondary">
						<Skeleton className="h-4 w-16 rounded" />
						<Skeleton className="h-4 w-24 rounded" />
						<Skeleton className="h-4 w-20 rounded" />
						<Skeleton className="h-4 w-20 rounded" />
						<Skeleton className="h-4 w-16 rounded" />
					</div>
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-b-0 items-center"
						>
							<div className="flex flex-col gap-1">
								<Skeleton className="h-4 w-16 rounded" />
								<Skeleton className="h-3 w-12 rounded" />
							</div>
							<Skeleton className="h-4 w-24 rounded" />
							<Skeleton className="h-4 w-20 rounded" />
							<Skeleton className="h-4 w-28 rounded" />
							<Skeleton className="h-6 w-20 rounded-full" />
						</div>
					))}
				</div>
			</section>
		) : (
			<TurnosPasados turnos={data.past} />
		)}
		</div>
	);
}
