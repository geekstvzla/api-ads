CREATE 
VIEW `vw_user_balance` AS
    SELECT 
        `uw`.`user_id` AS `user_id`,
        `u`.`name` AS `user_name`,
        `uw`.`currency_id` AS `currency_id`,
        `cu`.`name` AS `currency_name`,
        `cu`.`abbreviation` AS `currency_abb`,
        `cu`.`symbol` AS `currency_symbol`,
        `uw`.`amount` AS `amount`
    FROM
        ((`user_wallet` `uw`
        JOIN `users` `u` ON (`u`.`user_id` = `uw`.`user_id`))
        JOIN `currency` `cu` ON (`cu`.`currency_id` = `uw`.`currency_id`))