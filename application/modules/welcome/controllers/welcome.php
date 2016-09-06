<?php

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Welcome extends MY_Controller
{

	public function index()
	{

		$this->load->view('header');
	}

	public function mem_set()
	{

		$this->load->library('Memcached_library');



		$this->memcached_library->add('test', 'mano valuye', 50000);
	}

	public function mem_get()
	{

		$this->load->library('memcached_library');


		echo $this->memcached_library->get('test');
	}

	public function mongo_insert()
	{


		$m = new Mongo('localhost'); // connect


		$db = $m->selectDB("myflo");

		$collection = $db->selectCollection('lessons');


		$data = array('title2' => 'Laba dienasfsf', 'Description2' => 'adasdasdasdasd', 'aaa' => array(1 => 'aaa', 2 => 'bbbb'));


		$ret = $collection->insert($data);

		echo '<pre>';
		print_r($data); //returs insert id as well


		$m->close();
	}

	public function mongo_get()
	{

		$m = new Mongo('localhost'); // connect


		$db = $m->selectDB("myflo");

		$collection = $db->selectCollection('lessons');



		$data = $collection->find();
		echo '<pre>';
		foreach ($data as $key => $value)
		{
			print_r($value);
		}

		$m->close();
	}

	public function mongo_delete()
	{

		$m = new Mongo('localhost'); // connect


		$db = $m->selectDB("myflo");

		$collection = $db->selectCollection('lessons');

		$id = '50afa33fb3bd776221000000';

		$collection->remove(array('_id' => new MongoId($id)), true);

		echo $collection->count();

		$m->close();
	}

	public function mongo_update()
	{

		$m = new Mongo('localhost'); // connect


		$db = $m->selectDB("myflo");

		$collection = $db->selectCollection('lessons');

		$id = '50afa383b3bd778421010000';
		$newdata = array('$set' => array("title2" => uniqid()));


		$collection->update(array('_id' => new MongoId($id)), $newdata);

		echo $collection->count();

		$m->close();
	}

	public function create()
	{


		$test = new Entities\Subject;
		$test->setCode('aaa');
		$test->setTitle('My title');


		$this->doctrine->em->persist($test);


		$this->doctrine->em->flush();

		echo 'created';
	}

	public function get_item()
	{
		$test = $this->doctrine->em->find('Entities\Subject', 2);


		echo $test->getTitle();
	}

	public function update_item()
	{
		$test = $this->doctrine->em->find('Entities\Subject', 1);

		$test->setTitle('updated title');

		$this->doctrine->em->persist($test);


		$this->doctrine->em->flush();
	}

	public function delete_item()
	{
		$test = $this->doctrine->em->find('Entities\Subject', 1);



		$this->doctrine->em->remove($test);


		$this->doctrine->em->flush();
	}

	public function get_item2()
	{


		$test = $this->doctrine->em->getRepository('Entities\Subject')->findOneBy(array('id' => 1));


		echo $test->getTest();
	}

	public function test_rep()
	{

		$test = $this->doctrine->em->getRepository('Entities\Subject');

		echo $test->test_reps();
	}

}
