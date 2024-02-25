import{r as f,A as S,_ as p,c as O,a as T,u as y,b as x,R as j,d as C,s as L,j as s,M as I,e as D,f as M}from"./index-MuW_Xys2.js";import{d as R,m as b,r as _,c as k,u as A,g as w}from"./noteService-WzXRcBJl.js";import{C as a}from"./cache-keys-ZmxRsDyf.js";var P={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}}]},name:"loading",theme:"outlined"};const q=P;var Q=function(i,d){return f.createElement(S,p({},i,{ref:d,icon:q}))};const v=f.forwardRef(Q);var F={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};const z=F;var H=function(i,d){return f.createElement(S,p({},i,{ref:d,icon:z}))};const $=f.forwardRef(H),G=(e,i)=>{const d=O(),o=T(t=>t.setIsDeletingState),l=y(),u=x({mutationFn:t=>R(t),onSuccess:()=>{l.setQueryData([a.NOTE_LIST.ME,i?a.NOTE_LIST.TRASH:a.NOTE_LIST.NORMAL],t=>t?t.filter(g=>g.id!=e.id):[]),o(!1,e.id,!1)},onError:()=>{o(!1,e.id,!1)}}),m=x({mutationFn:t=>b(t),onSuccess:()=>{l.setQueryData([a.NOTE_LIST.ME,a.NOTE_LIST.NORMAL],t=>t?t.filter(g=>g.id!=e.id):[]),l.setQueriesData([a.NOTE_LIST.ME,a.NOTE_LIST.TRASH],t=>t?[...t,e]:[]),o(!1,e.id)},onError:()=>{o(!1,e.id)}}),c=x({mutationFn:t=>_(t),onSuccess:()=>{l.setQueryData([a.NOTE_LIST.ME,a.NOTE_LIST.TRASH],t=>t?t.filter(g=>g.id!=e.id):[]),l.setQueriesData([a.NOTE_LIST.ME,a.NOTE_LIST.NORMAL],t=>t?[...t,e]:[]),o(!1,e.id)},onError:()=>{o(!1,e.id)}});return{handleClick:t=>{t.stopPropagation(),i||d(j.NOTES.EDITORID(e.id),{state:{note:e}})},handleRestore:()=>{o(!0,e.id),c.mutate(e.id)},handleDelete:()=>{o(!0,e.id),m.mutate(e.id)},handleDeletePermanently:()=>{o(!0,e.id,!0),u.mutate(e.id)}}},K=({note:e,trashBean:i=!1})=>{const{toggle:d,setFalse:o,handleToggle:l}=C(!1),{handleClick:u,handleDelete:m,handleDeletePermanently:c,handleRestore:h}=G(e,i),r=T(n=>L(n,e.id));return s.jsxs("div",{className:"card-container",children:[s.jsx("span",{className:"card-shadow"}),s.jsxs("div",{onClick:r!=null&&r.isDeleting?()=>{}:u,className:"note-card",children:[(r==null?void 0:r.isDeleting)&&s.jsxs("span",{className:"deleting-overlay opacity-transition",children:[s.jsx(v,{style:{fontSize:"30px"}}),i?r!=null&&r.isDeletingPermanently?"Deleting note...":"Restoring note...":"Deleting note..."]}),s.jsx("button",{"data-testid":"options",onClick:n=>{n.stopPropagation(),l()},className:"options-button",children:s.jsx(I,{})}),s.jsx(D,{"data-testid":"options",show:d,onClose:()=>{o()},values:[{name:i?"Restore note":"Delete",onClick:i?h:m},{name:"Delete permanently",onClick:c}]}),s.jsx("span",{className:"card-title",children:e.title}),s.jsx("p",{className:"card-content",children:e.content})]})]})},U=({show:e=!1,onClose:i=()=>{}})=>{const d=O(),[o,l]=f.useState(void 0),u=T(n=>n.setIsCreatingNote),m=T(n=>n.isCreatingNote),c=y(),{mutate:h}=x({mutationFn:n=>k(n),onSuccess:n=>{const N=n.data.note;c.setQueryData([a.NOTE_LIST.ME,a.NOTE_LIST.NORMAL],t=>t?[n.data.note,...t]:[]),u(!1),d(j.NOTES.EDITORID(n.data.note.id),{state:{note:N}})},onError:n=>{var t;const N=n;((t=N==null?void 0:N.response)==null?void 0:t.status)===500&&l("Sorry, there was an error to create the note, try again!"),u(!1)}}),r=()=>{l(void 0),h({title:"Default title",content:"Default content"}),u(!0)};return s.jsx("div",{className:"overlay opacity-transition",style:{display:e?"flex":"none"},children:s.jsxs("div",{style:{display:e?"flex":"none"},className:"modal-menu",children:[s.jsx("h3",{className:"subtitle",children:"Create a new note"}),s.jsx("p",{children:o}),s.jsxs("section",{className:"button-container",children:[s.jsx("button",{className:"button --dark --bordered --full-extension",onClick:r,disabled:m,children:m?"Creating...":"create!"}),s.jsx("button",{className:"button --bordered --full-extension",onClick:i,disabled:m,children:"cancel"})]})]})})},W=({trashBean:e})=>{const{toggle:i,setTrue:d,setFalse:o}=C(!1),l=T(t=>t.isCreatingNote),[u,m]=f.useState(void 0);M(e?"trash note list":"note list");const{data:c,refetch:h,isLoading:r}=A([a.NOTE_LIST.ME,e?a.NOTE_LIST.TRASH:a.NOTE_LIST.NORMAL],()=>w(!!e).then(t=>t.data.notes),{onError:t=>{var E;const g=t;((E=g==null?void 0:g.response)==null?void 0:E.status)===500&&m("Sorry, there was an error to get the notes, try again!")},onSuccess:()=>{m(void 0)}}),n=()=>{d()},N=()=>{o()};return s.jsxs("div",{className:"--main-content note-grid",children:[s.jsx(U,{show:i&&!e||l&&!e,onClose:N}),s.jsx("h2",{className:"gradient-title --medium-title note-list-title",children:e?"Trash":"My notes"}),(c==null?void 0:c.length)===0&&s.jsxs("span",{children:[e?"Trash empty":"There is no notes yet, create one!",s.jsx("img",{className:"no-notes-draw",src:"/no-notes-draw.svg",alt:"without notes image"})]}),u&&s.jsxs(s.Fragment,{children:[s.jsx("span",{children:u}),s.jsx("button",{onClick:()=>h(),disabled:r,children:"Reload notes"})]}),s.jsx("section",{className:"note-list",children:c==null?void 0:c.map(t=>s.jsx(K,{note:t,trashBean:!!e},t.id))}),r&&s.jsxs("span",{className:"loading-overlay",children:[s.jsx(v,{style:{fontSize:"30px"}}),"Getting notes..."]}),!e&&s.jsx("button",{className:"add-note-button","data-testid":"add-note",onClick:n,children:s.jsx($,{style:{fontSize:"20px"}})})]})};export{W as default};
