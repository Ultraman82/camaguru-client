/* Whirlpool
 * fork of http://www.sunsean.com/Whirlpool.js for nodejs
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */ !function(r,o){"object"==typeof exports?module.exports=o():"function"==typeof define&&define.amd?define(o):r.Whirlpool=o()}(this,function(){var r;return function(){var o,n,f,t,e,i,u,a,c,h,l,d,p=10,v=[],s=[],y="ᠣ웨螸ŏ㚦틵祯酒悼鮎ꌌ笵ᷠퟂ⹋﹗ᕷ㟥鿰䫚壉⤊놠殅뵝ჴ쬾է䆋Ᵹ闘ﯮ籦���䞞쨭뼇굚茳挂ꩱ젙䧙守騦㊰햀뻍㑈ｺ遟⁨᪮둔錢擱猒䀈쏬���贽需켫皂혛떯橐䗳ワ㽕ꋪ斺⿀���﵍鉵ڊ닦ฟ拔ꢖ暈╙葲㥌幸㢌톥댡鰞䏇ﰄ写洍﫟縤㮫츑轎럫㲁铷뤓ⳓ쐃噄義⪻셓���鵬ㅴ겉ᓡᘺ椉炶탭챂颤⡜";for(n=8;n-->0;)v[n]=[];for(f=0;256>f;f++){t=y.charCodeAt(f/2),u=0==(1&f)?t>>>8:255&t,a=u<<1,a>=256&&(a^=285),c=a<<1,c>=256&&(c^=285),h=c^u,l=c<<1,l>=256&&(l^=285),d=l^u,v[0][f]=[0,0],v[0][f][0]=u<<24|u<<16|c<<8|u,v[0][f][1]=l<<24|h<<16|a<<8|d;for(var n=1;8>n;n++)v[n][f]=[0,0],v[n][f][0]=v[n-1][f][0]>>>8|v[n-1][f][1]<<24,v[n][f][1]=v[n-1][f][1]>>>8|v[n-1][f][0]<<24}for(s[0]=[0,0],e=1;p>=e;e++)i=8*(e-1),s[e]=[0,0],s[e][0]=4278190080&v[0][i][0]^16711680&v[1][i+1][0]^65280&v[2][i+2][0]^255&v[3][i+3][0],s[e][1]=4278190080&v[4][i+4][1]^16711680&v[5][i+5][1]^65280&v[6][i+6][1]^255&v[7][i+7][1];var g=[],A=[],b=0,m=0,x=[],z=[],C=[],M=[],W=[],j=function(){var r,o,n,f,t;for(r=0,o=0;8>r;r++,o+=8)M[r]=[0,0],M[r][0]=(255&A[o])<<24^(255&A[o+1])<<16^(255&A[o+2])<<8^255&A[o+3],M[r][1]=(255&A[o+4])<<24^(255&A[o+5])<<16^(255&A[o+6])<<8^255&A[o+7];for(r=0;8>r;r++)W[r]=[0,0],z[r]=[0,0],W[r][0]=M[r][0]^(z[r][0]=x[r][0]),W[r][1]=M[r][1]^(z[r][1]=x[r][1]);for(n=1;p>=n;n++){for(r=0;8>r;r++)for(C[r]=[0,0],t=0,f=56,o=0;8>t;t++,f-=8,o=32>f?1:0)C[r][0]^=v[t][z[r-t&7][o]>>>f%32&255][0],C[r][1]^=v[t][z[r-t&7][o]>>>f%32&255][1];for(r=0;8>r;r++)z[r][0]=C[r][0],z[r][1]=C[r][1];for(z[0][0]^=s[n][0],z[0][1]^=s[n][1],r=0;8>r;r++)for(C[r][0]=z[r][0],C[r][1]=z[r][1],t=0,f=56,o=0;8>t;t++,f-=8,o=32>f?1:0)C[r][0]^=v[t][W[r-t&7][o]>>>f%32&255][0],C[r][1]^=v[t][W[r-t&7][o]>>>f%32&255][1];for(r=0;8>r;r++)W[r][0]=C[r][0],W[r][1]=C[r][1]}for(r=0;8>r;r++)x[r][0]^=W[r][0]^M[r][0],x[r][1]^=W[r][1]^M[r][1]};o=r=function(r){return o.init().add(r).finalize()},o.version="3.0",o.init=function(){for(var r=32;r-->0;)g[r]=0;for(b=m=0,A=[0],r=8;r-->0;)x[r]=[0,0];return o};var g=function(r){var o,n=r.length;return 0===n?0:(o=r[n-1],32*(n-1)+(Math.round(o/1099511627776)||32))},q=function(r){return Array.isArray(r)?function(r){var o,n,f=[],t=g(r);for(o=0;t/8>o;o++)0===(3&o)&&(n=r[o/4]),f.push(n>>>24),n<<=8;return f}(r):function(r){var o,n,f=r.toString();for(r=[],o=0;o<f.length;o++)n=f.charCodeAt(o),n>=256&&r.push(n>>>8&255),r.push(255&n);return r}(r)};o.add=function(r,n){if(!r)return o;n||(r=q(r),n=8*r.length);var f,t,e,i=0,u=8-(7&n)&7,a=7&b,c=n;for(f=31,e=0;f>=0;f--)e+=(255&g[f])+c%256,g[f]=255&e,e>>>=8,c=Math.floor(c/256);for(;n>8;){if(t=r[i]<<u&255|(255&r[i+1])>>>8-u,0>t||t>=256)return"Whirlpool requires a byte array";A[m++]|=t>>>a,b+=8-a,512==b&&(j(),b=m=0,A=[]),A[m]=t<<8-a&255,b+=a,n-=8,i++}return n>0?(t=r[i]<<u&255,A[m]|=t>>>a):t=0,8>a+n?b+=n:(m++,b+=8-a,n-=8-a,512==b&&(j(),b=m=0,A=[]),A[m]=t<<8-a&255,b+=n),o},o.finalize=function(){var r,o,n,f="",t=[],e="0123456789abcdef".split("");if(A[m]|=128>>>(7&b),m++,m>32){for(;64>m;)A[m++]=0;j(),m=0,A=[]}for(;32>m;)A[m++]=0;for(A.push.apply(A,g),j(),r=0,o=0;8>r;r++,o+=8)n=x[r][0],t[o]=n>>>24&255,t[o+1]=n>>>16&255,t[o+2]=n>>>8&255,t[o+3]=255&n,n=x[r][1],t[o+4]=n>>>24&255,t[o+5]=n>>>16&255,t[o+6]=n>>>8&255,t[o+7]=255&n;for(r=0;r<t.length;r++)f+=e[t[r]>>>4],f+=e[15&t[r]];return f}}(),r});
