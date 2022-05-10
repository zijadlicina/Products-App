const express = require("express");
const router = express.Router();

const adminController = require("../../controller/adminController");

// create, update, delete, find
router
  .route("/")
  .get((req, res) => res.render("admin", { layout: "dashAdmin" }));
router.route("/users").get(adminController.getAllUsers);
router
  .route("/users/add")
  .get((req, res) => res.render("addUser", { layout: "dashAdmin" }))
  .post(adminController.createUser);
router
  .route("/users/edit/:id")
  .get(adminController.editUser) // route for opening handlebars file of this route
  .post(adminController.updateUser);
router
  .route("/users/remove/:id")
  .get(adminController.removeUser) // route for opening handlebars file of this route
  .post(adminController.deleteUser);
  
  /*
app.post("/user", userController.createUser); // creates new user
app.delete("/", userController.deleteAllUsers); // deletes all users
app.delete("/user", userController.deleteUser); // deletes user with specified id; id is sent in req body
app.get("/", userController.getAllUsers); // gets all users
app.get("/user", userController.getUser); // gets user with specified id; id is sent in req body
//app.put('/user/:id', userController.updateUser) // updates user with specified id
app.put("/user/updateName", userController.updateName); // updates user name
app.put("/user/updateSurname", userController.updateSurname); // updates user surname
app.put("/user/updateUsername", userController.updateUsername); // updates user username
app.put("/user/updateAddress", userController.updateAddress); // updates user address
app.put("/user/updateEmail", userController.updateEmail); // updates user email
app.put("/user/updatePhone", userController.updatePhone); // updates user phone
app.put("/user/updatePassword", userController.updatePassword); // updates user password; // should add pass validation
app.put("/user/updateAccess", userController.updateAccess); // updates user access
*/
module.exports = router;
