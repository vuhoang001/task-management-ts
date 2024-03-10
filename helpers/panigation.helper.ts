interface objectPanigation {
    currentPage: number,
    limitItems: number,
    skip?: number,
    totalPage?: number
}

const panigation = (objectPanigation: objectPanigation, query: Record<string, any>, countRecords: number): objectPanigation => {
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