declare namespace Express {
    export interface Request {
        locals?: Record<string, any>
    }
}