CREATE PROCEDURE `sp_user_device_token`(IN `p_user_id` INT, IN `p_token` TEXT, OUT `p_response` TEXT)
BEGIN

	SELECT COUNT(1)
    INTO @v_token_exist
	FROM user_device_tokens udt 
	WHERE udt.user_id = p_user_id
    AND udt.token COLLATE utf8mb4_general_ci = p_token COLLATE utf8mb4_general_ci;
    
    IF @v_token_exist = 0  THEN
    
		INSERT INTO user_device_tokens (user_id, token, status_id) VALUES (p_user_id, p_token, 1);
		
        SET p_response = '{
			"response" : {
				"message"     : "Token registered!",
				"status"      : "success",
				"statusCode" : 1
			}
		}';
    
    ELSE
    
		SET p_response = '{
			"response" : {
				"message"    : "The token had already been registered.!",
				"status"     : "warning",
				"statusCode" : 3
			}
		}';
    
    END IF;

END