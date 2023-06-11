!function(e){"function"==typeof define&&define.amd?define("productForm",e):e()}(function(){"use strict";var i={template:"#product-form-date-picker",props:{parent:Object},data(){return{picker:null,today:new Date,maxDate:new Date,value:null}},created(){this.value=this.$root.booking.checkIn?new Date(this.$root.booking.checkIn+"T00:00:00"):null,this.maxDate.setDate(this.maxDate.getDate()+(this.$root.config.calendar.make_available_next-1))},mounted(){this.picker=new Pikaday({field:this.$refs.input,container:this.$refs.calendar,bound:!1,firstDay:1,keyboardInput:!1,defaultDate:this.value,minDate:this.today,maxDate:this.maxDate,onSelect:e=>{this.value=e,this.parent.onSaveCalendar()},selectDayFn:e=>this.value&&this.value.toDateString()===e.toDateString(),disableDayFn:e=>this.$root.config.calendar.make_available_next<1||!!this.$root.excluded_weekday_indexes.includes(e.getDay())||void 0,unavailableDayFn:e=>{if(this.$root.config.calendar.excluded_days.includes(Voxel.helpers.dateFormatYmd(e)))return!0}})},unmounted(){setTimeout(()=>this.picker.destroy(),200)},methods:{refresh(){this.picker.draw()},reset(){this.value=null,this.refresh()}}},a={template:"#product-form-date-range-picker",props:{parent:Object},data(){return{picker:null,today:new Date,maxDate:new Date,activePicker:"start",startDate:null,endDate:null,excludedDates:null,nextExcluded:null}},created(){this.startDate=this.$root.booking.checkIn?new Date(this.$root.booking.checkIn+"T00:00:00"):null,this.endDate=this.$root.booking.checkOut?new Date(this.$root.booking.checkOut+"T00:00:00"):null,this.maxDate.setDate(this.maxDate.getDate()+(this.$root.config.calendar.make_available_next-1));var e=this.$root.config.calendar.excluded_days;this.excludedDates=e.map(e=>new Date(e)).sort((e,t)=>e-t)},mounted(){this.picker=new Pikaday({field:this.$refs.input,container:this.$refs.calendar,bound:!1,firstDay:1,keyboardInput:!1,numberOfMonths:2,defaultDate:this.startDate,minDate:this.today,maxDate:this.maxDate,theme:"pika-range",onSelect:e=>{"start"===this.activePicker?(this.setStartDate(e),this.activePicker="end"):(this.setEndDate(e),this.activePicker="start",this.parent.onSaveCalendar()),this.refresh()},selectDayFn:e=>!(!this.startDate||e.toDateString()!==this.startDate.toDateString())||!(!this.endDate||e.toDateString()!==this.endDate.toDateString())||void 0,disableDayFn:e=>this.$root.config.calendar.make_available_next<1||!!this.$root.excluded_weekday_indexes.includes(e.getDay())||!!("end"===this.activePicker&&this.startDate&&e<this.startDate)||!!("end"===this.activePicker&&this.nextExcluded&&e>this.nextExcluded)||void 0,unavailableDayFn:e=>{if(this.$root.config.calendar.excluded_days.includes(Voxel.helpers.dateFormatYmd(e)))return!0}}),this.setStartDate(this.startDate),this.setEndDate(this.endDate),this.refresh()},unmounted(){setTimeout(()=>this.picker.destroy(),200)},methods:{setStartDate(t){if(this.startDate=t,this.picker.setStartRange(t),this.nextExcluded=null,t){var e=this.excludedDates.find(e=>t<e),i=null;if(this.$root.excluded_weekday_indexes.length)for(var a=1;a<=6;a++)if((i=new Date(t.getTime())).setDate(i.getDate()+a),this.$root.excluded_weekday_indexes.includes(i.getDay()))break;this.nextExcluded=i&&(i<e||!e)?i:e}this.endDate&&(this.startDate>this.endDate||this.endDate>this.nextExcluded)&&this.setEndDate(null)},setEndDate(e){this.endDate=e,this.picker.setEndRange(e)},refresh(){this.picker.draw()},reset(){this.setStartDate(null),this.setEndDate(null),this.refresh(),this.activePicker="start"}},computed:{startLabel(){return this.startDate?this.startDate.toLocaleDateString():this.$root.l10n.checkIn},endLabel(){return this.endDate?this.endDate.toLocaleDateString():this.$root.l10n.checkOut}},watch:{activePicker(){this.refresh()}}},s={template:"#create-post-media-popup",props:{multiple:{type:Boolean,default:!0},ignore:{type:Array,default:[]},customTarget:[Object,String],saveLabel:String},emits:["save","blur","open"],data(){return{files:[],selected:{},active:!1,loading:!0,has_more:!1,firstLoad:!0,search:{term:"",offset:0,loading:!1,loading_more:!1,has_more:!1,list:null}}},methods:{getStyle(e){return e.type.startsWith("image/")?`background-image: url('${e.preview}');`:""},selectFile(e){this.selected[e.id]?delete this.selected[e.id]:(this.multiple||(this.selected={}),this.selected[e.id]=e)},loadMedia(){jQuery.get(Voxel_Config.ajax_url+"&action=list_media",{offset:this.files.length}).always(e=>{this.loading=!1,e.success?(this.files.push(...e.data),this.has_more=e.has_more):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})},loadMore(){this.loading=!0,this.loadMedia()},openLibrary(){this.$emit("open"),this.firstLoad&&this.loadMedia(),this.firstLoad=!1,this.active=!this.active},isImage(e){return e.type.startsWith("image/")},save(){this.active=!1,this.$emit("save",this.selected),this.selected={}},clear(){this.selected={}},clientSearchFiles(){let t=this.search.term.trim().toLowerCase(),i=[],a=!1;this.files.forEach(e=>{a||-1!==e.name.toLowerCase().indexOf(t)&&(i.push(e),a=10<=i.length)}),this.search.list=i,this.search.loading=!1,this.search.has_more=!1,this.search.loading_more=!1},serverSearchFiles:Voxel.helpers.debounce((t,i=!1)=>{jQuery.get(Voxel_Config.ajax_url+"&action=list_media",{offset:i?t.search.list.length:0,search:t.search.term.trim()}).always(e=>{t.search.loading=!1,t.search.loading_more=!1,e.success?(i?t.search.list.push(...e.data):t.search.list=e.data,t.search.has_more=e.has_more):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},watch:{"search.term"(){this.search.term.trim()&&this.files&&(this.search.loading=!0,!this.has_more||this.search.term.trim().length<=2?this.clientSearchFiles():this.serverSearchFiles(this))}}},o={template:"#create-post-file-field",props:{field:Object,mediaTarget:[Object,String],index:{type:Number,default:null},sortable:{type:Boolean,default:!0},showLibrary:{type:Boolean,default:!0},previewImages:{type:Boolean,default:!0}},data(){return{accepts:"",dragActive:!1}},created(){null===this.field.value&&(this.field.value=[]),this.accepts=Object.values(this.field.props.allowedTypes).join(", ")},mounted(){this.updatePreviews(),jQuery(this.$refs.input).on("change",e=>{for(var t=0;t<e.target.files.length;t++){var i=e.target.files[t];this.pushFile(i)}this.$refs.input.value="",this.updatePreviews(),this.$emit("files-added")}),jQuery(()=>{var e=jQuery(this.$refs.fileList);this.sortable&&(e.sortable({items:"> .ts-file",helper:"clone",appendTo:this.$el,containment:"parent",tolerance:"intersect",revert:150}),e.on("sortupdate",()=>{var i=[];e.find(".ts-file").each((e,t)=>{i.push(this.field.value[t.dataset.index])}),this.field.value=i,this.updatePreviews()})),e.find(".pick-file-input").on("click",e=>{e.preventDefault(),this.$refs.input.click()})})},unmounted(){setTimeout(()=>{Object.values(this.field.value).forEach(e=>{"new_upload"===e.source&&URL.revokeObjectURL(e.preview)})},10),this.sortable&&jQuery(this.$refs.fileList).sortable("destroy")},methods:{getStyle(e){return e.type.startsWith("image/")&&this.previewImages?`background-image: url('${e.preview}');`:""},updatePreviews(){var e=jQuery(this.$refs.fileList),a=[];this.field.value.forEach((e,t)=>{var i=e.type.startsWith("image/")&&this.previewImages,i=jQuery(`
					<div class="ts-file ${i?"ts-file-img":""}" style="${this.getStyle(e)}" data-index="${t}">
						<div class="ts-file-info">
							<svg fill="#000000" width="52" height="52" version="1.1" id="lni_lni-cloud-upload" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
								<g>
									<path d="M34.3,27.3c-0.5-0.5-1.1-0.8-1.8-0.8c-0.7,0-1.3,0.3-1.8,0.8l-4.9,5.1c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.8,0.7,2.5,0
										l2.5-2.6v9.5c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8v-9.5l2.5,2.6c0.3,0.4,0.8,0.5,1.3,0.5c0.4,0,0.9-0.2,1.2-0.5
										c0.7-0.7,0.7-1.8,0-2.5L34.3,27.3z"/>
									<path d="M57.8,23.7c-2.7-2.9-6.6-4.9-10.6-5.6c-2.2-3.5-5.5-6.1-9.3-7.4c-1.7-0.6-3.7-1-5.8-1c-9.6,0-17.5,7.5-17.9,16.9
										C6.9,27.2,1.3,33.2,1.3,40.4c0,7.6,6.3,13.8,14.1,13.9c0,0,0,0,0,0h28.8c10.3,0,18.6-8.2,18.6-18.2C62.8,31.5,61,27.1,57.8,23.7z
										 M44.1,50.8H15.4c-6,0-10.6-4.6-10.6-10.4S9.4,30,15.4,30h0.5c1,0,1.8-0.8,1.8-1.8v-1.1c0-7.7,6.5-14,14.4-14
										c1.7,0,3.2,0.3,4.6,0.8c3.3,1.1,6.1,3.5,7.9,6.6c0.3,0.5,0.8,0.8,1.3,0.9c3.6,0.4,7,2,9.3,4.6c2.6,2.8,4,6.3,4,10
										C59.3,44.2,52.5,50.8,44.1,50.8z"/>
								</g>
						</svg><code></code>
						</div>
						<a href="#" class="ts-remove-file flexify"><svg fill="#000000" width="52" height="52" version="1.1" id="lni_lni-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
							 y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
						<path d="M34.5,32L62.2,4.2c0.7-0.7,0.7-1.8,0-2.5c-0.7-0.7-1.8-0.7-2.5,0L32,29.5L4.2,1.8c-0.7-0.7-1.8-0.7-2.5,0
							c-0.7,0.7-0.7,1.8,0,2.5L29.5,32L1.8,59.8c-0.7,0.7-0.7,1.8,0,2.5c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5L32,34.5l27.7,27.8
							c0.3,0.3,0.8,0.5,1.2,0.5c0.4,0,0.9-0.2,1.2-0.5c0.7-0.7,0.7-1.8,0-2.5L34.5,32z"/>
						</svg></a>
					</div>
				`);i.find("code").text(e.name),i.find("a").on("click",e=>{e.preventDefault(),this.field.value.splice(t,1),this.updatePreviews()}),a.push(i)}),e.find(".pick-file-input").siblings().remove(),e.append(a)},pushFile(e){1===this.field.props.maxCount&&(this.field.value=[]),this.field.value.push({source:"new_upload",name:e.name,type:e.type,preview:URL.createObjectURL(e),item:e})},onDrop(e){this.dragActive=!1,e.dataTransfer.items?[...e.dataTransfer.items].forEach(e=>{"file"===e.kind&&this.pushFile(e.getAsFile())}):[...e.dataTransfer.files].forEach(e=>{this.pushFile(e)}),this.updatePreviews(),this.$emit("files-added")},onMediaPopupSave(e){1===this.field.props.maxCount&&(this.field.value=[]);var t={};this.field.value.forEach(e=>{"existing"===e.source&&(t[e.id]=!0)}),Object.values(e).forEach(e=>{t[e.id]||this.field.value.push(e)}),this.updatePreviews(),this.$emit("files-added")},onSubmit(t,i,e=null){var a;a=null!==e?`files[${this.field.id}::row-${e}][]`:`files[${this.field.id}][]`,t[this.field.key]=[],this.field.value.forEach(e=>{"new_upload"===e.source?(i.append(a,e.item),t[this.field.key].push("uploaded_file")):"existing"===e.source&&t[this.field.key].push(e.id)})},async cacheToLocalStorage(s){s[this.field.key]=[];let e=[];return this.field.value.forEach(a=>{if("existing"===a.source)s[this.field.key].push(a);else if("new_upload"===a.source){let t={source:"local_storage",name:a.item.name,type:a.item.type,lastModified:a.item.lastModified,dataUrl:null},i=new FileReader;e.push(new Promise(e=>{i.onload=()=>{t.dataUrl=i.result,s[this.field.key].push(t),e()},i.readAsDataURL(a.item)}))}}),Promise.all(e)},async applyFromLocalStorage(t){if(Array.isArray(t)&&t.length){let e=[];return t.forEach(i=>{e.push(new Promise(t=>{fetch(i.dataUrl).then(e=>e.blob()).then(e=>{this.pushFile(new File([e],i.name,{type:i.type,lastModified:new Date})),t()})}))}),Promise.all(e).then(()=>this.$root.$nextTick(this.updatePreviews())),Promise.all(e)}}}};window.render_product_form=()=>{Array.from(document.querySelectorAll(".ts-booking-form")).forEach(e=>{var t;e.__vue_app__||((t=(t=>{let e=JSON.parse(t.closest(".elementor-widget-container").querySelector(".vxconfig").innerHTML);return Vue.createApp({el:t,mixins:[Voxel.mixins.base],data(){return{loading:!1,step:"main",lockToCheckout:!1,activePopup:null,config:e,l10n:e.l10n,booking:{checkIn:e.values.booking?.start,checkOut:e.values.booking?.end,timeslot:null},additions:e.additions,custom_additions:e.custom_additions,custom_additions_map:{},weekday_indexes:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6},weekday_indexes_reverted:{0:"sun",1:"mon",2:"tue",3:"wed",4:"thu",5:"fri",6:"sat"},excluded_weekday_indexes:[],externalItemRef:null,externalItem:null}},created(){e.skip_main_step&&this.canSkipMain()&&(this.step="checkout",this.lockToCheckout=!0),this.config.calendar.excluded_weekdays.forEach(e=>{this.excluded_weekday_indexes.push(this.weekday_indexes[e])}),this.config.values.additions&&Object.keys(this.config.values.additions).forEach(e=>{this.additions[e].value=this.config.values.additions[e]}),Object.values(this.custom_additions).forEach(t=>{this.custom_additions_map[t.key]={},t.items.forEach(e=>this.custom_additions_map[t.key][e.id]=e)}),this.setupExternalAdditions()},mounted(){this.config.is_user_logged_in&&this.getSessionFromURL(),Voxel.deleteSearchParam("checkout."+this.config.id)},methods:{saveCalendar(){var e,t=this.$refs.picker;"days"===this.config.calendar.format&&this.config.calendar.allow_range?t.startDate?(this.booking.checkIn=t.startDate?Voxel.helpers.dateFormatYmd(t.startDate):null,this.booking.checkOut=Voxel.helpers.dateFormatYmd(t.endDate||t.startDate),"nights"===this.config.calendar.range_mode&&this.booking.checkIn===this.booking.checkOut&&((e=new Date(t.startDate.getTime())).setDate(e.getDate()+1),this.booking.checkOut=Voxel.helpers.dateFormatYmd(e))):(this.booking.checkIn=null,this.booking.checkOut=null):(this.booking.checkIn=t.value?Voxel.helpers.dateFormatYmd(t.value):null,this.booking.timeslot=null)},onSaveCalendar(){this.saveCalendar(),this.$refs.datePicker.blur()},resetPicker(){this.$refs.picker.reset()},priceFormat(e){return Voxel.helpers.currencyFormat(e)},increment(e){"number"!=typeof e.value||e.value+1<e.min_units?e.value=e.min_units:e.value=Math.min(e.value+1,e.max_units)},decrement(e){var t;"number"!=typeof e.value?e.value=e.min_units:(t=e.value-1,!e.required&&t<e.min_units?e.value=0:e.value=Math.max(t,e.min_units))},clearCustomAddition(e){e.items.forEach(e=>e.value=0)},getSelectedItems(e){return e.items.filter(e=>!!e.value)},getSelectedItemsLabel(e){return this.getSelectedItems(e).map(e=>!e.has_quantity||e.value<=1?e.label:e.label+" x "+e.value).join(", ")},validateValueInBounds(e){"number"==typeof e.value&&(e.value>e.max_units?e.value=e.max_units:e.value<e.min_units&&(!e.required&&0===e.value||(e.value=e.min_units)))},scrollIntoView(){var e=t.closest(".elementor-element");e.getBoundingClientRect().top<0&&e.scrollIntoView()},getSessionFromURL(){if(Voxel.getSearchParam("checkout."+this.config.id))try{var{booking:e,additions:t,custom:i,fields:a}=JSON.parse(localStorage.getItem("voxel.checkout."+this.config.id));this._applySession(e,t,i,a)}catch(e){try{Voxel.cacheDB.get("voxel.checkout."+this.config.id,e=>{var{booking:e,additions:t,custom:i,fields:a}=JSON.parse(e);this._applySession(e,t,i,a)})}catch(e){}}},_applySession(t,a,s,o){try{let i=[];var e;t&&(t.checkIn&&(this.booking.checkIn=t.checkIn),t.checkOut&&(this.booking.checkOut=t.checkOut),t.timeslot)&&(e=this.timeslots.find(e=>e.from===t.timeslot.from&&e.to===t.timeslot.to))&&(this.booking.timeslot=e),a&&Object.keys(a).forEach(e=>{this.additions[e]&&(this.additions[e].value=a[e])}),s&&Object.keys(s).forEach(t=>{this.custom_additions_map[t]&&Object.keys(s[t]).forEach(e=>{this.custom_additions_map[t][e]&&(this.custom_additions_map[t][e].value=s[t][e])})}),o&&Object.values(this.config.fields).forEach(async e=>{var t;o[e.key]&&((t=this.$refs["field:"+e.key])&&"function"==typeof t.applyFromLocalStorage?i.push(t.applyFromLocalStorage(o[e.key])):e.value=o[e.key])}),localStorage.removeItem("voxel.checkout."+this.config.id),Promise.all(i).then(()=>{this.submit()})}catch(e){}},storeSessionInURL(){let t={},i={},a={},s=[];Object.values(this.additions).forEach(e=>{null!==e.value&&(t[e.key]=e.value)}),Object.values(this.custom_additions).forEach(t=>{var e=this.getSelectedItems(t);e.length&&(i[t.key]={},e.forEach(e=>i[t.key][e.id]=e.value))}),Object.values(this.config.fields).forEach(async e=>{var t=this.$refs["field:"+e.key];t&&"function"==typeof t.cacheToLocalStorage?s.push(t.cacheToLocalStorage(a)):null!==e.value&&(a[e.key]=e.value)}),Promise.all(s).then(()=>{var e={booking:this.booking,additions:t,custom:i,fields:a};Voxel.localStore("voxel.checkout."+this.config.id,JSON.stringify(e),300),Voxel.setSearchParam("checkout."+this.config.id,"1"),window.location.href=this.config.auth_url})},canSkipMain(){if("booking"===this.config.product_mode)return!1;for(var e in this.additions)return!1;for(var t in this.custom_additions)if(this.custom_additions[t].length)return!1;return!0},prepareCheckout(){Object.keys(this.config.fields).length?(this.step="checkout",setTimeout(()=>this.scrollIntoView())):this.submit()},submit(){var i,a,t,s,e;this.config.is_user_logged_in?(this.loading=!0,i=new FormData,a={},t={},s={},Object.values(this.config.fields).forEach(e=>{var t=this.$refs["field:"+e.key];t&&"function"==typeof t.onSubmit?t.onSubmit(a,i):null!==e.value&&(a[e.key]=e.value)}),Object.values(this.additions).forEach(e=>{null!==e.value&&(t[e.key]=e.value)}),Object.values(this.custom_additions).forEach(t=>{var e=this.getSelectedItems(t);e.length&&(s[t.key]={},e.forEach(e=>s[t.key][e.id]=e.value))}),i.append("fields",JSON.stringify(a)),i.append("additions",JSON.stringify(t)),i.append("booking",JSON.stringify(this.booking)),i.append("custom_additions",JSON.stringify(s)),e=jQuery.param({action:"checkout",post_id:this.$options.el.dataset.postId,field_key:this.$options.el.dataset.fieldKey}),jQuery.post({url:Voxel_Config.ajax_url+"&"+e,data:i,contentType:!1,processData:!1}).always(e=>{this.loading=!1,e.success?window.location.href=e.redirect_url:(Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error"),e.debug&&console.warn(e.debug))})):this.storeSessionInURL()},setupExternalAdditions(){let o=this.custom_additions_map;jQuery(".ts-use-addition").each((e,a)=>{try{var s=JSON.parse(atob(a.dataset.id));let i=this.custom_additions[s.type];if(s.form===this.config.id&&o[s.type]&&o[s.type][s.id]){let t=o[s.type][s.id];this.$watch(()=>t.value,()=>{t.value?a.classList.add("active"):a.classList.remove("active")}),a.onclick=e=>{e.preventDefault(),"single"===i.mode&&i.items.forEach(e=>{e.id!==t.id&&(e.value=!!e.has_quantity&&0)}),t.has_quantity?(0===t.value&&(t.value=t.min_units),this.externalItemRef=a,this.externalItem=t):t.value=!t.value}}}catch(e){}})},pickSingleItem(e,t){t.value?t.value=!!t.has_quantity&&0:(e.items.forEach(e=>e.value=!!e.has_quantity&&0),t.value=!t.has_quantity||Math.max(t.min_units,1))},pickMultipleItem(e,t){t.value?t.value=!!t.has_quantity&&0:t.value=!t.has_quantity||Math.max(t.min_units,1)},getSlotKey(e){return`${this.booking.checkIn} ${e.from}-`+e.to},getSlotLabel(e){return Voxel.helpers.timeFormat(new Date("2020-01-01 "+e.from))+" - "+Voxel.helpers.timeFormat(new Date("2020-01-01 "+e.to))}},computed:{repeatDayCount(){var e,t,i;return"booking"===this.config.product_mode&&"booking"===(e=this.config.calendar).type&&"days"===e.format&&e.allow_range?(t=this.booking.checkIn?new Date(this.booking.checkIn):null,i=this.booking.checkOut?new Date(this.booking.checkOut):null,t&&i?(t=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate()),i=Date.UTC(i.getFullYear(),i.getMonth(),i.getDate()),"nights"===e.range_mode?Math.max(1,Math.abs(Math.floor((i-t)/864e5))):Math.abs(Math.floor((i-t)/864e5))+1):0):1},checkInLabel(){return this.booking.checkIn?new Date(this.booking.checkIn+"T00:00:00").toLocaleDateString():this.l10n.check_in},checkOutLabel(){return this.booking.checkOut?new Date(this.booking.checkOut+"T00:00:00").toLocaleDateString():this.l10n.check_out},pickDateLabel(){return this.booking.checkIn?new Date(this.booking.checkIn+"T00:00:00").toLocaleDateString():this.l10n.pick_date},pricing(){let s=this.repeatDayCount;var e,t,i=this.config.base_price*s;let o=i,r=[];return Object.values(this.additions).forEach(t=>{if("numeric"===t.type){if(0<t.value){var i=t.value*t.price;let e=i;t.repeat&&(e*=s),o+=e,r.push({label:t.label+" x "+t.value,price:e,price_per_day:i,repeat:t.repeat})}}else if("checkbox"===t.type){if(t.value){i=t.price;let e=i;t.repeat&&(e*=s),o+=e,r.push({label:t.label,price:e,price_per_day:i,repeat:t.repeat})}}else if("select"===t.type&&t.value){var i=t.choices[t.value],a=i.price;let e=a;t.repeat&&(e*=s),o+=e,r.push({label:t.label+": "+i.label,price:e,price_per_day:a,repeat:t.repeat})}}),Object.values(this.custom_additions).forEach(e=>{this.getSelectedItems(e).forEach(e=>{var t=e.price,i=e.has_quantity?e.value:1;let a=i*t;e.repeat&&(a*=s),o+=a,r.push({label:1<i?e.label+" x "+i:e.label,price:a,price_per_day:t,repeat:e.repeat})})}),"fixed_amount"===this.config.platform_fee.type?(t=Math.abs(this.config.platform_fee.amount),this.config.currency.is_zero_decimal||(t/=100)):(e=Math.abs(this.config.platform_fee.amount)/100,t=Math.round(Math.abs(o)*e)),{base_price:i,additions:r,platform_fee:t,total:o}},timeslots(){var t,e=this.booking.checkIn?new Date(this.booking.checkIn):null;return!!e&&(t=this.weekday_indexes_reverted[e.getUTCDay()],!!(e=this.config.calendar.timeslots.find(e=>e.days.includes(t))))&&e.slots}}})})(e)).component("form-popup",Voxel.components.popup),t.component("form-group",Voxel.components.formGroup),t.component("date-picker",i),t.component("date-range-picker",a),t.component("field-text",{template:"#product-form-text-field",props:{field:Object}}),t.component("field-number",{template:"#product-form-number-field",props:{field:Object}}),t.component("field-phone",{template:"#product-form-phone-field",props:{field:Object}}),t.component("field-url",{template:"#product-form-url-field",props:{field:Object}}),t.component("field-email",{template:"#product-form-email-field",props:{field:Object}}),t.component("field-textarea",{template:"#product-form-textarea-field",props:{field:Object}}),t.component("field-switcher",{template:"#product-form-switcher-field",props:{field:Object},data(){return{switcherId:"_switch-"+this.field.key}}}),o.template="#product-form-file-field",t.component("media-popup",s),t.component("field-file",o),t.mount(e))})},window.render_product_form(),jQuery(document).on("voxel:markup-update",window.render_product_form)});
