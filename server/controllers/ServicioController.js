export class ServicioController {
    constructor({ servicioRepo: servicioRepository } = {}) {
        this.servicioRepository = servicioRepository
    }

    getAll = async (req, res, next) => {
        try{
            const servicios = await this.servicioRepository.findAll()
            // en este caso no hace pasar DTO ya que necesito todos los datos
            return res.status(200).json(servicios)
        }
        catch(e) {
            return next(e)
        }
    }
}