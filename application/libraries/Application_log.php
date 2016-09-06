<?php

class Application_Log extends CI_Log
{

	private $log_content = '';
	private $full_path = '';
	private $full_path_journal = '';
	private $max_file_lines_count = 500;
	private $app_folder = 'app/';
	private $dispatcher_folder = 'journal/';
	private $user_type = '';
	private $user_id = '';
	private $journal_date_format = 'Y-m-d';
	private $log_content_journal = '';
	private $test_mode = TRUE;

	const EXT = '.csv';
	const DELIMETER = ':';
	const ENCLOSURE = '"';

	private $log_levels_allowed = array('ERROR', 'INFO');

	function __construct()
	{
		parent::__construct();
		$this->ci = & get_instance();
		$this->set_file_path('');
	}

	private function set_file_path($user_id = '')
	{
		$this->user_id = $user_id;
		$this->user_type = 'anonymous';
		$this->log_path = FCPATH . $this->_log_path . $this->app_folder . 'user/' .  'anonymous' . '/';

		if (!is_dir($this->log_path))
		{
			@mkdir($this->log_path, DIR_WRITE_MODE, TRUE);
		}

		$this->set_full_path();
		$this->fp = @fopen($this->full_path, FOPEN_WRITE_CREATE);

		if (!$this->fp)
		{
			log_message('error', 'Application log file error');
		}
	}

	public function write_log($msg, $user_id = '', $level = 'INFO', &$trace = '')
	{

		if (!in_array(strtoupper($level), $this->log_levels_allowed))
		{
			return FALSE;
		}

		if ($user_id)
		{
			$this->set_file_path($user_id);
		}

		if (!$trace)
		{
			$trace = debug_backtrace();
		}

		$this->level = strtoupper($level);
		$this->log_content = $this->format_message($msg, $trace);
		$this->save_journal_file($level);
		$this->save_log_file();
		return TRUE;
	}

	public function write_error($msg, $user_id = '')
	{
		$trace = debug_backtrace();
		$this->write_log($msg, $user_id, 'ERROR', $trace);
	}

	public function format_message($msg, &$trace = '')
	{

		$formatted_message = array();
		$filename = $line_number = $functionname = ' ';
		if (isset($trace) && !empty($trace))
		{
			$filename = isset($trace[0]['file']) ? $trace[0]['file'] : $filename;
			$line_number = isset($trace[0]['line']) ? $trace[0]['line'] : $line_number;
			$functionname = isset($trace[1]['function']) ? $trace[1]['function'] : $functionname;
		}

		$formatted_message[] = $this->level;
		$formatted_message[] = date($this->_date_fmt);
		$formatted_message[] = $_SERVER['REMOTE_ADDR'];
		$formatted_message[] = $filename;
		$formatted_message[] = $line_number;
		$formatted_message[] = $functionname;
		$formatted_message[] = preg_replace("/[\r\n]*/", "", strip_tags($msg));

		return $formatted_message;
	}

	private function format_journal_params($level)
	{

		$this->full_path_journal = FCPATH . $this->_log_path . $this->app_folder . $this->dispatcher_folder;
		if (!is_dir($this->full_path_journal))
		{
			@mkdir($this->full_path_journal, DIR_WRITE_MODE, TRUE);
		}

		$this->full_path_journal .= 'log-' . date($this->journal_date_format) . self::EXT;

		$this->fpj = @fopen($this->full_path_journal, FOPEN_WRITE_CREATE);

		$this->log_content_journal = array();
		$this->log_content_journal[] = $level;
		$this->log_content_journal[] = date($this->_date_fmt);
		$this->log_content_journal[] = ($this->user_id ? '#' . $this->user_id . ' ' : '') . $this->user_type . ' user';
	}

	private function test_mode_journal()
	{

		$file_path = FCPATH . $this->_log_path . $this->app_folder . 'log-' . date($this->journal_date_format) . self::EXT;

		$this->fpt = @fopen($file_path, FOPEN_WRITE_CREATE);

		flock($this->fpt, LOCK_EX);
		fputcsv($this->fpt, $this->log_content, self::DELIMETER, self::ENCLOSURE);
		flock($this->fpt, LOCK_UN);
		@chmod($this->full_path_journal, FILE_WRITE_MODE);
		$this->close_log('fpt');
	}

	private function set_full_path()
	{

		$main_path_part = $this->log_path . 'log-' . date('Y-m-d');
		$path = $main_path_part . self::EXT;
		$counter = 0;
		while ($this->get_file_lines_count($path) > $this->max_file_lines_count)
		{
			$counter++;
			$path = $main_path_part . '_' . $counter . self::EXT;
		}
		$this->full_path = $path;
	}

	private function get_file_lines_count($file)
	{

		// alternative method is :
		//return count(file($path));
		//but this memory efficient one

		$linecount = 0;
		if (file_exists($file))
		{
			$handle = fopen($file, "r");
			if ($handle)
			{
				while (!feof($handle))
				{
					$line = fgets($handle, 4096);
					$linecount = $linecount + substr_count($line, PHP_EOL);
				}
				fclose($handle);
			}
		}
		return $linecount;
	}

	private function save_log_file()
	{

		if ($this->test_mode)
		{
			$this->test_mode_journal();
		}

		if (!$this->fp)
		{
			$this->fp = fopen($this->full_path, FOPEN_WRITE_CREATE);
		}

		//if($this->fp){
		flock($this->fp, LOCK_EX);
		fputcsv($this->fp, $this->log_content, self::DELIMETER, self::ENCLOSURE);
		flock($this->fp, LOCK_UN);
		//}
		$this->clean_content();
		@chmod($this->full_path, FILE_WRITE_MODE);
		$this->close_log('fp');
	}

	private function save_journal_file($level = '')
	{

		$this->format_journal_params($level);
		if (!$this->fpj)
		{
			$this->fpj = @fopen($this->full_path_journal, FOPEN_WRITE_CREATE);
		}
		// example how to  print all csv data, don't forget to change FOPEN_WRITE_CREATE to FOPEN_READ_WRITE_CREATE
		/* if ($this->fpj) {
		  while (($data = fgetcsv($this->fpj, 1000, self::DELIMETER, self::ENCLOSURE)) !== FALSE) {
		  $num = count($data);
		  for ($c=0; $c < $num; $c++) {
		  echo $data[$c] . "<br />\n";
		  }
		  }
		  } */
		if ($this->fpj)
		{
			flock($this->fpj, LOCK_EX);
			fputcsv($this->fpj, $this->log_content_journal, self::DELIMETER, self::ENCLOSURE);
			flock($this->fpj, LOCK_UN);
		}
		@chmod($this->full_path_journal, FILE_WRITE_MODE);
		$this->close_log('fpj');
	}

	private function clean_content()
	{
		$this->log_content = '';
	}

	private function close_log($resource)
	{
		if ($this->$resource)
		{
			fclose($this->$resource);
			$this->$resource = '';
		}
	}

}
			
/* End of file Application_log.php */
/* Location: ./application/libraries/Application_log.php */