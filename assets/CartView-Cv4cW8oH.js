import{_ as h,o as a,c as _,a as t,F as u,i as p,t as o}from"./index-u7S5IKh1.js";var i={VITE_APP_API_URL:"https://vue3-course-api.hexschool.io/v2/api",VITE_APP_API_NAME:"jenny031054",BASE_URL:"/vue-task-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const P={data(){return{cart:[]}},mounted(){this.getCart()},methods:{getCart(){const{VITE_APP_API_URL:s,VITE_APP_API_NAME:l}=i;this.$http.get(`${s}/${l}/cart`).then(n=>{this.cart=n.data.data,console.log(this.cart)})},delCart(s){const{VITE_APP_API_URL:l,VITE_APP_API_NAME:n}=i;this.$http.delete(`${l}/${n}/cart/${s}`).then(c=>{console.log(c.data),alert("刪除成功！"),this.getCart()})}}},A={class:"container"},f=t("h1",null,"購物車頁面",-1),g=t("hr",null,null,-1),E={class:"row"},m={class:"table align-middle"},I=t("thead",null,[t("th"),t("th",null,"品名"),t("th",null,"數量"),t("th",null,"單價"),t("th",null,"刪除")],-1),V=["src"],$=["onClick"],b=t("td",{colspan:"3",class:"text-end"},"總計",-1),v={class:"text-end"};function C(s,l,n,c,d,r){return a(),_("div",A,[f,g,t("div",E,[t("table",m,[I,(a(!0),_(u,null,p(d.cart.carts,e=>(a(),_("tbody",{key:e.id},[t("td",null,[t("img",{src:e.product.imageUrl,alt:"",height:"200",width:"200",class:"object-fit"},null,8,V)]),t("td",null,o(e.product.title),1),t("td",null,o(e.qty),1),t("td",null,o(e.final_total),1),t("td",null,[t("button",{class:"btn btn-danger",type:"button",onClick:k=>r.delCart(e.id)}," 刪除 ",8,$)])]))),128)),t("tfoot",null,[b,t("td",v,o(d.cart.final_total),1)])])])])}const y=h(P,[["render",C]]);export{y as default};