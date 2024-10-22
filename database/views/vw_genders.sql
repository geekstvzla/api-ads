CREATE 
VIEW `vw_genders` AS
    SELECT 
        `genders`.`gender_id` AS `gender_id`,
        `genders`.`description` AS `gender_description`,
        `genders`.`status_id` AS `gender_status_id`
    FROM
        `genders`