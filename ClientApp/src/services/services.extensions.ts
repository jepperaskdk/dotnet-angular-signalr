import { HttpResponseBase } from "@angular/common/http"; // ignore
import { Observable } from "rxjs"; // ignore

export class ClientBase {
    protected transformOptions(options: any): Promise<any> {
        return Promise.resolve(options);
    }

    protected transformResult(url: string, response: HttpResponseBase, processor: (response: HttpResponseBase) => Observable<any>): Observable<any> {
        return processor(response);
    }
}
