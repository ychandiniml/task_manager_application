import prisma from "../../lib/prisma.js";

export const login = async (req, res) => { 
    try {
        const vendorUid = req.decoded.user_id;
        const user = await prisma.user.findFirst({
            where: { vendorUid },
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist. Please register the user first" });
        }

        return res.status(200).json({ message: "Success", data: {"user_id": user.userId}});
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const register = async (req, res) => {
    try {
        // Extract data from the request body and decoded token
        const { firstname, lastname, email } = req.body;
        const vendorUid = req.decoded.user_id;

        // Check if a user with the same email or vendorUid already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { vendorUid }
                ]
            }
        });

        // If a user exists, return an error message
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                vendorUid,
            },
        });

        // Return success response
        return res.status(201).json({ message: "User created successfully", data: {"user_id": newUser.userId}});
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
