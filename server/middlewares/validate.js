import express from "express"
import { ValidationError } from "../errors/AppErrors.js"

// Express 5 define req.query como getter-only. Este parche lo hace writable
// para que el middleware pueda asignar los datos validados/coercionados.
const descriptor = Object.getOwnPropertyDescriptor(express.request, 'query');
if (descriptor) {
    Object.defineProperty(express.request, 'query', {
        get() {
            if (Object.hasOwn(this, '_query')) return this._query;
            return descriptor.get?.call(this);
        },
        set(query) {
            this._query = query;
        },
        configurable: true,
        enumerable: true
    });
}

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
