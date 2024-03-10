interface search {
    keyword: string,
    regex?: RegExp
}
const searchHelper = (query: Record<string, any>): search => {

    const objectSearch: search = {
        keyword: ""
    }

    if (query.keyword) {
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword, 'i')
        objectSearch.regex = regex
    }

    return objectSearch
}

export default searchHelper