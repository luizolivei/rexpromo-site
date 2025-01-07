import {H3Event, useBase, createRouter, defineEventHandler} from 'h3';
import * as ordersController from '../controller/orders';
import * as profilesController from '../controller/profiles';
import * as messagingController from '../controller/messaging';
import * as usersController from '../controller/users';
import * as itensController from '../controller/itens';

const router = createRouter();

router.get('/socket.io', defineEventHandler((event: H3Event) => initSocket(event)))
router.post('/createProfile', defineEventHandler(profilesController.createProfile));
router.post('/getProfile', defineEventHandler(profilesController.getProfile));
router.post('/getOrderByReq', defineEventHandler(ordersController.getOrderByReq));
router.post('/createOrder', defineEventHandler(ordersController.createOrder));
router.post('/deleteOrder', defineEventHandler(ordersController.deleteOrder));
router.post('/postMessaging', defineEventHandler(messagingController.createMessaging));
router.get('/getAllItensAndAgrupadores', defineEventHandler(itensController.getAllItensAndAgrupadores));

//auth precisa ser feito, tem apenas um TESTE BASE aqui
router.post('/login', defineEventHandler(usersController.setLogin));
router.post('/validateLogin', defineEventHandler(usersController.validateLogin));

export default useBase('/api', router.handler);