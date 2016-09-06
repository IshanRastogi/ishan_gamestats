<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>IR PhoneBook</title>
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- for ios 7 style, multi-resolution icon of 152x152 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="IR PhoneBook">
  <!-- for Chrome on Android, multi-resolution icon of 196x196 -->
  <meta name="mobile-web-app-capable" content="yes">
  
  <!-- style -->
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/animate.min.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/glyphicons.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/font-awesome.min.css');?>" type="text/css" />
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/material-design-icons.css');?>" type="text/css" />

  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/bootstrap_v4.min.css');?>" type="text/css" />
  <!-- build:css ../assets/styles/app.min.css -->
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/flatkit/app.css');?>" type="text/css" />
  <!-- endbuild -->
  <link rel="stylesheet" href="<?php echo base_url('assets/styles/vendor/flatkit/font.css');?>" type="text/css" />
</head>
<body>
  <div class="app" id="app">

<!-- ############ LAYOUT START-->
<div class="app-body blue bg-auto w-full">
  <div class="text-center pos-rlt p-y-md">
    <h1 class="text-shadow m-a-0 text-white text-4x">
      <span class="text-2x font-bold block m-t-lg">404</span>
    </h1>
    <h2 class="h1 m-y-lg text-black">OOPS!</h2>
    <p class="h5 m-y-lg text-u-c font-bold text-black">Sorry! the page you are looking for doesn't exist.</p>
    <a ui-sref="<?php echo base_url();?>" href="<?php echo base_url();?>" class="md-btn blue-700 md-raised p-x-md">
      <span class="text-white">Go to the home page</span>
    </a>
  </div>
</div>

<!-- ############ LAYOUT END-->

  </div>
<!-- build:js scripts/app.html.js -->
<!-- jQuery -->
  <script src="<?php echo base_url('assets/scripts/vendor/jquery_v2.1.4.js');?>"></script>
<!-- Bootstrap -->
  <script src="<?php echo base_url('assets/scripts/vendor/tether.min.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/bootstrap_v4.js');?>"></script>
<!-- core -->
  <script src="<?php echo base_url('assets/scripts/vendor/underscore-min.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/jquery.storageapi.min.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/pace.min.js');?>"></script>

  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/config.lazyload.js');?>"></script>

  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/palette.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-load.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-jp.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-include.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-device.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-form.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-nav.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-screenfull.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-scroll-to.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ui-toggle-class.js');?>"></script>

  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/app.js');?>"></script>

  <!-- ajax -->
  <script src="<?php echo base_url('assets/scripts/vendor/jquery.pjax.js');?>"></script>
  <script src="<?php echo base_url('assets/scripts/vendor/flatkit/ajax.js');?>"></script>
<!-- endbuild -->
</body>
</html>
</html>