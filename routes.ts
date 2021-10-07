import { Router }from 'https://deno.land/x/oak/mod.ts'
import {getBooks, getBook, addBook, updateBook, delBook} from './controller.ts'

const router = new Router()
router.get("/books", getBooks)
router.get("/book/:isbn", getBook)
router.post("/books", addBook)
router.put("/book/:isbn", updateBook)
router.delete("/book/:isbn", delBook)


export default router