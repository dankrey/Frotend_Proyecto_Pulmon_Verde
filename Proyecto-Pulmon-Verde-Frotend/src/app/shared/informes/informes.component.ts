import { Component,OnInit } from '@angular/core';
import { InformeserivicioService,Inform } from '../../servicios/Informeserivicio/informeserivicio.service';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css'
})
export class InformesComponent implements OnInit {

  informes: Inform[] = [];

  constructor(private informesService: InformeserivicioService) { }

  ngOnInit(): void {
    this.loadInformes();
  }

  loadInformes() {
    this.informesService.getAllInform().subscribe(
      (data) => {
        this.informes = data; // Asigna los datos de los informes obtenidos del servicio
      },
      (error) => {
        console.error('Error loading informes', error);
      }
    );
  }
}