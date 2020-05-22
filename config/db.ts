import { Client } from 'https://deno.land/x/mysql/mod.ts';

const db = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    password: "secret",
    db: "deno_blog",
});

export { db }