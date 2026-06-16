export class ServerController {
    healthcheck = async (_req, res) => {
        return res.status(200).json({
            status: "OK"
        })
    }
}