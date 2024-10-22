CREATE 
VIEW `vw_api_settings` AS
    SELECT 
        (SELECT 
                `s`.`value`
            FROM
                `settings` `s`
            WHERE
                `s`.`name` = 'mikrowisp-api') AS `url`,
        (SELECT 
                `s`.`value`
            FROM
                `settings` `s`
            WHERE
                `s`.`name` = 'mikrowisp-token') AS `token`