import { SeederService } from "../services/SeederService.js"

export class SeederController {
    constructor({ seederService = new SeederService() } = {}) {
        this.seederService = seederService
    }

    seeder = async (req, res, next) => {
        try {
            await this.seederService.seed()
            return res.status(201).json({ 
                status: "success",
                message: "Datos de prueba cargados correctamente en los repositorios" 
            })
        } catch (error) {
            return next(error)
        }
    }
}
