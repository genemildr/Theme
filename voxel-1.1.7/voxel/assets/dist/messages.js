!function(e){"function"==typeof define&&define.amd?define("messages",e):e()}(function(){"use strict";var t={template:"#create-post-media-popup",props:{multiple:{type:Boolean,default:!0},ignore:{type:Array,default:[]},customTarget:[Object,String],saveLabel:String},emits:["save","blur","open"],data(){return{files:[],selected:{},active:!1,loading:!0,has_more:!1,firstLoad:!0,search:{term:"",offset:0,loading:!1,loading_more:!1,has_more:!1,list:null}}},methods:{getStyle(e){return e.type.startsWith("image/")?`background-image: url('${e.preview}');`:""},selectFile(e){this.selected[e.id]?delete this.selected[e.id]:(this.multiple||(this.selected={}),this.selected[e.id]=e)},loadMedia(){jQuery.get(Voxel_Config.ajax_url+"&action=list_media",{offset:this.files.length}).always(e=>{this.loading=!1,e.success?(this.files.push(...e.data),this.has_more=e.has_more):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})},loadMore(){this.loading=!0,this.loadMedia()},openLibrary(){this.$emit("open"),this.firstLoad&&this.loadMedia(),this.firstLoad=!1,this.active=!this.active},isImage(e){return e.type.startsWith("image/")},save(){this.active=!1,this.$emit("save",this.selected),this.selected={}},clear(){this.selected={}},clientSearchFiles(){let s=this.search.term.trim().toLowerCase(),t=[],i=!1;this.files.forEach(e=>{i||-1!==e.name.toLowerCase().indexOf(s)&&(t.push(e),i=10<=t.length)}),this.search.list=t,this.search.loading=!1,this.search.has_more=!1,this.search.loading_more=!1},serverSearchFiles:Voxel.helpers.debounce((s,t=!1)=>{jQuery.get(Voxel_Config.ajax_url+"&action=list_media",{offset:t?s.search.list.length:0,search:s.search.term.trim()}).always(e=>{s.search.loading=!1,s.search.loading_more=!1,e.success?(t?s.search.list.push(...e.data):s.search.list=e.data,s.search.has_more=e.has_more):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},watch:{"search.term"(){this.search.term.trim()&&this.files&&(this.search.loading=!0,!this.has_more||this.search.term.trim().length<=2?this.clientSearchFiles():this.serverSearchFiles(this))}}},i={template:"#create-post-file-field",props:{field:Object,mediaTarget:[Object,String],index:{type:Number,default:null},sortable:{type:Boolean,default:!0},showLibrary:{type:Boolean,default:!0},previewImages:{type:Boolean,default:!0}},data(){return{accepts:"",dragActive:!1}},created(){null===this.field.value&&(this.field.value=[]),this.accepts=Object.values(this.field.props.allowedTypes).join(", ")},mounted(){this.updatePreviews(),jQuery(this.$refs.input).on("change",e=>{for(var s=0;s<e.target.files.length;s++){var t=e.target.files[s];this.pushFile(t)}this.$refs.input.value="",this.updatePreviews(),this.$emit("files-added")}),jQuery(()=>{var e=jQuery(this.$refs.fileList);this.sortable&&(e.sortable({items:"> .ts-file",helper:"clone",appendTo:this.$el,containment:"parent",tolerance:"intersect",revert:150}),e.on("sortupdate",()=>{var t=[];e.find(".ts-file").each((e,s)=>{t.push(this.field.value[s.dataset.index])}),this.field.value=t,this.updatePreviews()})),e.find(".pick-file-input").on("click",e=>{e.preventDefault(),this.$refs.input.click()})})},unmounted(){setTimeout(()=>{Object.values(this.field.value).forEach(e=>{"new_upload"===e.source&&URL.revokeObjectURL(e.preview)})},10),this.sortable&&jQuery(this.$refs.fileList).sortable("destroy")},methods:{getStyle(e){return e.type.startsWith("image/")&&this.previewImages?`background-image: url('${e.preview}');`:""},updatePreviews(){var e=jQuery(this.$refs.fileList),i=[];this.field.value.forEach((e,s)=>{var t=e.type.startsWith("image/")&&this.previewImages,t=jQuery(`
					<div class="ts-file ${t?"ts-file-img":""}" style="${this.getStyle(e)}" data-index="${s}">
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
				`);t.find("code").text(e.name),t.find("a").on("click",e=>{e.preventDefault(),this.field.value.splice(s,1),this.updatePreviews()}),i.push(t)}),e.find(".pick-file-input").siblings().remove(),e.append(i)},pushFile(e){1===this.field.props.maxCount&&(this.field.value=[]),this.field.value.push({source:"new_upload",name:e.name,type:e.type,preview:URL.createObjectURL(e),item:e})},onDrop(e){this.dragActive=!1,e.dataTransfer.items?[...e.dataTransfer.items].forEach(e=>{"file"===e.kind&&this.pushFile(e.getAsFile())}):[...e.dataTransfer.files].forEach(e=>{this.pushFile(e)}),this.updatePreviews(),this.$emit("files-added")},onMediaPopupSave(e){1===this.field.props.maxCount&&(this.field.value=[]);var s={};this.field.value.forEach(e=>{"existing"===e.source&&(s[e.id]=!0)}),Object.values(e).forEach(e=>{s[e.id]||this.field.value.push(e)}),this.updatePreviews(),this.$emit("files-added")},onSubmit(s,t,e=null){var i;i=null!==e?`files[${this.field.id}::row-${e}][]`:`files[${this.field.id}][]`,s[this.field.key]=[],this.field.value.forEach(e=>{"new_upload"===e.source?(t.append(i,e.item),s[this.field.key].push("uploaded_file")):"existing"===e.source&&s[this.field.key].push(e.id)})},async cacheToLocalStorage(a){a[this.field.key]=[];let e=[];return this.field.value.forEach(i=>{if("existing"===i.source)a[this.field.key].push(i);else if("new_upload"===i.source){let s={source:"local_storage",name:i.item.name,type:i.item.type,lastModified:i.item.lastModified,dataUrl:null},t=new FileReader;e.push(new Promise(e=>{t.onload=()=>{s.dataUrl=t.result,a[this.field.key].push(s),e()},t.readAsDataURL(i.item)}))}}),Promise.all(e)},async applyFromLocalStorage(s){if(Array.isArray(s)&&s.length){let e=[];return s.forEach(t=>{e.push(new Promise(s=>{fetch(t.dataUrl).then(e=>e.blob()).then(e=>{this.pushFile(new File([e],t.name,{type:t.type,lastModified:new Date})),s()})}))}),Promise.all(e).then(()=>this.$root.$nextTick(this.updatePreviews())),Promise.all(e)}}}};window.render_messages=()=>{Array.from(document.querySelectorAll(".ts-inbox")).forEach(e=>{if(!e.__vue_app__){let r=JSON.parse(e.dataset.config);var s=Vue.createApp({el:e,template:e.innerHTML,mixins:[Voxel.mixins.base],data(){return{config:r,screen:"main",chats:{list:null,hasMore:!1,loading:!0,loadingMore:!1,page:1},search:{term:"",list:[],loading:!1},activeChat:null,files:{label:"Attach images",key:"files",id:"files",value:[],props:{allowedTypes:r.files.allowed_file_types,maxCount:r.files.max_count}},activePopup:null,emojis:{loading:!0,list:null,recents:[],search:{term:"",list:[]}}}},created(){null===(window.DMs=this).chats.list&&(this.chats.list=[],this.getChats(!0)),setTimeout(()=>this.loadEmojis()),r.polling.enabled&&setTimeout(()=>this.checkActivity(),r.polling.frequency)},methods:{getChats(t=!1){this.chats.loadingMore=!0,jQuery.get(Voxel_Config.ajax_url+"&action=inbox.list_chats",{pg:this.chats.page,load:t?Voxel.getSearchParam("chat"):null,_wpnonce:r.nonce}).always(e=>{var s;e.success?(this.chats.list.push(...e.list),this.chats.hasMore=e.has_more):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error"),this.chats.loading=!1,this.chats.loadingMore=!1,t&&((s=this.chats.list.find(e=>e.autoload))?this.openChat(s):e.default_chat&&this.openChat(e.default_chat))})},loadMoreChats(){this.chats.page++,this.getChats()},updateScroll(){this.$refs.body.scrollTop=this.$refs.body.scrollHeight},openChat(e){this.activeChat=e,Voxel.setSearchParam("chat",["post"===e.author.type?e.author.id:"","post"===e.target.type?"p":"u",e.target.id].join("")),null===e.messages.list?(e.messages.list=[],this.loadMessages(e,{cb:()=>{e.is_new=!1,e.seen=!0,this.$nextTick(()=>this.updateScroll())}})):(e.is_new=!1,e.seen=!0,this.$nextTick(()=>this.updateScroll())),this.$nextTick(()=>this.resizeComposer()),this.$nextTick(()=>this.$refs.composer?.focus())},closeActiveChat(){this.activeChat=null,Voxel.deleteSearchParam("chat")},loadMessages(s,t={}){s.messages.loadingMore=!0,jQuery.get(Voxel_Config.ajax_url+"&action=inbox.load_chat",{cursor:s.messages.list[s.messages.list.length-1]?.id,author_type:s.author.type,author_id:s.author.id,target_type:s.target.type,target_id:s.target.id,_wpnonce:r.nonce}).always(e=>{e.success?(s.messages.list.push(...e.list),s.messages.hasMore=e.has_more,s.messages.loading=!1,s.messages.loadingMore=!1,s.follow_status.author=e.follow_status.author,s.follow_status.target=e.follow_status.target,t.cb&&t.cb()):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})},loadMoreMessages(e){let s=this.$refs.body,t=s.scrollHeight-s.scrollTop;this.loadMessages(e,{cb:()=>this.$nextTick(()=>s.scrollTop=s.scrollHeight-t)})},sendMessage(i){let a=i.state.content.trim(),l={id:0,sent_by:"author",time:"now",seen:!1,has_content:a.length,content:"<p>"+a.replace(/(?:\r\n|\r|\n){2,}/g,"</p><p>").replace(/(?:\r\n|\r|\n)/g,"<br>")+"</p>",sending:!0,tmp:!0};var e=new FormData,s={content:a};this.$refs.files.onSubmit(s,e),e.append("fields",JSON.stringify(s)),(s.content.length||s.files.length)&&(s=jQuery.param({sender_type:i.author.type,sender_id:i.author.id,receiver_type:i.target.type,receiver_id:i.target.id,_wpnonce:r.nonce}),jQuery.post({url:Voxel_Config.ajax_url+"&action=inbox.send_message&"+s,data:e,contentType:!1,processData:!1}).always(e=>{var s,t=i.messages.list.indexOf(l);e.success?(i.messages.list[t]=e.message,this.$nextTick(()=>this.updateScroll()),i.excerpt=e.message.excerpt,i.time=e.message.chat_time,-1!==(s=this.chats.list.findIndex(e=>e.key===i.key))&&this.chats.list.splice(s,1),this.chats.list.unshift(i)):(Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error"),i.messages.list.splice(t,1),"validation"===e.error_type&&(i.state.content=a,this.$nextTick(()=>this.resizeComposer())))}),i.messages.list.unshift(l),i.state.content="",this.files.value=[],this.$nextTick(()=>{this.updateScroll(),this.resizeComposer(),this.$refs.composer?.focus(),this.$refs.files.updatePreviews()}))},resizeComposer(){this.$refs.composer&&(this.$refs.composer.style.height="5px",this.$refs.composer.style.height=this.$refs.composer.scrollHeight+"px")},enterComposer(e,s){e.shiftKey||(e.preventDefault(),this.sendMessage(s))},checkActivity(){var e;"visible"===document.visibilityState?(e=Math.round(Date.now()/1e3),jQuery.get(r.polling.url,{u:r.user.id,v:e}).always(e=>{"1"===e?this.refreshInbox():setTimeout(()=>this.checkActivity(),r.polling.frequency)})):setTimeout(()=>this.checkActivity(),r.polling.frequency)},patchChat(t,e){if(t.excerpt=e.excerpt,t.is_new=e.is_new,t.seen=e.seen,t.time=e.time,null!==e.messages.list&&null!==t.messages.list){e.messages.list.forEach(s=>{var e=t.messages.list.find(e=>e.id===s.id);e&&(e.seen=s.seen,e.is_deleted=s.is_deleted,e.is_hidden=s.is_hidden)});let s=t.messages.list[0]?.id||0;var i=e.messages.list.filter(e=>e.id>s);i.length<15?t.messages.list.unshift(...i):t.messages.list=e.messages.list,t.messages.hasMore=e.messages.hasMore,t.messages.loading=e.messages.loading,t.messages.loadingMore=e.messages.loadingMore}else null!==t.messages.list&&t.last_id===e.last_id||(t.messages.list=e.messages.list,t.messages.hasMore=e.messages.hasMore,t.messages.loading=e.messages.loading,t.messages.loadingMore=e.messages.loadingMore);t.last_id=e.last_id},refreshInbox(){jQuery.get(Voxel_Config.ajax_url+"&action=inbox.list_chats",{pg:1,load:Voxel.getSearchParam("chat"),_wpnonce:r.nonce}).always(e=>{if(e.success){let i=[],a=null;e.list.forEach(s=>{var e,t=this.chats.list.findIndex(e=>e.key===s.key);-1!==t?(e=this.chats.list[t],this.patchChat(e,s),i.push(e),this.chats.list.splice(t,1),s.autoload&&(a=e)):(i.push(s),s.autoload&&(a=s))}),this.chats.list.unshift(...i),a?this.openChat(a):e.default_chat}r.polling.enabled&&setTimeout(()=>this.checkActivity(),r.polling.frequency)})},blockChat(s){var e;confirm(Voxel_Config.l10n.confirmAction)&&(e=jQuery.param({sender_type:s.author.type,sender_id:s.author.id,receiver_type:s.target.type,receiver_id:s.target.id,unblock:-1===s.follow_status.author?"yes":null,_wpnonce:r.nonce}),s.processing=!0,this.$refs.chatActions.blur(),jQuery.post(Voxel_Config.ajax_url+"&action=inbox.block_chat&"+e).always(e=>{s.processing=null,e.success?(s.follow_status.author=e.status,this.$nextTick(()=>this.updateScroll())):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")}))},isChatBlocked(e){return-1===e.follow_status.author||-1===e.follow_status.target},clearChat(t,i=!1){var e;confirm(Voxel_Config.l10n.confirmAction)&&(e=jQuery.param({sender_type:t.author.type,sender_id:t.author.id,receiver_type:t.target.type,receiver_id:t.target.id,_wpnonce:r.nonce}),t.processing=!0,this.$refs.chatActions.blur(),jQuery.post(Voxel_Config.ajax_url+"&action=inbox.clear_conversation&"+e).always(e=>{var s;t.processing=null,e.success?(t.messages.list=[],t.messages.hasMore=!1,-1!==(s=this.chats.list.findIndex(e=>e.key===t.key))&&this.chats.list.splice(s,1),i&&this.closeActiveChat()):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")}))},showEmojis(){this.activePopup="emojiPopup"},loadEmojis(){null===this.emojis.list&&jQuery.get(r.emojis.url).always(e=>{"object"!=typeof e?this.emojis.loading=!1:(this.emojis.loading=!1,this.emojis.list=e)});var e=localStorage.getItem("voxel:recent_emojis");"string"==typeof e&&(this.emojis.recents=[...e])},insertEmoji(s){let t=this.$refs.composer,i=this.activeChat.state.content;if(t.selectionStart||"0"==t.selectionStart){let e=t.selectionStart;var a=t.selectionEnd;i=i.substring(0,e)+s+i.substring(a,t.value.length),setTimeout(()=>t.setSelectionRange(e+s.length,e+s.length))}else i+=s;this.activeChat.state.content=i;let e=[];a=localStorage.getItem("voxel:recent_emojis");(e=(e="string"==typeof a?[...a]:e).filter(e=>e!==s)).unshift(s),localStorage.setItem("voxel:recent_emojis",e.slice(0,16).join("")),this.emojis.recents=e.slice(0,16)},searchEmojis(){let s=[],t=!1;Object.values(this.emojis.list).forEach(e=>{t||e.forEach(e=>{t||-1!==e.name.toLowerCase().indexOf(this.emojis.search.term.trim().toLowerCase())&&(s.push(e.emoji),t=80<=s.length)})}),this.emojis.search.list=s},deleteMessage(s){var e;confirm(Voxel_Config.l10n.confirmAction)&&(e=jQuery.param({deleter_type:this.activeChat.author.type,deleter_id:this.activeChat.author.id,message_id:s.id,_wpnonce:r.nonce}),s.processing=!0,jQuery.post(Voxel_Config.ajax_url+"&action=inbox.delete_message&"+e).always(e=>{s.processing=null,e.success?(s.is_deleted=e.is_deleted,s.is_hidden=e.is_hidden):Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")}))},clientSearchChats(){let s=this.search.term.trim().toLowerCase(),t=[],i=!1;this.chats.list.forEach(e=>{i||-1!==e.target.name.toLowerCase().indexOf(s)&&(t.push(e),i=10<=t.length)}),this.search.list=t,this.search.loading=!1},serverSearchChats:Voxel.helpers.debounce(s=>{jQuery.get(Voxel_Config.ajax_url+"&action=inbox.search_chats",{search:s.search.term.trim(),_wpnonce:r.nonce}).always(e=>{s.search.loading=!1,e.success?s.search.list=e.list:Voxel.alert(e.message||Voxel_Config.l10n.ajaxError,"error")})})},watch:{"emojis.search.term"(){this.emojis.search.term.trim()&&this.emojis.list&&this.searchEmojis()},"search.term"(){this.search.term.trim()&&this.chats.list&&(this.search.loading=!0,!this.chats.hasMore||this.search.term.trim().length<=2?this.clientSearchChats():this.serverSearchChats(this))}}});s.component("form-popup",Voxel.components.popup),s.component("form-group",Voxel.components.formGroup),i.template="#inbox-file-field",s.component("media-popup",t),s.component("field-file",i),s.mount(e)}})},window.render_messages(),jQuery(document).on("voxel:markup-update",window.render_messages)});