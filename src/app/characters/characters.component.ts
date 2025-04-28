import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CardComponent } from '../shared/components/card/card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  private subscriptions = new Subscription();
  constructor(private charactersService: CharactersService, private router: Router) {
    console.log('constructor');
  }

  ngOnInit(): void {
    console.log('INIT');
    this.subscriptions.add(
      this.charactersService.getCharacters().subscribe({
        next: (data) => {
          this.characters = data.results;
          console.log(data);
        },
        error: () => {
          console.log('Hubo un error');
        },
      })
    );
    
  }
  ngOnDestroy(): void {
    console.log('DESTROY', this.subscriptions);
    this.subscriptions.unsubscribe();
    
  }
  goToCharacter(character: any): void{
    this.router.navigate([`/characters/${character.id}`]);
  }
}
