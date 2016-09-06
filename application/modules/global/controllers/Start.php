<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Controller to display the fixtures and results
 * details.
 * 
 * @author ISHAN
 *
 */
class Start extends MY_Controller
{

	public function __construct()
	{
		parent::__construct();

	}
	
	public function load_assets(){
		 
		parent::load_assets();

	}
	
	/**
	 * Displays the fixture & results information such as
	 * dates, teams, venues etc
	 */
    public function index()
    {

    	/*
    	 * Check if the result set is stored in the
    	 * cache, to avoid call to the server.
    	 */
    	$cache_key = "fixtures_list";  	
    	$fixtures = NULL;
    	$fixtures = $this->memcached_library->get($cache_key);
    	
    	/*
    	 * Get games details from the server & store in
    	 * cache for next time.
    	 */
    	if(!$fixtures){
	    	$server_url = "http://bristolrugby.matchdaylive.com/tools/ajax/cache.php?type=Fixture&format=json&TeamId=25&Source=sfms&module=StatsRugbyMDS&CompSeason=2015&project=bristol";	    	
	    	$fixtures = file_get_contents($server_url); 	
	
	    	//jsonDecode with errors
	    	$fixtures = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $fixtures));
	    	
	    	$fixtures = $fixtures->SoticFeed->Fixtures->Fixture;
	    	
	    	$this->memcached_library->set($cache_key, $fixtures);
    	}
    	
    	$this->data['fixtures'] = $fixtures;
    	    	
        $this->load->view('start/index', $this->data);
    }

}

/* End of file start.php */
/* Location: ./application/modules/global/controllers/start.php */