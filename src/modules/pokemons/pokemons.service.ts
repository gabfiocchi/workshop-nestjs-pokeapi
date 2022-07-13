import { Injectable } from '@nestjs/common';
import { PokemonClient } from 'pokenode-ts';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { QueryPokemonDto } from './dto/query-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
@Injectable()
export class PokemonsService {
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll(query: QueryPokemonDto): Observable<PokemonDto[]> {
    const cache = 1000 * 60 * 60;
    const api = new PokemonClient({ cacheOptions: { maxAge: cache } });

    return from(api.listPokemons(query.offset, query.limit)).pipe(
      switchMap((pokemonList) => {
        const detailsListObservables: Observable<PokemonDto>[] = [];

        for (const pokemon of pokemonList.results) {
          detailsListObservables.push(
            from(api.getPokemonByName(pokemon.name)).pipe(
              map((pokemon) => new PokemonDto(pokemon)),
            ),
          );
        }
        return forkJoin(detailsListObservables);
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
