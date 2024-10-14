import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query());
  return c.text("Hello Hono!");
  //c represent combined req and res
  //can use c.json to send json
});

const users = {
  name: "garvit",
  email: "user1@Gmail.com",
};

app.get("/users", async (c) => {
  return c.json({
    message: "req received succesfully",
    users,
  });
});

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    //validation logic goes here
    next();
  } else {
    return c.text("Invalid Token");
  }
}

app.get("/details", authMiddleware, async (c) => {
  return c.text("You have accesses protected route");
});

export default app;
