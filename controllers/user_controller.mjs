import User from "../models/user.mjs";

class UserController {
  // Index route to list users
  static async index(req, res) {
    let q = req.query.q;
    const re = new RegExp(q, 'i'); // Case-insensitive search
    let users;
    try {
      if (q) {
        users = await User.find({ $or: [{ name: re }, { email: re }] });
      } else {
        users = await User.find({});
      }
      res.render("user", { title: "User Management", users, q });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving users");
    }
  }

  // New user form
  static async new(req, res) {
    res.render("formnew", { title: "Create New User" });
  }

  // Create user route
  static async create(req, res) {
    const { email, name, day, location, price, time } = req.body;

    // Validate fields (you can add your own validation logic here)
    if (!email || !name || !day || !location || !price || !time) {
      return res.render("formnew", { title: "Create New User", error: "All fields are required!" });
    }

    try {
      const user = await User.create({ email, name, day, location, price, time });
      if (user) {
        res.redirect("/users");
      } else {
        res.render("formnew", { title: "Create New User", error: "Error creating user" });
      }
    } catch (error) {
      console.error(error);
      res.render("formnew", { title: "Create New User", error: "Error creating user" });
    }
  }

  // Delete user route
  static async delete(req, res) {
    let id = req.params.id;
    try {
      let { deletedCount } = await User.deleteOne({ _id: id });
      if (deletedCount === 0) {
        console.log("User not deleted!");
      } else {
        console.log("User deleted successfully!");
      }
      res.redirect("/users");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
  }
}

export default UserController;
