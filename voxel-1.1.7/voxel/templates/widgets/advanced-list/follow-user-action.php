<?php
$current_post = \Voxel\get_current_post();
$author_id = $current_post ? $current_post->get_author_id() : null;
$status = is_user_logged_in() ? \Voxel\current_user()->get_follow_status( 'user', $author_id ) : null;
$is_active = $status === \Voxel\FOLLOW_ACCEPTED;
$is_intermediate = $status === \Voxel\FOLLOW_REQUESTED;
?>
<a
	href="<?= esc_url( add_query_arg( [
		'vx' => 1,
		'action' => 'user.follow_user',
		'user_id' => $author_id,
		'_wpnonce' => wp_create_nonce( 'vx_user_follow' ),
	], home_url( '/' ) ) ) ?>"
	class="ts-action-con ts-action-follow <?= $is_active ? 'active' : '' ?> <?= $is_intermediate ? 'intermediate' : '' ?>" role="button">
	<span class="ts-initial">
		<div class="ts-action-icon"><?php \Voxel\render_icon( $action['ts_acw_initial_icon'] ) ?></div><?= $action['ts_acw_initial_text'] ?>
	</span>

	<!--Reveal span when action is clicked (active class is added to the li) -->
	<span class="ts-reveal">
		<div class="ts-action-icon"><?php \Voxel\render_icon( $action['ts_acw_reveal_icon'] ) ?></div><?= $action['ts_acw_reveal_text'] ?>
	</span>
</a>
