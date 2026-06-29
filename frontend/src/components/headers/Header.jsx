import { Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { DEMO_PACIENTE_ID } from "../../config";
import Logo from "../logo/Logo";

const Header = ({ _usuario }) => {
	const navigate = useNavigate();

	return (
		<header className="docked full-width top-0 sticky bg-surface dark:bg-bg-dark border-b border-outline-variant dark:border-secondary z-50 transition-all duration-200 ease-in-out">
			{/* TopNavBar */}
			<div className="flex justify-between items-center h-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
				<div className="flex items-center gap-3">
					<Link to="/" aria-label="Sweet Medical - Inicio" className="flex items-center gap-2">
						<Logo className="size-9" />
						<span className="font-h2-section-mobile md:font-h2-section text-h2-section-mobile md:text-h2-section text-primary dark:text-primary-container uppercase tracking-tight">
							SWEET MEDICAL
						</span>
					</Link>
				</div>
				{/* Mobile Menu Toggle */}
				<button className="md:hidden text-primary p-2">
					<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
				</button>
				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-6">
					<Link className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" to="/mis-turnos">Mis Turnos</Link>
					<a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Cartilla</a>
					<a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Planes</a>
					<a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Sucursales</a>
				</nav>
			</div>
		</header>
	);
};

const NavItem = ({ href, children }) => {
	return (
		<li>
			<Link
				className="link font-sans text-lg text-muted hover:text-accent transition-colors"
				to={href}
			>
				{children}
			</Link>
		</li>
	);
};

export default Header;
