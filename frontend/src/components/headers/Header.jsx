import { useState } from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import LoginModal from "../../features/login/LoginModal";
import { useBusqueda } from "../../context/BusquedaContext";

const Header = ({ _usuario }) => {
	const { busqueda } = useBusqueda();
	const pacienteId = busqueda?.pacienteId;
	const [menuAbierto, setMenuAbierto] = useState(false);

	return (
		//{/* TopNavBar */}
		<header className="full-width top-0 sticky bg-surface border-b shadow-xs border-border z-50 transition duration-200 ease-in-out">
			<div className="flex flex-col max-w-300 mx-auto w-full px-4 md:px-6">
				<div className="grid grid-cols-3 items-center h-20 w-full">
					{/* Logo - izquierda */}
					<div className="flex items-center">
						<Link to="/" aria-label="Sweet Medical - Inicio">
							<Logo className="size-10" />
						</Link>
					</div>

					<Button
						type="button"
						isIconOnly
						variant="ghost"
						className="md:hidden col-start-3 justify-self-end text-accent"
						onClick={() => setMenuAbierto(!menuAbierto)}
					>
						<span className="material-symbols-outlined">{menuAbierto ? "close" : "menu"}</span>
					</Button>

					{/* Desktop Nav - centro */}
					<nav className="hidden md:flex col-start-2 justify-center items-center">
						<ul className="flex items-center gap-6">
							<NavItem href="/">Inicio</NavItem>
							<NavItem href={`/mis-turnos/${pacienteId}`}>Mis Turnos</NavItem>
							<NavItem href="/doctor/disponibilidad">Disponibilidad (Médico)</NavItem>
							<NavItem href="/cartilla">Cartilla</NavItem>
							<NavItem href="/planes">Planes</NavItem>
						</ul>
					</nav>

					{/* Botón - derecha (en desktop) */}
					<div className="hidden md:flex col-start-3 justify-end">
						<LoginModal />
					</div>
				</div>

				{menuAbierto && (
					<nav className="md:hidden pb-6 border-t border-border fade-in">
						<ul className="flex flex-col gap-4 pt-4">
							<NavItem href="/" onClick={() => setMenuAbierto(false)}>Inicio</NavItem>
							<NavItem href={`/mis-turnos/${pacienteId}`} onClick={() => setMenuAbierto(false)}>Mis Turnos</NavItem>
							<NavItem href="/doctor/disponibilidad" onClick={() => setMenuAbierto(false)}>Disponibilidad (Médico)</NavItem>
							<NavItem href="/cartilla" onClick={() => setMenuAbierto(false)}>Cartilla</NavItem>
							<NavItem href="/planes" onClick={() => setMenuAbierto(false)}>Planes</NavItem>
							<div className="pt-2 border-t border-border flex justify-start">
								<LoginModal />
							</div>
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
};

const NavItem = ({ href, children, onClick }) => {
	return (
		<li>
			<Link
				className="link font-sans text-lg text-muted hover:text-accent transition-colors block py-2 md:inline md:py-0"
				to={href}
				onClick={onClick}
			>
				{children}
			</Link>
		</li>
	);
};

export default Header;
