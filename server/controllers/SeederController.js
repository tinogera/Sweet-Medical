export class SeederController {
    constructor({ seederService } = {}) {
        this.seederService = seederService
    }

    seeder = async (_req, res, next) => {
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
