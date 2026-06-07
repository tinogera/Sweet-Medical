import { ValidationError } from "../errors/AppErrors.js"

/*
   validate(...) recibe un objeto que contiene alguna de las tres partes de una request, 
    que necesitemos validar (todas son opcionales).

    {
        params: zod.object,
        query: zod.object,
        body: zod.object
    }

    dentro del zod object se pueden agregar/quitar parametros (y validaciones a esos params)
    que representan y restringen al valor que queremos para cada parte de la request.
    Ej. para PUT /perro/{perroID}
    {
        "nombre": "copito",
        "edad": 9
    }

    el schema de validacion podria ser:
    {
        params: z.object({ perroID: z.uuid() }),
        body: z.object({ 
            nombre: z.string().trim().toLowerCase().min(1),
            edad: z.number().int().positive()
        })
    }

    + param:    - perroID tiene que ser un string que represente un uuid
    + body:     - nombre tiene que ser string con al menos un caracter (trim y lower normalizan)
                - edad tiene que ser numero natural
    + query:    - no usa

    si alguna restriccion no se cumple falla enviando ValidationError.

    para mas info vean la documentacion de Zod qsy.

    Nota de color: los valores validados/semi-parseados quedan respectivamente en la request (req.algo), 
    a excepción de query que los valores validados quedan en req.validatedQuery.
    Te preguntás ¿por qué?, yo también. A partir de express 5 'req.query' no es mutable, por eso. 
*/

export function validate(schemas) {
    return (req, _res, next) => {
        const issues = []

        for (const [part, schema] of Object.entries(schemas)) {
            const result = schema.safeParse(req[part])
            if (result.success) {
                // Express 5: req.query es getter-only → guardamos en req.validatedQuery
                req[part === 'query' ? 'validatedQuery' : part] = result.data
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
