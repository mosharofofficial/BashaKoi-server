import { RequestHandler } from "express"

export const isRole = (role:string) => {
    const check:RequestHandler = (req, res, next)=>{
        if (req.body?.decoded?.role === role) {
            next();
        } else {
            // console.log("not role");
            res.json({
                status: 403,
                message: "Forbidden Request"
            })
        }
    }
    return check
}

