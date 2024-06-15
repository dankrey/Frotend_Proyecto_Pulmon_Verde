import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../servicios/serviceblog/blog.service';
@Component({
  selector: 'app-blogusuario',
  templateUrl: './blogusuario.component.html',
  styleUrl: './blogusuario.component.css'
})

export class BlogusuarioComponent implements OnInit {

  newArticle: any = {};
  articles: any[] = [];
  error: string = '';
  editingArticle: any = null;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.blogService.getAllArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
        this.error = 'Error loading articles';
      }
    );
  }

  addArticle() {
    this.blogService.addArticle(this.newArticle).subscribe(
      (response) => {
        console.log('Article added successfully', response);
        this.newArticle = {}; // Limpiar el formulario
        this.loadArticles(); // Recargar la lista de artículos
      },
      (error) => {
        console.error('Failed to add article', error);
        this.error = 'Failed to add article';
      }
    );
  }

  updateArticle() {
    this.blogService.updateArticle(this.editingArticle.id, this.editingArticle).subscribe(
      (response) => {
        console.log('Article updated successfully', response);
        this.editingArticle = null; // Salir del modo de edición
        this.loadArticles(); // Recargar la lista de artículos
      },
      (error) => {
        console.error('Failed to update article', error);
        this.error = 'Failed to update article';
      }
    );
  }

  deleteArticle(id: number) {
    this.blogService.deleteArticle(id).subscribe(
      (response) => {
        console.log('Article deleted successfully', response);
        this.loadArticles(); // Recargar la lista de artículos después de eliminar
      },
      (error) => {
        console.error('Failed to delete article', error);
        this.error = 'Failed to delete article';
      }
    );
  }

  startEditing(article: any) {
    this.editingArticle = { ...article }; // Clonar el artículo para editar
  }

  cancelEditing() {
    this.editingArticle = null; // Cancelar el modo de edición
  }
}