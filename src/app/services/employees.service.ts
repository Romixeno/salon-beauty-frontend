import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { EmployeeModel } from '../Models/employee.model';
import { response } from 'express';
import { httpUrl } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  http: HttpClient = inject(HttpClient);
  private EmployeeSubject = new Subject<EmployeeModel[]>();
  Employee$ = this.EmployeeSubject.asObservable();
  httpUrl: string;

  constructor() {
    this.httpUrl = httpUrl;
  }

  getAllEmployee() {
    // /allEmployer
    return this.http.get(`${this.httpUrl}/allEmployer`).pipe(
      tap((response: EmployeeModel[]) => {
        this.EmployeeSubject.next(response);
      })
    );
  }
  addEmployee(formData: FormData) {
    return this.http.post(`${this.httpUrl}/addEmployee`, formData);
  }
  updateEmployee(formData: FormData, id: string) {
    // /updateEmployee/:id
    return this.http.patch(`${this.httpUrl}/employee/update/${id}`, formData);
  }
  deleteEmployee(id: string) {
    // /deleteEmployee/:_id
    return this.http.delete(`${this.httpUrl}/deleteEmployee/${id}`);
  }

  getEmployeeById(id: string) {
    return this.http.get(`${this.httpUrl}/oneEmployee/${id}`);
  }

  updatePassword(body: any, id: string) {
    return this.http.patch(
      `${this.httpUrl}/employee/update/password/${id}`,
      body
    );
  }

  getEmployeeBySpecialty(bySpecialty: string) {
    return this.http.get(
      `${this.httpUrl}/employee/bySpecialty/?specialty=${bySpecialty}`
    );
  }

  searchEmployee(q: string) {
    return this.http.get(`${this.httpUrl}/employees/${q}`);
  }
}
