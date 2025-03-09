import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  constructor(private charactersService: CharactersService) {}
  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe({
      next: (data) => {
        this.characters = data.results;
        console.log(data);
      },
      error: () => {
        console.log('Hubo un error');
      },
    });
  }
}
