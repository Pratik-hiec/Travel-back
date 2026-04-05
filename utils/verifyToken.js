import { jwtVerify } from 'jose'

export const verifyToken = async (req, res, next) => {
   const token = req.cookies.accessToken

   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }

   try {
      const encoder = new TextEncoder()
      const secret = encoder.encode(process.env.JWT_SECRET_KEY)
      const { payload } = await jwtVerify(token, secret)
      req.user = payload
      next()
   } catch (err) {
      return res.status(401).json({ success: false, message: "Token is invalid" })
   }
}

export const verifyUser = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}

export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authorize" })
      }
   })
}
