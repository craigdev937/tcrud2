import { RequestHandler } from "express";

export const get404: RequestHandler =
(req, res) => {
    res.render("pages/404", {
        pageTitle: "Not Found!",
        styleCSS: "main.css"
    })
};


