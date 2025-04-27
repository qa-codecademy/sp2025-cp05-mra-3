import { Schema, model } from 'mongoose';

const contentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    german: {
        type: String,
        required: true,
    },
    english: {
        type: String,
        required: true,
    },
    macedonian: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    })
const ContentModel = model('multilingualpagecontent', contentSchema);
export default ContentModel;
