import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../servicios/serviceblog/blog.service'; // Ajusta la ruta de importación según sea necesario


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  articles: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.blogService.getAllArticles().subscribe(
      (data) => {
        this.articles = data; // Asigna los datos de los artículos obtenidos del servicio
      },
      (error) => {
        console.error('Error loading articles', error);
      }
    );
  }

}