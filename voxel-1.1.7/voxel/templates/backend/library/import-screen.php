<?php
if ( ! defined('ABSPATH') ) {
	exit;
} ?>
<div class="ts-row wrap-row">
	<div class="ts-col-1-1">
		<div class="ts-tab-heading">
			<h1>Import package</h1>
			<p>Manually upload and import package</p>
		</div>
	</div>

	<div class="ts-col-1-2">
		<input class="ts-pick-file" type="file" ref="manualImport" style="padding: 50px; width: 100%; background: rgba(0, 0, 0, .05);">
	</div>
	<div class="ts-col-1-1"></div>
	<div class="ts-col-1-2">
		<a href="#" @click.prevent="manualImport" class="ts-button" :class="{'vx-disabled':state.processing_upload}">
			<i class="las la-cloud-upload-alt icon-sm"></i> Import
		</a>
	</div>
</div>
