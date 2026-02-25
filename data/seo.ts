import { Tool } from '../app/types';
import toolsData from './tools.json';

const tools = toolsData as Tool[];

export interface VsPair {
    slug: string; // "slack-vs-mattermost"
    proprietaryTool: Tool;
    opensourceTool: Tool;
}

export function generateVsPairs(): VsPair[] {
    const pairs: VsPair[] = [];

    // Find all proprietary tools
    const proprietaryTools = tools.filter(t => !t.is_open_source);

    proprietaryTools.forEach(propTool => {
        if (!propTool.alternatives) return;

        propTool.alternatives.forEach(altSlug => {
            const altTool = tools.find(t => t.slug === altSlug);
            if (altTool) {
                pairs.push({
                    slug: `${propTool.slug}-vs-${altTool.slug}`,
                    proprietaryTool: propTool,
                    opensourceTool: altTool
                });
            }
        });
    });

    return pairs;
}
