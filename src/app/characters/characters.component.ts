import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CardComponent } from '../shared/components/card/card.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';


@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, FilterPipe],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  nameFilter: string = '';
  statusFilter: string = '';
  speciesFilter: string = '';
  statuses: string[] = [];
  species: string[] = [];
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
          this.setStatuses();
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
private setStatuses():void{
  const statuses:  any[] = [];
  const species: any[] = [];
  this.characters.forEach(character => {
    statuses.push(character.status);
    species.push(character.species)
  });
  this.statuses = [...new Set(statuses)]
  this.species = [...new Set(species)]
}

}
