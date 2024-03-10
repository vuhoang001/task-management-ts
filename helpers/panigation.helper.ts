const panigation = (objectPanigation, query, countRecords) => {
    if (query.page) {
        objectPanigation.currentPage = parseInt(query.page)
    }

    if (query.limit) {
        objectPanigation.limitItems = parseInt(query.limit)
    }

    objectPanigation.skip = (objectPanigation.currentPage - 1) * objectPanigation.limitItems

    objectPanigation.totalPage = Math.ceil(countRecords / objectPanigation.limitItems)

    return objectPanigation
}

export default panigation