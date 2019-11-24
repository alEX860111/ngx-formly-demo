import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileUploadState } from './file-upload-state';

@Injectable()
export class FileUploadService {

  constructor(private readonly http: HttpClient) { }

  public upload(file: File, url: string): Observable<FileUploadState> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    const progress = new Subject<FileUploadState>();

    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        const percentDone = Math.round(100 * event.loaded / event.total);

        progress.next({ progress: percentDone });
      } else if (event instanceof HttpResponse) {
        if (event.ok) {
          progress.next({ progress: 100, location: event.headers.get('Location') });
          progress.complete();
        } else {
          progress.error(event.statusText);
        }
      }
    }, error => progress.error(error.statusText));

    return progress.asObservable();
  }

}
