import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Website {
        id: ID
        name: String
        domain: String
        city: String
        starRating: Int
        expirationDate: String
    }

    type WebsitePerCity {
        count: Int,
        data: [Website]
        city: String 
    }

    type WebsiteGroupedByStar {
        numWebsites: Int
        data: [Website]
        starRating: String
    }

    type Query {
        getWebsitesPerCity: [WebsitePerCity]
        getWebsiteGroupedByStar: [WebsiteGroupedByStar]
    }
`);

export default schema;
