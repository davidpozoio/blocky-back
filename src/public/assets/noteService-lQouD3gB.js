import{n as H,_ as A,o as D,p as x,q as B,t as j,v as W,w as $,x as w,y as q,z as V,C as Q,S as z,D as b,u as G,F as J,G as X,H as S,I as O}from"./index-nzcMgfkZ.js";var Y=function(n){H(o,n);function o(i,t){var e;return e=n.call(this)||this,e.client=i,e.options=t,e.trackedProps=[],e.selectError=null,e.bindMethods(),e.setOptions(t),e}var s=o.prototype;return s.bindMethods=function(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)},s.onSubscribe=function(){this.listeners.length===1&&(this.currentQuery.addObserver(this),k(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())},s.onUnsubscribe=function(){this.listeners.length||this.destroy()},s.shouldFetchOnReconnect=function(){return E(this.currentQuery,this.options,this.options.refetchOnReconnect)},s.shouldFetchOnWindowFocus=function(){return E(this.currentQuery,this.options,this.options.refetchOnWindowFocus)},s.destroy=function(){this.listeners=[],this.clearTimers(),this.currentQuery.removeObserver(this)},s.setOptions=function(t,e){var u=this.options,r=this.currentQuery;if(this.options=this.client.defaultQueryObserverOptions(t),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=u.queryKey),this.updateQuery();var c=this.hasListeners();c&&L(this.currentQuery,r,this.options,u)&&this.executeFetch(),this.updateResult(e),c&&(this.currentQuery!==r||this.options.enabled!==u.enabled||this.options.staleTime!==u.staleTime)&&this.updateStaleTimeout();var a=this.computeRefetchInterval();c&&(this.currentQuery!==r||this.options.enabled!==u.enabled||a!==this.currentRefetchInterval)&&this.updateRefetchInterval(a)},s.getOptimisticResult=function(t){var e=this.client.defaultQueryObserverOptions(t),u=this.client.getQueryCache().build(this.client,e);return this.createResult(u,e)},s.getCurrentResult=function(){return this.currentResult},s.trackResult=function(t,e){var u=this,r={},c=function(h){u.trackedProps.includes(h)||u.trackedProps.push(h)};return Object.keys(t).forEach(function(a){Object.defineProperty(r,a,{configurable:!1,enumerable:!0,get:function(){return c(a),t[a]}})}),(e.useErrorBoundary||e.suspense)&&c("error"),r},s.getNextResult=function(t){var e=this;return new Promise(function(u,r){var c=e.subscribe(function(a){a.isFetching||(c(),a.isError&&(t!=null&&t.throwOnError)?r(a.error):u(a))})})},s.getCurrentQuery=function(){return this.currentQuery},s.remove=function(){this.client.getQueryCache().remove(this.currentQuery)},s.refetch=function(t){return this.fetch(A({},t,{meta:{refetchPage:t==null?void 0:t.refetchPage}}))},s.fetchOptimistic=function(t){var e=this,u=this.client.defaultQueryObserverOptions(t),r=this.client.getQueryCache().build(this.client,u);return r.fetch().then(function(){return e.createResult(r,u)})},s.fetch=function(t){var e=this;return this.executeFetch(t).then(function(){return e.updateResult(),e.currentResult})},s.executeFetch=function(t){this.updateQuery();var e=this.currentQuery.fetch(this.options,t);return t!=null&&t.throwOnError||(e=e.catch(D)),e},s.updateStaleTimeout=function(){var t=this;if(this.clearStaleTimeout(),!(x||this.currentResult.isStale||!B(this.options.staleTime))){var e=j(this.currentResult.dataUpdatedAt,this.options.staleTime),u=e+1;this.staleTimeoutId=setTimeout(function(){t.currentResult.isStale||t.updateResult()},u)}},s.computeRefetchInterval=function(){var t;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(t=this.options.refetchInterval)!=null?t:!1},s.updateRefetchInterval=function(t){var e=this;this.clearRefetchInterval(),this.currentRefetchInterval=t,!(x||this.options.enabled===!1||!B(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(function(){(e.options.refetchIntervalInBackground||W.isFocused())&&e.executeFetch()},this.currentRefetchInterval))},s.updateTimers=function(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())},s.clearTimers=function(){this.clearStaleTimeout(),this.clearRefetchInterval()},s.clearStaleTimeout=function(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)},s.clearRefetchInterval=function(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)},s.createResult=function(t,e){var u=this.currentQuery,r=this.options,c=this.currentResult,a=this.currentResultState,h=this.currentResultOptions,f=t!==u,p=f?t.state:this.currentQueryInitialState,R=f?this.currentResult:this.previousQueryResult,l=t.state,m=l.dataUpdatedAt,T=l.error,F=l.errorUpdatedAt,C=l.isFetching,d=l.status,U=!1,P=!1,v;if(e.optimisticResults){var _=this.hasListeners(),N=!_&&k(t,e),M=_&&L(t,u,e,r);(N||M)&&(C=!0,m||(d="loading"))}if(e.keepPreviousData&&!l.dataUpdateCount&&(R!=null&&R.isSuccess)&&d!=="error")v=R.data,m=R.dataUpdatedAt,d=R.status,U=!0;else if(e.select&&typeof l.data<"u")if(c&&l.data===(a==null?void 0:a.data)&&e.select===this.selectFn)v=this.selectResult;else try{this.selectFn=e.select,v=e.select(l.data),e.structuralSharing!==!1&&(v=$(c==null?void 0:c.data,v)),this.selectResult=v,this.selectError=null}catch(g){w().error(g),this.selectError=g}else v=l.data;if(typeof e.placeholderData<"u"&&typeof v>"u"&&(d==="loading"||d==="idle")){var y;if(c!=null&&c.isPlaceholderData&&e.placeholderData===(h==null?void 0:h.placeholderData))y=c.data;else if(y=typeof e.placeholderData=="function"?e.placeholderData():e.placeholderData,e.select&&typeof y<"u")try{y=e.select(y),e.structuralSharing!==!1&&(y=$(c==null?void 0:c.data,y)),this.selectError=null}catch(g){w().error(g),this.selectError=g}typeof y<"u"&&(d="success",v=y,P=!0)}this.selectError&&(T=this.selectError,v=this.selectResult,F=Date.now(),d="error");var K={status:d,isLoading:d==="loading",isSuccess:d==="success",isError:d==="error",isIdle:d==="idle",data:v,dataUpdatedAt:m,error:T,errorUpdatedAt:F,failureCount:l.fetchFailureCount,errorUpdateCount:l.errorUpdateCount,isFetched:l.dataUpdateCount>0||l.errorUpdateCount>0,isFetchedAfterMount:l.dataUpdateCount>p.dataUpdateCount||l.errorUpdateCount>p.errorUpdateCount,isFetching:C,isRefetching:C&&d!=="loading",isLoadingError:d==="error"&&l.dataUpdatedAt===0,isPlaceholderData:P,isPreviousData:U,isRefetchError:d==="error"&&l.dataUpdatedAt!==0,isStale:I(t,e),refetch:this.refetch,remove:this.remove};return K},s.shouldNotifyListeners=function(t,e){if(!e)return!0;var u=this.options,r=u.notifyOnChangeProps,c=u.notifyOnChangePropsExclusions;if(!r&&!c||r==="tracked"&&!this.trackedProps.length)return!0;var a=r==="tracked"?this.trackedProps:r;return Object.keys(t).some(function(h){var f=h,p=t[f]!==e[f],R=a==null?void 0:a.some(function(m){return m===h}),l=c==null?void 0:c.some(function(m){return m===h});return p&&!l&&(!a||R)})},s.updateResult=function(t){var e=this.currentResult;if(this.currentResult=this.createResult(this.currentQuery,this.options),this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,!q(this.currentResult,e)){var u={cache:!0};(t==null?void 0:t.listeners)!==!1&&this.shouldNotifyListeners(this.currentResult,e)&&(u.listeners=!0),this.notify(A({},u,t))}},s.updateQuery=function(){var t=this.client.getQueryCache().build(this.client,this.options);if(t!==this.currentQuery){var e=this.currentQuery;this.currentQuery=t,this.currentQueryInitialState=t.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(e==null||e.removeObserver(this),t.addObserver(this))}},s.onQueryUpdate=function(t){var e={};t.type==="success"?e.onSuccess=!0:t.type==="error"&&!V(t.error)&&(e.onError=!0),this.updateResult(e),this.hasListeners()&&this.updateTimers()},s.notify=function(t){var e=this;Q.batch(function(){t.onSuccess?(e.options.onSuccess==null||e.options.onSuccess(e.currentResult.data),e.options.onSettled==null||e.options.onSettled(e.currentResult.data,null)):t.onError&&(e.options.onError==null||e.options.onError(e.currentResult.error),e.options.onSettled==null||e.options.onSettled(void 0,e.currentResult.error)),t.listeners&&e.listeners.forEach(function(u){u(e.currentResult)}),t.cache&&e.client.getQueryCache().notify({query:e.currentQuery,type:"observerResultsUpdated"})})},o}(z);function Z(n,o){return o.enabled!==!1&&!n.state.dataUpdatedAt&&!(n.state.status==="error"&&o.retryOnMount===!1)}function k(n,o){return Z(n,o)||n.state.dataUpdatedAt>0&&E(n,o,o.refetchOnMount)}function E(n,o,s){if(o.enabled!==!1){var i=typeof s=="function"?s(n):s;return i==="always"||i!==!1&&I(n,o)}return!1}function L(n,o,s,i){return s.enabled!==!1&&(n!==o||i.enabled===!1)&&(!s.suspense||n.state.status!=="error")&&I(n,s)}function I(n,o){return n.isStaleByTime(o.staleTime)}function ee(){var n=!1;return{clearReset:function(){n=!1},reset:function(){n=!0},isReset:function(){return n}}}var te=b.createContext(ee()),re=function(){return b.useContext(te)};function se(n,o){var s=b.useRef(!1),i=b.useState(0),t=i[1],e=G(),u=re(),r=e.defaultQueryObserverOptions(n);r.optimisticResults=!0,r.onError&&(r.onError=Q.batchCalls(r.onError)),r.onSuccess&&(r.onSuccess=Q.batchCalls(r.onSuccess)),r.onSettled&&(r.onSettled=Q.batchCalls(r.onSettled)),r.suspense&&(typeof r.staleTime!="number"&&(r.staleTime=1e3),r.cacheTime===0&&(r.cacheTime=1)),(r.suspense||r.useErrorBoundary)&&(u.isReset()||(r.retryOnMount=!1));var c=b.useState(function(){return new o(e,r)}),a=c[0],h=a.getOptimisticResult(r);if(b.useEffect(function(){s.current=!0,u.clearReset();var f=a.subscribe(Q.batchCalls(function(){s.current&&t(function(p){return p+1})}));return a.updateResult(),function(){s.current=!1,f()}},[u,a]),b.useEffect(function(){a.setOptions(r,{listeners:!1})},[r,a]),r.suspense&&h.isLoading)throw a.fetchOptimistic(r).then(function(f){var p=f.data;r.onSuccess==null||r.onSuccess(p),r.onSettled==null||r.onSettled(p,null)}).catch(function(f){u.clearReset(),r.onError==null||r.onError(f),r.onSettled==null||r.onSettled(void 0,f)});if(h.isError&&!u.isReset()&&!h.isFetching&&J(r.suspense,r.useErrorBoundary,[h.error,a.getCurrentQuery()]))throw h.error;return r.notifyOnChangeProps==="tracked"&&(h=a.trackResult(h,r)),h}function ie(n,o,s){var i=X(n,o,s);return se(i,Y)}function ue(n=!1){return S.get(`${O.HOST_BACK}/notes?deleted=${n}`)}function ae(n){return S.post(`${O.HOST_BACK}/notes`,n)}function oe(n){return S.get(`${O.HOST_BACK}/notes/${n}`)}function ce(n){return S.patch(`${O.HOST_BACK}/notes/${n.id}`,n)}function le(n){return S.delete(`${O.HOST_BACK}/notes/${n}`)}function he(n){return S.patch(`${O.HOST_BACK}/notes/${n}/true`)}function de(n){return S.patch(`${O.HOST_BACK}/notes/${n}/false`)}export{oe as a,ae as c,le as d,ue as g,he as m,ce as p,de as r,ie as u};
