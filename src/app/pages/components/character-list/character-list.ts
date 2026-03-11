import { Component, OnInit } from '@angular/core';
import { CharacterServices } from '../../../core/services/characterServices';
import { Characters } from '../../../core/models/Characters';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.css'],
})
export class CharacterList implements OnInit {

  public charactersData: Characters | undefined;
  public isloading: boolean = false;

  
  constructor(private characterService: CharacterServices) { }

  ngOnInit(): void {
    this.isloading = true;
    
    this.characterService.getCharacters(1)
      .pipe(
        finalize(() => this.isloading = false)
      )
      .subscribe({
        next: (response) => {
          this.charactersData = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  trackByChar(index: number, character: { id: number }): number {
    return character.id;
  }
}
