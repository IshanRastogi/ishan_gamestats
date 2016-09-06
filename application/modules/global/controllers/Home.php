<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Home/landing page of the application
 * @author ISHAN
 *
 */
class Home extends MY_Controller
{

	public function __construct()
	{
		parent::__construct();

	}
	
	public function load_assets(){
		 
		parent::load_assets();
		 					
		$this->assets->add('modules/global/home.css');
		
	}
	

    public function index()
    {
			
        $this->load->view('home/index', $this->data);
    }

   
}

/* End of file home.php */
/* Location: ./application/modules/global/controllers/home.php */