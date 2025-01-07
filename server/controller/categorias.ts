import categoriasModel from "~/server/models/categorias.model"

export const createCategoria = async (event: any) => {
    try {
        const body = await readBody(event);
        return await categoriasModel.create(body);
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const deleteCategoria = async (event: any) => {
    try {
        const body = await readBody(event);
        return await categoriasModel.deleteMany({_id: body._id});
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};