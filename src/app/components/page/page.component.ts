import { Component, ViewChild } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../header/modal.service';

import { AddComComponent } from '../modals/add-com/add-com.component';
import { AddInstitucionComponent } from '../modals/add-institucion/add-institucion.component';
import { AddCoordinadorComponent } from '../modals/add-coordinador/add-coordinador.component';
import { AddUsuarioComponent } from '../modals/add-usuario/add-usuario.component';
import { LoginService } from 'src/guards/login.service';
import { AddUnidadGestoraComponent } from '../modals/add-unidad-gestora/add-unidad-gestora.component';



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  constructor(
    private router: Router, 
    private renderer: Renderer2, 
    @Inject(DOCUMENT) 
    private document: Document,
    public loginService: LoginService,
    public dialog: MatDialog,
    private http: HttpClient,
    private envioServicio: ModalService

    ) { }
  sidebarOpen = false;
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  convenios: any;
  busqueda:string  = '';
  checked: boolean | undefined;

 
 
/*             this.router.navigateByUrl('/page');
 */
  PRUEBA(){
    console.log(this.loginService.getUserRole())
  }
  toggleSidenav() {
    // Verifica que sidenav no sea undefined antes de usarlo
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
   logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  } 

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit(){
    
    this.renderer.setStyle(this.document.body, 'background-color', 'white');
  }

  enviarMensaje(){
    this.envioServicio.disparadorDeBusqueda.next({mensaje:this.busqueda})
  }

  CrearReportes(){
    this.router.navigateByUrl('/formulario');
  }

  Home(){
    this.router.navigateByUrl('/page');
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
    });
  }
  ModalAddInstituciones(){
    const dialogRef = this.dialog.open(AddInstitucionComponent);
  }

  ModalAddCoordinador(){
    const dialogRef = this.dialog.open(AddCoordinadorComponent);
  }

  ModalAddUsuario(){
    const dialogRef = this.dialog.open(AddUsuarioComponent);
  }
  ModalAddUnidadGestora(){
    const dialogRef = this.dialog.open(AddUnidadGestoraComponent);
  }
  ModalADD() {
    const dialogRef = this.dialog.open(AddComComponent);
  }

/*   getUserRole() {
    this.loginService.getUserRole();
  } */
}


