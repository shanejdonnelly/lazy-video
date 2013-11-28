/*
 * jQuery plugin for lazy loading videos
 *
 * Copyright (c) 2013 Shane Donnelly
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://shane3.com/projects/lazy-video
 *
 * Version:  1.0
 *
 */
 
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "lazyVideo",
				defaults = {
				threshold: 1000
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
                        
                        var base = this; 
                        this.$videos = $('video > source');

                        $(window).on('scroll', function() {
                            base.update();
                        });
 
                        //get video in viewport on load
                        this.update();
                     
				},

                update: function(){

                    var base = this;

                    this.$videos.each(function(){ 
                        //is it near the viewport?
                        var
                        $source = $(this), 
                        loaded = $source.data('loaded'),
                        $vid = $source.parent('video'),
                        near_viewport = $.inviewport($vid,{threshold:base.settings.threshold}) ? true : false;

                        if(near_viewport){ 
                            if(loaded !== 'loaded'){                           
                                $source.data('loaded', 'loaded');
                                $source.attr('src', $source.data('videosrc'));                              
                                $vid[0].load();
                            console.log($vid.attr('id') + ' near viewport');
                            }
                            $vid[0].play(); 
                        }
                        else{
                            $vid[0].pause(); 
                            console.log($vid.attr('id') + ' paused');
                        }
                    });
                
                }
		};

		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document ); 
