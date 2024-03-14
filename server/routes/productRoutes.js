import express from "express";
import Products from "../modals/productSchema.js";
import Users from "../modals/userSchema.js";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/authenticate.js";

const router = new express.Router();

//====================================================================================================
//get product data

router.get("/getproducts", async (req, res) => {
  try {
    const product = await Products.find();
    res.status(201).json(product);
  } catch (err) {
    console.log(err, "errored");
  }
});

//get indivisual data

router.get("/getproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const individualData = await Products.findOne({ id: id });
    res.status(201).json(individualData);
  } catch (err) {
    res.status(400).json({
      message: "err.message",
    });
    console.log(err.message, "errord");
  }
});

//====================================================================================================
//register user data

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(400).json({ error: "fill the all data" });
    console.log("data not available");
  }

  try {
    const preUser = await Users.findOne({ email: email });

    if (preUser) {
      res.status(422).json({ error: "this user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword is not match" });
    } else {
      const finalUser = new Users({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storeData = await finalUser.save();
      res.status(201).json(storeData);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//====================================================================================================
//login user data

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the all details" });
  }

  try {
    const userLogin = await Users.findOne({ email: email });
    // console.log(userLogin, "userLogin");

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // console.log(isMatch, "isMatch");

      // token Genrate

      const token = await userLogin.genrateAuthtokenn();
      // console.log(token);

      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 1500000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Credentials are Invalid" });
      } else {
        res.status(201).json(userLogin);
      }
    } else {
      res.status(400).json({ error: "Credentials are Invalid" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//====================================================================================================
// adding data into cart

router.post("/addCart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart, "cart value");

    const userContact = await Users.findOne({ _id: req.userID });
    // console.log(userContact, "userContact");

    if (userContact) {
      const cartData = await userContact.addcartdata(cart);
      await userContact.save();

      // console.log(cartData, "cartData");

      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//====================================================================================================
// get cart details

router.get("/cartDetails", authenticate, async (req, res) => {
  try {
    const buyUser = await Users.findOne({ _id: req.userID });
    res.status(201).json(buyUser);
  } catch (err) {
    res.status(400).json(err.message, "err to cart details");
  }
});

//====================================================================================================
//get valid user

router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUserOne = await Users.findOne({ _id: req.userID });
    res.status(201).json(validUserOne);
  } catch (err) {
    res.status(400).json(err.message, "Failed to validate User");
  }
});

//====================================================================================================
//remove item from cart

router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((curVal) => {
      return curVal.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    // console.log("item removed");
  } catch (err) {
    console.log("Failed to remove item");
    res.status(400).json(req.rootUser);
  }
});

//====================================================================================================
//User LogOut

router.get("/logOut", authenticate, (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curItem) => {
      return curItem.token !== req.token;
    });

    res.clearCookie("Amazonweb", { path: "/" });

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);

    console.log("USER LOGOUT");
  } catch (err) {
    res.status(400).json(err.message);
    console.log("FAILED TO USER LOGOUT");
  }
});

export default router;
