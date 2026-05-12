import { remove } from "lodash-es";

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
			throw new BadRequestError(`El servicio ${servicio.nombre} ya existe.`);
		}
		this.sedes.push(servicio);
		return servicio;
	},

	listar() {
		return this.sedes;
	},

	obtenerPorNombre(nombre) {
		const servicio = this.sedes.find(
			(s) => s.nombre.toLowerCase() === nombre.toLowerCase(),
		);

		return servicio;
	},

	borrar(nombre) {
		//saca el servicio con ese nombre
		remove(this.sedes, (s) => s.nombre.toLowerCase() === nombre.toLowerCase());
	},
};
