CREATE PROCEDURE `sp_create_ad_content`(IN p_ad_id INT, IN p_ad_orientation_id INT, IN p_playtime INT, IN p_file_url TEXT, IN p_order TEXT, OUT p_response TEXT)
BEGIN

	SELECT substring_index(p_file_url,'.',-1) INTO @v_file_ext;
    
    IF @v_file_ext = "MP4" THEN
		SET @v_ad_type_id = 1;
    ELSE
		SET @v_ad_type_id = 2;
    END IF;

	INSERT INTO ads_content (`ad_id`, `ad_type_id`, `ads_orientation_id`, `url`, `play_time`, `order`, `status_id`)
    VALUES (p_ad_id, @v_ad_type_id, p_ad_orientation_id, p_file_url, p_playtime, p_order, 1);
    
    SELECT fn_messages("SP_CREATE_AD_CONTENT", 1, 1) INTO @v_message_data;
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