import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{CuentaService} from '../services/cuenta.service'





@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  public idUsuario = 0;
  public montoRetiro = '';
  public montoAbono = '';

public datosCuenta = {idcuenta: null, correo: null, saldo: null};
public historico =[{timemovimiento:null, saldoanterior: null, saldonuevo: null }];

  constructor( private CuentaService:CuentaService, private route:ActivatedRoute) { }

  

  async ngOnInit(): Promise<void> {
    this.idUsuario = this.route.snapshot.params['id'];

    this.datosCuenta= await this.cargarCuenta(this.idUsuario);
    this.historico= await this.cargarHistorico(this.datosCuenta.idcuenta);
    
    
  }

 public handleClear(){
    this.montoRetiro = ' '; 
    this.montoAbono = ' '; 
  }

  public async cargarCuenta (idCuenta:any): Promise<any>{
    
    try{
      const response = await this.CuentaService.obtenerCuenta(idCuenta);
      return response.datos[0];
      }

    catch(error) {
      // this.router.navigate(['/error']);//ruta de error
      alert("error: "+error);
    }
  }

  public async cargarHistorico (idCuenta:any): Promise<any>{
    
    try{
        const response = await this.CuentaService.movimientosCuenta(idCuenta);
        
      return response.datos;
      }

    catch(error) {
      // this.router.navigate(['/error']);//ruta de error
      alert("error: "+error);
    }
  }

  public async hacerRetiro (id:any, monto:any): Promise<any>{
    
    try{
        const response = await this.CuentaService.retiro(id, monto);
        console.log(response);
        if(response.details ==='minimum excceded'){
          alert("El monto minimo a retirar es de $5000, intenta de nuevo.")
        }

        if(response.message==='updated'){
          this.datosCuenta= await this.cargarCuenta(id);
          this.historico= await this.cargarHistorico(this.datosCuenta.idcuenta);
        }
        
        this.handleClear();
      return response;
      }

    catch(error) {
      // this.router.navigate(['/error']);//ruta de error
      alert("error: "+error);
    }
  }

  public async hacerAbono (id:any, monto:any): Promise<any>{
    
    try{
        const response = await this.CuentaService.abono(id, monto);
        console.log(response);
        if(response.details ==='minimum excceded'){
          alert("El monto minimo a abonar es de $2000, intenta de nuevo.")
        }
        if(response.message==='updated'){
          this.datosCuenta= await this.cargarCuenta(id);
          this.historico= await this.cargarHistorico(this.datosCuenta.idcuenta);
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
