import { remove } from "lodash-es";
import { BadRequestError } from "../errors/AppErrors.js";

export const ServicioRepository = {
	servicios: [],

	agregar(servicio) {
		//miro que no haya repetido por poner nombre con minuscula y otro en mayud
		//si encuentra alguno el find es true
		if (this.servicios.find((s) => s.tieneNombre(servicio.nombre))) {
			throw new BadRequestError(`El servicio ${servicio.nombre} ya existe.`);
		}
		this.servicios.push(servicio);
		return servicio;
	},

	listar() {
		return this.servicios;
	},

	obtenerPorNombre(nombre) {
		const servicio = this.servicios.find((s) => s.tieneNombre(nombre));
		return servicio;
	},

	borrar(nombre) {
		//saca el servicio con ese nombre
		remove(this.servicios, (s) => s.tieneNombre(nombre));
	},
};
