import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { UploadState } from './upload-state';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  public upload(file: File, url: string): Observable<UploadState> {

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    // create a new progress-subject for every file
    const progress = new Subject<UploadState>();

    // send the http-request and subscribe for progress-updates
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        // calculate the progress percentage
        const percentDone = Math.round(100 * event.loaded / event.total);

        // pass the percentage into the progress-stream
        progress.next({ progress: percentDone });
      } else if (event instanceof HttpResponse) {

        // Close the progress-stream if we get an answer form the API
        // The upload is complete
        progress.next({ progress: 100, location: event.headers.get('Location') });

        progress.complete();
      }
    });

    // return the map of progress.observables
    return progress.asObservable();
  }
}
