CREATE PROCEDURE `sp_viewed_ad`(IN `p_user_id` INT, IN `p_ad_id` INT, OUT `p_response` TEXT)
BEGIN

    INSERT INTO user_ads (user_id, ad_id, date_played, status_id) VALUES (p_user_id, p_ad_id, NOW(), 1);
    
    SELECT currency_id,
           payable_amount
    INTO @v_currency_id,
         @v_payable_amount
	FROM vw_ads a 
	WHERE a.ad_id = p_ad_id;
    
    SELECT COUNT(1),
           IF(uw.amount IS NULL, 0, uw.amount)
    INTO @v_balance_exit,
		 @v_user_balance
    FROM user_wallet uw
    WHERE uw.currency_id = @v_currency_id
    AND uw.user_id = p_user_id;
    
    IF @v_balance_exit = 0 THEN
    
		INSERT INTO user_wallet (user_id, currency_id, amount) VALUES (p_user_id, @v_currency_id, @v_payable_amount);
        
	ELSE 
		
        SET @v_amount = (@v_user_balance + @v_payable_amount);
		UPDATE user_wallet SET amount = @v_amount WHERE currency_id = @v_currency_id AND user_id = p_user_id;
    
    END IF;

	SET p_response = '{
						"response" : {
							"message"     : "Ad asociado al cliente con éxito!",
							"status"      : "success",
							"status_code" : 1
						}
					  }';
    
END