import jwt from "jsonwebtoken"


const adminAuth = async (req, res, next) => {

    try {

        const { token } = req.headers

        if (!token) {
            return res.json({
                success: false,
                message: "User is not authorized , Login again"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource"
            })
        }

        req.adminEmail = decodedToken.email;

        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: error.message || "Failed to authenticate token"
        });
    }
}

export default adminAuth;
