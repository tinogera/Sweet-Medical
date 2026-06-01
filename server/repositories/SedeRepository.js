import { remove } from "lodash-es";
import { ConflictError, NotFoundError } from "../errors/AppErrors.js";

export const SedeRepository = {
	sedes: [],

	agregar(servicio) {
		//miro que no haya repetido por poner nombre con minuscula y otro en mayud
		//si encuentra alguno el find es true
		if (
			this.sedes.find(
				(s) => s.nombre.toLowerCase() === servicio.nombre.toLowerCase(),
			)
		) {
			throw new ConflictError(`El servicio ${servicio.nombre} ya existe.`);
		}
		this.sedes.push(servicio);
		return servicio;
	},

	listar() {
		return this.sedes;
	},

	obtenerPorNombre(nombre) {
		const sede = this.sedes.find(
			(s) => s.nombre.toLowerCase() === nombre.toLowerCase(),
		);

		if (!sede) {
			throw new NotFoundError(`La sede ${nombre} no existe`);
		}

		return sede;
	},

	borrar(nombre) {
		//saca el servicio con ese nombre
		remove(this.sedes, (s) => s.nombre.toLowerCase() === nombre.toLowerCase());
	},
};
