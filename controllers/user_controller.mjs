import User from "../models/user.mjs";

class UserController {
  // Danh sách users (tìm kiếm nếu có query)
  static async index(req, res) {
    let q = req.query.q || "";
    const re = new RegExp(q, "i"); // Tìm kiếm không phân biệt hoa thường
    try {
      const users = q
        ? await User.find({ $or: [{ name: re }, { email: re }] })
        : await User.find({});
      res.render("user", { title: "User Management", users, q });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).send("Error retrieving users");
    }
  }

  // Hiển thị form tạo user mới
  static async new(req, res) {
    res.render("formnew", { title: "Create New User", error: null });
  }
  // Dat cho moi
  static async new(req, res) {
    res.render("formnew", { title: "Trip New" });
  }
  
  static  async create(req, res) {
    let { email, name, day, location, price, time, image }= req.body;
    let user = await User.create({ email, name, day, location, price, time, image });
    console.log(user);
    
    // Sau khi lưu, chuyển hướng về trang danh sách người dùng
    if (user) {
    res.redirect("/users");
    } else {
    res.render("formnew", { title: "Trip New" });
    }
  }


  
  // Hiển thị form chỉnh sửa user
  static async edit(req, res) {
    let id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User không tồn tại.");
      }
      res.render("useredit", { title: "Edit User", user });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).send("Error retrieving user data");
    }
  }

  // Cập nhật đặt chỗ
  static async update(req, res) {
    let id = req.params.id;
    let { email, name, day, location, price, time, image } = req.body;
  
    try {
      // Cập nhật trip trong cơ sở dữ liệu
      let updatedUser= await User.findByIdAndUpdate(
        id,
        { email, name, day, location, price, time, image },
        { new: true } // Trả về document đã được cập nhật
      );
  
      if (!updatedUser) {
        return res.status(404).send("Trips không tồn tại.");
      }
  
      // Sau khi cập nhật, chuyển hướng về trang danh sách trip
      res.redirect("/users");
    } catch (error) {
      console.error('Lỗi khi cập nhật trip:', error);
      res.status(500).send('Lỗi khi cập nhật dữ liệu trip');
    }
  }

  // // Cập nhật thông tin user
  // static async update(req, res) {
  //   let id = req.params.id;
  //   const { email, name, day, location, price, time, image } = req.body;

  //   try {
  //     const updatedUser = await User.findByIdAndUpdate(
  //       id,
  //       { email, name, day, location, price, time, image },
  //       { new: true } // Trả về document đã được cập nhật
  //     );

  //     if (!updatedUser) {
  //       return res.status(404).send("User không tồn tại.");
  //     }

  //     res.redirect("/users"); // Chuyển hướng về trang danh sách user
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     res.status(500).send("Error updating user data");
  //   }
  // }

  // Xóa user
  static async delete(req, res) {
    let id = req.params.id;
    try {
      const { deletedCount } = await User.deleteOne({ _id: id });
      if (deletedCount === 0) {
        console.log("User not deleted!");
      } else {
        console.log("User deleted successfully!");
      }
      res.redirect("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    }
  }
}

export default UserController;
