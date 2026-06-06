import { ValidationError } from "../errors/AppErrors.js"

export function validate(schemas) {
    return (req, _res, next) => {
        const issues = []

        for (const [part, schema] of Object.entries(schemas)) {
            const result = schema.safeParse(req[part])
            if (result.success) {
                req[part] = result.data
            } else {
                for (const issue of result.error.issues) {
                    issues.push({ ...issue, path: [part, ...issue.path] })
                }
            }
        }

        if (issues.length > 0) {
            return next(new ValidationError(issues))
        }
        next()
    }
}
