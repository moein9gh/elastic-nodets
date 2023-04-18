import * as elasticsearch from "elasticsearch";
import { esConfig } from "../config/esConfig";

export const esClient = new elasticsearch.Client({
    host: esConfig.host,
    apiVersion: "7.x",
});
