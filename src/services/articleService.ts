import strapi from "../lib/strapi";
import {Article, ArticleResponse, ContentArticle} from "../lib/types";

export namespace ArticleService {
    export async function getAll(): Promise<ArticleResponse> {
        return await strapi.find<Article>("articles", {
            fields: ["title", "slug", "description", "publishedAt"],
            populate: {
                author: {
                    fields: ["username", "url", "title"],
                    populate: ["picture"]
                },
                article_tags: {
                    fields: ["name", "slug"]
                }
            }
        } as any) as ArticleResponse;
    }

    export async function get(slug: string): Promise<ContentArticle> {
        return (await strapi.find<Article>("articles", {
            fields: ["title", "slug", "content", "description", "publishedAt"],
            filters: {slug},
            populate: {
                author: {
                    fields: ["username", "url", "title"],
                    populate: ["picture"]
                },
                article_tags: {
                    fields: ["name", "slug"]
                }
            }
        } as any)).data[0];
    }
}