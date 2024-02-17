import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    // Retrieve token from cookies
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json({ error: "Access denied, token missing" });
    }
  
    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      // Attach user ID to request object
      req.userId = decodedToken.id;
      next();
    });
  };
  