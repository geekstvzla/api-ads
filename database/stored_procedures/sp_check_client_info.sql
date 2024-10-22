CREATE PROCEDURE `sp_check_client_info`(IN `p_email` TEXT, IN `p_name` VARCHAR(150), IN `p_mikrowisp_id` INT, OUT `p_response` TEXT)
BEGIN

    SELECT IF(COUNT(1) > 0,TRUE, FALSE)
    INTO @v_client_exists
    FROM clients c
    WHERE c.mikrowisp_id = p_mikrowisp_id;

    IF @v_client_exists > 0 THEN

        SELECT c.name,
               c.email,
               c.client_type_id,
               c.client_id
        INTO @v_name,
             @v_email,
             @v_client_type_id,
             @v_client_id
        FROM clients c
        WHERE c.mikrowisp_id = p_mikrowisp_id;
        
        SET @v_indexs = CONCAT('[
            {"index": "name", "var_value": "',@v_name,'", "param_value": "',p_name,'"},  
            {"index": "email", "var_value": "',@v_email,'", "param_value": "',p_email,'"} 
		]');
        
        SET @v_items = JSON_LENGTH(@v_indexs);
        
        SET @i = 0;
        WHILE @i < @v_items DO
        
			SELECT JSON_EXTRACT(@v_indexs, CONCAT('$[',@i,']')) INTO @v_item;
			SELECT JSON_EXTRACT(@v_item, '$.param_value') INTO @v_param_value;
            SELECT JSON_EXTRACT(@v_item, '$.var_value') INTO @v_var_value;
            SELECT JSON_EXTRACT(@v_item, '$.index') INTO @v_index;
            SET @v_index = TRIM(BOTH '"' FROM @v_index);
		
			IF @v_param_value != @v_var_value THEN
            
				SET @v_query = CONCAT("UPDATE clients c SET `c`.`",@v_index,"` = ",@v_param_value,"  WHERE c.client_id = ",@v_client_id,";");
                PREPARE stmt FROM @v_query;
				EXECUTE stmt;
				DEALLOCATE PREPARE stmt;
                
            END IF;
            
			SET @i = @i + 1;
            
        END WHILE;
        
		SET p_response = '{
						    "response" : {
						        "message"     : "Cliente actualizado con éxito!",
                                "status"      : "success",
                                "status_code" : 1
                            }
        			      }';
    
    ELSE
		
		INSERT INTO clients (name, mikrowisp_id, email, client_type_id, status_id) VALUES (p_name, p_mikrowisp_id, p_email, null, 1);
        
        SET p_response = '{
						    "response" : {
						        "message"     : "Cliente registrado con éxito!",
                                "status"      : "success",
                                "status_code" : 1
                            }
        			      }';

    END IF;

END