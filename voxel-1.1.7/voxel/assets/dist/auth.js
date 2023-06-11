!function(e){"function"==typeof define&&define.amd?define("auth",e):e()}(function(){"use strict";window.render_auth=()=>{Array.from(document.querySelectorAll(".ts-auth")).forEach(e=>{var r;e.__vue_app__||(r=e,Vue.createApp({el:r,mixins:[Voxel.mixins.base],data(){return{pending:!1,resendCodePending:!1,screen:null,config:null,login:{username:null,password:null,remember:!1},recovery:{email:null,code:null,password:null,confirm_password:null},register:{username:null,email:null,password:null,terms_agreed:!1},update:{password:{current:null,new:null,confirm_new:null,successful:!1},email:{new:null,code:null,state:"send_code"}},privacy:{export_data:{pending:!1},delete_account:{pending:!1,password:"",code:""}},confirmation_code:null}},created(){this.config=JSON.parse(this.$options.el.dataset.config),this.screen=this.config.screen,r.classList.remove("hidden")},methods:{submitLogin(){this.recaptcha("vx_login",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.login",data:{username:this.login.username,password:this.login.password,remember:this.login.remember,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?e.confirmed?window.location.replace(this.config.redirectUrl):this.screen="login_confirm_account":Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitRecover(){this.recaptcha("vx_recover",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.recover",data:{email:this.recovery.email,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?this.screen="recover_confirm":Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitRecoverConfirm(){this.recaptcha("vx_recover_confirm",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.recover_confirm",data:{email:this.recovery.email,code:this.recovery.code,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?this.screen="recover_set_password":Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitNewPassword(){this.recaptcha("vx_recover_set_password",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.recover_set_password",data:{email:this.recovery.email,code:this.recovery.code,password:this.recovery.password,confirm_password:this.recovery.confirm_password,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?(this.screen="login",this.login.username=this.recovery.email,this.recovery.email=null,this.recovery.code=null,this.recovery.password=null,this.recovery.confirm_password=null,this.$refs.loginPassword?.focus()):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitRegister(){this.recaptcha("vx_register",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.register",data:{username:this.register.username,email:this.register.email,password:this.register.password,terms_agreed:this.register.terms_agreed?"yes":"",_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?e.verification_required?this.screen="confirm_account":this._handleRegisterRedirect(e):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitConfirmAccount(s){this.recaptcha("vx_confirm_account",e=>{var r=("login"===s?this.login:this.register).username,a=("login"===s?this.login:this.register).password,n="login"===s&&this.login.remember;this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.confirm_account",data:{username:r,password:a,remember:n,code:this.confirmation_code,redirect_to:this.config.redirectUrl,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?this._handleRegisterRedirect(e):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},_handleRegisterRedirect(e){"{REDIRECT_URL}"===e.redirect_to?window.location.replace(this.config.redirectUrl):window.location.replace(e.redirect_to.replace("{REDIRECT_URL}",encodeURIComponent(this.config.redirectUrl)))},resendConfirmationCode(a){this.recaptcha("vx_resend_confirmation_code",e=>{var r=("login"===a?this.login:this.register).username;this.resendCodePending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.resend_confirmation_code",data:{username:r,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.resendCodePending=!1,e.success?Voxel.alert(e.message,"info"):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitUpdatePassword(){this.recaptcha("vx_update_password",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.update_password",data:{current:this.update.password.current,new:this.update.password.new,confirm_new:this.update.password.confirm_new,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?this.update.password.successful=!0:Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},submitUpdateEmail(){this.recaptcha("vx_update_email",e=>{this.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.update_email",data:{new:this.update.email.new,code:this.update.email.code,state:this.update.email.state,_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.pending=!1,e.success?this.update.email.state=e.state:Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},requestPersonalData(){this.recaptcha("vx_request_personal_data",e=>{this.privacy.export_data.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.request_personal_data",data:{_wpnonce:this.config.nonce,_recaptcha:e}}).always(e=>{this.privacy.export_data.pending=!1,e.success?Voxel.alert(e.message,"success"):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},deleteAccountPermanently(r=!1){this.recaptcha(r?"vx_delete_account_permanently":"vx_delete_account",e=>{this.privacy.delete_account.pending=!0,jQuery.post({url:Voxel_Config.ajax_url+"&action=auth.delete_account_permanently",data:{password:this.privacy.delete_account.password,_wpnonce:this.config.nonce,_recaptcha:e,confirmation_code:this.privacy.delete_account.code,confirmed:r?"yes":""}}).always(e=>{this.privacy.delete_account.pending=!1,e.success?r?location.reload():(this.privacy.delete_account.code=e.confirmation_code,this.screen="security_delete_account_confirm"):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},recaptcha(e,r){this.config.recaptcha.enabled?grecaptcha.ready(()=>{grecaptcha.execute(this.config.recaptcha.key,{action:e}).then(e=>r(e))}):r(null)}}}).mount(e))})},window.render_auth(),jQuery(document).on("voxel:markup-update",window.render_auth)});
