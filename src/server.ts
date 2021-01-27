import App from "./app";
import UserController from "./Modules/controller/user.controller";

const app = new App([new UserController()]);

app.listen();
