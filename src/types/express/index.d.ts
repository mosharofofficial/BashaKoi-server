


declare global {
    namespace Express {
        interface Request {
            decoded?: {
                email?:string;
                role?:"owner" | "tenant";
                iat?:number;
                exp?:number;
            }
        } 
    }
}

export {};