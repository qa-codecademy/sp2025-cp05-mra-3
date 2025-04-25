import mongoose from 'mongoose';
import ContentModel from '../models/contentModel.js';

const ContentServices = {
    async getAllContents() {
        const allContents = await ContentModel.find();
        return allContents;
    },
    async updateContent(id, body) {
        const updatedContent = await ContentModel.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })
        return updatedContent
    },
    async createContent(body) {
        const { name, german, english, spanish, french, macedonian } = body;
        const newContent = new ContentModel({
            name,
            german,
            english,
            spanish,
            french,
            macedonian,
        });
        const createdContent = await newContent.save();
        return createdContent;
    },
    async deleteContent(id) {
        await ContentModel.findByIdAndDelete(id)
        return `Content with ${id} was deleted.`
    },
    async getContentById(id) {
        const contentDetails = await ContentModel.findById(id);
        return contentDetails;
    },
};

export default ContentServices;


