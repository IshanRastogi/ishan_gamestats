<?php

function strcode($str, $passw = "")
{



	$salt = "Dn8*#2n!9j";
	$len = strlen($str);
	$gamma = '';
	$n = $len > 100 ? 8 : 2;
	while (strlen($gamma) < $len)
	{
		$gamma .= substr(pack('H*', sha1($passw . $gamma . $salt)), 0, $n);
	}

	return $str ^ $gamma;
}
			
/* End of file code_helper.php */
/* Location: ./application/helpers/code_helper.php */