import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { httpUrl } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  httpUrl: string;

  constructor() {
    this.httpUrl = httpUrl;
  }
  verifyClientId(id: string) {
    return this.http.get(`${this.httpUrl}/client/profile/${id}`);
  }

  updateClient(id: string, formData: FormData) {
    return this.http.patch(`${this.httpUrl}/client/update/${id}`, formData);
  }

  updatePassword(body: any, id: string) {
    return this.http.patch(
      `${this.httpUrl}/client/update/password/${id}`,
      body
    );
  }

  getClientPreferences(clientId: string) {
    return this.http.get(`${this.httpUrl}/preferences/${clientId}`);
  }

  addRemoveEmployeePreference(clientId: string, employeeId: string) {
    return this.http.post(
      `${this.httpUrl}/addRemoveEmployeePreference/${clientId}`,
      { employeeId: employeeId }
    );
  }

  addRemoveServicePreference(clientId: string, serviceId: string) {
    return this.http.post(
      `${this.httpUrl}/addRemoveServicePreference/${clientId}`,
      {
        serviceId: serviceId,
      }
    );
  }

  getPreferencePopulated(clientId: string) {
    return this.http.get(`${this.httpUrl}/preferencesPopulated/${clientId}`);
  }
}
