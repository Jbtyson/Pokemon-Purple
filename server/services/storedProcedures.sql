DROP PROCEDURE IF EXISTS sp_retrieveRegion
//
CREATE PROCEDURE sp_retrieveRegion(
  in regionId int
)
BEGIN
  SELECT * FROM Regions
  WHERE region_id = regionId;
END
//

DROP PROCEDURE IF EXISTS sp_retrieveAllRegions
//
CREATE PROCEDURE sp_retrieveAllRegions()
BEGIN
  SELECT * FROM Regions;
END
//

DROP PROCEDURE IF EXISTS sp_addRegion
//
CREATE PROCEDURE sp_addRegion(
  in regionId int,
  in latitude float,
  in longitude float,
  in length int,
  in width int,
  in name VARCHAR(50),
  in description VARCHAR(250)
)
BEGIN
  INSERT INTO Regions
  VALUES (regionId, latitude, longitude, length, width, name, description);
END
//

DROP PROCEDURE IF EXISTS sp_retrieveAllWildPokemon
//
CREATE PROCEDURE sp_retrieveAllWildPokemon()
BEGIN
  SELECT * FROM PokemonInstances;
END
//

DROP PROCEDURE IF EXISTS sp_retrievePokemonInstancesInParty
//
CREATE PROCEDURE sp_retrievePokemonInstancesInParty(
  in playerId int
)
BEGIN
  SELECT * FROM `PokemonInstances` PI
  JOIN Parties P
  ON P.pokemon_instance_id=PI.pokemon_instance_id
  JOIN InstanceStats IST
  ON IST.pokemon_instance_id=PI.pokemon_instance_id
  JOIN Stats S
  ON S.stats_id=IST.stats_id
  JOIN InstanceOfPokemon IP
  ON IP.pokemon_instance_id=PI.pokemon_instance_id
  JOIN BasePokemon BP
  ON BP.pokemon_id=IP.pokemon_id
  WHERE player_id=playerId;
END
//

DROP PROCEDURE IF EXISTS sp_retrievePokemonInstanceMoves
//
CREATE PROCEDURE sp_retrievePokemonInstanceMoves(
  in pokemonInstanceId int
)
BEGIN
  select Moves.move_id as move_id, Types.name as type, Moves.name as name, Moves.accuracy as accuracy, Moves.power as power, Moves.pp as pp
  from InstanceHasMoves
  join Moves on Moves.move_id = InstanceHasMoves.move_id
  join MoveHasType on Moves.move_id = MoveHasType.move_id
  join Types on MoveHasType.type_id = Types.type_id
  where InstanceHasMoves.pokemon_instance_id = pokemonInstanceId;
END
//

DROP PROCEDURE IF EXISTS sp_retrievePokemonInstanceMoves
//
CREATE PROCEDURE sp_retrievePokemonInstanceMoves(
  in pokemonInstanceId int
)
BEGIN
  select Moves.move_id as move_id, Types.name as type, Moves.name as name, Moves.accuracy as accuracy, Moves.power as power, Moves.pp as pp
  from InstanceHasMoves
  join Moves on Moves.move_id = InstanceHasMoves.move_id
  join MoveHasType on Moves.move_id = MoveHasType.move_id
  join Types on MoveHasType.type_id = Types.type_id
  where InstanceHasMoves.pokemon_instance_id = pokemonInstanceId;
END
//

DROP PROCEDURE IF EXISTS sp_addPokemonToParty
//
CREATE PROCEDURE sp_addPokemonToParty(
  in pokemonInstanceId int,
  in playerId int
)
BEGIN
  INSERT INTO Parties
  VALUES (playerId, pokemonInstanceId);
END
//
