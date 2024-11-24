import {wikiConfig} from "../config/wikiApiConfig.ts";
import {WikiApi} from "../api";

export const wikiApi = new WikiApi({baseUrl: wikiConfig.apiUrl })