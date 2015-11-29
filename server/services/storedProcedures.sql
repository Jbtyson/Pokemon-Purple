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
  in description VARCHAR(500)
)
BEGIN
  INSERT INTO Regions
  VALUES (regionId, latitude, longitude, length, width, name, description);
END
//
