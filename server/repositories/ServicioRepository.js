import { remove } from "lodash-es";

export const ServicioRepository = {
	servicios: [],

	agregar(servicio) {
		//miro que no haya repetido por poner nombre con minuscula y otro en mayud
		//si encuentra alguno el find es true
		if (
			this.servicios.find(
				(s) => s.nombre.toLowerCase() === servicio.nombre.toLowerCase(),
			)
		) {
			throw new BadRequestError(`El servicio ${servicio.nombre}
      ya existe.`);
		}
		this.servicios.push(servicio);
		return servicio;
	},

	listar() {
		return this.servicios;
	},

	obtenerPorNombre(nombre) {
		const servicio = this.servicios.find(
			(s) => s.nombre.toLowerCase() === nombre.toLowerCase(),
		);

		return servicio;
	},

	borrar(nombre) {
		//saca el servicio con ese nombre
		remove(
			this.servicios,
			(s) => s.nombre.toLowerCase() === nombre.toLowerCase(),
		);
	},
};
