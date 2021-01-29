import App from "./app";
import UserController from "./Modules/controller/user.controller";
import ValidatorController from "./Modules/controller/validator.controller";
const app = new App([new UserController(), new ValidatorController()]);

app.listen();
