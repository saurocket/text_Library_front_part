export const createPath = (page: number, title: string, author: string) => {
    if (title && author) return `page=${page}&search[title]=${title}&search[author]=${author}`
    if (title && !author) return `page=${page}&search[title]=${title}`
    if (!title && author) return  `page=${page}&search[author]=${author}`
    if (!title && ! author) return `page=${page}`

}