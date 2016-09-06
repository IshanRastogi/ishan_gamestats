<?php

function guid()
{
	if (function_exists('com_create_guid'))
	{
		return com_create_guid();
	}
	else
	{
		mt_srand((double) microtime() * 10000); //optional for php 4.2.0 and up.
		$uuid = strtoupper(md5(uniqid(rand(), true)));
			
		return $uuid;
	}
}

?>