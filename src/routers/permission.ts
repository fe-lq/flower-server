import Router from 'koa-router';
import { permController } from '../controller/permission';

export const router = new Router({ prefix: '/permission' });

router.post('/list', permController.getPerms);
router.post('/add', permController.addPermission);
router.post('/update', permController.updatePermission);
router.get('/delete', permController.deletePermission);
