import { ServicioModel } from "../schemas/servicioSchema.js";

export class ServicioRepository {
	constructor() {
		this.model = ServicioModel;
	}

	async save(servicio){
		const newServicio = new this.model(servicio)
		return await newServicio.save()

	}

	async findAll(){
		return await this.model.find()
	}

	async deleteAll(){
		return await this.model.deleteMany({})
	}


	async findByName(nombre){
		return await this.model.findOne({ nombre})
	}

	async delete(id){
		return await this.model.deleteOne({id})
	}


	async update(id, servicioModificado){
		return await this.model.findByIdAndUpdate(id, servicioModificado, {new: true})
	}
}
