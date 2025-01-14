import { Hono } from "hono";
import { getUsers } from "../controllers/UserController";

const router = new Hono();

router.get("/", (c) => getUsers(c));
// router.get('/book', (c) => c.text('List Books')) 
export const Routes = router;