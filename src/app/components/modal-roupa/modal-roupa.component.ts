import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { BtnComponent } from '../btn/btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-roupa',
  standalone: true,
  imports: [BtnComponent, CommonModule],
  templateUrl: './modal-roupa.component.html',
  styleUrl: './modal-roupa.component.scss'
})
export class ModalRoupaComponent implements OnInit{
  @Input() data: any
  @Input() img: any
  toggle: Boolean = false
  loading: Boolean = true
  suggestion: any
  
  constructor(private ApiService: ApiService) {}

  clothe: any

  ngOnInit(): void {
    if (this.img) {
      this.convertBase64ToJpg(this.img);
    }
    else {
      this.getSpecificClothe();
      this.convertBase64ToJpg(this.data.image_url);
    }
  }

  getSpecificClothe() {
    this.ApiService.getSpecificClothe(this.data.id).subscribe({
      next: (res)=>{
        this.clothe = res
        console.log(this.clothe)
        setTimeout(() => {
          this.loading = false 
        }, 2000);
        
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }

  convertBase64ToJpg(base64Data: string) {
    // Remove o prefixo "data:image/png;base64," ou similar
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');

    // Converte o conteúdo Base64 para um Blob
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Cria uma URL para o Blob
    if (this.img) {
      this.img = URL.createObjectURL(blob);
    }
    else {
    this.data.image_url = URL.createObjectURL(blob);
    }
    this.loading = false
  }

  save(description: string, imageUrl: string){
    this.ApiService.postItems(description, imageUrl).subscribe({
      next: (res)=>{
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }

  toggleSuggestion(){
    this.toggle = !this.toggle

    if (this.toggle = true) {
      this.getSuggestion(this.data.id)
    }
  }

  getSuggestion(itemId: string) {
    this.ApiService.getSuggestion(itemId).subscribe({
      next: (res)=>{
        this.suggestion = res
      },
      error: (error)=>{
        this.postSuggestion(itemId)
      }
    })
  }

  postSuggestion(itemId: string) {
    this.ApiService.getSuggestion(itemId).subscribe({
      next: (res)=>{
        this.getSuggestion(itemId)
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }
  
}
