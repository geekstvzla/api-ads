CREATE PROCEDURE `sp_sign_in`(IN `p_email` TEXT, IN `p_password` TEXT, IN `p_token` TEXT, OUT `p_response` TEXT)
BEGIN

	SELECT IF(COUNT(1) > 0,TRUE, FALSE)
    INTO @v_user_exists
    FROM users u
    WHERE u.email COLLATE utf8mb4_general_ci = p_email COLLATE utf8mb4_general_ci ;
    
    IF @v_user_exists > 0 THEN

        SELECT `iv`,
               `key`
        INTO @v_encrypt_iv,
             @v_encrypt_key
        FROM vw_encryption_variables;

        SELECT u.user_id,
               CAST(AES_DECRYPT(u.password, @v_encrypt_key) AS CHAR) password,
               u.name,
			   u.status_id,
               s.description,
               IF(
                   u.avatar IS NULL,
                   'default-avatar.webp',
                   u.avatar
			   ) avatar,
               u.birthday, 
               if(u.gender_id=1,'Masculino','Femenino')
        INTO @v_user_id,
             @v_password,
             @v_name,
             @v_user_status_id,
             @v_user_status_desc,
             @v_avatar,
             @v_birthday,
             @v_gender_id
        FROM users u
		    INNER JOIN status s ON u.status_id = s.value
        WHERE u.email COLLATE utf8mb4_general_ci = p_email COLLATE utf8mb4_general_ci
        AND s.table = "users";
    
        IF p_password = @v_password THEN

            IF @v_user_status_id = 1 THEN
            
                CALL sp_user_device_token(@v_user_id, p_token, @response);
				
                SELECT fn_messages("sp_sign_in", 1, 1) INTO @v_message_data;
			    SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
                SELECT CONCAT('{
                    "response" : {
						"message"     : "',@v_message,'",
						"status"      : "success",
						"statusCode"  : 1,
						"userId"      : ',@v_user_id,',
						"userName"    : "',@v_name,'",
						"userEmail"   : "',p_email,'",
						"userAvatar"  : "',@v_avatar,'",
						"userBirthdat" : "', @v_birthday,'", 
						"userGender" : "', @v_gender_id,'"
					}
                }') INTO p_response;

            ELSEIF @v_user_status_id = 3 THEN
				
                SELECT fn_messages("sp_sign_in", 3, 1) INTO @v_message_data;
			    SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
                SELECT CONCAT('{
                    "response" : {
						"message"     : "',@v_message,'",
						"status"      : "warning",
						"statusCode"  : 3,
						"userId"      : ',@v_user_id,'
					}
                }') INTO p_response;

            ELSE
				
                SELECT fn_messages("sp_sign_in", 2, 1) INTO @v_message_data;
			    SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
                SELECT CONCAT('{
                    "response" : {
						"message"    : "',@v_message,' ',@v_user_status_desc,'",
						"status"     : "warning",
						"statusCode" : 2
					}
                }') INTO p_response;

            END IF;

        ELSE
			
            SELECT fn_messages("sp_sign_in", 4, 1) INTO @v_message_data;
			SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
            SELECT CONCAT('{
                "response" : {
					"message"    : "',@v_message,'",
					"status"     : "error",
					"statusCode" : 4
				}
            }') INTO p_response;

        END IF;

    ELSE
		
        SELECT fn_messages("sp_sign_in", 0, 1) INTO @v_message_data;
		SELECT JSON_UNQUOTE(JSON_EXTRACT(@v_message_data, '$.message')) INTO @v_message;
        SELECT CONCAT('{
            "response" : {
				"message"    : "',@v_message,'",
				"status"     : "error",
				"statusCode" : 0
			}
        }') INTO p_response;

    END IF;

END