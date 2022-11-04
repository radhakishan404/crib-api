import { responseSend } from "../../helpers/responseSend.js";
import { createCrib, readCrib, readCribSingle, updateCrib } from "./crib.services.js";

const select_crib_id = ["id"];
const select_crib_details = ["id", "name", "img", "location", "is_active", "createdAt"];

const getCrib = async (req, res, next) => {
    try {
        const { id } = req.params;
        const condition = { _id: id, is_active: true };
        const checkCrib = await readCribSingle(condition, select_crib_details);
        if (!checkCrib) throw new Error("Crib does not exists");

        responseSend(res, 201, "Crib Fetched Successfully", checkCrib);
    } catch (error) {
        next(error);
    }
};

const addCrib = async (req, res, next) => {
    try {
        const cribData = await createCrib(req.body);

        if (!cribData) throw new Error("Something went wrong while register");
        responseSend(res, 201, "Crib Created Successfully", cribData);
    } catch (error) {
        next(error);
    }
};

const editCrib = async (req, res, next) => {
    try {
        const { id } = req.params;
        const condition = { _id: id };
        const checkCrib = await readCribSingle(condition, select_crib_id);
        if (!checkCrib) throw new Error("Crib does not exists");

        const updateData = await updateCrib(condition, { ...req.body });
        responseSend(res, 201, "Crib Updated Successfully", updateData);
    } catch (error) {
        next(error);
    }
};

const deleteCrib = async (req, res, next) => {
    try {
        const { id } = req.params;
        const condition = { _id: id };
        const checkCrib = await readCribSingle(condition, select_crib_id);
        if (!checkCrib) throw new Error("Crib does not exists");

        let payload = {
            is_active: false
        }
        const updateData = await updateCrib(condition, payload);
        responseSend(res, 201, "Crib Deleted Successfully", updateData);
    } catch (error) {
        next(error);
    }
};

const listCrib = async (req, res, next) => {
    try {
        let where = { is_active: true };

        let page = req.query.page || 0;
        let perPage = req.query.perPage || 10;
        let sortField = req.query.sortField || "createdAt";
        let sortBy = req.query.sortBy || "DESC";

        if (req.query.search) {
            where = {
                ...where,
                $or: [
                    { name: { $regex: '.*' + req.query.search + '.*' } },
                    { location: { $regex: '.*' + req.query.search + '.*' } },
                ]
            }
        }

        console.log(where, "where");

        const cribData = await readCrib(where, select_crib_details, { [sortField]: sortBy }, page, perPage);

        responseSend(res, 201, "Crib Data Fetched Successfully", cribData.result, cribData.count);
    } catch (error) {
        next(error);
    }
}

export {
    getCrib,
    addCrib,
    editCrib,
    deleteCrib,
    listCrib,
}