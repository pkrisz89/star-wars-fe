import { rest } from 'msw'
import { mockPeople } from './mock-people-response'
import { mockPlanetResponse } from './mock-planet-response'
import { mockFilmResponse } from './mock-film-response'


const handlers = [
  rest.get('https://swapi.dev/api/people/', async (req, res, ctx) => {
    
    if (req.url.searchParams.get("page") === "1") {
        return res(ctx.json(mockPeople))
    }
    
  }),

  rest.get('https://swapi.dev/api/people/1', async (req, res, ctx) => {
    return res(ctx.json(mockPeople.results[0]))
  }),

  rest.get('https://swapi.dev/api/planets/1/', async (req, res, ctx) => {
    return res(ctx.json(mockPlanetResponse))
  }),

  rest.get('https://swapi.dev/api/films/*', async (req, res, ctx) => {
    return res(ctx.json({...mockFilmResponse}))
  }),
  
]

export const peopleHandlerException = rest.get(
  "https://swapi.dev/api/people/", async (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "1") {
      return res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
    }
  }
);

export const singleCharacterHandlerException = rest.get(
  "https://swapi.dev/api/people/1", async (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
  }
);

export {handlers}