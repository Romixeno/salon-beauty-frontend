import { Injectable, inject } from '@angular/core';
import { ServiceModel } from '../Models/service.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { httpUrl } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  http: HttpClient = inject(HttpClient);
  httpUrl: string;

  constructor() {
    this.httpUrl = httpUrl;
  }
  private testSub = new Subject<ServiceModel[]>();

  ses$ = this.testSub.asObservable();
  // private servicesSubject = new BehaviorSubject<ServiceModel[]>(null);
  // services$ = this.servicesSubject.asObservable();
  addServices(formData: FormData) {
    return this.http.post(this.httpUrl + '/service', formData);
  }

  getAllServices() {
    return this.http.get(this.httpUrl + '/allServices').pipe(
      tap((response: ServiceModel[]) => {
        this.testSub.next(response);
      })
    );
  }

  getServiceById(id: string) {
    return this.http.get(this.httpUrl + '/oneService/' + id);
  }

  getAllServicesTypes() {
    return this.http.get(this.httpUrl + '/allServiceType');
  }

  updateServices(formData: FormData, id: string) {
    return this.http.patch(this.httpUrl + '/updateService/' + id, formData);
  }

  deleteService(id: string) {
    return this.http.delete(this.httpUrl + '/deleteService/' + id);
  }

  searchService(query: { q: string; filterBy: string }) {
    return this.http.post(this.httpUrl + '/search/services', { query: query });
  }
}
