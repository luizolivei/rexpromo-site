import orderModel from "~/server/models/order.model"
import historyModel from "~/server/models/history.model"

export const createOrder = async (event: any) => {
    try {
        const body = await readBody(event);

        await orderModel.deleteMany({
            reqCode: body.reqCode,
        });

        return await orderModel.create(body);
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const deleteOrder = async (event: any) => {
    try {
        const body = await readBody(event);

        const order = await orderModel.findOneAndDelete({reqCode: body.reqCode});

        if (!order) {
            return false;
        }

        await historyModel.create(order);
        return true;
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getAllOrders = async () => {
    try {
        return await orderModel.find();
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getOrderByMesa = async (event: any) => {
    try {
        const body = await readBody(event);
        const historico = await orderModel.findOne({mesa: body.mesa});
        return historico ?? false
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getOrderByReq = async (event: any) => {
    try {
        const body = await readBody(event);
        return await orderModel.findOne({reqCode: body.reqCode});
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};