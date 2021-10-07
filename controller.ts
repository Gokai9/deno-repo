interface IBOOK {
    isbn: string
    title: string
    author: string
}

let books: Array<IBOOK> = [
    {
        isbn: "1",
        author: "Robin Wieruch",
        title: "The Road to React",
      },{
        isbn: "2",
        author: "Kyle Simpson",
        title: "You Don't Know JS: Scope & Closures",
      },{
        isbn: "3",
        author: "Andreas A. Antonopoulos",
        title: "Mastering Bitcoin",
      }
]

export const getBooks = ({response}: {response: any}) => {
    response.body = books
}

export const getBook = ({params, response}: {params: {isbn:string}; response: any}) => {
    const book: IBOOK | undefined = searchIsbn(params.isbn)
    if (book) {
        response.status = 200
        response.body = book
    } else {
        response.status = 400
        response.body = "Tidak dapat menemukan buku yang anda cari"
    }
}

export const addBook = async({request, response}: {request: any; response: any}) => {
    const body = await request.body()
    const book: IBOOK = body.value
    books.push(book)
    response.status = 200
    response.body = {"pesan": "berhasil", "data": books}
}

export const updateBook = async({params, request, response}: {params: {isbn: string}; request: any; response: any;}) => {
    let book: IBOOK | undefined = await searchIsbn(params.isbn)
    if (book) {
        const body = await request.body()
        const updbook: {author?: string; title?: string} = body.value
        book = {...book, ...updbook}
        books = [...books.filter(book => book.isbn !== params.isbn), book]
        response.status = 200
        response.body = {"message": "berhasil", "data": books}
    } else {
        response.status = 404
        response.body = {"message": "gagal"}
    }
}

export const delBook = ({params, response}: {params:{isbn:string}; response: any}) => {
    books = [...books.filter(book => book.isbn !== params.isbn)]
    response.status = 200
    response.body = {"message": "berhasil dihapus", "data": books}
}

const searchIsbn = (isbn:string): (IBOOK | undefined) => books.filter(book => book.isbn == isbn)[0]