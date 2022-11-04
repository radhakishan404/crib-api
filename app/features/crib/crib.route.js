import express from "express";
import reqValidator from "../../middlewares/req.validator.js";

import { cribAddV, cribUpdateV, cribListV } from "./crib.validator.js";
import { addCrib, editCrib, listCrib, getCrib, deleteCrib } from "./crib.controller.js";

const router = express.Router();

router.get(
    "/cribs",
    reqValidator(cribListV),
    (req, res, next) => {
        listCrib(req, res, next);
    }
)

router.post(
    "/cribs",
    reqValidator(cribAddV),
    (req, res, next) => {
        addCrib(req, res, next);
    }
)

router.put(
    "/cribs/:id",
    reqValidator(cribUpdateV),
    (req, res, next) => {
        editCrib(req, res, next);
    }
)

router.delete(
    "/cribs/:id",
    (req, res, next) => {
        deleteCrib(req, res, next);
    }
)

router.get(
    "/cribs/:id",
    (req, res, next) => {
        getCrib(req, res, next);
    }
)


export default router;