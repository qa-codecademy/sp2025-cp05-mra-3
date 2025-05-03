import ContentServices from '../services/contentServices.js'

const ContentController = {
    async getAllContents(req, res) {
        const allContents = await ContentServices.getAllContents();
        res.send(allContents);
    },
    async updateContent(req, res) {
        try {
            const updatedContent = await ContentServices.updateContent(
                req.params.id,
                req.body
            );
            res.send(updatedContent);
        } catch (error) {
            res.status(500).send({
                errors: [error.message],
            });
        }
    },
    async createContent(req, res) {
        try {
            const newContent = await ContentServices.createContent(req.body);
            res.status(201).send(newContent);
        } catch (error) {
            res.status(500).send({
                errors: [error.message],
            });
        }
    },
    async deleteContent(req, res) { // ova e ok
        try {
            await ContentServices.deleteContent(req.params.id);
            res.sendStatus(204)
        } catch (error) {
            res.status(500).send({
                errors: [error.message],
            });
        }
    },
    async getContentById(id) {
        const contentDetails = await ContentServices.findById(id);
        if (!contentDetails) {
            throw new Error('Content not found');
        }
        return contentDetails;
    },
