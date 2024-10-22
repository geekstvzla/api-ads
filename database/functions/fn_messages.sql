CREATE FUNCTION `fn_messages`(p_description TEXT, p_status_code INT(2), p_language_id INT(3)) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
    
    SELECT m.title,
           m.message
	INTO @v_title,
         @v_message
    FROM messages m 
    WHERE m.description = p_description 
    AND status_code = p_status_code 
    AND m.language_id = 1;
    
	SET @v_response = CONCAT('{
		"title" : "',@v_title,'",
        "message" : "',@v_message,'"
    }');

	RETURN @v_response;

END