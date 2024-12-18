import type {BlocksContent} from "@strapi/blocks-react-renderer";

export interface RoadmapNode {
    id: number;
    slug: string;
    title: string;
    description: string;
    roadmap_node: { id: number; }; // parent
    roadmap_nodes: [{ id: number; }];
}

export interface ContentRoadmapNode extends RoadmapNode {
    content: BlocksContent;
}

export interface RoadmapNodeResponse {
    data: RoadmapNode[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    }
}
