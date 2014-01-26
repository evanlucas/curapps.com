/**
 * curapps.com v0.1.6
 * Copyright 2014 Evan Lucas
 * Licensed under the MIT license
 */
$(document).ready(function(){$(".nav-collapse").on("shown",function(){$(".btn-navbar i").removeClass("icon-chevron-down").addClass("icon-chevron-up")}),$(".nav-collapse").on("hidden",function(){$(".btn-navbar i").removeClass("icon-chevron-up").addClass("icon-chevron-down")}),$("[rel=tooltip]").tooltip()});