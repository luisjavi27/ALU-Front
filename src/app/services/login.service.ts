import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(correo: any, password: any): Promise<any>{
    
    const url = `${environment.apiUrl}/postLogin`;
    const body= {correo, password};

  return this.http.post(url, body).toPromise();

}

public registro(correo: any, password: any): Promise<any>{
    
  const url = `${environment.apiUrl}/postUser`;
  
  const body= {correo, password};

  return this.http.post(url, body).toPromise();

  }
}
