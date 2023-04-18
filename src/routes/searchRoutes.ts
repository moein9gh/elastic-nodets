import { Router, Request, Response } from "express";
import { esClient } from "../utils/esClient";
import { esConfig } from "../config/esConfig";

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ message: "Query parameter 'q' is required." });
    }

    try {
        const searchResults = await esClient.search({
            index: esConfig.index,
            type: esConfig.type,
            body: {
                query: {
                    multi_match: {
                        query: q,
                        fields: ["title^3", "content"],
                        fuzziness: "AUTO",
                    },
                },
            },
        });

        const hits = searchResults.hits.hits;
        res.status(200).json(hits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export { router as searchRoutes };
