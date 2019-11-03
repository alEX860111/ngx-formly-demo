import { Observable } from 'rxjs';

export class SelectedFile {

  private _file: File;

  private _progress: number;

  constructor(file: File, private progressObservable: Observable<number>) { 
    this._file = file;
    this.progressObservable.subscribe(progress => this._progress = progress);
  }

  get file(): File {
    return this._file;
  }

  get progress(): number {
    return this._progress;
  }

  get uploadIsDone(): boolean {
    return this.progress === 100;
  }

}
