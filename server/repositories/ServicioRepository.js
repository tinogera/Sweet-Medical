import { remove } from "lodash-es";
import { ServicioModel } from "../schemas/servicioSchema.js";

export class ServicioRepository {
	constructor() {
		this.model = ServicioModel;
	}

	async save(servicio){
		const newServicio = new this.model(servicio)
		return await newServicio.save()

	}

	// listar() {
	// 	return this.servicios;
	// }

	async findAll(){
		return await this.model.find()
	}


	// obtenerPorNombre(nombre) {
	// 	const servicio = this.servicios.find((s) => s.tieneNombre(nombre));
	// 	return servicio;
	// }

	async findByName(nombre){
		return await this.model.findOne({ nombre})
	}

	// borrar(nombre) {
	// 	//saca el servicio con ese nombre
	// 	remove(this.servicios, (s) => s.tieneNombre(nombre));
	// }

	async delete(id){
		return await this.model.deleteOne({id})
	}


	async update(id, servicioModificado){
		return await this.model.findByIdAndUpdate(id, servicioModificado, {new: true})
	}
}
