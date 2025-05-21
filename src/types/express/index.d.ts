


declare global {
    namespace Express {
        interface Request {
            decoded?: {
                email?:string;
                role?:"owner" | "tenant";
            }
        } 
    }
}