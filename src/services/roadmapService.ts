import type {RoadmapNode} from "../lib/types/roadmap.ts";
import strapi from "../lib/strapi.ts";

class RoadmapService {
    async getRoot(): Promise<RoadmapNode> {
        return (await strapi.find<RoadmapNode>("roadmap-nodes", {
            fields: ["id", "slug", "title", "description"],
            filters: {parent: null},
            populate: {
                roadmap_node: {
                    fields: ["id"]
                },
                roadmap_nodes: {
                    fields: ["id"],
                }
            }
        } as any)).data[0];
    }

    async get(id: number): Promise<RoadmapNode> {
        return (await strapi.find<RoadmapNode>("roadmap-nodes", {
            fields: ["id", "slug", "title", "description"],
            filters: {id},
            populate: {
                roadmap_node: {
                    fields: ["id"]
                },
                roadmap_nodes: {
                    fields: ["id"],
                }
            }
        } as any)).data[0];
    }
}