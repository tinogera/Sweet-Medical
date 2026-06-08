import { SedeModel } from "../schemas/sedeSchema.js";

export class SedeRepository {
	constructor() {
		this.model = SedeModel
	}
	
	async agregar(sede) {
		return await this.model.create(sede);
	}

	async listar() {
		return await this.model.find();
	}

	async obtenerPorNombre(nombre) {
		return await this.model.findOne({ nombre });
	}

	async borrar(nombre) {
		return await this.model.deleteOne({ nombre })
	}
}
