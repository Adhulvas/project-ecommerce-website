import e from "express";

const router = e.Router()

router.get('/:id')
router.get('/categories')
router.get('/categories/:category')
router.get('/search')


export {router as orderRouter}