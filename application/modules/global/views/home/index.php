<?php 
/**
 * Home Page.
 *
 * This is the landing page.
 *
 * @author ISHAN RASTOGI
 **/
$this->load->view('body/header'); ?>


<!-- ############ LAYOUT START-->
  <div id="content" class="app-content box-shadow-z0" role="main">
     
     <div class="app-header black box-shadow">
		<?php $this->load->view('home/nav');?>       
    </div>
   
    <div ui-view class="app-body" id="view">
    
<!-- ############ PAGE START-->
<div class="padding">
	<div class="row">		
	
	<div id="mainTitle" class="animated pulse">
		GameStats
	</div>

	<div id="mainBody" class="col-sm-8 col-sm-offset-2">
     	The most <span class="mainEmphasis">Advanced</span> and 
     	<span class="mainEmphasis">Comprehensive</span> gaming solution
	</div>

	<div class="card card-inverse cardSignUp center-block text-center m-t-md">
			<div class="card-block">
					<div class="card-title">
						<a class="btn btn-lg primary" style="text-decoration:none;" href="<?=base_url('/global/start/index');?>">
							<i class="fa fa-user-plus"></i>
							Enter Here
						</a>
					</div>
			</div>
	</div>
			
												   	
	</div>
</div>

<!-- ############ PAGE END-->
</div>
</div>

<!-- ############ LAYOUT END-->

<?php 
$this->load->view('body/footer'); 
/* End of file index.php */
/* Location: ./application/modules/global/views/home/index.php */ ?>
