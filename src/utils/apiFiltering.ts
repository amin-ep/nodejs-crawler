class APIFiltering {
    query: string;
    queryString: string
    constructor(query: string, queryString: string) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObject: { page: string } = { ...this.queryString }
    }
}

export default APIFiltering;