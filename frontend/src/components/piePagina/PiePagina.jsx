import Logo  from "../logo/Logo"

const PiePagina = () => {
	return (
		<footer className="bg-foreground text-surface-tertiary-foreground w-full py-16 px-4 md:px-6 flex md:flex-row justify-between items-start gap-8">
			<div>
          <Logo className="size-7" />
				<div className="font-sans text-2xl font-semibold text-surface-tertiary">
					SWEET MEDICAL
				</div>
				<p className="font-sans text-surface-tertiary opacity-80">
					© 2026 Sweet Medical Group. Todos los derechos reservados.
				</p>
			</div>
			<div className="grid grid-cols-2 md:flex-row gap-4 md:gap-8 font-sans">
				<LinkFooter href="#">Términos y Condiciones</LinkFooter>
				<LinkFooter href="#">Privacidad</LinkFooter>
				<LinkFooter href="#">Defensa del Consumidor</LinkFooter>
				<LinkFooter href="#">Ética y Cumplimiento</LinkFooter>
			</div>
		</footer>
	);
};

const LinkFooter = ({ href, children }) => {
	return (
		<a
			className="link text-base text-surface-tertiary opacity-80 hover:opacity-100 "
			href={href}
		>
			{children}
		</a>
	);
};

export default PiePagina;
