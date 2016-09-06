<?php
/**
 * Check if homepage is loading correctly
 *
 * @author ISHAN RASTOGI
 */

class Home_test extends TestCase
{
	public function test_index()
	{
		$output = $this->request('GET', '/global/home/');
		$expected = '<div id="mainBody" class="col-sm-8 col-sm-offset-2">';
		$this->assertContains($expected,$output);
	}
/**
 * Test if the 404 is returned when non existent method is called
 */
	public function test_method_404()
	{
		$this->request('GET', '/global/home/method_not_exist');
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
