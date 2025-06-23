CREATE PROCEDURE `sp_update_user_info`(IN `p_user_id` INT, IN `p_email` TEXT, IN `p_balance` FLOAT(20,3), IN `p_currency_id` INT(1), IN `p_dni` VARCHAR(10), IN `p_name` VARCHAR(150), OUT `p_response` TEXT)
BEGIN

	UPDATE users u SET u.name = p_name,
                       u.dni = p_dni,
                       u.email = p_email
	WHERE u.user_id = p_user_id;
    
    UPDATE user_wallet uw SET uw.amount = p_balance WHERE uw.user_id = p_user_id AND uw.currency_id = p_currency_id;
    
	SET p_response = '{
		"response" : {
			"message"    : "User updated!",
			"status"     : "success",
			"statusCode" : 1
		}
	}';

END;