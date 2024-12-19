import type {ContentRoadmapNode, RoadmapNode} from "../lib/types/roadmap.ts";
import strapi from "../lib/strapi.ts";

export namespace RoadmapService {
    export async function get(id: number): Promise<ContentRoadmapNode> {
        return (await strapi.find<RoadmapNode>("roadmap-nodes", {
            fields: ["id", "slug", "title", "description", "content"],
            filters: { id },
            populate: {
                roadmap_node: {
                    fields: ["id"]
                },
                roadmap_nodes: {
                    fields: ["id"],
                },
                parent: {
                    fields: ["id"]
                }
            }
        } as any)).data[0];
    }

    export async function getGraph(): Promise<{
        adj: Record<string, number[]>,
        rootIndex: number,
        topicsIndex: number[],
        nodes: RoadmapNode[],
    }> {
        const rootId = (await strapi.find<{ id: number }>("roadmap-nodes", {
            fields: ["id"],
            filters: {
                parent: { $null: true },
                roadmap_node: { $null: true }
            }
        })).data[0];

        const nodes = (await strapi.find<RoadmapNode[]>("roadmap-nodes", {
            fields: ["id", "slug", "title", "description"],
            populate: {
                roadmap_node: {
                    fields: ["id"]
                },
                roadmap_nodes: {
                    fields: ["id"],
                },
                parent: {
                    fields: ["id"]
                }
            }
        } as any)).data;

        let adj = {};
        nodes.forEach((currentNode) => {
            currentNode.roadmap_nodes.forEach((node, index) => {
                const currentId = currentNode.id;
                adj[currentId] = adj[currentId] ? [...adj[currentId], index] : [index];
            })
        });

        return {
            rootIndex: nodes.findIndex(
                (node) => node.id === rootId.id
            ),
            topicsIndex: nodes
                .filter((node) => node.roadmap_node === null)
                .sort((a, b) => {
                    if (a.parent === null) {
                        return -1;
                    } else if (b.parent === null) {
                        return 1;
                    }

                    return a.parent.id - b.parent.id;
                })
                .map((_, index) => index),
            adj,
            nodes
        };
    }
}