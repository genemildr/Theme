<?php
if ( ! defined('ABSPATH') ) {
	exit;
} ?>
<div class="ts-row wrap-row">
	<div class="ts-col-1-1">
		<div class="ts-tab-heading">
			<h1>Export a package</h1>
			<!-- <p>Select the post types, product types, and templates to be included in this package.</p> -->
			<p>Select the post types to be included in this package.</p>
		</div>
	</div>

	<!-- <div class="ts-form-group ts-col-1-1 ts-tab-subheading">
		<h3>Export post types</h3>
	</div> -->

	<div class="ts-col-2-3">
		<div class="sub-heading">
			<p>Exported post types</p>
		</div>

		<template v-for="value, key in export_config.post_types">
			<div class="single-field wide open">
				<div class="field-head">
					<p class="field-name">{{ config.post_types[key].label }}</p>
					<span class="field-type">{{ config.post_types[key].key }}</span>
					<div class="field-actions">
						<span class="field-action all-center">
							<a href="#" @click.prevent="delete export_config.post_types[key]"><i class="lar la-trash-alt icon-sm"></i></a>
						</span>
					</div>
				</div>
				<div class="field-body">
					<div class="ts-row wrap-row">
						<div class="ts-form-group ts-col-1-1 mt0">
							<p class="mt0">Post type configuration and templates will be included in this export package.</p>
						</div>
						<div v-if="config.post_types[key].has_taxonomies" class="ts-form-group ts-col-1-1 ts-checkbox">
							<label>Taxonomies</label>
							<div class="ts-checkbox-container">
								<template v-for="v, k in config.post_types[key].taxonomies">
									<div class="container-checkbox" @click.prevent="value.taxonomies[k] ? ( delete value.taxonomies[k] ) : (value.taxonomies[k] = true)">
										{{ config.taxonomies[k].label }}
										<input type="checkbox" :checked="value.taxonomies[k]">
										<span class="checkmark"></span>
									</div>
								</template>
							</div>
							<p>Include taxonomies used by this post type in the export package</p>
						</div>
						<div v-if="Object.keys(value.taxonomies).length" class="ts-form-group ts-col-1-1 ts-checkbox">
							<label>Terms</label>
							<div class="ts-checkbox-container">
								<template v-for="v, k in value.taxonomies">
									<div class="container-checkbox" @click.prevent="value.terms[k] ? ( delete value.terms[k] ) : (value.terms[k] = true)">
										{{ config.taxonomies[k].label }}
										<input type="checkbox" :checked="value.terms[k]">
										<span class="checkmark"></span>
									</div>
								</template>
							</div>
							<p>Include taxonomy terms in the export package</p>
						</div>
						<div v-if="config.post_types[key].has_product_types" class="ts-form-group ts-col-1-1 ts-checkbox">
							<label>Product types</label>
							<div class="ts-checkbox-container">
								<template v-for="v, k in config.post_types[key].product_types">
									<div class="container-checkbox" @click.prevent="value.product_types[k] ? ( delete value.product_types[k] ) : (value.product_types[k] = true)">
										{{ config.product_types[k].label }}
										<input type="checkbox" :checked="value.product_types[k]">
										<span class="checkmark"></span>
									</div>
								</template>
							</div>
							<p>Include product types used by this post type in the export package</p>
						</div>
						<div v-if="config.post_types[key].has_related_post_types" class="ts-form-group ts-col-1-1">
							<label style="left:0;padding:0;">Export related post types</label>
							<div class="basic-ul" style="margin-top:20px;">
								<template v-for="v, k in config.post_types[key].related_post_types">
									<a
										href="#"
										@click.prevent="exportPostType(config.post_types[k])"
										class="ts-button ts-faded"
										:class="{'vx-disabled': export_config.post_types[k]}"
									>{{ config.post_types[k].label }}</a>
								</template>
							</div>
							<p>Include post types related to this post type through post-relation fields</p>
						</div>
						<!-- <div class="ts-form-group ts-col-1-1">
							<pre debug>{{ value }}</pre>
						</div> -->
					</div>
				</div>
			</div>
		</template>
	</div>

	<div class="ts-col-1-3 lib-cpt">
		<div class="sub-heading">
			<p>Select post types</p>
		</div>
		<div class="basic-ul" style="margin-top: 10px;">
			<template v-for="post_type in config.post_types">
				<a
					href="#"
					v-if="!export_config.post_types[ post_type.key ]"
					@click.prevent="exportPostType(post_type)"
					class="ts-button ts-faded"
				>{{ post_type.label }}</a>
			</template>
		</div>
	</div>

	<!-- <div class="ts-form-group ts-col-1-1 ts-tab-subheading">
		<h3>Export templates</h3>
	</div>

	<div class="ts-col-1-1 ts-checkbox-container">
		<template v-for="template in config.templates">
			<div class="container-checkbox" @click.prevent="export_config.templates[template.key] ? ( delete export_config.templates[template.key] ) : (export_config.templates[template.key] = true)">
				{{ template.label }}
				<input type="checkbox" :checked="export_config.templates[template.key]">
				<span class="checkmark"></span>
			</div>
		</template>
	</div> -->

	<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
		<h3>Run export</h3>
	</div>
	<div class="ts-col-1-2 ts-form-group">
		<label>Package name</label>
		<input type="text" v-model="state.export_file_name">
	</div>
	<div class="ts-col-1-2">
		<a href="#" @click.prevent="runExport" class="ts-button" :class="{'vx-disabled':state.processing_export}">
			<i class="las la-download icon-sm"></i>Export
		</a>
	</div>
</div>
