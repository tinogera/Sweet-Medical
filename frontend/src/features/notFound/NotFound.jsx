import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-300 mx-auto">
			<span className="font-sans text-[120px] md:text-[180px] font-extrabold text-accent leading-none">
				404
			</span>
			<h1 className="font-sans text-2xl md:text-4xl font-bold text-surface-foreground mb-4">
				Página no encontrada
			</h1>
			<p className="font-sans text-lg text-muted mb-8 max-w-md">
				La página que estás buscando no existe o fue movida.
			</p>
			<Link to="/" className="button button--primary">
				<span className="material-symbols-outlined" aria-hidden="true">
					home
				</span>
				Volver al inicio
			</Link>
		</div>
	);
}
