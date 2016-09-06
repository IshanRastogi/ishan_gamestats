<?php 
/**
 * Table view for the start page.
 *
 *
 * @author ISHAN RASTOGI
 **/

$this->load->view('start/header'); ?>

<style>
div.dataTables_length label{
	padding-left:.75rem !important
}
div.dataTables_info{
	padding-left:.75rem !important
}
table, th, td {
   border: 1px solid gainsboro !important;
}
</style>


<!-- ############ LAYOUT START-->

  
  <!-- content -->
  <div id="content" class="app-content box-shadow-z0" role="main">
    <div class="app-footer" ng-class="{'hide': $state.current.data.hideFooter}">
		<?php $this->load->view('body/footer');?>
    </div>
    <div ui-view class="app-body" id="view">

<!-- ############ PAGE START-->
  <div class="item">   
  <div class="padding p-x-1">
  
  			<div class="box row">
  			<div class="box-header primary"><h3>Fixtures</h3></div>
	    	<div class="box-body white">
				<div class="table-responsive row">
			      <table ui-jp="dataTable" class="table table-striped b-t b-b table-hover">
			        <thead>
			          <tr>
			            <th>Date</th>
			            <th>Time</th>
			            <th style="width:15%;">Venue</th>
			            <th style="width:15%;">Team A</th>
			            <th>Score</th>
			            <th style="width:15%;">Team B</th>
			            <th>Refree</th>
			            <th>Competition</th>
			          </tr>
			        </thead>
			        <tbody>
			        <?php foreach ($fixtures as $fixture){?>
			        	<tr>
			        		<td><?=$fixture->FixDate;?></td>
			        		<td><?=$fixture->FixTime;?></td>
			        		<td><?=$fixture->Venue->VenName." (".$fixture->FixVenType.")";?></td>
			        		<td><?=$fixture->Teams->Team[0]->TmnmOfficial;?></td>
			        		<td><?=$fixture->FixFullPtsA." - ".$fixture->FixFullPtsB;?></td>
			        		<td><?=$fixture->Teams->Team[1]->TmnmOfficial;?></td>  
			        		<td><?=$fixture->Officials->Official->referee;?></td>
			        		<td><?=$fixture->Competitions->Competition[0]->CompName." (".
			        			$fixture->Competitions->Competition[0]->CompSeasonShort.")";?>
			        		</td>      		
			        	</tr>
			        <?php }?>
			        </tbody>
			      </table>
			    </div>
			</div>
			<div class="box-header primary"  style="height:2em;"></div>			
		</div>
		
      </div>
    </div>
    
<!-- ############ PAGE END-->
    </div>
  </div>
  <!-- / -->
<!-- ############ LAYOUT END-->
<?php 
$this->load->view('body/footer'); 
/* End of file index.php */
/* Location: ./application/modules/global/views/start/index.php */ ?>