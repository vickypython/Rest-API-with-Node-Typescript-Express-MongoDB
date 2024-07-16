import { createUser, getUserbyEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    //registration actual process
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.sendStatus(400);
    }
    // const existingUser= await getUserbyEmail(email)
    // if(existingUser){
    //     return res.sendStatus(400)
    // }
    const salt = random();
    const user = createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json({message:"user added",user:user});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
// export const login = async (req: express.Request, res: express.Response) => {
//     try {
//       //checking some conditon
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.sendStatus(400);
//       }
//       const user = await getUserbyEmail(email)
//     //   .select(
//     //     "+authentication.salt+authentication.password"
//       //);
//       if (!user) return res.sendStatus(400);
//       const expectedHash = authentication(user.authentication.salt, password);
//       if (user.authentication.password !== expectedHash) {
//         return res.sendStatus(403);
//       }
//       const salt = random();
//       user.authetication.sessionToken = authentication(salt, user._id.toString());
//       await user.save();
//       res.cookie("NATH-DEV-AUTH", user.authentication.sessionToken, {
//         domain: "localhost",
//         path: "/",
//       });

//       return res.status(200).json(user).end();
//     } catch (error) {
//       console.log(error);
//       res.sendStatus(400);
//     }
//   };
