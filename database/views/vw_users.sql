CREATE 
VIEW `vw_users` AS
    SELECT 
        `u`.`user_id` AS `user_id`,
        `u`.`user_type_id` AS `user_type_id`,
        `ut`.`description` AS `user_type_desc`,
        `u`.`name` AS `name`,
        `u`.`email` AS `email`,
        `u`.`status_id` AS `status_id`,
        `s`.`description` AS `status_desc`
    FROM
        ((`users` `u`
        LEFT JOIN `user_types` `ut` ON (`ut`.`user_type_id` = `u`.`user_type_id`))
        JOIN `status` `s` ON (`s`.`value` = `u`.`status_id`))
    WHERE
        `s`.`table` = 'users'
            AND `s`.`available` = 1