/**
 * curapps.com v0.1.5
 * Copyright 2014 Evan Lucas
 * Licensed under the MIT license
 */
$(document).ready(function(){var a=io.connect("/");$("#submitBtn").click(function(b){b.preventDefault();var c=$("input[name=name]").val(),d=$("input[name=phone]").val(),e=$("input[name=email]").val(),f=$("textarea#desc").val();return""==c?($("#name-cg").addClass("error"),alertify.error("Name is required"),!1):($("#name-cg").removeClass("error"),""==e?($("#email-cg").addClass("error"),alertify.error("Email is required"),!1):($("#email-cg").removeClass("error"),$(this).button("loading"),a.emit("contactUs",{name:c,phone:d,email:e,desc:f}),void 0))}),a.on("contactUsError",function(a){alertify.error(a),~a.indexOf("Invalid email")&&$("input[name=email]").closest(".control-group").addClass("error"),$("#submitBtn").button("reset")}),a.on("contactUsSuccess",function(a){alertify.success(a),$("input[name=email]").closest(".control-group").removeClass("error"),$("#submitBtn").button("reset")})});