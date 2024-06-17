import { Component, OnInit } from '@angular/core';
import { ComentarioServiceService,Comentario } from '../../comentario-service.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  nuevoComentario: Comentario = {
    tittle: '',
    comment: '',
    author: '',
    imageUrl: ''
  };

  constructor(private comentarioService: ComentarioServiceService) { }

  ngOnInit(): void {
    this.loadComentarios();
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

  agregarComentario() {
    this.comentarioService.agregarComentario(this.nuevoComentario).subscribe(
      (data) => {
        this.comentarios.push(data);
        this.nuevoComentario = { tittle: '', comment: '', author: '', imageUrl: '' };
      },
      (error) => {
        console.error('Error adding comentario', error);
      }
    );
  }

  seleccionarComentario(comentario: Comentario) {
    this.nuevoComentario = { ...comentario };
  }

  actualizarComentario() {
    if (this.nuevoComentario.id) {
      this.comentarioService.actualizarComentario(this.nuevoComentario.id, this.nuevoComentario).subscribe(
        (data) => {
          const index = this.comentarios.findIndex(c => c.id === data.id);
          if (index !== -1) {
            this.comentarios[index] = data;
          }
          this.nuevoComentario = { tittle: '', comment: '', author: '', imageUrl: '' };
        },
        (error) => {
          console.error('Error updating comentario', error);
        }
      );
    }
  }

  eliminarComentario(id: number | undefined) {
    if (id !== undefined) {
      this.comentarioService.eliminarComentario(id).subscribe(
        () => {
          this.comentarios = this.comentarios.filter(c => c.id !== id);
        },
        (error) => {
          console.error('Error deleting comentario', error);
        }
      );
    }
  }
}