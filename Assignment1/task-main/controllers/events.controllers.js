const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");

const databaseFunctions = require("../config/db.config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "db"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(
            file.originalname
        )}`;
        cb(null, uniqueName);
    },
});

const handleMultiPartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).any();

const EventController = {
    async createEvent(req, res, next) {
        handleMultiPartData(req, res, async (err) => {
            console.log(req);
            if (err) {
                console.log(err);
            }
            const filePath = req.files[0].path;
            console.log(req.files);
            try {
                const result = await databaseFunctions.createEvent({
                    name: req.body.name,
                    tagline: req.body.tagline,
                    schedule: new Date(),
                    description: req.body.description,
                    category: req.body.category,
                    sub_category: req.body.sub_category,
                    image: filePath,
                    rigor_rank: req.body.rigor_rank,
                    attendees: req.body.attendees,
                });
                res.status(201).json("WORKING");
            } catch (error) {
                res.status(200).json("ERROR");
                console.log(error);
            }
        });
    },
    async getEvents(req, res, next) {
        try {
            const result = await databaseFunctions.getEvents();
            res.status(200).json(result);
        } catch (error) {
            res.status(200).json("ERROR");
            console.log(error);
        }
    },
    async updateEvent(req, res, next) {
        try{
            const event = await databaseFunctions.updateEvent(req.parms._id);
            res.status(200).json(event);
        } catch (error) {
            res.status(200).json("ERROR");
            console.log(error);
        }
    }
}

module.exports = EventController