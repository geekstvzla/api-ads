CREATE 
VIEW `vw_ads` AS
    SELECT 
        `a`.`ad_id` AS `ad_id`,
        `ac`.`ad_type_id` AS `ads_type_id`,
        `at`.`description` AS `ads_type_desc`,
        `ac`.`url` AS `ads_url`,
        `ac`.`play_time` AS `play_time`,
        `ac`.`ads_orientation_id` AS `ads_orientation_id`,
        `ao`.`description` AS `ads_orientation_desc`,
        `a`.`sponsor_id` AS `sponsor_id`,
        `s`.`name` AS `sponsor_name`,
        `a`.`publish_date` AS `ads_publish_date`,
        `a`.`due_date` AS `ad_due_date`,
        `a`.`status_id` AS `ad_status_id`,
        `ac`.`status_id` AS `ads_content_status_id`,
        `ac`.`order` AS `ads_content_order`,
        `c`.`currency_id` AS `currency_id`,
        `c`.`name` AS `currency_name`,
        `c`.`abbreviation` AS `currency_abb`,
        `c`.`symbol` AS `currency_symbol`,
        `a`.`payable_amount` AS `payable_amount`,
        `a`.`receivable_amount` AS `receivable_amount`
    FROM
        (((((`ads` `a`
        JOIN `ads_content` `ac` ON (`ac`.`ad_id` = `a`.`ad_id`))
        JOIN `ads_orientation` `ao` ON (`ao`.`ads_orientation_id` = `ac`.`ads_orientation_id`))
        JOIN `ads_type` `at` ON (`at`.`ads_type_id` = `ac`.`ad_type_id`))
        JOIN `sponsors` `s` ON (`s`.`sponsor_id` = `a`.`sponsor_id`))
        JOIN `currency` `c` ON (`c`.`currency_id` = `a`.`currency_id`))