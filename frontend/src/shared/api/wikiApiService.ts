import {wikiConfig} from "../config/wikiApiConfig.ts";
import {WikiApi} from "./index.ts";

export const wikiApi = new WikiApi({baseUrl: wikiConfig.apiUrl })