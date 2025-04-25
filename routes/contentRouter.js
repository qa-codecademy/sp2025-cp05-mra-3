import { Router } from "express";
import ContentController from "../controllers/contentController.js";
import ValidateRequest from "../middlewares/validateRequest.js";
import { createContentSchema, updateContentSchema } from "../schemas/contentSchema.js";

const ContentRouter = Router()
export default ContentRouter

ContentRouter.get('/all', ContentController.getAllContents);
ContentRouter.put('/update/:id', ValidateRequest(updateContentSchema), ContentController.updateContent);
ContentRouter.post('/create', ValidateRequest(createContentSchema), ContentController.createContent);
ContentRouter.delete('/delete/:id', ContentController.deleteContent);
ContentRouter.get('/:id', ContentController.getContentById);



