import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.page.html',
  styleUrls: ['./patron.page.scss'],
})
export class PatronPage implements OnInit{
  tecnicos: Observable<any[]>;

  constructor(private router: Router){
  }

  ngOnInit() { 
    
  }

  imprimirTecnicos(){
    this.router.navigateByUrl('informe-tecnico');
  }
  imprimirGastos(){
    this.router.navigateByUrl('informe-gastos');
  }
  imprimirAtenciones(){
    this.router.navigateByUrl('informe-atenciones');
  }
}

