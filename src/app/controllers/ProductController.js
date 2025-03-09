import * as Yup from 'yup';

class ProductController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required()
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ error: error.errors });
        }

        return res.status(201).json({ message: 'Produto criado com sucesso!' });
    }
}

export default new ProductController();