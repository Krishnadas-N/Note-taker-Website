import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/responseHandler';
import { Observable, catchError, tap } from 'rxjs';
import { EditorForm } from '../models/form.models';
import { INote } from '../models/user.models';
import { UiChangeService } from './ui-change.service';

@Injectable()
export class UserService {
  private apiUrl = `${environment.backendUrl}/user`;

  constructor(private http: HttpClient, private uiService: UiChangeService) { }

  saveNotes(notes: EditorForm): Observable<ApiResponse<void>> {
    console.log("save notes", notes);
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/add-notes`, notes)
  }

  getNotes(): Observable<ApiResponse<INote[]>> {
    this.uiService.showLoading();
    return this.http.get<ApiResponse<INote[]>>(`${this.apiUrl}/get-notes`).pipe(
      tap({
        next: () => this.uiService.showLoading(),
        error: () => this.uiService.hideLoading(),
        complete: () => this.uiService.hideLoading()
      }),
      catchError((error) => {
        this.uiService.hideLoading();
        throw error;
      })
    );
  }

  getANote(noteId: string): Observable<ApiResponse<INote>> {
    this.uiService.showLoading();
    return this.http.get<ApiResponse<INote>>(`${this.apiUrl}/get-note/${noteId}`).pipe(
      tap({
        next: () => this.uiService.showLoading(),
        error: () => this.uiService.hideLoading(),
        complete: () => this.uiService.hideLoading()
      }),
      catchError((error) => {
        this.uiService.hideLoading();
        throw error;
      })
    );
  }

  deleteNote(noteId: string): Observable<ApiResponse<void>> {
    this.uiService.showLoading();
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete-note/${noteId}`)
  }
}
