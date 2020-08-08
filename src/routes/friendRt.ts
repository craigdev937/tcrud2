import express from "express";
import { indexHome, CreateFriend, RenderFriend, ListAllFriends, 
    FindOneFriend,     EditFriend, DeleteFriend } from "../controllers/friendCon";
import { check } from "express-validator";

export const friendRt: express.Router = express.Router();
    friendRt.post("/create", check("name"), CreateFriend);
    friendRt.get("/create", RenderFriend);
    friendRt.get("/list", ListAllFriends);
    friendRt.get("/edit/:id", FindOneFriend);
    friendRt.post("/edit/:id", EditFriend);
    friendRt.get("/delete/:id", DeleteFriend);
    friendRt.get("/", indexHome);



