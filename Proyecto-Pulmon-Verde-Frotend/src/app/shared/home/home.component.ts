import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../servicios/serviceblog/blog.service'; // Ajusta la ruta de importación según sea necesario
import { Comentario, ComentarioServiceService } from '../../servicios/ComentarioService/comentario-service.service'; // Ajusta la ruta de importación según sea necesario
import { InformeserivicioService,Inform} from '../../servicios/Informeserivicio/informeserivicio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  articles: any[] = [];
  comentarios: Comentario[] = [];
  informes: Inform[] = [];

  constructor(
    private blogService: BlogService,
    private comentarioService: ComentarioServiceService,
    private informeserivicioService: InformeserivicioService
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    this.loadComentarios();
    this.loadInformes();
  }

  loadArticles() {
    this.blogService.getAllArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
      }
    );
  }

  loadComentarios() {
    this.comentarioService.obtenerComentarios().subscribe(
      (data) => {
        this.comentarios = data;
      },
      (error) => {
        console.error('Error loading comentarios', error);
      }
    );
  }

  loadInformes() {
    this.informeserivicioService.getAllInform().subscribe(
      (data) => {
        this.informes = data;
      },
      (error) => {
        console.error('Error loading informes', error);
      }
    );
  }

}