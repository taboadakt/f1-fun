export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GCircuit = {
  __typename?: 'Circuit';
  id: Scalars['String'];
  location: GLocation;
  name: Scalars['String'];
  url: Scalars['String'];
  urlMobile: Scalars['String'];
};

export type GConstructor = {
  __typename?: 'Constructor';
  id: Scalars['String'];
  name: Scalars['String'];
  nationality: Scalars['String'];
  url: Scalars['String'];
  urlMobile: Scalars['String'];
};

export type GDriver = {
  __typename?: 'Driver';
  code?: Maybe<Scalars['String']>;
  dateOfBirth: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  nationality: Scalars['String'];
  permanentNumber?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  urlMobile: Scalars['String'];
};

export type GDriverStanding = {
  __typename?: 'DriverStanding';
  constructors: Array<GConstructor>;
  driver: GDriver;
  points: Scalars['String'];
  position: Scalars['String'];
  positionText: Scalars['String'];
  wins: Scalars['String'];
};

export type GLocation = {
  __typename?: 'Location';
  country: Scalars['String'];
  lat: Scalars['String'];
  lng: Scalars['String'];
  locality: Scalars['String'];
};

export type GQuery = {
  __typename?: 'Query';
  /** Circuito seleccionado */
  circuitSelect?: Maybe<GCircuit>;
  /** Obtenemos la información del piloto mediante el valor 'id' */
  driverSelect?: Maybe<GDriver>;
  /**
   * Obtenemos la información de los pilotos seleccionadas por año.
   * Tener en cuenta que solo existen temporadas desde 1950 hasta la actualidad
   */
  driversYear: Array<GDriver>;
  /**
   * Obtenemos la información de los pilotos seleccionadas por año y número de carrera.
   * Tener en cuenta que solo existen temporadas desde 1950 hasta la actualidad
   */
  driversYearAndRound: Array<GDriver>;
  /** Pilotos historicos */
  historyCircuits: Array<GCircuit>;
  /**
   * Lista de los pilotos de la F1 de toda la historia.
   * Tenemos dos opciones:
   * Por un lado podemos obtener todos los pilotos
   * Por otro lado, hacemos uso de la paginación y podemos limitar el número de resultados
   */
  historyDrivers: Array<GDriver>;
  /** Carrera seleccionada por año y por numero de carrara */
  raceSelect?: Maybe<GRace>;
  /**
   * Obtenemos la información de las carreras seleccionadas por año.
   * Tener en cuenta que solo existen temporadas desde 1950 hasta la actualidad
   */
  racesByYear: Array<GRace>;
  /**
   * Clasificación final de los pilotos de una temporada.
   * Tener en cuenta que solo existen las temporadas desde la 1950 a la actualidad.
   * En el caso de que introduzcamos un valor que no corresponde a ese
   * rango de años, se asignará el año actual. Por ejemplo, si nos encontramos
   * en el año 2021, el año que se asignará será el 2021 en el caso de que no
   * añadamos el año correctamente.
   */
  seasonPilotsRanking: Array<GDriverStanding>;
  /** Lista de las temporadas de Formula 1. Desde 1950 a la actualidad */
  seasonsList: Array<GSeason>;
};


export type GQueryCircuitSelectArgs = {
  id: Scalars['String'];
};


export type GQueryDriverSelectArgs = {
  id: Scalars['String'];
};


export type GQueryDriversYearArgs = {
  year: Scalars['String'];
};


export type GQueryDriversYearAndRoundArgs = {
  round: Scalars['Int'];
  year: Scalars['String'];
};


export type GQueryHistoryCircuitsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageElements?: InputMaybe<Scalars['Int']>;
};


export type GQueryHistoryDriversArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageElements?: InputMaybe<Scalars['Int']>;
};


export type GQueryRaceSelectArgs = {
  round: Scalars['Int'];
  year?: InputMaybe<Scalars['String']>;
};


export type GQueryRacesByYearArgs = {
  year: Scalars['String'];
};


export type GQuerySeasonPilotsRankingArgs = {
  year: Scalars['String'];
};

export type GRace = {
  __typename?: 'Race';
  circuit: GCircuit;
  date: Scalars['String'];
  name: Scalars['String'];
  round: Scalars['String'];
  season: Scalars['String'];
  time?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  urlMobile: Scalars['String'];
};

/** Información de la temporada */
export type GSeason = {
  __typename?: 'Season';
  /** Información de wikipedia */
  url: Scalars['String'];
  /** Información de wikipedia adaptada a los dispositivos móviles */
  urlMobile: Scalars['String'];
  /** Año de la temporada */
  year: Scalars['String'];
};

export type GDriverInfoByYearQueryVariables = Exact<{
  year: Scalars['String'];
}>;


export type GDriverInfoByYearQuery = { __typename?: 'Query', driversYear: Array<{ __typename?: 'Driver', id: string, name: string, nationality: string, permanentNumber?: string, code?: string }>, seasonPilotsRanking: Array<{ __typename?: 'DriverStanding', points: string, wins: string, position: string, driver: { __typename?: 'Driver', id: string }, constructors: Array<{ __typename?: 'Constructor', name: string }> }> };
