import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Restaura el scroll al inicio cada vez que cambia la ruta
export default function ScrollToTop() {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: el efecto debe correr en cada cambio de ruta
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
