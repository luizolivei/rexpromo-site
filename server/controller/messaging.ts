import messagingModel from "~/server/models/messaging.model"

export const createMessaging = async (event: any) => {
    try {
        const body = await readBody(event);
        return await messagingModel.create(body);
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};