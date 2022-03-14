import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.css']
})
export class FormularioIngresoComponent implements OnInit {

  public correoLogin = '';
  public passwordLogin = '';
  public correoRegistro = '';
  public passwordRegistro = '';
  public idUser = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  public handleClear(){
    this.correoLogin = ''; 
    this.passwordLogin = ''; 
    this.correoRegistro = ''; 
     this.passwordRegistro ='' ; 
    
  }
  public async hacerLogin(correo:any, password:any): Promise<any>{
    
    if(correo==='' || password===''){
      return alert("Revisa tus credenciales")
    }
    try{
        const response = await this.loginService.login(correo, password);
        
        if(Object.keys(response).length >1){
          if (response.datos.password === 'validated')
          { 
            this.idUser = response.datos.idUser; 
            this.router.navigate([`/cuenta/${this.idUser}`]);
          }else{
            return response;
          }
        
        }else{
          alert("Revisa tus credenciales")
        }
     

        this.handleClear();
      return response;
      }

    catch(error) {
      // this.router.navigate(['/error']);//ruta de error
      alert("error: "+error);
    }
  }

  public async hacerregistro(correo:any, password:any): Promise<any>{
    
    if(correo==='' || password===0){
      return alert("Revisa tus credenciales")
    }
    try{
        const response = await this.loginService.registro(correo, password);
        
        if(Object.keys(response).length >0){
          if (response.message === 'created')
          { 
            this.idUser = response.idUser; 
            this.router.navigate([`/cuenta/${this.idUser}`]);
          }else{
            return response;
          }
        
        }else{
          alert("Revisa tus credenciales")
        }
     

        this.handleClear();
      return response;
      }

    catch(error) {
      // this.router.navigate(['/error']);//ruta de error
      alert("error: "+error);
    }
  }


}
