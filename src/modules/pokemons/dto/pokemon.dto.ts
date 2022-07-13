import { Pokemon } from 'pokenode-ts';

export class PokemonDto {
  constructor(obj: Pokemon) {
    this.id = obj.id;
    this.name = obj.name;
    this.image =
      obj?.sprites?.other?.home?.front_default ||
      'https://pokenode-ts-docs-gabb-c.vercel.app/img/red-pokeball.svg';
  }
  id: number;
  name: string;
  image: string;
}
