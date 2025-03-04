import { Routes } from '@angular/router';
import { CharacterComponent } from './characters/character/character.component';
import { CharactersComponent } from './characters/characters.component';


export const routes: Routes = [
    { path: 'characters', component: CharactersComponent },
    { path: 'characters/:id', component: CharacterComponent },
];
