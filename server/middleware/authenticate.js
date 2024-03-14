import jwt from "jsonwebtoken";
import Users from "../modals/userSchema.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await Users.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("unauthorized: No token provide");
    console.log(err);
  }
};

export default authenticate;
