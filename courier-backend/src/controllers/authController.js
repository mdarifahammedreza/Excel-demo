const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerSchema, loginSchema } = require("../validators/userSchema");



const register = async (req, res) => {
    try{
        //first validate the input with zod
        const parsed =registerSchema.parse(req.body);

        //check already mail register or not
        const exitingUser = await User.findOne({email:parsed.email});
        if(exitingUser){
            return res.status(400).json(
                {   registerStaus:false,
                    message: "Email already Register"
            
                 }
              )
        }
        
        //hash password
        const hashedPassword = await bcrypt.hash(parsed.password, 10);

        // Create user with role = customer by default
        const user = await User.create({ 
        ...parsed, 
        password: hashedPassword, 
        role: "customer" 
    });  // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Return user info without password and token
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ user: userResponse, token });
  } catch (err) {
        if (err.name === "ZodError") {
        return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};
// Login
const login = async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const user = await User.findOne({ email: parsed.email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(parsed.password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ user: userResponse, token });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };