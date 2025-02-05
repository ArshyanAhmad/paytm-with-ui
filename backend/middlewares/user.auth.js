import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
   const token = req.headers["authorization"];

   if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({
         success: false,
         message: "No token provided or invalid format",
      });
   }

   const jwtToken = token.split(" ")[1];

   try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

      req.userId = decoded.userId;

      next();
   } catch (error) {
      return res.status(403).json({
         success: false,
         message: "Invalid or expired token",
      });
   }
};
