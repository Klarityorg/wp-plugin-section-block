<?php
/**
 * Plugin Name: Section block
 * Plugin URI: https://klarity.org/
 * Description: Section block
 * Author: Klarity
 * Author URI: https://klarity.org/
 * Version: 1.0.0
 * License: Closed source
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';