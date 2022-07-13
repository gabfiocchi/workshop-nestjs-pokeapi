import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { toNumber } from 'src/shared/helpers/convert.util';

const maxPokemonNumber = 1154;
export class QueryPokemonDto {
  @Transform(({ value }) =>
    toNumber(value, { default: 0, min: 0, max: maxPokemonNumber - 1 }),
  )
  @IsInt()
  @IsOptional()
  offset = 0;

  @Transform(({ value }) =>
    toNumber(value, { default: 18, min: 18, max: maxPokemonNumber }),
  )
  @IsInt()
  @IsOptional()
  limit = 18;
}
