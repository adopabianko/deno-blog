import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getArticles, addArticle, deleteArticle } from './controllers/ArticleController.ts';

const router = new Router();
router.get('/', (context) => {
    context.response.body = "Simple CRUD using Deno JS";
});
router.get('/article', getArticles)
    .get('/article/:id', getArticles)
    .post('/article/add', addArticle)
    .delete('/article/:id', deleteArticle);

export default router;