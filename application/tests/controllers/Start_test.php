<?php
/**
 * Check if the start page containting all the layout is loading correctly
 *
 * @author ISHAN RASTOGI
 */

class Start_test extends TestCase
{
	/**
	 * Check if the index page is loading properly and 
	 * getting values from the database.
	 */
	public function test_index()
	{
		$output = $this->request('GET', '/global/start/');
		$exptected = '<td>';
		$this->assertContains($exptected,$output);
	}

	public function test_method_404()
	{
		$this->request('GET', '/global/start/method_not_exist');
		$this->assertResponseCode(404);
	}
	
	public function test_APPPATH()
	{
		$actual = realpath(APPPATH);
		$expected = realpath(__DIR__ . '/../..');
		$this->assertEquals(
			$expected,
			$actual,
			'Your APPPATH seems to be wrong. Check your $application_folder in tests/Bootstrap.php'
		);
	}
}
