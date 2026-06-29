export default function DetalleFila({ icono, etiqueta, children }) {
	return (
		<div className="flex items-center gap-4">
			<div className="w-14 h-14 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary-container">
				<span className="material-symbols-outlined text-3xl">{icono}</span>
			</div>
			<div>
				<span className="font-body-sm text-body-sm text-primary uppercase font-bold tracking-wide mb-1 block">
					{etiqueta}
				</span>
				{children}
			</div>
		</div>
	);
}
