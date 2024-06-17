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
  showModal: boolean = false;
  currentModalAction: string = '';
  articleIdToDelete: number | null = null;

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
        console.error('Error al cargar los blogs', error);
        this.error = 'Error al cargar los blogs';
      }
    );
  }

  addArticle() {
    this.blogService.addArticle(this.newArticle).subscribe(
      (response) => {
        console.log('Blog agregado exitosamente', response);
        this.newArticle = {}; // Limpiar el formulario
        this.loadArticles(); // Recargar la lista de artículos
        this.openModal('add'); // Abrir modal de confirmación
      },
      (error) => {
        console.error('Error al agregar un blog', error);
        this.error = 'Fallo del blog';
      }
    );
  }

  updateArticle() {
    if (this.editingArticle && this.editingArticle.id) {
      this.blogService.updateArticle(this.editingArticle.id, this.editingArticle).subscribe(
        (response) => {
          console.log('Blog actualizado exitosamente', response);
          this.editingArticle = null; // Salir del modo de edición
          this.loadArticles(); // Recargar la lista de artículos
          this.closeModal(); // Cerrar el modal después de la confirmación
        },
        (error) => {
          console.error('Fallo al actualizar el blog', error);
          this.error = 'Error al actualizar el blog';
        }
      );
    }
  }

  deleteArticle(id: number) {
    this.blogService.deleteArticle(id).subscribe(
      (response) => {
        console.log('Artículo eliminado exitosamente', response);
        this.loadArticles(); // Recargar la lista de artículos después de eliminar
        this.closeModal(); // Cerrar el modal después de la confirmación
      },
      (error) => {
        console.error('Fallo al eliminar el artículo', error);
        this.error = 'Fallo al eliminar el artículo';
      }
    );
  }

  startEditing(article: any) {
    this.editingArticle = { ...article }; // Clonar el artículo para editar
    this.openModal('edit');
  }

  cancelEditing() {
    this.editingArticle = null; // Cancelar el modo de edición
  }

  openModal(action: string, articleId?: number) {
    this.currentModalAction = action;
    this.showModal = true;
    if (action === 'delete' && articleId !== undefined) {
      this.articleIdToDelete = articleId;
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentModalAction = '';
    this.articleIdToDelete = null;
  }

  confirmEdit() {
    this.updateArticle();
  }

  confirmDelete() {
    if (this.articleIdToDelete !== null) {
      this.deleteArticle(this.articleIdToDelete);
    }
  }
}