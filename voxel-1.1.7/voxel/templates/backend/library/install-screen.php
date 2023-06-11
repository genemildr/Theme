<?php
if ( ! defined('ABSPATH') ) {
	exit;
} ?>
<div class="ts-row wrap-row">
	<div class="ts-col-1-1">
		<div class="ts-tab-heading">
			<h1>Import options</h1>
			<p>All options provided by the selected package are listed below</p>
		</div>
	</div>
	<template v-if="Object.keys(install.config.post_types).length">
		<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
			<h3>Import post types</h3>
		</div>

		<div class="ts-checkbox-container ts-col-1-2">
			<template v-for="post_type in install.config.post_types">
				<div class="container-checkbox" @click.prevent="post_type.enabled = !post_type.enabled">
					<strong>{{ post_type.original_label }}</strong>
					<input type="checkbox" :checked="post_type.enabled">
					<span class="checkmark"></span>
				</div>
				<div v-if="post_type.enabled" class="ts-row wrap-row" style="padding-left: 30px; margin-bottom: 30px;">
					<div class="ts-form-group ts-col-1-1">
						<label>Import to</label>
						<select v-model="post_type.import_to" @change="post_type.import_to === 'new' ? ( post_type.key = post_type.original_key ) : ''">
							<option value="existing">Existing post type</option>
							<option value="new">New post type</option>
						</select>
					</div>
					<template v-if="post_type.import_to === 'existing'">
						<div class="ts-form-group ts-col-1-1">
							<label>Post type</label>
							<select v-model="post_type.key">
								<option v-for="p in config.post_types" :value="p.key">{{ p.label }} ({{ p.key }})</option>
							</select>
							<p>Existing templates and configuration for this post type will be overridden</p>
						</div>
					</template>
					<template v-if="post_type.import_to === 'new'">
						<div class="ts-form-group ts-col-1-1">
							<label>Singular name</label>
							<input type="text" v-model="post_type.singular">
						</div>

						<div class="ts-form-group ts-col-1-1">
							<label>Plural name</label>
							<input type="text" v-model="post_type.plural">
						</div>

						<div class="ts-form-group ts-col-1-1">
							<label>Post type key</label>
							<input type="text" v-model="post_type.key" :placeholder="post_type.original_key">
						</div>

						<div class="ts-form-group ts-col-1-1 switch-slider">
							<label>Custom permalink base</label>
							<div class="onoffswitch">
								<input type="checkbox" class="onoffswitch-checkbox" tabindex="0" v-model="post_type.permalinks.custom">
								<label class="onoffswitch-label" @click.prevent="post_type.permalinks.custom = !post_type.permalinks.custom"></label>
							</div>
						</div>

						<div v-if="post_type.permalinks.custom" class="ts-form-group ts-col-1-1">
							<label>Permalink base</label>
						 	<input type="text" v-model="post_type.permalinks.slug">
							<p><?= home_url('/') ?>{{ post_type.permalinks.slug }}/sample-post</p>
						</div>
					</template>
				</div>
			</template>
		</div>
	</template>
	<template v-if="Object.keys(install.config.taxonomies).length">
		<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
			<h3>Import taxonomies</h3>
		</div>
		<div class="ts-checkbox-container ts-col-1-2">
			<template v-for="taxonomy in install.config.taxonomies">
				<div class="container-checkbox" @click.prevent="taxonomy.enabled = !taxonomy.enabled">
					<strong>{{ taxonomy.original_label }}</strong>
					<input type="checkbox" :checked="taxonomy.enabled">
					<span class="checkmark"></span>
				</div>
				<div v-if="taxonomy.enabled" class="ts-row wrap-row" style="padding-left: 30px; margin-bottom: 30px;">
					<div class="ts-form-group ts-col-1-1">
						<label>Import to</label>
						<select v-model="taxonomy.import_to" @change="taxonomy.import_to === 'new' ? ( taxonomy.key = taxonomy.original_key ) : ''">
							<option value="existing">Existing taxonomy</option>
							<option value="new">New taxonomy</option>
						</select>
					</div>
					<template v-if="taxonomy.import_to === 'existing'">
						<div class="ts-form-group ts-col-1-1">
							<label>Taxonomy</label>
							<select v-model="taxonomy.key">
								<option v-for="t in config.taxonomies" :value="t.key">{{ t.label }} ({{ t.key }})</option>
							</select>
							<p>Existing templates and configuration for this taxonomy will be overridden</p>
						</div>
					</template>
					<template v-if="taxonomy.import_to === 'new'">
						<div class="ts-form-group ts-col-1-1">
							<label>Singular name</label>
							<input type="text" v-model="taxonomy.singular">
						</div>

						<div class="ts-form-group ts-col-1-1">
							<label>Plural name</label>
							<input type="text" v-model="taxonomy.plural">
						</div>

						<div class="ts-form-group ts-col-1-1">
							<label>Taxonomy key</label>
							<input type="text" v-model="taxonomy.key" :placeholder="taxonomy.original_key">
						</div>
					</template>
					<div v-if="taxonomy._with_terms" class="ts-form-group ts-col-1-1 switch-slider">
						<label>Import taxonomy terms</label>
						<div class="onoffswitch">
							<input type="checkbox" class="onoffswitch-checkbox" tabindex="0" v-model="taxonomy.import_terms">
							<label class="onoffswitch-label" @click.prevent="taxonomy.import_terms = !taxonomy.import_terms"></label>
						</div>
					</div>
				</div>
			</template>
		</div>
	</template>
	<template v-if="Object.keys(install.config.product_types).length">
		<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
			<h3>Import product types</h3>
		</div>

		<div class="ts-checkbox-container ts-col-1-2">
			<template v-for="product_type in install.config.product_types">
				<div class="container-checkbox" @click.prevent="product_type.enabled = !product_type.enabled">
					<strong>{{ product_type.original_label }}</strong>
					<input type="checkbox" :checked="product_type.enabled">
					<span class="checkmark"></span>
				</div>
				<div v-if="product_type.enabled" class="ts-row wrap-row" style="padding-left: 30px; margin-bottom: 30px;">
					<div class="ts-form-group ts-col-1-1">
						<label>Import to</label>
						<select v-model="product_type.import_to" @change="product_type.import_to === 'new' ? ( product_type.key = product_type.original_key ) : ''">
							<option value="existing">Existing product type</option>
							<option value="new">New product type</option>
						</select>
					</div>
					<template v-if="product_type.import_to === 'existing'">
						<div class="ts-form-group ts-col-1-1">
							<label>Product type</label>
							<select v-model="product_type.key">
								<option v-for="p in config.product_types" :value="p.key">{{ p.label }} ({{ p.key }})</option>
							</select>
							<p>Existing configuration for this product type will be overridden</p>
						</div>
					</template>
					<template v-if="product_type.import_to === 'new'">
						<div class="ts-form-group ts-col-1-1">
							<label>Label</label>
							<input type="text" v-model="product_type.label">
						</div>
						<div class="ts-form-group ts-col-1-1">
							<label>Product type key</label>
							<input type="text" v-model="product_type.key" :placeholder="product_type.original_key">
						</div>
					</template>
				</div>
			</template>
		</div>
	</template>
	<template v-if="install.config.elementor_custom_colors.length">
		<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
			<h3>Import custom colors</h3>
		</div>
		<template v-for="color in install.config.elementor_custom_colors">
			<div class="ts-col-1-2">
				<div class="container-checkbox" @click.prevent="color.enabled = !color.enabled">
					<strong>{{ color.original_title }}</strong>
					<input type="checkbox" :checked="color.enabled">
					<span class="checkmark"></span>
				</div>
				<div v-if="color.enabled" class="ts-row wrap-row" style="padding-left: 30px;">
					<div class="ts-form-group ts-col-1-2">
						<label>Label</label>
						<input type="text" v-model="color.details.title">
					</div>
					<div class="ts-form-group ts-col-1-2">
						<label>Color</label>
						<color-picker v-model="color.details.color"></color-picker>
					</div>
				</div>
			</div>
			<div class="ts-col-1-1 mb0 mt0"></div>
		</template>
	</template>
	<template v-if="install.config.elementor_system_colors.length">
		<div class="ts-form-group ts-col-1-1 ts-tab-subheading">
			<h3>Import default colors</h3>
			<small>Overwrite the default global colors set in Elementor</small>
		</div>
		<template v-for="color in install.config.elementor_system_colors">
			<div class="ts-col-1-2">
				<div class="container-checkbox" @click.prevent="color.enabled = !color.enabled">
					<strong>{{ color.original_title }}</strong>
					<input type="checkbox" :checked="color.enabled">
					<span class="checkmark"></span>
				</div>
				<div v-if="color.enabled" class="ts-row wrap-row" style="padding-left: 30px;">
					<div class="ts-form-group ts-col-1-2">
						<label>Label</label>
						<input type="text" v-model="color.details.title">
					</div>
					<div class="ts-form-group ts-col-1-2">
						<label>Color</label>
						<color-picker v-model="color.details.color"></color-picker>
					</div>
				</div>
			</div>
			<div class="ts-col-1-1 mb0 mt0"></div>
		</template>
	</template>
	<div class="ts-col-1-1"></div>
	<div class="ts-col-1-2">
		<a href="#" @click.prevent="runImport" class="ts-button" :class="{'vx-disabled':state.processing_install}">
			<i class="las la-cloud-upload-alt icon-sm"></i> Install package
		</a>
	</div>
</div>
