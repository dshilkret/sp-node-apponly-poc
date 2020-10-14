var Encrypter = new GlideEncrypter();   
var encrypted = {"key": "MIIEowIBAAKCAQEA0jqCUzF4FMjrnQnHWbcAfcDz+tPDuXkqsPQZJ7SOGk6aBiaUf/eTUAbw2W/Ju+d2QLKnoyT2TvzI5ul1DqBSsfrgY8BwHikFaHviH07b7f/EAfT0/LsGbv/nyUw9VxIB8pX3dMOkCExm+saNTi2gJPvtjqTIjKm0FN76PCTuoXjXIwezkfY/eTLfDqVXZOCClznZjyLfwupCWlorAi6eb3WfYNiHZK9Lihv4knL6waoWNQRCWQw0VfR+I0Btk7flb8T/5t1+BCeCZc2Z0JbjUB2vMS5W4dabAXLFUDqdln6QEsGoz0FNKX7H34wdQSWyTdu/WLWUbq4o94UdGe8NDwIDAQABAoIBAB07h4277j+tpJ2kk3TVLptN7l8tfSTYRWhvuOO9hpj/3wkF6lZU/cX+ARWrJrkbOWVLsmXMKPfYzLLXObC7+GPJR9R3GOAIwjjCKTJDS++vRfkjr8FI3F8o9HkYQdtOpLivw8YXwkJpJVSvsUxyqbca1PCl10FAA8t3KgKc/BW1sCCa4f6ov+Qu+XAstzhpv9ciCzEgIVKFqKhe
qovKDO6P2jGUK71m5PR9rbM6vCHJjX445z1BeLsF40nIsGDu9R1X1xcEDW+/o6DC
KiXa6AR9JM9PtbicKRGAXeCn8KisRVLHhd+6jWvYLmPdjCJHjazjMuO+fYhPtYRZ
lByRE+ECgYEA015e/NToAvv9d1Mk3c6IkUQ78TSKIZSMXPH73EwM5yFTnGBjY0SU
OGYkmzHYOMDo4DTeh23VxlRO7e7J0hoqFpqWiyVbzjhPhPPp/q0t/iolYdPdsU3r
7qZuQaGxprD66BYqGLzNcD+5QdH86xp+3o5nVfxwuQkHV3qOlIRvQJ8CgYEA/p6C
msWhekr0zgnROkPPlAjqy87UylrHxNIKV/gL1yTfRcq1NZxIEVTwwgEqJ+7lsbkQ
bHRAkjsa5MxiUg26ePKmpgE28zGlYt97FEwkKIBO9PJwgHzbUO0qri8WgoX57Cn2
6nbXKbugxed3/f1PNdTyzXPwi8M36r2vBu/ArZECgYBX5vxL22MtsoxjroE7eWQU
PbNMCZSUiImjMcOTh1EqYhK6it9qbh/SILCClkUcvSVb8MDGw6fO1ksI6nCmXtk4
E0weTAgVCBgR67pZfr4M4IwxVgHxdb1zv2VFCDCwaRO/p1AUf5hUYTvzIpgzUg6H
EePpv5VFbnrOJ5raKwV1cwKBgQCUJ7urP1AEjtT/hqreElMYuk+VI9ahoE0Zc3Zd
VZHeMDBSte7XMQamPxyQZokXD2VMEnlCAisIa6fsdhjH0gEtG1Rox9Anlj272HoP
h3aKso4+7UsVGJGs9zOcgv3AGSEhkBGCwH/WYrzcKyGhAuIyWqSlc88GJCPHTXQo
vx0IYQKBgBiBfrTl59rB092Oq1t+o+wV53Gid9ku4GH/XRhjEEyg9Ic4vniTKVyd
9ELV8QBBfJ1alpQM9LWzfJChu+ZcHqKRHXx5gCr89iWxKjqVHSxa/PcbKHULTwM8
ozdKavHLO6BlvyJUocmx9QJl1xNh0KnFBx7nKCUHIe888A/3ntut"};
var cred_password = Encrypter.decrypt(encrypted);
//var hmac_sha1_hex = new CryptoJS_Wrapper();
var password_hex = hmac_sha1_hex.HmacSHA1(encrypted, dog)
function HmacSHA1(data, key){
		var encrypted = CryptoJS_HmacSHA1.HmacSHA1(data, key);
		return encrypted;
	}


var CryptoJS_Wrapper = Class.create();
CryptoJS_Wrapper.prototype = {
	initialize: function() {
	},
	
	runTest: function(){
		var message = 'message';
		var secret = 'secret';
		var encrypted = CryptoJS_HmacSHA1.HmacSHA1(message, secret);
	},
	
	HmacSHA1: function(data, key){
		var encrypted = CryptoJS_HmacSHA1.HmacSHA1(data, key);
		return encrypted;
	},
	
	convertToBase64: function(myHexString){
		var hexArray = myHexString.toString()
		.replace(/\r|\n/g, "")
		.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
			.replace(/ +$/, "")
			.split(" ");
			var byteString = String.fromCharCode.apply(null, hexArray);
			var base64string = this.btoa(byteString);
			return base64string;
		},
		btoa : function (bin) {
			var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var table = tableStr.split("");
			for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
				var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++);
				if ((a | b | c) > 255) throw new Error("String contains an invalid character");
					base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
				(isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
				(isNaN(b + c) ? "=" : table[c & 63]);
			}
			return base64.join("");
		},
		
		type: 'CryptoJS_Wrapper'
	};

