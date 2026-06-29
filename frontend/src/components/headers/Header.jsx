import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import LoginModal from "../../features/login/LoginModal";

const Header = ({ _usuario }) => {
	return (
		//{/* TopNavBar */}
		<header className="full-width top-0 sticky bg-surface border-b shadow-xs border-border z-50 transition duration-200 ease-in-out">
			<div className="grid grid-cols-3 items-center h-20 px-4 md:px-6 max-w-300 mx-auto w-full">
				{/* Logo - izquierda */}
				<div className="flex items-center">
					<Link to="/" aria-label="Sweet Medical - Inicio">
						<Logo className="size-10" />
					</Link>
				</div>

				{/* TODO: Mobile Menu Toggle - derecha (en mobile) */}
				<Button
					type="button"
					isIconOnly
					variant="ghost"
					className="md:hidden justify-self-end text-accent"
				>
					<span
						className="material-symbols-outlined"
						style={{ fontVariationSettings: "'FILL' 0" }}
					>
						menu
					</span>
				</Button>

				{/* Desktop Nav - centro */}
				<nav className="hidden md:flex col-start-2 justify-center items-center">
					<ul className="flex items-center gap-6">
						<NavItem href="/mis-turnos">Turnos</NavItem>
						<NavItem href="/cartilla">Cartilla</NavItem>
						<NavItem href="/planes">Planes</NavItem>
					</ul>
				</nav>

				{/* Botón - derecha (en desktop) */}
				<div className="hidden md:flex col-start-3 justify-end">
					<LoginModal />
				</div>
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
