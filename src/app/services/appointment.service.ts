import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppointmentModel } from '../Models/appointment.model';
import { httpUrl } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  http: HttpClient = inject(HttpClient);
  httpUrl: string;

  constructor() {
    this.httpUrl = httpUrl;
  }
  newAppointment(data: AppointmentModel) {
    return this.http.post(`${this.httpUrl}/new`, data);
  }

  getClientAppointment(id: string) {
    return this.http.get(`${this.httpUrl}/client/${id}`);
  }

  getEmployeeTasks(employeeId: string) {
    return this.http.get(`${this.httpUrl}/employee/${employeeId}`);
  }
}
