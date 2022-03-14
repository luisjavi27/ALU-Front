import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CuentaService {



  constructor(private http: HttpClient) {}



  public   obtenerCuenta(id: any): Promise<any>{
    
      const url = `${environment.apiUrl}/getcuenta/${id}`;
    
    return this.http.get(url).toPromise();
  
  }

  public   movimientosCuenta(id: any): Promise<any>{
    
    const url = `${environment.apiUrl}/getmovimientos/${id}`;
  
  return this.http.get(url).toPromise();

}

public   retiro(id: any, monto: any): Promise<any>{
    
  const url = `${environment.apiUrl}/putretiro`;
  const body = {"id": id, "retiro": monto};

return this.http.put(url, body).toPromise();

}

public   abono(id: any, monto: any): Promise<any>{
    
  const url = `${environment.apiUrl}/putabono`;
  const body = {"id": id, "abono": monto};

return this.http.put(url, body).toPromise();

}


}
