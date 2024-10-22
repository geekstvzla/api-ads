CREATE PROCEDURE `sp_sign_up`(IN `p_name` TEXT, IN `p_email` TEXT, IN `p_password` TEXT, IN `p_gender_id` INT, IN `p_birthday` DATE, IN `p_token` TEXT, OUT `p_response` TEXT)
BEGIN

	SELECT COUNT(1)
    INTO @v_user_exist
	FROM users u 
	WHERE u.email COLLATE utf8mb4_general_ci = p_email COLLATE utf8mb4_general_ci;
    
    IF @v_user_exist = 0  THEN
		
        SELECT AES_ENCRYPT(p_password, (SELECT value FROM settings WHERE name = "encrypt-key")) INTO @v_password;
		INSERT INTO users (name, email, password, birthday, user_role_id, gender_id, status_id) VALUES (p_name, p_email, @v_password, p_birthday, 2, p_gender_id, 1);
        -- Cambiar a 3 el estatus cuando se terminen las pruebas
		
        SET @v_user_id = LAST_INSERT_ID();
		CALL sp_user_device_token(@v_user_id, p_token, @response);
        
        SELECT fn_messages("SP_SIGN_UP", 1, 1) INTO @v_message_data;
		SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
        SELECT CONCAT('{
            "response" : {
				"message"    : "',@v_message,'",
				"status"     : "success",
				"statusCode" : 1,
				"userId"     : ',@v_user_id,'
			}
		}') INTO p_response;
    
    ELSE
		
        SELECT fn_messages("SP_SIGN_UP", 2, 1) INTO @v_message_data;
		SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
		SELECT CONCAT('{
            "response" : {
				"message"    : "',@v_message,'",
				"status"     : "warning",
				"statusCode" : 2
			}
		}') INTO p_response;
    
    END IF;

END