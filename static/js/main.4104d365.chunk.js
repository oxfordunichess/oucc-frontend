(this["webpackJsonpoucc-react"]=this["webpackJsonpoucc-react"]||[]).push([[0],{100:function(e,t,n){e.exports=n(264)},105:function(e,t,n){},107:function(e,t,n){},215:function(e,t,n){var a={"./calendar.module.css":216,"./components.module.css":77,"./header.module.css":28,"./page.module.css":30};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id=215},216:function(e,t,n){e.exports={key:"calendar_key__10QPp",status:"calendar_status__328_7",event:"calendar_event__Fpsnm",eventHeader:"calendar_eventHeader__1LM4e",eventName:"calendar_eventName__11Rtc",eventTitle:"calendar_eventTitle__253CO",noEvent:"calendar_noEvent__21QAe",table:"calendar_table__1STq8",firstColumn:"calendar_firstColumn__2TydK",cell:"calendar_cell__b_gO3",today:"calendar_today__36RHA"}},255:function(e,t){},264:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(94),i=(n(105),n(9)),o=n.n(i),c=n(8),l=n(1),u=n(2),h=n(4),m=n(3),p=n(5),d=(n(107),n(19)),f=n(16),v=n(95),g=n(6),b=n.n(g);b.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var y=n(28),E=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s))))._nav=void 0,n.navLeft=r.a.createRef(),n.navRight=r.a.createRef(),n.state={subnav:"",navigation:{},navLeft:0,navRight:0},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"navToggle",value:function(e){this.state.subnav===e?this.navLeave():this.navEnter(e)}},{key:"navEnter",value:function(e){this.setState({subnav:e})}},{key:"navLeave",value:function(){this.setState({subnav:""})}},{key:"renderNav",value:function(e){var t=this;this._nav||(this._nav={});var n="left"===e?this.state.navLeft:this.state.navRight,a=r.a.createElement("div",{className:y.nav+" "+y[e],ref:"left"===e?this.navLeft:this.navRight,style:n?{width:n}:{}},Object.entries(this.state.navigation).map((function(n,a){var s=Object(c.a)(n,2),i=s[0],o=Object(v.a)(s[1]),l=o[0],u=o[1],h=o.slice(2);return l!==e?null:r.a.createElement("div",{key:[u,a].join("."),className:y.listing,onClick:function(){return t.navToggle(i)},onMouseEnter:function(){return t.navEnter(i)},onMouseLeave:function(){return t.navLeave()}},r.a.createElement("div",{className:y.dropParent},r.a.createElement(f.b,{key:i,to:"/"+i},u)),h.length&&t.state.subnav===i?r.a.createElement("div",{className:y.dropDown},r.a.createElement("ul",{className:y.subnav},h.map((function(e){var t=Object(c.a)(e,2),n=t[0],a=t[1];return r.a.createElement("li",{key:n.slice(1),className:window.location.pathname.includes(n.slice(1))?y.selected:""},r.a.createElement(f.b,{to:n},a))})))):null)})));return Object.keys(this.state.navigation).length?this._nav[e]=a:a}},{key:"getNavigationData",value:function(){return b()({url:"navigation.json",params:{sessionID:this.props.sessionID}}).then((function(e){return e.data})).catch(console.error)}},{key:"resizeNavs",value:function(){}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.resizeNavs),this.getNavigationData().then((function(t){e.setState({navigation:t})})),this.resizeNavs()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeNavs)}},{key:"render",value:function(){return r.a.createElement("div",{className:y.bannerContainer},r.a.createElement("div",{className:y.banner},this.renderNav("left"),r.a.createElement(f.b,{className:y.oucc_logo,to:"/",style:{backgroundImage:"url(".concat("/oucc-frontend","/images/oucclogo.jpg"),overflowY:"visible"}}),this.renderNav("right")))}}]),t}(r.a.Component),w={space:/\s+/g,letters:/\w+/g,image:/<img\s+.*?src=["'](.*).*?">/,date:/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}_/,href:/^(https?:)?\/\//},k=n(28),_=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={navigation:{},feedPosition:0,width:0},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getNewsFeed",value:function(e){var n=this,a=this.state.width,s=window.innerWidth;return this.props.articles.map((function(i,o){var l=e?Object.entries(n.refs).filter((function(e){return Object(c.a)(e,1)[0].startsWith("feed")})).map((function(e){var t=Object(c.a)(e,2);t[0];return t[1].offsetLeft-n.state.width})):[],u=e?(e+l[o]-s)%a+s-l[o]:0;if("string"!==typeof i)return null;if(!i||"function"!==typeof i.split)return console.error("Bad Markdown document:\n",i),null;for(var h=i.split("\n").shift().trim();h.startsWith("#");)h=h.slice(1);var m=h.match(w.letters).join("-").toLowerCase();return r.a.createElement("div",{key:m+".container",style:e?{transform:"translate3d(".concat(u,"px, 0, 0)")}:{}},r.a.createElement("a",{href:t.setSection(window.location,m),ref:"feed"+o,key:m},h)," \u2022 ")}))}},{key:"componentDidUpdate",value:function(){this.state.width||this.refs.dummy&&this.refs.dummy.scrollWidth&&this.setState({width:this.refs.dummy.scrollWidth})}},{key:"componentDidMount",value:function(){var e=this;return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:setInterval((function(){var t=e.state.feedPosition;e.setState({feedPosition:t+.5})}),1e3/60);case 1:case"end":return t.stop()}}))}},{key:"render",value:function(){return r.a.createElement("div",{className:k.newsFeed},r.a.createElement("div",{className:k.intro},"Latest News:"),r.a.createElement("div",null),r.a.createElement("div",{className:k.runner},r.a.createElement("div",{ref:"runner"},this.getNewsFeed(-this.state.feedPosition)),r.a.createElement("div",{ref:"dummy",style:{visibility:"hidden"}},this.getNewsFeed())))}}],[{key:"setSection",value:function(e,t){return"/oucc-frontend/curr_news#"+t}}]),t}(r.a.Component),O=n(28),j=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:O.header},r.a.createElement(E,{sessionID:this.props.sessionID}),r.a.createElement(_,{articles:this.props.articles}))}}]),t}(r.a.Component),D=n(36),N=n.n(D),x=n(18),C=n(24),I=n.n(C);function S(e){return w.href.test(e.href)?r.a.createElement("a",{href:e.href},e.children):r.a.createElement(f.b,{to:e.href},e.children)}var L=n(77),R=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:L.profile},r.a.createElement("div",{className:L.rightPane},r.a.createElement("img",{className:L.thumbnail,src:I.a.resolve("https://oxfordunichess.github.io/oucc-backend/","images/logos/"+this.props.thumbnail),alt:this.props.thumbnail})),r.a.createElement("div",{className:L.leftPane},r.a.createElement("div",null,r.a.createElement("h2",null,this.props.name)),r.a.createElement("div",null,r.a.createElement("h3",null,this.props.subtitle),r.a.createElement("h3",null,this.props.links.split("\n").map((function(e){var t=e.split(","),n=Object(c.a)(t,2),a=n[0],s=n[1];return s?r.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer"},a):a}))))),r.a.createElement("div",{className:L.centerPane},r.a.createElement("div",{className:L.text},this.props.description.replace("\\n","\n\n"))))}}]),t}(r.a.Component),T=n(98),U=n.n(T);function P(e){if("string"!==typeof e)throw new TypeError;return e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase()}var M=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={table:null,date:null},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.props.src){n.next=2;break}return n.abrupt("return");case 2:return n.abrupt("return",Promise.all([t.getData("data/"+this.props.src,this.props.sessionID).then((function(t){e.props.src.endsWith(".csv")&&(t=U.a.parse(t,{header:!0,dynamicTyping:!0,skipEmptyLines:"greedy"}).data.map((function(e){for(var t=0,n=Object.keys(e);t<n.length;t++){var a=n[t];a||delete e[a]}return e})));return t})).then((function(e){return t.generateTablefromJSON(e)})).then((function(t){e.setState({table:t})})).catch(console.error),t.getDate("data/"+this.props.src).then((function(e){return e[0]?new Date(e.shift().commit.committer.date):new Date})).then((function(t){e.setState({date:t})})).catch(console.error)]));case 3:case"end":return n.stop()}}),null,this)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{textAlign:"right"}},this.state.date?"Last updated: "+this.state.date.toString().slice(0,24):""),this.state.table)}}],[{key:"getData",value:function(e,t){return b()({baseURL:"https://oxfordunichess.github.io/oucc-backend/",url:e,params:{sessionID:t}}).then((function(e){return e.data})).catch((function(e){return console.error(e),[null]}))}},{key:"generateTablefromJSON",value:function(e){var t;return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=Object.keys(e[0]),n.abrupt("return",r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,t.map((function(e,t){return r.a.createElement("th",{key:[e,t].join("."),scope:"column"},P(e))})))),r.a.createElement("tbody",null,e.map((function(e){var n=Object.values(e)[0]?Object.values(e)[0].toString().toLowerCase().replace(/\s+/g,"-"):null;return r.a.createElement("tr",{key:n,id:n},t.map((function(t,n){return r.a.createElement("td",{key:[t,n].join(".")},t in e?e[t]:null)})))})))));case 2:case"end":return n.stop()}}))}},{key:"getDate",value:function(e){return b()({baseURL:"https://api.github.com/repos/oxfordunichess/oucc-backend/",url:"commits",params:{path:e,page:1,per_page:1}}).then((function(e){return e.data})).catch((function(e){return console.error(e),[null]}))}}]),t}(r.a.Component),H=n(37),W=n(34),A=n(99),F=n.n(A),z={space:/\s+/g,facebook:/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:events\/)?(?:[0-9]*\/)/},B=function(){function e(t,n,a,r){var s=r.locationReplacers,i=r.mapsLink;Object(l.a)(this,e),this.link=void 0,this.title=void 0,this.status=void 0,this.start=void 0,this.created=void 0,this.end=void 0,this.calendarName=void 0,this.color=void 0,this.rawLocation=void 0,this.locationReplacers=void 0,this.rawDescription=void 0,this.map=void 0,this._location=void 0,this._facebookEvent=void 0,this._description=void 0,this.created=new Date(t.created),this.link=t.htmlLink,this.title=t.summary,this.status=t.status,this.start=new Date(t.start.dateTime),this.end=new Date(t.end.dateTime),this.calendarName=n,this.color=a,this.rawLocation=t.location||"",this.locationReplacers=s,this.rawDescription=F.a.decode(t.description||""),this.map=i?i+this.rawLocation.replace(z.space,"+"):""}return Object(u.a)(e,[{key:"location",get:function(){if(this._location)return this._location;var e,t=this.rawLocation.split(",").shift();return e=this.locationReplacers[t]?this.locationReplacers[t]:t,this._location=e}},{key:"facebookEvent",get:function(){if(this._facebookEvent)return this._facebookEvent;var e="";return z.facebook.test(this.rawDescription)&&(e=this.rawDescription.match(z.facebook)[0]),this._facebookEvent=e}},{key:"description",get:function(){if(this._description)return this._description;for(var e=this.rawDescription,t=e.indexOf("<a");-1!==t;){var n=e.indexOf("/a>")+3;t=(e=e.slice(0,t)+e.slice(n)).indexOf("<a")}return e=e.replace(this.facebookEvent,"").trim(),this._description=e}}]),e}(),Y=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={calendarIDs:{},today:t.getEventDate(Date.now()),start:new Date(n.props.settings.start||"6 October 2019"),finish:new Date(n.props.settings.finish||"8 December 2019"),weeks:8,events:{},colours:{},colourStatuses:{},locationReplacers:{},mapsLink:"",days:[],mounted:!1},n.updateColourStatuses=n.updateColourStatuses.bind(Object(W.a)(n)),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"interpretProps",value:function(e){return{calendarIDs:e.settings.calendarIDs,today:t.getEventDate(Date.now()),start:new Date(e.settings.start||"6 October 2019"),finish:new Date(e.settings.finish||"8 December 2019"),weeks:e.settings.weeks||8,events:{},colours:{},colourStatuses:{},locationReplacers:e.settings.locationReplacers,mapsLink:e.settings.mapsLink,days:e.settings.days}}},{key:"componentDidUpdate",value:function(){var e=this,n=Object.assign({},this.state.calendarIDs||{}),a={};if(Object.keys(this.props.settings.calendarIDs).length){Object.keys(n).length!==Object.keys(this.props.settings.calendarIDs).length&&(a=this.interpretProps(this.props),this.setState(a));for(var r={},s=0,i=Object.entries(this.props.settings.calendarIDs);s<i.length;s++){var o=i[s],l=Object(c.a)(o,2),u=l[0],h=l[1];n[u]||(r[u]=h)}Object.keys(r).length&&this.renderEvents(r,a).then((function(){var n=Date.now();a.start.getTime()<n&&a.finish.getTime()>n&&(window.location=t.setSection(window.location,e.state.today))})).catch(console.error)}}},{key:"renderFrame",value:function(){for(var e=this,n=[],a=0;a<this.state.weeks+1;a++){var s=new Date(this.state.start);s.setDate(s.getDate()+7*a),n.push(s)}return r.a.createElement("table",{className:this.props.styles.table},r.a.createElement("thead",null,r.a.createElement("tr",null,[this.props.settings.title].concat(Object(H.a)(this.props.settings.days)).map((function(t,n){return r.a.createElement("th",{scope:"column",key:[t,n].join("."),className:n?"":e.props.styles.firstColumn},t)})))),r.a.createElement("tbody",null,n.map((function(n,a){for(var s=[],i=function(a){var i=new Date(new Date(n).setDate(n.getDate()+a)),o=t.getEventDate(i),c=!1;e.state.today===o&&(c=!0);var l=r.a.createElement("td",{id:o.toString(),key:o.toString(),className:c?e.props.styles.today:e.props.styles.cell},r.a.createElement("div",null,e.state.events[o]&&!Object.values(e.state.events[o]).every((function(t){return!e.state.colourStatuses[t.color]}))?e.state.events[o].sort((function(e,t){return e.start.getHours()!==t.start.getHours()?e.start.getHours()-t.start.getHours():e.start.getMinutes()-t.start.getMinutes()})).map((function(n,a){return r.a.createElement("div",{className:e.props.styles.event,key:[o,a].join("."),style:e.state.colourStatuses[n.color]?{}:{display:"none"}},r.a.createElement("div",{className:e.props.styles.eventHeader},r.a.createElement("h4",{className:e.props.styles.eventName},r.a.createElement("span",{className:e.props.styles.status,style:{color:n.color}},"\u2b24"),r.a.createElement("span",{className:"toolTip"}),n.facebookEvent?r.a.createElement("a",{className:e.props.styles.eventTitle,href:n.facebookEvent},n.title):n.title)),r.a.createElement("div",null,r.a.createElement("h5",null,t.getDisplayTime(n.start)," ",n.map?r.a.createElement("a",{href:n.map,rel:"noopener noreferrer",target:"_blank"},n.location):n.location,"\n",n.description||null)))})):r.a.createElement("div",{className:e.props.styles.dateNumber},i.getDate())));s.push(l)},o=0;o<7;o++)i(o);return r.a.createElement("tr",{key:"week."+a},r.a.createElement("th",{scope:"row",className:e.props.styles.firstColumn},"Week "+a+"\n"+n.toDateString().slice(4,10)),s)}))))}},{key:"renderEvents",value:function(e,n){var a=this,r={};return Promise.all(Object.keys(e).map((function(s){return b()({baseURL:"https://clients6.google.com/calendar/v3/calendars/",url:s+"/events",params:{calendarId:s,singleEvents:!0,timeZone:"Europe/London",maxAttendees:1,maxResults:250,sanitizeHtml:!0,timeMin:new Date(n.start).toISOString(),timeMax:new Date(n.finish).toISOString(),key:"AIzaSyDahTZUtTKORUdsOY3H7BEeOXbwye0nBHI"}}).then((function(e){return e.data})).then((function(e){return[e.summary,e.items]})).then((function(t){var a=Object(c.a)(t,2),i=a[0],o=a[1].map((function(t){var a=e[s];return r[a]||(r[a]=i),new B(t,i,a,n)}));return[r,o]})).then((function(e){var a=Object(c.a)(e,2),r=a[0],s=a[1],i=n.events;return s.forEach((function(e){var n=t.getEventDate(e.start);i[n]||(i[n]=[]),i[n].push(e)})),[r,i]})).then((function(e){var t=Object(c.a)(e,2),n=t[0],r=t[1],s=Object.keys(n).reduce((function(e,t){return e[t]=!0,e}),{});a.setState({colours:n,colourStatuses:s,events:r})})).catch(console.error)})))}},{key:"updateColourStatuses",value:function(e){var t=Object.assign({},this.state.colourStatuses);t[e]=!t[e],this.setState({colourStatuses:t})}},{key:"renderKey",value:function(){var e=this,t=Object.entries(this.state.colours).sort((function(e,t){return e[1]<t[1]?-1:e[1]>t[1]?1:0}));return r.a.createElement("div",{className:this.props.styles.key},t.map((function(t,n){var a=Object(c.a)(t,2),s=a[0],i=a[1];return r.a.createElement("div",{className:e.props.styles.key,key:["keyElement",n].join(".")},r.a.createElement("span",{className:e.props.styles.status,onClick:function(){return e.updateColourStatuses(s)},style:{color:s}},e.state.colourStatuses[s]?"\u2b24":"\u2b58"),r.a.createElement("h4",null,"\u200b "+i))})))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderKey(),this.renderFrame())}}],[{key:"setSection",value:function(e,t){return e.href.slice(0,-e.hash.length)+"#"+t.toString()}},{key:"getEventDate",value:function(e){var t=new Date(e);return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.valueOf()/1e3}},{key:"isDateEqual",value:function(e,t){return e.getFullYear()===t.getFullYear()&&(e.getMonth()!==t.getMonth()&&e.getDate()!==t.getDate())}},{key:"getDisplayTime",value:function(e){return e.getHours()+":"+"0".repeat(2-e.getMinutes().toString().length)+e.getMinutes()}}]),t}(r.a.Component),J=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={styles:function(){try{return n(215)("./"+a.props.styles)}catch(e){return{}}}(),settings:{calendarIDs:{},mapsLink:"",locationReplacers:{},start:a.props.start,finish:a.props.finish,weeks:parseInt(a.props.weeks),title:a.props.title,days:[]}},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getSettings",value:function(e){return e?b()({baseURL:"https://oxfordunichess.github.io/oucc-backend/",url:e,params:{sessionID:this.props.sessionID}}).then((function(e){return e.data})).catch(console.error):Promise.reject()}},{key:"componentDidMount",value:function(){var e=this;this.getSettings(this.props.settings).then((function(t){return e.setState({settings:Object.assign(e.state.settings,t)})})).catch((function(){}))}},{key:"render",value:function(){return r.a.createElement(Y,{settings:this.state.settings,styles:this.state.styles})}}]),t}(r.a.Component),K=n(217),q=new(n(78).ProcessNodeDefinitions)(r.a);function Z(e,t){return K({isValidNode:function(e){return"script"!==e.type},processingInstructions:[{shouldProcessNode:function(e){return"data-table"===e.name},processNode:function(t,n){return r.a.createElement(M,Object.assign({},t.attribs,{sessionID:e||void 0}))}},{shouldProcessNode:function(e){return"calendar"===e.name},processNode:function(n,a){return t&&t(),r.a.createElement(J,Object.assign({},n.attribs,{sessionID:e||void 0}))}},{shouldProcessNode:function(e){return"profile"===e.name},processNode:function(e,t){return r.a.createElement(R,e.attribs)}},{shouldProcessNode:function(){return!0},processNode:q.processDefaultNode}]})}b.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var G=n(30),Q=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={page:"",wide:!1},n.setWide=function(){n.state.wide||n.setState({wide:!0})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.defaults.params={sessionID:this.props.sessionID},t.getPage(this.props.page).then((function(t){e.setState({page:t})}))}},{key:"render",value:function(){var e=this,t=this.state.page.trim().split("\n---\n");return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{className:G.page},r.a.createElement("div",{className:G.main},t.map((function(t,n){return r.a.createElement("div",{key:["section",n].join("."),className:[G.section,e.state.wide?G.wide:""].join(" ")},r.a.createElement(N.a,{source:t.trim(),escapeHtml:!1,astPlugins:[Z(e.props.sessionID,e.setWide)],renderers:{link:S},transformImageUri:function(e){return(e.startsWith(".")||e.startsWith("/"))&&(e=I.a.resolve("https://oxfordunichess.github.io/oucc-backend/data/",e)),e}}))}))),";"))}}],[{key:"getPage",value:function(){var e,t,n,a,r=arguments;return o.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return e=r.length>0&&void 0!==r[0]?r[0]:"main",t=r.length>1?r[1]:void 0,s.prev=2,n="pages/".concat(e+".md"),s.next=6,o.a.awrap(b()({url:n,params:{sessionID:t}}));case 6:return a=s.sent,s.abrupt("return",a.data);case 10:return s.prev=10,s.t0=s.catch(2),console.error(s.t0),s.abrupt("return",null);case 14:case"end":return s.stop()}}),null,null,[[2,10]])}}]),t}(r.a.Component),V=n(30),X=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={mounted:!1,wide:!1},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(){this.state.mounted||this.props.articles.length&&window.location.hash&&(window.location=window.location.toString().slice(0),this.setState({mounted:!0}))}},{key:"render",value:function(){var e=this,n=new Map,a=this.props.articles.map((function(a){if("string"!==typeof a)return null;if(!a)return console.error("Bad Markdown document:\n"+a),null;for(var s=a.split("\n"),i=s.shift().trim();i.startsWith("#");)i=i.slice(1);var o=(i=i.trim()).match(w.letters).join("-").toLowerCase(),c=["## [".concat(i,"](").concat(t.setSection(window.location,o),")")].concat(Object(H.a)(s)).join("\n");return n.set(o,{title:i+" | OUCC",image:(c.match(w.image)||[])[1],description:s.find((function(e){return e.trim()&&!e.trim().startsWith("#")}))}),r.a.createElement("div",{id:o,key:o,className:[V.section,e.state.wide?V.wide:""].join(" ")},r.a.createElement(N.a,{source:c,escapeHtml:!1,astPlugins:[Z(e.props.sessionID)],renderers:{link:S},transformImageUri:function(e){return(e.startsWith(".")||e.startsWith("/"))&&(e=I.a.resolve("https://oxfordunichess.github.io/oucc-backend/data/",e)),e}}),r.a.createElement("hr",null))})),s={};return window.location.hash&&n.get(window.location.hash.slice(1))&&(s=n.get(window.location.hash.slice(1))),r.a.createElement(r.a.Fragment,null,r.a.createElement(x.Helmet,{defaultTitle:this.props.title?this.props.title+" | OUCC":"OUCC"},r.a.createElement("title",null,s.title),r.a.createElement("meta",{property:"og:type",content:"article"}),s.description?r.a.createElement("meta",{name:"description",content:s.description}):null,s.image?r.a.createElement("meta",{property:"og:image",content:s.image}):null),r.a.createElement("div",{className:V.page},r.a.createElement("div",{className:V.main,style:{width:this.state.wide?"100%":"61.8%"}},a)))}}],[{key:"setSection",value:function(e,t){return e.href.slice(0,-e.hash.length)+"#"+t}}]),t}(r.a.Component),$=n(30),ee=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{className:$.page},r.a.createElement("div",{className:$.main,style:{width:"61.8%"}},r.a.createElement("h1",null,"Contact Us"),r.a.createElement("br",null),"If you have any questions or wish to contact the club then please complete the form below and we will get back to you as soon as possible.",r.a.createElement("form",{id:"contact_form",method:"POST",action:"http://users.ox.ac.uk/cgi-bin/safeperl/chess/mailme.pl"},r.a.createElement("table",{id:"contact_table"},r.a.createElement("tbody",null,Object.entries({name:"Name",email:"Email",subject:"Subject"}).map((function(e,t){var n=Object(c.a)(e,2),a=n[0],s=n[1];return r.a.createElement("tr",{key:["contact",t].join(".")},r.a.createElement("th",null,s+":"),r.a.createElement("td",null,r.a.createElement("input",{type:"text",name:a,size:55})))})),r.a.createElement("tr",null,r.a.createElement("th",null,"Your Message:"),r.a.createElement("td",null,r.a.createElement("textarea",{name:"message",rows:6}))))),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",name:"submit",value:"Send"}),r.a.createElement("input",{type:"reset",value:"Clear Form"})))))}}]),t}(r.a.Component),te=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{id:"main"},r.a.createElement("h1",null,"404: Not found"),r.a.createElement("h3",null,r.a.createElement(f.b,{to:"/"},"Return to home"))))}}]),t}(r.a.Component);b.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var ne=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={index:{},articles:[],sessionID:Math.random().toString(16).slice(2)},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.defaults.params={},b.a.defaults.params.sessionID=this.state.sessionID,Promise.all([t.getIndex(this.state.sessionID).then((function(t){return e.setState({index:t})})),t.fetchArticles(this.state.sessionID).then((function(t){return e.setState({articles:t})}))])}},{key:"render",value:function(){var e=this,t=Object.entries(this.state.index).map((function(t){var n=Object(c.a)(t,2),a=n[0],s=n[1];return a.startsWith("_")||"object"!==typeof s?null:r.a.createElement(d.b,{exact:!0,path:"/"+a,key:a+"_route",render:function(t){return s.open&&window.open(s.open),s.redirect?r.a.createElement(d.a,{to:s.redirect}):r.a.createElement(Q,Object.assign({},t,{page:s.file||a,title:s.title,sessionID:e.state.sessionID}))}})}));return r.a.createElement(f.a,{basename:"/oucc-frontend"},r.a.createElement(d.b,{render:function(n){var a=n.location;return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,{articles:e.state.articles,sessionID:e.state.sessionID}),r.a.createElement(d.d,{location:a},t,r.a.createElement(d.b,{exact:!0,path:"/",render:function(){return r.a.createElement(Q,{page:"main",sessionID:e.state.sessionID})}}),r.a.createElement(d.b,{exact:!0,path:"/curr_news",render:function(){return r.a.createElement(X,{title:"Current News",articles:e.state.articles,sessionID:e.state.sessionID})}}),r.a.createElement(d.b,{exact:!0,path:"/contact",render:function(){return r.a.createElement(ee,{title:"Contact",sessionID:e.state.sessionID})}}),r.a.createElement(d.b,{path:"*",component:te,status:404})))}}))}}],[{key:"getArticle",value:function(e,t){return o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.awrap(b()({baseURL:"https://oxfordunichess.github.io/oucc-backend/news/",url:e,params:{sessionID:t},method:"GET",maxRedirects:5}).then((function(e){return e.data})).catch((function(e){return e&&console.error(e),""})));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}))}},{key:"getArticleList",value:function(e){return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(b()({baseURL:"https://api.github.com/repos/oxfordunichess/oucc-backend/",url:"contents/news/",params:{sessionID:e},method:"get",maxRedirects:5}).then((function(e){return e.data})).catch((function(e){return console.error(e),[]})));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}))}},{key:"getIndex",value:function(e){return b()({url:"index.json",params:{sessionID:e}}).then((function(e){return e.data})).catch((function(e){return console.error(e),{}}))}},{key:"fetchArticles",value:function(e){var n,a,r,s,i;return o.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,o.a.awrap(t.getArticleList(e).catch((function(e){return console.error(e),[]})));case 2:return n=c.sent,a=(n||[]).map((function(e){return e.name})),r=a.filter((function(e){return e.endsWith(".md")&&w.date.test(e)})),s=r.sort((function(e,t){var n=new Date(e.split("_")[0]),a=new Date(t.split("_")[0]);return n.getTime()!==n.getTime()?1:a.getTime()!==a.getTime()?-1:a.getTime()-n.getTime()})),i=new Array(s.length),s.forEach((function(n,a){return i[a]=t.getArticle(n,e).catch(console.error)})),c.next=10,o.a.awrap(Promise.all(i));case 10:return c.abrupt("return",c.sent);case 11:case"end":return c.stop()}}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(s.render)(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},28:function(e,t,n){e.exports={header:"header_header__2JDtH",bannerContainer:"header_bannerContainer__zubWY",banner:"header_banner__2Li7q",nav:"header_nav__5Zo-d",listing:"header_listing__198P8",left:"header_left__2fvQE",right:"header_right__3CMex",dropDown:"header_dropDown__12A2o",oucc_logo:"header_oucc_logo__ntMUg",dropParent:"header_dropParent__28y82",subnav:"header_subnav__1RCVf",selected:"header_selected__2OTKR",newsFeed:"header_newsFeed__35rvd",intro:"header_intro__1vMZ4",runner:"header_runner__2doT9"}},30:function(e,t,n){e.exports={page:"page_page__g1c2x",main:"page_main__jGfys",wide:"page_wide__PCvHR",section:"page_section__1fg7U"}},77:function(e,t,n){e.exports={profile:"components_profile__3x-uE",thumbnail:"components_thumbnail__2zEfG",text:"components_text__2pHeI"}}},[[100,1,2]]]);
//# sourceMappingURL=main.4104d365.chunk.js.map