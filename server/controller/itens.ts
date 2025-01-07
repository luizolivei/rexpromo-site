import itensModel from "~/server/models/itens.model"
import categoriasModel from "~/server/models/categorias.model"

export const createItem = async (event: any) => {
    try {
        const body = await readBody(event);
        return await itensModel.create(body);
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const deleteItem = async (event: any) => {
    try {
        const body = await readBody(event);

        return await itensModel.deleteMany({_id: body._id});
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getAllItens = async () => {
    try {
        return await itensModel.find();
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};

export const getAllItensAndAgrupadores = async (event: any) => {
    try {
        const testeee = await categoriasModel.aggregate([
            {
                $lookup: {
                    from: 'itens',
                    localField: 'nome',
                    foreignField: 'categoria_nome',
                    as: 'itens'
                }
            }
        ])
            .then(result => {
                return result;
            }).catch(erro => {
                console.error('Erro ao salvar o historico:', erro);
            });

        console.log("aq", testeee)
        return testeee
    } catch (err) {
        console.error(err);
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        });
    }
};