CREATE PROCEDURE `sp_create_ad`(IN p_play_time INT(11), OUT p_response TEXT)
BEGIN

	SELECT IF((MAX(ad_id) + 1) IS NULL, 0, (MAX(ad_id) + 1))
    INTO @v_new_ad_id
    FROM ads;
    
    SELECT (am.viewer_amount * p_play_time),
           (am.sponsor_amount * p_play_time)
    INTO @v_viewer_amount,
         @v_sponsor_amount
    FROM ads_amount am
    WHERE am.status_id = 1;
    
    INSERT INTO ads (`sponsor_id`, `publish_date`, `due_date`, `currency_id`, `payable_amount`, `receivable_amount`, `status_id`) 
    VALUES (1, NOW(), DATE(DATE_ADD(now(), INTERVAL 1 YEAR)), 2,  @v_viewer_amount, 0, 1);
    
	SELECT LAST_INSERT_ID() INTO @v_new_ad_id;
    
    SELECT fn_messages("SP_CREATE_AD", 1, 1) INTO @v_message_data;
	SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
	SELECT CONCAT('{
		"response" : {
            "adId"       : ',@v_new_ad_id,',
			"message"    : "', @v_message,'",
			"status"     : "success",
			"statusCode" : 1
		}
	}') INTO p_response;
    
END