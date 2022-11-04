import cribSchema from "../../models/crib.model.js";

const readCrib = async (
    find = {},
    select = {},
    sort = {},
    page = 0,
    limit = 10,
) => {
    try {
        const result = await cribSchema
            .find(find)
            .select(select)
            .sort(sort)
            .skip(page * limit)
            .limit(limit);

        const count = await cribSchema.countDocuments(find);

        return {result, count};
    } catch (error) {
        throw new Error(error);
    }
};

const createCrib = async (cribData) => {
    try {
        const result = new cribSchema(cribData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}

const readCribSingle = async (filter, select = {}) => {
    try {
        const result = await cribSchema.findOne(filter).select(select).lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const updateCrib = async (filter, updateData, select = {}) => {
    try {
        const result = await cribSchema
            .findOneAndUpdate(filter, updateData, { new: true, runValidators: true })
            .lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export {
    readCrib,
    createCrib,
    readCribSingle,
    updateCrib,
}