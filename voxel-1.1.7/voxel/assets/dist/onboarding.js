!function(e){"function"==typeof define&&define.amd?define("onboarding",e):e()}(function(){"use strict";jQuery(e=>{var n=document.getElementById("voxel-onboarding");n&&(window.$=jQuery,(e=>{let n=JSON.parse(e.dataset.config);return Vue.createApp({el:e,data(){return{pending:!1,tab:n.tab||"welcome",config:n,prepare:{running:!1},license:{pending:!1,license_key:n.license.key,environment:n.license.env||"production"},demo_import:{running:!1,message:"Downloading package...",demo:"city"}}},created(){window.VXSETUP=this},methods:{setTab(e){this.tab=e;var n=new URL(window.location);n.searchParams.set("tab",e),window.history.replaceState(null,null,n)},prepare_install(){this.prepare.running=!0,jQuery.get(Voxel_Config.ajax_url,{action:"onboarding.prepare_install"}).always(e=>{this.prepare.running=!1,e.success?this.setTab("license"):Voxel_Backend.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})},verify_license(){this.pending=!0,jQuery.get(Voxel_Config.ajax_url,{action:"onboarding.verify_license",license_key:this.license.license_key,environment:this.license.environment}).always(e=>{this.pending=!1,e.success?this.setTab("demo-import"):Voxel_Backend.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})},run_import(){this.demo_import.running=!0,jQuery.get(Voxel_Config.ajax_url,{action:"onboarding.import_demo",demo:this.demo_import.demo}).always(e=>{e.success?(this.demo_import.message=e.message,e.import_finished?this.setTab("done"):this.run_import()):(this.demo_import.running=!1,Voxel_Backend.alert(e.message||Voxel_Config.l10n.ajaxError,"error"))})},start_blank(){jQuery.get(Voxel_Config.ajax_url,{action:"onboarding.start_blank"}),this.setTab("done")}}})})(n).mount(n))})});
