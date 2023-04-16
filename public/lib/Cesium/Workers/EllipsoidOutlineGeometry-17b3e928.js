/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96.6
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

define(["exports","./Transforms-66eda18c","./Matrix2-4706dd70","./ComponentDatatype-438cad2a","./defaultValue-028a8a27","./RuntimeError-a977b8e0","./GeometryAttribute-2cdece80","./GeometryAttributes-98e858da","./GeometryOffsetAttribute-116f8293","./IndexDatatype-dfa09980"],function(H,K,u,T,f,p,q,Q,Y,X){"use strict";const Z=new u.Cartesian3(1,1,1),y=Math.cos,U=Math.sin;function D(e){e=f.defaultValue(e,f.defaultValue.EMPTY_OBJECT);const t=f.defaultValue(e.radii,Z),n=f.defaultValue(e.innerRadii,t),b=f.defaultValue(e.minimumClock,0),w=f.defaultValue(e.maximumClock,T.CesiumMath.TWO_PI),C=f.defaultValue(e.minimumCone,0),l=f.defaultValue(e.maximumCone,T.CesiumMath.PI),c=Math.round(f.defaultValue(e.stackPartitions,10)),A=Math.round(f.defaultValue(e.slicePartitions,8)),s=Math.round(f.defaultValue(e.subdivisions,128));if(c<1)throw new p.DeveloperError("options.stackPartitions cannot be less than 1");if(A<0)throw new p.DeveloperError("options.slicePartitions cannot be less than 0");if(s<0)throw new p.DeveloperError("options.subdivisions must be greater than or equal to zero.");if(f.defined(e.offsetAttribute)&&e.offsetAttribute===Y.GeometryOffsetAttribute.TOP)throw new p.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._radii=u.Cartesian3.clone(t),this._innerRadii=u.Cartesian3.clone(n),this._minimumClock=b,this._maximumClock=w,this._minimumCone=C,this._maximumCone=l,this._stackPartitions=c,this._slicePartitions=A,this._subdivisions=s,this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipsoidOutlineGeometry"}D.packedLength=2*u.Cartesian3.packedLength+8,D.pack=function(e,t,n){if(!f.defined(e))throw new p.DeveloperError("value is required");if(!f.defined(t))throw new p.DeveloperError("array is required");return n=f.defaultValue(n,0),u.Cartesian3.pack(e._radii,t,n),n+=u.Cartesian3.packedLength,u.Cartesian3.pack(e._innerRadii,t,n),n+=u.Cartesian3.packedLength,t[n++]=e._minimumClock,t[n++]=e._maximumClock,t[n++]=e._minimumCone,t[n++]=e._maximumCone,t[n++]=e._stackPartitions,t[n++]=e._slicePartitions,t[n++]=e._subdivisions,t[n]=f.defaultValue(e._offsetAttribute,-1),t};const j=new u.Cartesian3,F=new u.Cartesian3,k={radii:j,innerRadii:F,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0,offsetAttribute:void 0};D.unpack=function(e,t,n){if(!f.defined(e))throw new p.DeveloperError("array is required");t=f.defaultValue(t,0);const b=u.Cartesian3.unpack(e,t,j);t+=u.Cartesian3.packedLength;const w=u.Cartesian3.unpack(e,t,F);t+=u.Cartesian3.packedLength;const C=e[t++],l=e[t++],c=e[t++],A=e[t++],s=e[t++],r=e[t++],z=e[t++],d=e[t];return f.defined(n)?(n._radii=u.Cartesian3.clone(b,n._radii),n._innerRadii=u.Cartesian3.clone(w,n._innerRadii),n._minimumClock=C,n._maximumClock=l,n._minimumCone=c,n._maximumCone=A,n._stackPartitions=s,n._slicePartitions=r,n._subdivisions=z,n._offsetAttribute=d===-1?void 0:d,n):(k.minimumClock=C,k.maximumClock=l,k.minimumCone=c,k.maximumCone=A,k.stackPartitions=s,k.slicePartitions=r,k.subdivisions=z,k.offsetAttribute=d===-1?void 0:d,new D(k))},D.createGeometry=function(e){const t=e._radii;if(t.x<=0||t.y<=0||t.z<=0)return;const n=e._innerRadii;if(n.x<=0||n.y<=0||n.z<=0)return;const b=e._minimumClock,w=e._maximumClock,C=e._minimumCone,l=e._maximumCone,c=e._subdivisions,A=u.Ellipsoid.fromCartesian3(t);let s=e._slicePartitions+1,r=e._stackPartitions+1;s=Math.round(s*Math.abs(w-b)/T.CesiumMath.TWO_PI),r=Math.round(r*Math.abs(l-C)/T.CesiumMath.PI),s<2&&(s=2),r<2&&(r=2);let z=0,d=1;const N=n.x!==t.x||n.y!==t.y||n.z!==t.z;let J=!1,M=!1;N&&(d=2,C>0&&(J=!0,z+=s),l<Math.PI&&(M=!0,z+=s));const W=c*d*(r+s),a=new Float64Array(W*3),$=2*(W+z-(s+r)*d),h=X.IndexDatatype.createTypedArray(W,$);let i,o,L,R,m=0;const _=new Array(r),O=new Array(r);for(i=0;i<r;i++)R=C+i*(l-C)/(r-1),_[i]=U(R),O[i]=y(R);const v=new Array(c),E=new Array(c);for(i=0;i<c;i++)L=b+i*(w-b)/(c-1),v[i]=U(L),E[i]=y(L);for(i=0;i<r;i++)for(o=0;o<c;o++)a[m++]=t.x*_[i]*E[o],a[m++]=t.y*_[i]*v[o],a[m++]=t.z*O[i];if(N)for(i=0;i<r;i++)for(o=0;o<c;o++)a[m++]=n.x*_[i]*E[o],a[m++]=n.y*_[i]*v[o],a[m++]=n.z*O[i];for(_.length=c,O.length=c,i=0;i<c;i++)R=C+i*(l-C)/(c-1),_[i]=U(R),O[i]=y(R);for(v.length=s,E.length=s,i=0;i<s;i++)L=b+i*(w-b)/(s-1),v[i]=U(L),E[i]=y(L);for(i=0;i<c;i++)for(o=0;o<s;o++)a[m++]=t.x*_[i]*E[o],a[m++]=t.y*_[i]*v[o],a[m++]=t.z*O[i];if(N)for(i=0;i<c;i++)for(o=0;o<s;o++)a[m++]=n.x*_[i]*E[o],a[m++]=n.y*_[i]*v[o],a[m++]=n.z*O[i];for(m=0,i=0;i<r*d;i++){const P=i*c;for(o=0;o<c-1;o++)h[m++]=P+o,h[m++]=P+o+1}let B=r*c*d;for(i=0;i<s;i++)for(o=0;o<c-1;o++)h[m++]=B+i+o*s,h[m++]=B+i+(o+1)*s;if(N)for(B=r*c*d+s*c,i=0;i<s;i++)for(o=0;o<c-1;o++)h[m++]=B+i+o*s,h[m++]=B+i+(o+1)*s;if(N){let P=r*c*d,S=P+c*s;if(J)for(i=0;i<s;i++)h[m++]=P+i,h[m++]=S+i;if(M)for(P+=c*s-s,S+=c*s-s,i=0;i<s;i++)h[m++]=P+i,h[m++]=S+i}const G=new Q.GeometryAttributes({position:new q.GeometryAttribute({componentDatatype:T.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:a})});if(f.defined(e._offsetAttribute)){const P=a.length,S=e._offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1,V=new Uint8Array(P/3).fill(S);G.applyOffset=new q.GeometryAttribute({componentDatatype:T.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:V})}return new q.Geometry({attributes:G,indices:h,primitiveType:q.PrimitiveType.LINES,boundingSphere:K.BoundingSphere.fromEllipsoid(A),offsetAttribute:e._offsetAttribute})},H.EllipsoidOutlineGeometry=D});