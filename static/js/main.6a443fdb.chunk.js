(this["webpackJsonpoucc-react"]=this["webpackJsonpoucc-react"]||[]).push([[0],{101:function(e,t,n){e.exports=n(264)},106:function(e,t,n){},108:function(e,t,n){},253:function(e,t){},262:function(e,t,n){var a={"./calendar.module.css":263,"./header.module.css":31,"./page.module.css":30};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id=262},263:function(e,t,n){e.exports={key:"calendar_key__10QPp",status:"calendar_status__328_7",event:"calendar_event__Fpsnm",eventHeader:"calendar_eventHeader__1LM4e",eventName:"calendar_eventName__11Rtc",eventTitle:"calendar_eventTitle__253CO",noEvent:"calendar_noEvent__21QAe",table:"calendar_table__1STq8",firstColumn:"calendar_firstColumn__2TydK",cell:"calendar_cell__b_gO3",today:"calendar_today__36RHA"}},264:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(95),i=(n(106),n(9)),o=n(1),c=n.n(o),l=n(10),u=n(2),h=n(3),d=n(5),p=n(4),m=n(6),f=(n(108),n(21)),v=n(17),b=n(96),g=n(19),y=n(7),E=n.n(y);E.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var k=n(31),w=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e)))._nav=void 0,n.navLeft=void 0,n.navRight=void 0,n.navToggle=n.navToggle.bind(Object(g.a)(n)),n.navEnter=n.navEnter.bind(Object(g.a)(n)),n.navLeave=n.navLeave.bind(Object(g.a)(n)),n.resizeNavs=n.resizeNavs.bind(Object(g.a)(n)),n.state={subnav:"",navigation:{},navLeft:0,navRight:0},n.navLeft=r.a.createRef(),n.navRight=r.a.createRef(),n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"navToggle",value:function(e){this.state.subnav===e?this.navLeave():this.navEnter(e)}},{key:"navEnter",value:function(e){this.setState({subnav:e})}},{key:"navLeave",value:function(){this.setState({subnav:""})}},{key:"getNavigationData",value:function(){return E()({url:"navigation.json",params:{sessionID:this.props.sessionID}}).then((function(e){return e.data})).catch(console.error)}},{key:"renderNav",value:function(e){var t=this;this._nav||(this._nav={});var n="left"===e?this.state.navLeft:this.state.navRight,a=r.a.createElement("div",{className:k.nav+" "+k[e],ref:"left"===e?this.navLeft:this.navRight,style:n?{width:n}:{}},Object.entries(this.state.navigation).map((function(n,a){var s=Object(i.a)(n,2),o=s[0],c=Object(b.a)(s[1]),l=c[0],u=c[1],h=c.slice(2);return l!==e?null:r.a.createElement("div",{key:[u,a].join("."),className:k.listing,onClick:function(){return t.navToggle(o)},onMouseEnter:function(){return t.navEnter(o)},onMouseLeave:function(){return t.navLeave()}},r.a.createElement("div",{className:k.dropParent},r.a.createElement(v.b,{key:o,to:"/"+o},u)),h.length&&t.state.subnav===o?r.a.createElement("div",{className:k.dropDown},r.a.createElement("ul",{className:k.subnav},h.map((function(e){var t=Object(i.a)(e,2),n=t[0],a=t[1];return r.a.createElement("li",{key:n.slice(1),className:window.location.pathname.includes(n.slice(1))?k.selected:""},r.a.createElement(v.b,{to:n},a))})))):null)})));return Object.keys(this.state.navigation).length?this._nav[e]=a:a}},{key:"resizeNavs",value:function(){}},{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.addEventListener("resize",this.resizeNavs),e.t0=this,e.next=4,this.getNavigationData();case 4:e.t1=e.sent,e.t2={navigation:e.t1},e.t0.setState.call(e.t0,e.t2),this.resizeNavs();case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeNavs)}},{key:"render",value:function(){return r.a.createElement("div",{className:k.bannerContainer},r.a.createElement("div",{className:k.banner},this.renderNav("left"),r.a.createElement(v.b,{className:k.oucc_logo,to:"/",style:{backgroundImage:"url(".concat("/oucc-frontend","/images/oucclogo.jpg"),overflowY:"visible"}}),this.renderNav("right")))}}]),t}(r.a.Component),O={space:/\s+/g,letters:/\w+/g,image:/<img\s+.*?src=["'](.*).*?">/,date:/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}_/,href:/^(https?:)?\/\//},j=n(31),_=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={navigation:{},feedPosition:0,_width:0},n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"getNewsFeed",value:function(e){var n=this,a=this.state._width,s=window.innerWidth;return this.props.articles.map((function(o,c){var l=e?Object.entries(n.refs).filter((function(e){return Object(i.a)(e,1)[0].startsWith("feed")})).map((function(e){var t=Object(i.a)(e,2);t[0];return t[1].offsetLeft-n.state._width})):[],u=e?(e+l[c]-s)%a+s-l[c]:0;if("string"!==typeof o)return null;if(!o||"function"!==typeof o.split)return console.error("Bad Markdown document:\n",o),null;for(var h=o.split("\n").shift().trim();h.startsWith("#");)h=h.slice(1);var d=h.match(O.letters).join("-").toLowerCase();return r.a.createElement("div",{key:d+".container",style:e?{transform:"translate3d(".concat(u,"px, 0, 0)")}:{}},r.a.createElement("a",{href:t.setSection(window.location,d),ref:"feed"+c,key:d},h)," \u2022 ")}))}},{key:"componentDidUpdate",value:function(){this.state._width||this.refs.dummy&&this.refs.dummy.scrollWidth&&this.setState({_width:this.refs.dummy.scrollWidth})}},{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:setInterval((function(){var e=t.state.feedPosition;t.setState({feedPosition:e+.5})}),1e3/60);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:j.newsFeed},r.a.createElement("div",{className:j.intro},"Latest News:"),r.a.createElement("div",null),r.a.createElement("div",{className:j.runner},r.a.createElement("div",{ref:"runner"},this.getNewsFeed(-this.state.feedPosition)),r.a.createElement("div",{ref:"dummy",style:{visibility:"hidden"}},this.getNewsFeed())))}}],[{key:"setSection",value:function(e,t){return"/oucc-frontend/curr_news#"+t}}]),t}(r.a.Component),D=n(31),N=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:D.header},r.a.createElement(w,{sessionID:this.props.sessionID}),r.a.createElement(_,{articles:this.props.articles}))}}]),t}(r.a.Component),x=n(37),S=n.n(x),C=n(20),I=n(38),L=n.n(I),R=n(39),T=n.n(R),U=n(29),P=n.n(U),M=n(99),H=n.n(M);function F(e){if("string"!==typeof e)throw new TypeError;return e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase()}var W=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={table:null,date:null},n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.props.src){e.next=2;break}return e.abrupt("return");case 2:return e.abrupt("return",Promise.all([t.getData("data/"+this.props.src,this.props.sessionID).then((function(e){n.props.src.endsWith(".csv")&&(e=H.a.parse(e,{header:!0,dynamicTyping:!0,skipEmptyLines:"greedy"}).data.map((function(e){for(var t=0,n=Object.keys(e);t<n.length;t++){var a=n[t];a||delete e[a]}return e})));return e})).then((function(e){return t.generateTablefromJSON(e)})).then((function(e){n.setState({table:e})})).catch(console.error),t.getDate("data/"+this.props.src).then((function(e){return e[0]?new Date(e.shift().commit.committer.date):new Date})).then((function(e){n.setState({date:e})})).catch(console.error)]));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{textAlign:"right"}},this.state.date?"Last updated: "+this.state.date.toString().slice(0,24):""),this.state.table)}}],[{key:"getData",value:function(e,t){return E()({baseURL:"https://oxfordunichess.github.io/oucc-backend/",url:e,params:{sessionID:t}}).then((function(e){return e.data})).catch((function(e){return console.error(e),[null]}))}},{key:"generateTablefromJSON",value:function(){var e=Object(l.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object.keys(t[0]),e.abrupt("return",r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,n.map((function(e,t){return r.a.createElement("th",{key:[e,t].join("."),scope:"column"},F(e))})))),r.a.createElement("tbody",null,t.map((function(e){var t=Object.values(e)[0]?Object.values(e)[0].toString().toLowerCase().replace(/\s+/g,"-"):null;return r.a.createElement("tr",{key:t,id:t},n.map((function(t,n){return r.a.createElement("td",{key:[t,n].join(".")},t in e?e[t]:null)})))})))));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getDate",value:function(e){return E()({baseURL:"https://api.github.com/repos/oxfordunichess/oucc-backend/",url:"commits",params:{path:e,page:1,per_page:1}}).then((function(e){return e.data})).catch((function(e){return console.error(e),[null]}))}}]),t}(r.a.Component),A=n(40),z=n(100),B=n.n(z),Y={space:/\s+/g,facebook:/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:events\/)?(?:[0-9]*\/)/},J=function(){function e(t,n,a,r){var s=r.locationReplacers,i=r.mapsLink;Object(u.a)(this,e),this.link=void 0,this.title=void 0,this.status=void 0,this.start=void 0,this.created=void 0,this.end=void 0,this.calendarName=void 0,this.color=void 0,this.rawLocation=void 0,this.locationReplacers=void 0,this.rawDescription=void 0,this.map=void 0,this._location=void 0,this._facebookEvent=void 0,this._description=void 0,this.created=new Date(t.created),this.link=t.htmlLink,this.title=t.summary,this.status=t.status,this.start=new Date(t.start.dateTime),this.end=new Date(t.end.dateTime),this.calendarName=n,this.color=a,this.rawLocation=t.location||"",this.locationReplacers=s,this.rawDescription=B.a.decode(t.description||""),this.map=i?i+this.rawLocation.replace(Y.space,"+"):""}return Object(h.a)(e,[{key:"location",get:function(){if(this._location)return this._location;var e,t=this.rawLocation.split(",").shift();return e=this.locationReplacers[t]?this.locationReplacers[t]:t,this._location=e}},{key:"facebookEvent",get:function(){if(this._facebookEvent)return this._facebookEvent;var e="";return Y.facebook.test(this.rawDescription)&&(e=this.rawDescription.match(Y.facebook)[0]),this._facebookEvent=e}},{key:"description",get:function(){if(this._description)return this._description;for(var e=this.rawDescription,t=e.indexOf("<a");-1!==t;){var n=e.indexOf("/a>")+3;t=(e=e.slice(0,t)+e.slice(n)).indexOf("<a")}return e=e.replace(this.facebookEvent,"").trim(),this._description=e}}]),e}(),K=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={calendarIDs:{},today:t.getEventDate(Date.now()),start:new Date(n.props.settings.start||"6 October 2019"),finish:new Date(n.props.settings.finish||"8 December 2019"),weeks:8,events:{},colours:{},colourStatuses:{},locationReplacers:{},mapsLink:"",days:[],mounted:!1},n.updateColourStatuses=n.updateColourStatuses.bind(Object(g.a)(n)),n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"interpretProps",value:function(e){return{calendarIDs:e.settings.calendarIDs,today:t.getEventDate(Date.now()),start:new Date(e.settings.start||"6 October 2019"),finish:new Date(e.settings.finish||"8 December 2019"),weeks:e.settings.weeks||8,events:{},colours:{},colourStatuses:{},locationReplacers:e.settings.locationReplacers,mapsLink:e.settings.mapsLink,days:e.settings.days}}},{key:"componentDidUpdate",value:function(){var e=this,n=Object.assign({},this.state.calendarIDs||{}),a={};if(Object.keys(this.props.settings.calendarIDs).length){Object.keys(n).length!==Object.keys(this.props.settings.calendarIDs).length&&(a=this.interpretProps(this.props),this.setState(a));for(var r={},s=0,o=Object.entries(this.props.settings.calendarIDs);s<o.length;s++){var c=o[s],l=Object(i.a)(c,2),u=l[0],h=l[1];n[u]||(r[u]=h)}Object.keys(r).length&&this.renderEvents(r,a).then((function(){var n=Date.now();a.start.getTime()<n&&a.finish.getTime()>n&&(window.location=t.setSection(window.location,e.state.today))})).catch(console.error)}}},{key:"renderFrame",value:function(){for(var e=this,n=[],a=0;a<this.state.weeks+1;a++){var s=new Date(this.state.start);s.setDate(s.getDate()+7*a),n.push(s)}return r.a.createElement("table",{className:this.props.styles.table},r.a.createElement("thead",null,r.a.createElement("tr",null,[this.props.settings.title].concat(Object(A.a)(this.props.settings.days)).map((function(t,n){return r.a.createElement("th",{scope:"column",key:[t,n].join("."),className:n?"":e.props.styles.firstColumn},t)})))),r.a.createElement("tbody",null,n.map((function(n,a){for(var s=[],i=function(a){var i=new Date(new Date(n).setDate(n.getDate()+a)),o=t.getEventDate(i),c=!1;e.state.today===o&&(c=!0);var l=r.a.createElement("td",{id:o.toString(),key:o.toString(),className:c?e.props.styles.today:e.props.styles.cell},r.a.createElement("div",null,e.state.events[o]&&!Object.values(e.state.events[o]).every((function(t){return!e.state.colourStatuses[t.color]}))?e.state.events[o].sort((function(e,t){return e.start.getHours()!==t.start.getHours()?e.start.getHours()-t.start.getHours():e.start.getMinutes()-t.start.getMinutes()})).map((function(n,a){return r.a.createElement("div",{className:e.props.styles.event,key:[o,a].join("."),style:e.state.colourStatuses[n.color]?{}:{display:"none"}},r.a.createElement("div",{className:e.props.styles.eventHeader},r.a.createElement("h4",{className:e.props.styles.eventName},r.a.createElement("span",{className:e.props.styles.status,style:{color:n.color}},"\u2b24"),r.a.createElement("span",{className:"toolTip"}),n.facebookEvent?r.a.createElement("a",{className:e.props.styles.eventTitle,href:n.facebookEvent},n.title):n.title)),r.a.createElement("div",null,r.a.createElement("h5",null,t.getDisplayTime(n.start)," ",n.map?r.a.createElement("a",{href:n.map,rel:"noopener noreferrer",target:"_blank"},n.location):n.location,"\n",n.description||null)))})):r.a.createElement("div",{className:e.props.styles.dateNumber},i.getDate())));s.push(l)},o=0;o<7;o++)i(o);return r.a.createElement("tr",{key:"week."+a},r.a.createElement("th",{scope:"row",className:e.props.styles.firstColumn},"Week "+a+"\n"+n.toDateString().slice(4,10)),s)}))))}},{key:"renderEvents",value:function(e,n){var a=this,r={};return Promise.all(Object.keys(e).map((function(s){return E()({baseURL:"https://clients6.google.com/calendar/v3/calendars/",url:s+"/events",params:{calendarId:s,singleEvents:!0,timeZone:"Europe/London",maxAttendees:1,maxResults:250,sanitizeHtml:!0,timeMin:new Date(n.start).toISOString(),timeMax:new Date(n.finish).toISOString(),key:"AIzaSyDahTZUtTKORUdsOY3H7BEeOXbwye0nBHI"}}).then((function(e){return e.data})).then((function(e){return[e.summary,e.items]})).then((function(t){var a=Object(i.a)(t,2),o=a[0],c=a[1].map((function(t){var a=e[s];return r[a]||(r[a]=o),new J(t,o,a,n)}));return[r,c]})).then((function(e){var a=Object(i.a)(e,2),r=a[0],s=a[1],o=n.events;return s.forEach((function(e){var n=t.getEventDate(e.start);o[n]||(o[n]=[]),o[n].push(e)})),[r,o]})).then((function(e){var t=Object(i.a)(e,2),n=t[0],r=t[1],s=Object.keys(n).reduce((function(e,t){return e[t]=!0,e}),{});a.setState({colours:n,colourStatuses:s,events:r})})).catch(console.error)})))}},{key:"updateColourStatuses",value:function(e){var t=Object.assign({},this.state.colourStatuses);t[e]=!t[e],this.setState({colourStatuses:t})}},{key:"renderKey",value:function(){var e=this,t=Object.entries(this.state.colours).sort((function(e,t){return e[1]<t[1]?-1:e[1]>t[1]?1:0}));return r.a.createElement("div",{className:this.props.styles.key},t.map((function(t,n){var a=Object(i.a)(t,2),s=a[0],o=a[1];return r.a.createElement("div",{className:e.props.styles.key,key:["keyElement",n].join(".")},r.a.createElement("span",{className:e.props.styles.status,onClick:function(){return e.updateColourStatuses(s)},style:{color:s}},e.state.colourStatuses[s]?"\u2b24":"\u2b58"),r.a.createElement("h4",null,"\u200b "+o))})))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderKey(),this.renderFrame())}}],[{key:"setSection",value:function(e,t){return e.href.slice(0,-e.hash.length)+"#"+t.toString()}},{key:"getEventDate",value:function(e){var t=new Date(e);return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.valueOf()/1e3}},{key:"isDateEqual",value:function(e,t){return e.getFullYear()===t.getFullYear()&&(e.getMonth()!==t.getMonth()&&e.getDate()!==t.getDate())}},{key:"getDisplayTime",value:function(e){return e.getHours()+":"+"0".repeat(2-e.getMinutes().toString().length)+e.getMinutes()}}]),t}(r.a.Component),q=function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,s=new Array(r),i=0;i<r;i++)s[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={styles:function(){try{return n(262)("./"+a.props.styles)}catch(e){return{}}}(),settings:{calendarIDs:{},mapsLink:"",locationReplacers:{},start:a.props.start,finish:a.props.finish,weeks:parseInt(a.props.weeks),title:a.props.title,days:[]}},a}return Object(m.a)(t,e),Object(h.a)(t,[{key:"getSettings",value:function(e){return e?E()({baseURL:"https://oxfordunichess.github.io/oucc-backend/",url:e,params:{sessionID:this.props.sessionID}}).then((function(e){return e.data})).catch(console.error):Promise.reject()}},{key:"componentDidMount",value:function(){var e=this;this.getSettings(this.props.settings).then((function(t){return e.setState({settings:Object.assign(e.state.settings,t)})})).catch((function(){}))}},{key:"render",value:function(){return r.a.createElement(K,{settings:this.state.settings,styles:this.state.styles})}}]),t}(r.a.Component);function Z(e){return O.href.test(e.href)?r.a.createElement("a",{href:e.href},e.children):r.a.createElement(v.b,{to:e.href},e.children)}E.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var Q=new P.a.ProcessNodeDefinitions(r.a),V=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={page:""},E.a.defaults.params={sessionID:n.props.sessionID},n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.constructor.getPage(this.props.page);case 2:t=e.sent,this.setState({page:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{id:"page"},r.a.createElement("div",{id:"main"},this.state.page?r.a.createElement(S.a,{source:this.state.page.trim(),escapeHtml:!1,astPlugins:[this.parseHtml],renderers:{link:Z},transformImageUri:function(e){return(e.startsWith(".")||e.startsWith("/"))&&(e=L.a.resolve("https://oxfordunichess.github.io/oucc-backend/data/",e)),e}}):null)))}},{key:"parseHtml",get:function(){var e=this;return T()({isValidNode:function(e){return"script"!==e.type},processingInstructions:[{shouldProcessNode:function(e){return"data-table"===e.name},processNode:function(e,t){return r.a.createElement(W,e.attribs)}},{shouldProcessNode:function(e){return"calendar"===e.name},processNode:function(t,n){return r.a.createElement(q,Object.assign({},t.attribs,{sessionID:e.props.sessionID}))}},{shouldProcessNode:function(){return!0},processNode:Q.processDefaultNode}]})}}],[{key:"getPage",value:function(){var e=Object(l.a)(c.a.mark((function e(){var t,n,a,r,s=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:"main",n=s.length>1?s[1]:void 0,e.prev=2,a="pages/".concat(t+".md"),e.next=6,E()({url:a,params:{sessionID:n}});case 6:return r=e.sent,e.abrupt("return",r.data);case 10:return e.prev=10,e.t0=e.catch(2),console.error(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}()}]),t}(r.a.Component),G=n(30),X=n.n(G),$=new P.a.ProcessNodeDefinitions(r.a),ee=T()({isValidNode:function(e){return"script"!==e.type},processingInstructions:[{shouldProcessNode:function(e){return"data-table"===e.name},processNode:function(e,t){return r.a.createElement(W,e.attribs)}},{shouldProcessNode:function(e){return"calendar"===e.name},processNode:function(e,t){return r.a.createElement(q,e.attribs)}},{shouldProcessNode:function(){return!0},processNode:$.processDefaultNode}]}),te=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={mounted:!1},n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidUpdate",value:function(){this.state.mounted||this.props.articles.length&&window.location.hash&&(window.location=window.location.toString().slice(0),this.setState({mounted:!0}))}},{key:"render",value:function(){var e=new Map,n=this.props.articles.map((function(n){if("string"!==typeof n)return null;if(!n)return console.error("Bad Markdown document:\n"+n),null;for(var a=n.split("\n"),s=a.shift().trim();s.startsWith("#");)s=s.slice(1);var i=(s=s.trim()).match(O.letters).join("-").toLowerCase(),o=["## [".concat(s,"](").concat(t.setSection(window.location,i),")")].concat(Object(A.a)(a)).join("\n");return e.set(i,{title:s+" | OUCC",image:(o.match(O.image)||[])[1],description:a.find((function(e){return e.trim()&&!e.trim().startsWith("#")}))}),r.a.createElement("div",{id:i,key:i,className:X.a.article},r.a.createElement(S.a,{source:o,escapeHtml:!1,astPlugins:[ee],renderers:{link:Z},transformImageUri:function(e){return(e.startsWith(".")||e.startsWith("/"))&&(e=L.a.resolve("https://oxfordunichess.github.io/oucc-backend/data/",e)),e}}),r.a.createElement("hr",null))})),a={};return window.location.hash&&e.get(window.location.hash.slice(1))&&(a=e.get(window.location.hash.slice(1))),r.a.createElement(r.a.Fragment,null,r.a.createElement(C.Helmet,{defaultTitle:this.props.title?this.props.title+" | OUCC":"OUCC"},r.a.createElement("title",null,a.title),r.a.createElement("meta",{property:"og:type",content:"article"}),a.description?r.a.createElement("meta",{name:"description",content:a.description}):null,a.image?r.a.createElement("meta",{property:"og:image",content:a.image}):null),r.a.createElement("div",{className:X.a.page},r.a.createElement("div",{className:X.a.main},n)))}}],[{key:"setSection",value:function(e,t){return e.href.slice(0,-e.hash.length)+"#"+t}}]),t}(r.a.Component),ne=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{id:"page"},r.a.createElement("div",{id:"main"},r.a.createElement("h1",null,"Contact Us"),r.a.createElement("br",null),"If you have any questions or wish to contact the club then please complete the form below and we will get back to you as soon as possible.",r.a.createElement("form",{id:"contact_form",method:"POST",action:"http://users.ox.ac.uk/cgi-bin/safeperl/chess/mailme.pl"},r.a.createElement("table",{id:"contact_table"},r.a.createElement("tbody",null,Object.entries({name:"Name",email:"Email",subject:"Subject"}).map((function(e,t){var n=Object(i.a)(e,2),a=n[0],s=n[1];return r.a.createElement("tr",{key:["contact",t].join(".")},r.a.createElement("th",null,s+":"),r.a.createElement("td",null,r.a.createElement("input",{type:"text",name:a,size:55})))})),r.a.createElement("tr",null,r.a.createElement("th",null,"Your Message:"),r.a.createElement("td",null,r.a.createElement("textarea",{name:"message",rows:6}))))),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",name:"submit",value:"Send"}),r.a.createElement("input",{type:"reset",value:"Clear Form"})))))}}]),t}(r.a.Component),ae=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.Helmet,null,r.a.createElement("title",null,this.props.title?this.props.title+" | OUCC":"OUCC")),r.a.createElement("div",{id:"main"},r.a.createElement("h1",null,"404: Not found"),r.a.createElement("h3",null,r.a.createElement(v.b,{to:"/"},"Return to home"))))}}]),t}(r.a.Component);E.a.defaults.baseURL="https://oxfordunichess.github.io/oucc-backend/";var re=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={index:{},articles:[],sessionID:Math.random().toString(16).slice(2)},E.a.defaults.params={},E.a.defaults.params.sessionID=n.state.sessionID,n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark((function e(){var n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([t.getIndex(this.state.sessionID).then((function(e){return n.setState({index:e})})),t.fetchArticles(this.state.sessionID).then((function(e){return n.setState({articles:e})}))]));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=Object.entries(this.state.index).map((function(t){var n=Object(i.a)(t,2),a=n[0],s=n[1];return a.startsWith("_")||"object"!==typeof s?null:r.a.createElement(f.b,{exact:!0,path:"/"+a,key:a+"_route",render:function(t){return s.open&&window.open(s.open),s.redirect?r.a.createElement(f.a,{to:s.redirect}):r.a.createElement(V,Object.assign({},t,{page:a,title:s.title,parent:s.parent,sessionID:e.state.sessionID}))}})}));return r.a.createElement(v.a,{basename:"/oucc-frontend"},r.a.createElement(f.b,{render:function(n){var a=n.location;return r.a.createElement(r.a.Fragment,null,r.a.createElement(N,{articles:e.state.articles,sessionID:e.state.sessionID}),r.a.createElement(f.d,{location:a},t,r.a.createElement(f.b,{exact:!0,path:"/",render:function(){return r.a.createElement(V,{page:"main",sessionID:e.state.sessionID})}}),r.a.createElement(f.b,{exact:!0,path:"/curr_news",render:function(){return r.a.createElement(te,{title:"Current News",articles:e.state.articles,sessionID:e.state.sessionID})}}),r.a.createElement(f.b,{exact:!0,path:"/contact",render:function(){return r.a.createElement(ne,{title:"Contact",sessionID:e.state.sessionID})}}),r.a.createElement(f.b,{path:"*",component:ae,status:404})))}}))}}],[{key:"getArticle",value:function(){var e=Object(l.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E()({baseURL:"https://oxfordunichess.github.io/oucc-backend/news/",url:t,params:{sessionID:n},method:"GET",maxRedirects:5}).then((function(e){return e.data})).catch((function(e){return e&&console.error(e),""}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getArticleList",value:function(){var e=Object(l.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E()({baseURL:"https://api.github.com/repos/oxfordunichess/oucc-backend/",url:"contents/news/",params:{sessionID:t},method:"get",maxRedirects:5}).then((function(e){return e.data})).catch((function(e){return console.error(e),[]}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getIndex",value:function(e){return E()({url:"index.json",params:{sessionID:e}}).then((function(e){return e.data})).catch((function(e){return console.error(e),{}}))}},{key:"fetchArticles",value:function(){var e=Object(l.a)(c.a.mark((function e(n){var a,r,s,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getArticleList(n).catch((function(e){return console.error(e),[]}));case 2:return a=e.sent,r=(a||[]).map((function(e){return e.name})),s=r.filter((function(e){return e.endsWith(".md")&&O.date.test(e)})),i=s.sort((function(e,t){var n=new Date(e.split("_")[0]),a=new Date(t.split("_")[0]);return n.getTime()!==n.getTime()?1:a.getTime()!==a.getTime()?-1:a.getTime()-n.getTime()})),o=new Array(i.length),i.forEach((function(e,a){return o[a]=t.getArticle(e,n).catch(console.error)})),e.next=10,Promise.all(o);case 10:return e.abrupt("return",e.sent);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(s.render)(r.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},30:function(e,t,n){e.exports={main:"page_main__jGfys",page:"page_page__g1c2x"}},31:function(e,t,n){e.exports={header:"header_header__2JDtH",bannerContainer:"header_bannerContainer__zubWY",banner:"header_banner__2Li7q",nav:"header_nav__5Zo-d",listing:"header_listing__198P8",left:"header_left__2fvQE",right:"header_right__3CMex",dropDown:"header_dropDown__12A2o",oucc_logo:"header_oucc_logo__ntMUg",dropParent:"header_dropParent__28y82",subnav:"header_subnav__1RCVf",selected:"header_selected__2OTKR",newsFeed:"header_newsFeed__35rvd",intro:"header_intro__1vMZ4",runner:"header_runner__2doT9"}}},[[101,1,2]]]);
//# sourceMappingURL=main.6a443fdb.chunk.js.map