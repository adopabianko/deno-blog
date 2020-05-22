import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { db } from '../config/db.ts';

/**
 * url http://localhost:3001/article/ (Get All Articles)
 * url http://localhost:3001/article/11f275d7-f526-455b-88f4-4bedec74d5ef (Get Article By Id)
 */
const getArticles = async ({ params, response }: { params: { id: string }, response: any }) => {
    if (params.id) {
        let article = await db.query(`SELECT * FROM article WHERE id = ?`, [params.id]);

        response.body = {
            status: true,
            data: article,
        }
    } else {
        let articles = await db.query(`SELECT * FROM article`);

        response.body = {
            status: true,
            data: articles,
        }
    }
}

/**
 * url http://localhost:3001/article/add
 * request {
 *  "title": "What is Lorem Ipsum?",
 *  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting"
 * }
 */
const addArticle = async ({ request, response }: { request: any, response: any }) => {
    let body = await request.body();

    if (!request.hasBody) {
        response.status = 404;
        response.body = {
            status: false,
            message: "No Data"
        }
    } else {
        let title = body.value.title;
        let content = body.value.content;
        let uuid = v4.generate();

        await db.execute(`INSERT INTO article(id, title, content) VALUES(?,?,?)`, [
            uuid, title, content
        ])

        response.status = 201;
        response.body = {
            status: true,
            data: {
                id: uuid,
                title: title,
                content: content,
            }
        }
    }
};

/**
 * url http://localhost:3001/article/11f275d7-f526-455b-88f4-4bedec74d5ef
 */
const deleteArticle = async ({ params, response }: { params: { id: string }, response: any }) => {
    await db.execute(`DELETE FROM article WHERE id = ?`, [params.id]);

    response.body = {
        status: true,
        message: "Successfully article deleted",
    }
}

export { getArticles, addArticle, deleteArticle }