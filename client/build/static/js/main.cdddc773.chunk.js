(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{31:function(e,t,n){},44:function(e,t,n){},63:function(e,t,n){},65:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var c=n(4),s=n.n(c),a=n(18),o=n.n(a),r=(n(44),n(12)),i=n(19),j=n(2),l=n(11),u=n.n(l),b=(n(30),n(9)),d=function(){return sessionStorage.getItem("token")||null},h=function(){sessionStorage.removeItem("token"),sessionStorage.removeItem("user")},O=function(e,t){sessionStorage.setItem("token",e),sessionStorage.setItem("user",JSON.stringify(t))},p=(n(63),n(31),n(0));var x=function(){return Object(p.jsx)("footer",{id:"foo",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsx)("span",{className:"footerText text-muted",children:"About HelpCenter."})})})};var m=function(e){var t=function(e){var t=Object(c.useState)(e),n=Object(r.a)(t,2),s=n[0],a=n[1];return{value:s,onChange:function(e){a(e.target.value)}}},n=Object(c.useState)(!1),s=Object(r.a)(n,2),a=s[0],o=s[1],i=t(""),j=t(""),l=Object(c.useState)(null),d=Object(r.a)(l,2),h=d[0],m=d[1];return Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{children:Object(p.jsxs)("h2",{className:"TitleHeading",children:["EVS.",Object(p.jsx)("span",{class:"colorTwo",children:"Energy"}),"|Charging Dashboard"]})}),Object(p.jsxs)("div",{className:"login-wrapper",children:[Object(p.jsx)("hr",{className:"breakline"}),Object(p.jsx)("h2",{children:" Sign in "}),Object(p.jsxs)("div",{children:["Username",Object(p.jsx)("br",{}),Object(p.jsx)("input",Object(b.a)(Object(b.a)({type:"text"},i),{},{autoComplete:"new-password"}))]}),Object(p.jsxs)("div",{style:{marginTop:10},children:["Password",Object(p.jsx)("br",{}),Object(p.jsx)("input",Object(b.a)(Object(b.a)({type:"password"},j),{},{autoComplete:"new-password"}))]}),h&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("small",{style:{color:"red"},children:h}),Object(p.jsx)("br",{})]}),Object(p.jsx)("br",{}),Object(p.jsx)("input",{type:"button",className:"button",value:a?"Loading...":"Login",onClick:function(){m(null),o(!0),u.a.post("".concat("http://localhost:5000","/users/signin"),{username:i.value,password:j.value}).then((function(t){o(!1),O(t.data.token,t.data.user),e.history.push("/dashboard")})).catch((function(e){o(!1),401===e.response.status?m(e.response.data.message):m("Something went wrong. Please try again later.")}))},disabled:a}),Object(p.jsx)("br",{}),Object(p.jsx)(x,{})]})]})},g=n(37),f=n(33),v=n(34),S=n(38),N=n(36),k=(n(65),function(e){Object(S.a)(n,e);var t=Object(N.a)(n);function n(e){var c;return Object(f.a)(this,n),(c=t.call(this,e)).handleLogout=function(){h(),c.props.history.push("/")},c.state={user:{},locations:[]},c}return Object(v.a)(n,[{key:"componentDidMount",value:function(){var e=function(){var e=sessionStorage.getItem("user");return e?JSON.parse(e):null}(),t=[];u.a.get("".concat("http://localhost:5000","/locations")).then((function(e){t=Object(g.a)(e.data)})).catch((function(e){console.log(e)})),this.setState({user:e,locations:t})}},{key:"render",value:function(){var e=this,t=this.state,n=t.user,c=t.locations;return Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{children:Object(p.jsxs)("h2",{className:"TitleHeading",children:["EVS.",Object(p.jsx)("span",{className:"colorTwo",children:"Energy"}),"|Charging Dashboard"]})}),Object(p.jsxs)("div",{className:"login-wrapper",children:[Object(p.jsx)("hr",{className:"breakline"}),Object(p.jsxs)("h2",{children:["Welcome ",n.name,"!"]}),Object(p.jsx)("div",{className:"Table",children:Object(p.jsx)("ul",{children:c.map((function(e,t){return Object(p.jsx)("li",{children:Object(p.jsx)("p",{children:e.name})},t)}))})}),Object(p.jsx)("input",{type:"button",className:"button",onClick:function(){return e.handleLogout()},value:"Logout"}),Object(p.jsx)(x,{})]})]})}}]),n}(s.a.Component)),y=n(39);var w=function(e){var t=e.component,n=Object(y.a)(e,["component"]);return Object(p.jsx)(j.b,Object(b.a)(Object(b.a)({},n),{},{render:function(e){return d()?Object(p.jsx)(t,Object(b.a)({},e)):Object(p.jsx)(j.a,{to:{pathname:"/login",state:{from:e.location}}})}}))};var C=function(){var e=Object(c.useState)(!0),t=Object(r.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){var e=d();e&&u.a.get("".concat("http://localhost:5000","/verifyToken?token=").concat(e)).then((function(e){O(e.data.token,e.data.user),s(!1)})).catch((function(e){h(),s(!1)}))}),[]),n&&d()?Object(p.jsx)("div",{className:"content",children:"Checking Authentication..."}):Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(i.a,{children:Object(p.jsx)("div",{className:"content",children:Object(p.jsxs)(j.d,{children:[Object(p.jsx)(j.b,{path:"/",exact:!0,component:m}),Object(p.jsx)(w,{path:"/dashboard",component:k})]})})})})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,74)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),s(e),a(e),o(e)}))};o.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root")),T()}},[[73,1,2]]]);
//# sourceMappingURL=main.cdddc773.chunk.js.map