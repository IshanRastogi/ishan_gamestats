<?php

function base_url($uri = '', $module = NULL)
{
	$CI = & get_instance();
		
	if (is_null($module))
	{
		return $CI->config->base_url($uri);
	}
	else
	{	
		return PROTOCOL . '://' . MAIN_DOMAIN . '/' . ltrim($uri, "/");			
	}
}
		
/* End of file myurl_helper.php */
/* Location: ./application/helpers/myurl_helper.php */