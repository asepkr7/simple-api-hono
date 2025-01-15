import { Hono } from "hono";
import { getUsers } from "../controllers/UserController";
import  verifyJWT  from "../middleware/auth";
import { login } from "../controllers/LoginController";

const router = new Hono();

router.post("/login", login)
router.get("/users", verifyJWT,getUsers);
export const Routes = router;