import { Context } from "hono";
import prisma from "../../prisma/client";

export const getUsers = async (c: Context) => {

    try{
        console.log(c.req.url); 
    const users = await prisma.user.findMany({orderBy: {id: 'asc'}});
    return c.json({
        success: true,
        data: users,
        message: "List data users"
    },200);
}catch(e: unknown){
    console.error(`Error getting users: ${e}`);
    return c.json({
        success: false,
        message: "Failed to fetch users"
    }, 500);
}
}