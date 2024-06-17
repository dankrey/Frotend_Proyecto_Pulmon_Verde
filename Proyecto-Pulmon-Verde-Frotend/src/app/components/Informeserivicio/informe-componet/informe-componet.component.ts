import { Component, OnInit} from '@angular/core';
import { InformeserivicioService, Inform } from '../../../servicios/Informeserivicio/informeserivicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-informe-componet',
  templateUrl: './informe-componet.component.html',
  styleUrl: './informe-componet.component.css'
})
export class InformeComponetComponent implements OnInit{

  informes: Inform[] = [];
  informeForm: FormGroup;
  isEditing: boolean = false;
  currentInformId?: number;

  constructor(
    private informeservicioService: InformeserivicioService,
    private fb: FormBuilder
  ) {
    this.informeForm = this.fb.group({
      author: ['', Validators.required],
      tittle: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInformes();
  }

  loadInformes() {
    this.informeservicioService.getAllInform().subscribe(
      (data) => {
        this.informes = data;
      },
      (error) => {
        console.error('Error loading informes', error);
      }
    );
  }

  submitForm() {
    if (this.isEditing) {
      this.updateInform();
    } else {
      this.createInform();
    }
  }

  createInform() {
    this.informeservicioService.createInform(this.informeForm.value).subscribe(
      (data) => {
        this.informes.push(data);
        this.informeForm.reset();
      },
      (error) => {
        console.error('Error creating inform', error);
      }
    );
  }

  updateInform() {
    if (this.currentInformId) {
      this.informeservicioService.updateInform(this.currentInformId, this.informeForm.value).subscribe(
        (data) => {
          const index = this.informes.findIndex(inf => inf.id === this.currentInformId);
          if (index !== -1) {
            this.informes[index] = data;
          }
          this.isEditing = false;
          this.informeForm.reset();
          this.currentInformId = undefined;
        },
        (error) => {
          console.error('Error updating inform', error);
        }
      );
    }
  }

  editInform(inform: Inform) {
    this.informeForm.setValue({
      author: inform.author,
      tittle: inform.tittle,
      description: inform.description,
      imageUrl: inform.imageUrl
    });
    this.isEditing = true;
    this.currentInformId = inform.id;
  }

  deleteInform(id: number | undefined) {
    if (id !== undefined) {
      this.informeservicioService.deleteInform(id).subscribe(
        () => {
          this.informes = this.informes.filter(inf => inf.id !== id);
        },
        (error) => {
          console.error('Error deleting inform', error);
        }
      );
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.informeForm.reset();
    this.currentInformId = undefined;
  }
}
