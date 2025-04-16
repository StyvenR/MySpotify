import { SearchService } from './search.service';
import { QueryTypeEnum, SearchResult } from './search.types';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    search(query: string, type: QueryTypeEnum): Promise<SearchResult>;
}
