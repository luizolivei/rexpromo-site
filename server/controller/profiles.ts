import profileModel from "~/server/models/profile.model"

export const createProfile = async (event: any) => {
    try {
        const body = await readBody(event);
        return await profileModel.create(body);
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getProfile = async (event: any) => {
    try {
        const body = await readBody(event);
        return await profileModel.findOne({whats: body.whats});
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};