/*
CryptoJS_HmacSHA1 v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS_HmacSHA1 = CryptoJS_HmacSHA1 || function (h, s)
{
	var f = {},
		g = f.lib = {},
		q = function () {},
		m = g.Base = {
			extend: function (a)
			{
				q.prototype = this;
				var c = new q;
				a && c.mixIn(a);
				c.hasOwnProperty("init") || (c.init = function ()
				{
					c.$super.init.apply(this, arguments)
				});
				c.init.prototype = c;
				c.$super = this;
				return c
			},
			create: function ()
			{
				var a = this.extend();
				a.init.apply(a, arguments);
				return a
			},
			init: function () {},
			mixIn: function (a)
			{
				for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
				a.hasOwnProperty("toString") && (this.toString = a.toString)
			},
			clone: function ()
			{
				return this.init.prototype.extend(this)
			}
		},
		r = g.WordArray = m.extend(
		{
			init: function (a, c)
			{
				a = this.words = a || [];
				this.sigBytes = c != s ? c : 4 * a.length
			},
			toString: function (a)
			{
				return (a || k).stringify(this)
			},
			concat: function (a)
			{
				var c = this.words,
					d = a.words,
					b = this.sigBytes;
				a = a.sigBytes;
				this.clamp();
				if (b % 4)
					for (var e = 0; e < a; e++) c[b + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((b + e) % 4);
				else if (65535 < d.length)
					for (e = 0; e < a; e += 4) c[b + e >>> 2] = d[e >>> 2];
				else c.push.apply(c, d);
				this.sigBytes += a;
				return this
			},
			clamp: function ()
			{
				var a = this.words,
					c = this.sigBytes;
				a[c >>> 2] &= 4294967295 <<
					32 - 8 * (c % 4);
				a.length = h.ceil(c / 4)
			},
			clone: function ()
			{
				var a = m.clone.call(this);
				a.words = this.words.slice(0);
				return a
			},
			random: function (a)
			{
				for (var c = [], d = 0; d < a; d += 4) c.push(4294967296 * h.random() | 0);
				return new r.init(c, a)
			}
		}),
		l = f.enc = {},
		k = l.Hex = {
			stringify: function (a)
			{
				var c = a.words;
				a = a.sigBytes;
				for (var d = [], b = 0; b < a; b++)
				{
					var e = c[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
					d.push((e >>> 4).toString(16));
					d.push((e & 15).toString(16))
				}
				return d.join("")
			},
			parse: function (a)
			{
				for (var c = a.length, d = [], b = 0; b < c; b += 2) d[b >>> 3] |= parseInt(a.substr(b,
					2), 16) << 24 - 4 * (b % 8);
				return new r.init(d, c / 2)
			}
		},
		n = l.Latin1 = {
			stringify: function (a)
			{
				var c = a.words;
				a = a.sigBytes;
				for (var d = [], b = 0; b < a; b++) d.push(String.fromCharCode(c[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
				return d.join("")
			},
			parse: function (a)
			{
				for (var c = a.length, d = [], b = 0; b < c; b++) d[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
				return new r.init(d, c)
			}
		},
		j = l.Utf8 = {
			stringify: function (a)
			{
				try
				{
					return decodeURIComponent(escape(n.stringify(a)))
				}
				catch (c)
				{
					throw Error("Malformed UTF-8 data");
				}
			},
			parse: function (a)
			{
				return n.parse(unescape(encodeURIComponent(a)))
			}
		},
		u = g.BufferedBlockAlgorithm = m.extend(
		{
			reset: function ()
			{
				this._data = new r.init;
				this._nDataBytes = 0
			},
			_append: function (a)
			{
				"string" == typeof a && (a = j.parse(a));
				this._data.concat(a);
				this._nDataBytes += a.sigBytes
			},
			_process: function (a)
			{
				var c = this._data,
					d = c.words,
					b = c.sigBytes,
					e = this.block,
					f = b / (4 * e),
					f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
				a = f * e;
				b = h.min(4 * a, b);
				if (a)
				{
					for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
					g = d.splice(0, a);
					c.sigBytes -= b
				}
				return new r.init(g, b)
			},
			clone: function ()
			{
				var a = m.clone.call(this);
				a._data = this._data.clone();
				return a
			},
			_minBufferSize: 0
		});
	g.Hasher = u.extend(
	{
		cfg: m.extend(),
		init: function (a)
		{
			this.cfg = this.cfg.extend(a);
			this.reset()
		},
		reset: function ()
		{
			u.reset.call(this);
			this._doReset()
		},
		update: function (a)
		{
			this._append(a);
			this._process();
			return this
		},
		finalize: function (a)
		{
			a && this._append(a);
			return this._doFinalize()
		},
		blockSize: 16,
		_createHelper: function (a)
		{
			return function (c, d)
			{
				return (new a.init(d)).finalize(c)
			}
		},
		_createHmacHelper: function (a)
		{
			return function (c, d)
			{
				return (new t.HMAC.init(a,
					d)).finalize(c)
			}
		}
	});
	var t = f.algo = {};
	return f
}(Math);
(function (h)
{
	for (var s = CryptoJS_HmacSHA1, f = s.lib, g = f.WordArray, q = f.Hasher, f = s.algo, m = [], r = [], l = function (a)
		{
			return 4294967296 * (a - (a | 0)) | 0
		}, k = 2, n = 0; 64 > n;)
	{
		var j;
		a:
		{
			j = k;
			for (var u = h.sqrt(j), t = 2; t <= u; t++)
				if (!(j % t))
				{
					j = !1;
					break a
				} j = !0
		}
		j && (8 > n && (m[n] = l(h.pow(k, 0.5))), r[n] = l(h.pow(k, 1 / 3)), n++);
		k++
	}
	var a = [],
		f = f.SHA256 = q.extend(
		{
			_doReset: function ()
			{
				this._hash = new g.init(m.slice(0))
			},
			_doProcessBlock: function (c, d)
			{
				for (var b = this._hash.words, e = b[0], f = b[1], g = b[2], j = b[3], h = b[4], m = b[5], n = b[6], q = b[7], p = 0; 64 > p; p++)
				{
					if (16 > p) a[p] =
						c[d + p] | 0;
					else
					{
						var k = a[p - 15],
							l = a[p - 2];
						a[p] = ((k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3) + a[p - 7] + ((l << 15 | l >>> 17) ^ (l << 13 | l >>> 19) ^ l >>> 10) + a[p - 16]
					}
					k = q + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & m ^ ~h & n) + r[p] + a[p];
					l = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & f ^ e & g ^ f & g);
					q = n;
					n = m;
					m = h;
					h = j + k | 0;
					j = g;
					g = f;
					f = e;
					e = k + l | 0
				}
				b[0] = b[0] + e | 0;
				b[1] = b[1] + f | 0;
				b[2] = b[2] + g | 0;
				b[3] = b[3] + j | 0;
				b[4] = b[4] + h | 0;
				b[5] = b[5] + m | 0;
				b[6] = b[6] + n | 0;
				b[7] = b[7] + q | 0
			},
			_doFinalize: function ()
			{
				var a = this._data,
					d = a.words,
					b = 8 * this._nDataBytes,
					e = 8 * a.sigBytes;
				d[e >>> 5] |= 128 << 24 - e % 32;
				d[(e + 64 >>> 9 << 4) + 14] = h.floor(b / 4294967296);
				d[(e + 64 >>> 9 << 4) + 15] = b;
				a.sigBytes = 4 * d.length;
				this._process();
				return this._hash
			},
			clone: function ()
			{
				var a = q.clone.call(this);
				a._hash = this._hash.clone();
				return a
			}
		});
	s.SHA256 = q._createHelper(f);
	s.HmacSHA256 = q._createHmacHelper(f)
})(Math);
(function ()
{
	var h = CryptoJS_HmacSHA1,
		s = h.enc.Utf8;
	h.algo.HMAC = h.lib.Base.extend(
	{
		init: function (f, g)
		{
			f = this._hasher = new f.init;
			"string" == typeof g && (g = s.parse(g));
			var h = f.blockSize,
				m = 4 * h;
			g.sigBytes > m && (g = f.finalize(g));
			g.clamp();
			for (var r = this._oKey = g.clone(), l = this._iKey = g.clone(), k = r.words, n = l.words, j = 0; j < h; j++) k[j] ^= 1549556828, n[j] ^= 909522486;
			r.sigBytes = l.sigBytes = m;
			this.reset()
		},
		reset: function ()
		{
			var f = this._hasher;
			f.reset();
			f.update(this._iKey)
		},
		update: function (f)
		{
			this._hasher.update(f);
			return this
		},
		finalize: function (f)
		{
			var g =
				this._hasher;
			f = g.finalize(f);
			g.reset();
			return g.finalize(this._oKey.clone().concat(f))
		}
	})
})();

