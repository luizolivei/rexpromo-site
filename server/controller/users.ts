import usersModel from "~/server/models/users.model"

export const createUser = async (event: any) => {
    try {
        const body = await readBody(event);
        return await usersModel.create(body);
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
        return await usersModel.findOne({username: body.username, password: body.password});
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

//TODO implementar um auth de verdade
export const setLogin = async (event: any) => {
    try {
        const body = await readBody(event);

        const user = await usersModel.findOne({username: body.username, password: body.password});

        if (user && user.password) {
            return "J_48dI8inTn5hInTtNgVSQ"
        }

        return ""
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const validateLogin = async (event: any) => {
    try {
        const body = await readBody(event);

        if (body.token === "J_48dI8inTn5hInTtNgVSQ") {
            return true
        }

        return false
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};