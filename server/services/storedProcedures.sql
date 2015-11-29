DELIMITER //

DROP PROCEDURE IF EXISTS sp_retrieveAllRegions
//
CREATE PROCEDURE sp_retrieveAllRegions()
BEGIN
  SELECT * FROM Regions;
END
//
