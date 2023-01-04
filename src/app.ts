import { Pokedex } from "./types";

const div: HTMLElement = <HTMLElement>document.getElementById("app");
const quantidade: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// async function buscarDois(number1: number, number2: number) {
//   const request1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${number1}`);
//   const data1: Pokedex = await request1.json();
//   const request2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${number2}`);
//   const data2: Pokedex = await request2.json();
//   return [data1, data2];
// }

buscarVarios(quantidade).then((resultado) => {
  console.log(resultado);
});

async function buscarVarios(numbers: number[]) {
  const requests = numbers.map((number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  });
  // const data: Pokedex = await request.json();
  // Promise.all()
  const responses = await Promise.allSettled(requests);
  const data = responses.map((resp) => {
    if (resp.status === "rejected") {
      console.log(resp.reason);
      return undefined;
    }
    return resp.value.json();
  });
  const pokemons: Pokedex[] = await (
    await Promise.allSettled(data)
  )
    .filter((pok) => pok && pok.status === "fulfilled")
    .map((pok) => {
      if (pok.status === "rejected") {
        return undefined;
      }
      return pok.value;
    });
  return pokemons;
}
