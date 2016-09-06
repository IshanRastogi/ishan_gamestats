<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends MX_Controller
{

	var $data = array();
	var $allowed_urls = array();
		
	public function __construct()
	{
		
		parent::__construct();
		
		$this->data['body_class'] = strtolower(get_class($this));

		$this->data['title'] = ucfirst(get_class($this));

		$this->load_assets();

		$this->response = array();

		$this->data['public'] = TRUE;
		$this->data['global_module'] = TRUE;

	}

	public function json_output($output)
	{

		$this->output->set_content_type('application/json');

		$this->output->set_output(json_encode($output));
	}

	public function set_ajax($key, $data)
	{
		$this->response[$key] = $data;
	}

	public function set_error($key, $data, $error_field_name = 'error')
	{
		$this->set_ajax($error_field_name, true);
		$this->set_ajax($key, $data);
	}

	public function get_ajax($key)
	{
		return isset($this->response[$key]) ? $this->response[$key] : '';
	}

	public function show_ajax()
	{
        $this->output->set_content_type('application/json')->set_output(json_encode($this->response));
	}

	protected function check_method($obj_name, $method_name, $die_on_false = true)
	{

		if (!method_exists($this->$obj_name, $method_name))
		{
			if ($die_on_false)
			{

				show_error("No function called {$method_name} in class {$obj_name}");
			}
			else
			{
				return false;
			}
		}

		return true;
	}

	public function show_only_content()
	{

		$this->data['show_header'] = false;
		$this->data['show_footer'] = false;
		$this->data['popup'] = true;
	}

	public function load_assets()
	{
		
		$this->assets->add('vendor/bootstrap_v4.min.css');
		$this->assets->add('vendor/bootstrap-theme.min.css');
		
		$this->assets->add('vendor/jquery_v2.1.4.js');
		$this->assets->add('vendor/tether.min.js');	
		$this->assets->add('vendor/bootstrap_v4.js');
		
		/*
		 * FlatKit entries
		 */
		
		/*
		 * Loading CSS
		 */
		$this->assets->add('vendor/font-awesome.min.css');
		$this->assets->add('vendor/material-design-icons.css');
		$this->assets->add('vendor/flatkit/app.css');
		$this->assets->add('vendor/flatkit/font.css');
		$this->assets->add('vendor/rs-plugin/settings.css');
		
		/*
		 * Loading JS
		 */		
		$this->assets->add('vendor/underscore-min.js');
		$this->assets->add('vendor/jquery.storageapi.min.js');
		$this->assets->add('vendor/flatkit/ajax.js');
		$this->assets->add('vendor/flatkit/palette.js');
		$this->assets->add('vendor/flatkit/config.lazyload.js');
		$this->assets->add('vendor/flatkit/ui-device.js');
		$this->assets->add('vendor/flatkit/ui-form.js');
		$this->assets->add('vendor/flatkit/ui-include.js');
		$this->assets->add('vendor/flatkit/ui-jp.js');
		$this->assets->add('vendor/flatkit/ui-load.js');
		$this->assets->add('vendor/flatkit/ui-nav.js');
		$this->assets->add('vendor/flatkit/ui-screenfull.js');
		$this->assets->add('vendor/flatkit/ui-scroll-to.js');
		$this->assets->add('vendor/flatkit/ui-toggle-class.js');
		$this->assets->add('vendor/parsley.min.js');
		$this->assets->add('vendor/parsley.remote.min.js');
		$this->assets->add('vendor/backstretch.js');
		$this->assets->add('vendor/typed.min.js');
		$this->assets->add('vendor/flowtype.js');
		$this->assets->add('vendor/viewport-units/viewport-units-buggyfill.js');
		$this->assets->add('vendor/viewport-units/viewport-units-buggyfill.hacks.js');
		$this->assets->add('vendor/jquery.pjax.js');
		$this->assets->add('vendor/pace.min.js');
		$this->assets->add('vendor/flatkit/app.js');
		
		
	}

}

include_once 'MY_User.php'; //loading sub class
