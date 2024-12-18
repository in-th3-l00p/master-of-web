import {BlocksContent} from "@strapi/blocks-react-renderer";

export interface Article {
    title: string;
    slug: string;
    author: {
        username: string;
        title: string;
        picture?: {
            url: string;
        },
        url?: string;
    };
    article_tags: {
        name: string;
        slug: string;
    }[];
    description: string;
    publishedAt: string;
}

export interface ContentArticle extends Article {
    content: BlocksContent;
}

export interface ArticleResponse {
    data: Article[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    }
}