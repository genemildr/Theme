<?php
if ( ! defined('ABSPATH') ) {
	exit;
} ?>

<div class="wrap">
	<div id="voxel-library" data-config="<?= esc_attr( wp_json_encode( $config ) ) ?>" v-cloak>
		<div class="edit-cpt-header">
			<div class="ts-container cpt-header-container">
				<div class="ts-row wrap-row v-center">
					<div class="ts-col-2-3">
						<h1>Library <p>Quickly import and export post types, templates, and mixed packages.</p></h1>
					</div>

					<div class="cpt-header-buttons ts-col-1-3">
						<a href="#" class="ts-button ts-transparent" @click.prevent="screen = 'library'; $event.shiftKey ? reloadLibrary() : '';">
							<i class="las la-layer-group icon-sm"></i> Library
						</a>
						<a href="#" class="ts-button ts-transparent" @click.prevent="screen = 'export'">
							<i class="las la-download icon-sm"></i> Export
						</a>
						<a href="#" class="ts-button ts-transparent btn-shadow" @click.prevent="screen = 'import'">
							<i class="las la-cloud-upload-alt icon-sm"></i> Import
						</a>
					</div>
				</div>
				<div class="ts-separator"></div>
			</div>
		</div>
		<div class="ts-theme-options ts-container">
			<div v-if="screen === 'export'">
				<?php require_once locate_template('templates/backend/library/export-screen.php') ?>
			</div>
			<div v-else-if="screen === 'import'">
				<?php require_once locate_template('templates/backend/library/import-screen.php') ?>
			</div>
			<div v-else-if="screen === 'install'">
				<?php require_once locate_template('templates/backend/library/install-screen.php') ?>
			</div>
			<div v-else-if="screen === 'library'">
				<?php require_once locate_template('templates/backend/library/library-screen.php') ?>
			</div>
			<div v-else-if="screen === 'success'">
				<div class="ts-row wrap-row">
					<div class="ts-col-1-2">
						<div class="ts-tab-heading">
							<h1>Package has been installed successfully.</h1>
						</div>
						<div class="basic-ul">
							<a href="#" @click.prevent="screen = 'library'" class="ts-button ts-faded"><i class="las la-layer-group icon-sm"></i> Library</a>
							<a href="#" @click.prevent="screen = 'import'" class="ts-button ts-faded"><i class="las la-cloud-upload-alt icon-sm"></i> Import</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
