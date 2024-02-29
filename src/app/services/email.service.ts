import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { httpUrl } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = httpUrl;
  sendAppointmentSuccessEmail(clientEmail: string, date: Date) {
    const mailOptions = {
      to: clientEmail,
      subject: 'Appointment for BeautySalon Services',
      amp: `<!DOCTYPE html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8" />
          <style amp4email-boilerplate>
            body {
              visibility: hidden;
            }
          </style>
          <style amp-custom>
            header {
              background-color: black;
              padding: 10px;
            }
            h2 {
              color: white;
            }
          </style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
        </head>
        <body>
          <header>
            <h2>BeautySalon</h2>
          </header>
          <p>
            Your appointment for beauty salon for ${date} is registered
            successfully! See you soon.
          </p>
        </body>
      </html>
      `,
    };
    return this.http.post(this.baseUrl + '/sendEmail', mailOptions);
  }
}
