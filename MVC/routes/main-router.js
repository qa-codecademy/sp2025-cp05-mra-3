import {Router} from 'express';
const MainRouter = Router();
export default MainRouter

import ContentRouter from './contentRouter.js';
MainRouter.use('/multilingualpagecontent', ContentRouter);