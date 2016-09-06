    <div class="navbar">
    <!-- Open side - Naviation on mobile -->
    <a data-toggle="collapse" data-target="#collapse" class="navbar-item pull-left hidden-lg-up">
      <i class="material-icons">&#xe5d2;</i>
    </a>
    <!-- / -->

    <!-- Page title - Bind to $state's title -->
    <div class="navbar-item pull-left h5" ng-bind="$state.current.data.title" id="pageTitle"></div>

      <!-- nabar right -->
        <ul class="nav navbar-nav pull-left col-sm-2 m-l-1">
          <span class="nav-link" >
            	<a href="<?=base_url();?>" >
            		<h5 class="m-t-md">IR
            		<span class="text-warn">GameStats</span></h5>
            	</a>
            </span>           				
	
        </ul>
      <!-- / navbar right -->
    

    <!-- navbar collapse -->
    <div class="collapse navbar-toggleable-sm col-sm-6 pull-right" id="collapse">
      <!-- link and dropdown -->
      <ul class="nav navbar-nav col-sm-offset-1">
        <li class="nav-item dropdown">         
			<div class="pull-right">
			</div>                      
        </li>
      </ul>
      <!-- / -->
    </div>
    <!-- / navbar collapse -->

  </div>
        