import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contact } from '../Model/Contact';
import { Group } from '../Model/Group';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl = 'http://192.168.0.105:9000'; //Json-server url
  constructor(private httpClient: HttpClient) {}

  //Add Contact
  public createContact(contact: Contact): Observable<Contact> {
    let dataUrl = `${this.serverUrl}/contact`;
    return this.httpClient
      .post<Contact>(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }

  //get All Contact
  public getAllContact(): Observable<Contact[]> {
    let dataUrl = `${this.serverUrl}/contact`;
    return this.httpClient
      .get<Contact[]>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  //get Single Contact\
  public getSingleContact(contactId: string): Observable<any> {
    let dataUrl = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError));
  }

  //get All Group
  public getAllGroups(): Observable<Group[]> {
    let dataUrl = `${this.serverUrl}/groups`;
    return this.httpClient
      .get<Group[]>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  //get Single Group
  public getGroup(contact: any): Observable<any> {
    let dataUrl = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get(dataUrl).pipe(catchError(this.handleError));
  }

  public updateContact(contactId: string, contact: Contact) {
    let dataUrl = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient
      .put(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }

  //Deletd by id
  public deleteContact(contactId: string) {
    let dataUrl = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient.delete(dataUrl).pipe(catchError(this.handleError));
  }
  //Error Handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.warn(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      (errorMessage = `Backend returned code ${error.status}, body was: `),
        error.error;
    }
    errorMessage = 'Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}

//json-server --host 192.168.100.84  --port 9000
