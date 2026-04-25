export class ServerController {
    healthcheck = async (req, res) => {
        return res.status(200).json({
            status: "OK"
        })
    }
}