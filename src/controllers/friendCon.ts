import { RequestHandler } from "express";
import { Friends } from "../models/Friends";

export const CreateFriend: RequestHandler =
async (req, res, next) => {
    try {
        const friend: Friends = new Friends();
        friend.name = req.body.name;
        friend.age = req.body.age;
        friend.info = req.body.info;
        await friend.save();
        res.redirect("/friends/list");
    } catch (error) {
        console.log("Error: ", error);
        next(error);
    }
};

export const RenderFriend: RequestHandler =
(req, res, next) => {
    res.render("friends/create", {
        pageTitle: "CRUD",
        styleCSS: "main.css"
    })
};

export const ListAllFriends: RequestHandler =
async (req, res, next) => {
    await Friends.find()
    .then((friends) => {
        res.render("friends/list", {
            pageTitle: "CRUD",
            styleCSS: "main.css",
            friends: friends
        })
    })
};

export const FindOneFriend: RequestHandler =
async (req, res, next) => {
    const { id } = req.params;
    const friend = await Friends.findOne(id);
    console.log(friend);
    res.render("friends/edit", {
        pageTitle: "CRUD",
        styleCSS: "main.css",
        friend: friend
    })
};

export const EditFriend: RequestHandler =
async (req, res, next) => {
    const friend: Friends = 
        await Friends.findOneOrFail(req.params.id);
    friend.name = req.body.name;
    friend.age = req.body.age;
    friend.info = req.body.info;
    await friend.save();
    res.redirect("/friends/list");
};

export const DeleteFriend: RequestHandler =
async (req, res, next) => {
    const friend: Friends = 
        await Friends.findOneOrFail(req.params.id);
    await friend.remove();
    res.redirect("/friends/list");
};

export const indexHome: RequestHandler =
(req, res) => {
    res.render("pages/indexHome", {
        pageTitle: "CRUD",
        styleCSS: "home.css"
    })
};


