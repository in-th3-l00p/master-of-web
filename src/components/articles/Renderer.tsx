import type {ContentArticle} from "../../lib/types.ts";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";

export default function Renderer({ article }: { article: ContentArticle }) {
    return (
        <div className="article-section">
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