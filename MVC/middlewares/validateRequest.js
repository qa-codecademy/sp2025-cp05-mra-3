const ValidateRequest = schema => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        res.status(400).send({
            errors: error.errors,
        });
    }
};
export default ValidateRequest;
