import auth from "./user.routes.js";

const mainRoutesFunction = (app) => {
  app.use("/api",auth);
};
export default mainRoutesFunction;
