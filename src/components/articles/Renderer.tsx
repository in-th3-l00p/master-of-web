import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import type {ContentArticle} from "../../lib/types";

function Breadcrumbs({ article }: { article: ContentArticle }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <a href="/" className="text-gray-400 hover:text-gray-500">
                            <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                            </svg>
                            <span className="sr-only">Home</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="size-5 shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <a href="/#articles" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Articles</a>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg className="size-5 shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">{article.title}</a>
                    </div>
                </li>
            </ol>
        </nav>
    );
}

export default function Renderer({ article }: { article: ContentArticle }) {
    return (
        <div className="article-section">
            <div className="mx-auto pb-8 border-b mb-8 max-w-3xl text-base/7 text-gray-700">
                <Breadcrumbs article={article} />
                <p className="text-base/7 font-semibold text-cyan-600">{article.author.username} @ {(new Date(article.publishedAt)).toLocaleDateString()}</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{article.title}</h1>
                <p className="mt-6 text-xl/8">{article.description}</p>
            </div>

            <BlocksRenderer
                content={article.content}
                blocks={{
                    image: ({ image }: { image: {
                        alternativeText: string;
                        caption?: string;
                        url: string;
                    } }) => {
                        if (image.caption)
                            return (
                                <figure>
                                    <img src={image.url} alt={image.alternativeText} />
                                    <figcaption>{image.caption}</figcaption>
                                </figure>
                            )
                        return <img src={image.url} alt={image.alternativeText} />
                    }
                } as any}
            />
        </div>
    );
}