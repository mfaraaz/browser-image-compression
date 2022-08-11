/**
 * Browser Image Compression
 * v2.0.0
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.imageCompression = factory());
})(this, (function () { 'use strict';

  function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default' && !(k in n)) {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    });
    return Object.freeze(n);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var UZIP_1 = createCommonjsModule(function (module) {
    var UZIP = {};
    module.exports = UZIP;

    UZIP["parse"] = function (buf, onlyNames) {
      var rUs = UZIP.bin.readUshort,
          rUi = UZIP.bin.readUint,
          o = 0,
          out = {};
      var data = new Uint8Array(buf);
      var eocd = data.length - 4;

      while (rUi(data, eocd) != 0x06054b50) eocd--;

      var o = eocd;
      o += 4;
      o += 4;
      var cnu = rUs(data, o);
      o += 2;
      rUs(data, o);
      o += 2;
      var csize = rUi(data, o);
      o += 4;
      var coffs = rUi(data, o);
      o += 4;
      o = coffs;

      for (var i = 0; i < cnu; i++) {
        rUi(data, o);
        o += 4;
        o += 4;
        o += 4;
        o += 4;
        rUi(data, o);
        o += 4;
        var csize = rUi(data, o);
        o += 4;
        var usize = rUi(data, o);
        o += 4;
        var nl = rUs(data, o),
            el = rUs(data, o + 2),
            cl = rUs(data, o + 4);
        o += 6;
        o += 8;
        var roff = rUi(data, o);
        o += 4;
        o += nl + el + cl;

        UZIP._readLocal(data, roff, out, csize, usize, onlyNames);
      }

      return out;
    };

    UZIP._readLocal = function (data, o, out, csize, usize, onlyNames) {
      var rUs = UZIP.bin.readUshort,
          rUi = UZIP.bin.readUint;
      rUi(data, o);
      o += 4;
      rUs(data, o);
      o += 2;
      rUs(data, o);
      o += 2;
      var cmpr = rUs(data, o);
      o += 2;
      rUi(data, o);
      o += 4;
      rUi(data, o);
      o += 4;
      o += 8;
      var nlen = rUs(data, o);
      o += 2;
      var elen = rUs(data, o);
      o += 2;
      var name = UZIP.bin.readUTF8(data, o, nlen);
      o += nlen;
      o += elen;

      if (onlyNames) {
        out[name] = {
          size: usize,
          csize: csize
        };
        return;
      }

      var file = new Uint8Array(data.buffer, o);

      if (cmpr == 0) out[name] = new Uint8Array(file.buffer.slice(o, o + csize));else if (cmpr == 8) {
        var buf = new Uint8Array(usize);
        UZIP.inflateRaw(file, buf);
        out[name] = buf;
      } else throw "unknown compression method: " + cmpr;
    };

    UZIP.inflateRaw = function (file, buf) {
      return UZIP.F.inflate(file, buf);
    };

    UZIP.inflate = function (file, buf) {
      file[0];
          file[1];
      return UZIP.inflateRaw(new Uint8Array(file.buffer, file.byteOffset + 2, file.length - 6), buf);
    };

    UZIP.deflate = function (data, opts) {
      if (opts == null) opts = {
        level: 6
      };
      var off = 0,
          buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
      buf[off] = 120;
      buf[off + 1] = 156;
      off += 2;
      off = UZIP.F.deflateRaw(data, buf, off, opts.level);
      var crc = UZIP.adler(data, 0, data.length);
      buf[off + 0] = crc >>> 24 & 255;
      buf[off + 1] = crc >>> 16 & 255;
      buf[off + 2] = crc >>> 8 & 255;
      buf[off + 3] = crc >>> 0 & 255;
      return new Uint8Array(buf.buffer, 0, off + 4);
    };

    UZIP.deflateRaw = function (data, opts) {
      if (opts == null) opts = {
        level: 6
      };
      var buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
      var off = UZIP.F.deflateRaw(data, buf, off, opts.level);
      return new Uint8Array(buf.buffer, 0, off);
    };

    UZIP.encode = function (obj, noCmpr) {
      if (noCmpr == null) noCmpr = false;
      var tot = 0,
          wUi = UZIP.bin.writeUint,
          wUs = UZIP.bin.writeUshort;
      var zpd = {};

      for (var p in obj) {
        var cpr = !UZIP._noNeed(p) && !noCmpr,
            buf = obj[p],
            crc = UZIP.crc.crc(buf, 0, buf.length);
        zpd[p] = {
          cpr: cpr,
          usize: buf.length,
          crc: crc,
          file: cpr ? UZIP.deflateRaw(buf) : buf
        };
      }

      for (var p in zpd) tot += zpd[p].file.length + 30 + 46 + 2 * UZIP.bin.sizeUTF8(p);

      tot += 22;
      var data = new Uint8Array(tot),
          o = 0;
      var fof = [];

      for (var p in zpd) {
        var file = zpd[p];
        fof.push(o);
        o = UZIP._writeHeader(data, o, p, file, 0);
      }

      var i = 0,
          ioff = o;

      for (var p in zpd) {
        var file = zpd[p];
        fof.push(o);
        o = UZIP._writeHeader(data, o, p, file, 1, fof[i++]);
      }

      var csize = o - ioff;
      wUi(data, o, 0x06054b50);
      o += 4;
      o += 4;
      wUs(data, o, i);
      o += 2;
      wUs(data, o, i);
      o += 2;
      wUi(data, o, csize);
      o += 4;
      wUi(data, o, ioff);
      o += 4;
      o += 2;
      return data.buffer;
    };

    UZIP._noNeed = function (fn) {
      var ext = fn.split(".").pop().toLowerCase();
      return "png,jpg,jpeg,zip".indexOf(ext) != -1;
    };

    UZIP._writeHeader = function (data, o, p, obj, t, roff) {
      var wUi = UZIP.bin.writeUint,
          wUs = UZIP.bin.writeUshort;
      var file = obj.file;
      wUi(data, o, t == 0 ? 0x04034b50 : 0x02014b50);
      o += 4;
      if (t == 1) o += 2;
      wUs(data, o, 20);
      o += 2;
      wUs(data, o, 0);
      o += 2;
      wUs(data, o, obj.cpr ? 8 : 0);
      o += 2;
      wUi(data, o, 0);
      o += 4;
      wUi(data, o, obj.crc);
      o += 4;
      wUi(data, o, file.length);
      o += 4;
      wUi(data, o, obj.usize);
      o += 4;
      wUs(data, o, UZIP.bin.sizeUTF8(p));
      o += 2;
      wUs(data, o, 0);
      o += 2;

      if (t == 1) {
        o += 2;
        o += 2;
        o += 6;
        wUi(data, o, roff);
        o += 4;
      }

      var nlen = UZIP.bin.writeUTF8(data, o, p);
      o += nlen;

      if (t == 0) {
        data.set(file, o);
        o += file.length;
      }

      return o;
    };

    UZIP.crc = {
      table: function () {
        var tab = new Uint32Array(256);

        for (var n = 0; n < 256; n++) {
          var c = n;

          for (var k = 0; k < 8; k++) {
            if (c & 1) c = 0xedb88320 ^ c >>> 1;else c = c >>> 1;
          }

          tab[n] = c;
        }

        return tab;
      }(),
      update: function (c, buf, off, len) {
        for (var i = 0; i < len; i++) c = UZIP.crc.table[(c ^ buf[off + i]) & 0xff] ^ c >>> 8;

        return c;
      },
      crc: function (b, o, l) {
        return UZIP.crc.update(0xffffffff, b, o, l) ^ 0xffffffff;
      }
    };

    UZIP.adler = function (data, o, len) {
      var a = 1,
          b = 0;
      var off = o,
          end = o + len;

      while (off < end) {
        var eend = Math.min(off + 5552, end);

        while (off < eend) {
          a += data[off++];
          b += a;
        }

        a = a % 65521;
        b = b % 65521;
      }

      return b << 16 | a;
    };

    UZIP.bin = {
      readUshort: function (buff, p) {
        return buff[p] | buff[p + 1] << 8;
      },
      writeUshort: function (buff, p, n) {
        buff[p] = n & 255;
        buff[p + 1] = n >> 8 & 255;
      },
      readUint: function (buff, p) {
        return buff[p + 3] * (256 * 256 * 256) + (buff[p + 2] << 16 | buff[p + 1] << 8 | buff[p]);
      },
      writeUint: function (buff, p, n) {
        buff[p] = n & 255;
        buff[p + 1] = n >> 8 & 255;
        buff[p + 2] = n >> 16 & 255;
        buff[p + 3] = n >> 24 & 255;
      },
      readASCII: function (buff, p, l) {
        var s = "";

        for (var i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);

        return s;
      },
      writeASCII: function (data, p, s) {
        for (var i = 0; i < s.length; i++) data[p + i] = s.charCodeAt(i);
      },
      pad: function (n) {
        return n.length < 2 ? "0" + n : n;
      },
      readUTF8: function (buff, p, l) {
        var s = "",
            ns;

        for (var i = 0; i < l; i++) s += "%" + UZIP.bin.pad(buff[p + i].toString(16));

        try {
          ns = decodeURIComponent(s);
        } catch (e) {
          return UZIP.bin.readASCII(buff, p, l);
        }

        return ns;
      },
      writeUTF8: function (buff, p, str) {
        var strl = str.length,
            i = 0;

        for (var ci = 0; ci < strl; ci++) {
          var code = str.charCodeAt(ci);

          if ((code & 0xffffffff - (1 << 7) + 1) == 0) {
            buff[p + i] = code;
            i++;
          } else if ((code & 0xffffffff - (1 << 11) + 1) == 0) {
            buff[p + i] = 192 | code >> 6;
            buff[p + i + 1] = 128 | code >> 0 & 63;
            i += 2;
          } else if ((code & 0xffffffff - (1 << 16) + 1) == 0) {
            buff[p + i] = 224 | code >> 12;
            buff[p + i + 1] = 128 | code >> 6 & 63;
            buff[p + i + 2] = 128 | code >> 0 & 63;
            i += 3;
          } else if ((code & 0xffffffff - (1 << 21) + 1) == 0) {
            buff[p + i] = 240 | code >> 18;
            buff[p + i + 1] = 128 | code >> 12 & 63;
            buff[p + i + 2] = 128 | code >> 6 & 63;
            buff[p + i + 3] = 128 | code >> 0 & 63;
            i += 4;
          } else throw "e";
        }

        return i;
      },
      sizeUTF8: function (str) {
        var strl = str.length,
            i = 0;

        for (var ci = 0; ci < strl; ci++) {
          var code = str.charCodeAt(ci);

          if ((code & 0xffffffff - (1 << 7) + 1) == 0) {
            i++;
          } else if ((code & 0xffffffff - (1 << 11) + 1) == 0) {
            i += 2;
          } else if ((code & 0xffffffff - (1 << 16) + 1) == 0) {
            i += 3;
          } else if ((code & 0xffffffff - (1 << 21) + 1) == 0) {
            i += 4;
          } else throw "e";
        }

        return i;
      }
    };
    UZIP.F = {};

    UZIP.F.deflateRaw = function (data, out, opos, lvl) {
      var opts = [[0, 0, 0, 0, 0], [4, 4, 8, 4, 0], [4, 5, 16, 8, 0], [4, 6, 16, 16, 0], [4, 10, 16, 32, 0], [8, 16, 32, 32, 0], [8, 16, 128, 128, 0], [8, 32, 128, 256, 0], [32, 128, 258, 1024, 1], [32, 258, 258, 4096, 1]];
      var opt = opts[lvl];
      var U = UZIP.F.U,
          goodIndex = UZIP.F._goodIndex;
          UZIP.F._hash;
          var putsE = UZIP.F._putsE;
      var i = 0,
          pos = opos << 3,
          cvrd = 0,
          dlen = data.length;

      if (lvl == 0) {
        while (i < dlen) {
          var len = Math.min(0xffff, dlen - i);
          putsE(out, pos, i + len == dlen ? 1 : 0);
          pos = UZIP.F._copyExact(data, i, len, out, pos + 8);
          i += len;
        }

        return pos >>> 3;
      }

      var lits = U.lits,
          strt = U.strt,
          prev = U.prev,
          li = 0,
          lc = 0,
          bs = 0,
          ebits = 0,
          c = 0,
          nc = 0;

      if (dlen > 2) {
        nc = UZIP.F._hash(data, 0);
        strt[nc] = 0;
      }

      for (i = 0; i < dlen; i++) {
        c = nc;

        if (i + 1 < dlen - 2) {
          nc = UZIP.F._hash(data, i + 1);
          var ii = i + 1 & 0x7fff;
          prev[ii] = strt[nc];
          strt[nc] = ii;
        }

        if (cvrd <= i) {
          if ((li > 14000 || lc > 26697) && dlen - i > 100) {
            if (cvrd < i) {
              lits[li] = i - cvrd;
              li += 2;
              cvrd = i;
            }

            pos = UZIP.F._writeBlock(i == dlen - 1 || cvrd == dlen ? 1 : 0, lits, li, ebits, data, bs, i - bs, out, pos);
            li = lc = ebits = 0;
            bs = i;
          }

          var mch = 0;
          if (i < dlen - 2) mch = UZIP.F._bestMatch(data, i, prev, c, Math.min(opt[2], dlen - i), opt[3]);
          var len = mch >>> 16,
              dst = mch & 0xffff;

          if (mch != 0) {
            var len = mch >>> 16,
                dst = mch & 0xffff;
            var lgi = goodIndex(len, U.of0);
            U.lhst[257 + lgi]++;
            var dgi = goodIndex(dst, U.df0);
            U.dhst[dgi]++;
            ebits += U.exb[lgi] + U.dxb[dgi];
            lits[li] = len << 23 | i - cvrd;
            lits[li + 1] = dst << 16 | lgi << 8 | dgi;
            li += 2;
            cvrd = i + len;
          } else {
            U.lhst[data[i]]++;
          }

          lc++;
        }
      }

      if (bs != i || data.length == 0) {
        if (cvrd < i) {
          lits[li] = i - cvrd;
          li += 2;
          cvrd = i;
        }

        pos = UZIP.F._writeBlock(1, lits, li, ebits, data, bs, i - bs, out, pos);
        li = 0;
        lc = 0;
        li = lc = ebits = 0;
        bs = i;
      }

      while ((pos & 7) != 0) pos++;

      return pos >>> 3;
    };

    UZIP.F._bestMatch = function (data, i, prev, c, nice, chain) {
      var ci = i & 0x7fff,
          pi = prev[ci];
      var dif = ci - pi + (1 << 15) & 0x7fff;
      if (pi == ci || c != UZIP.F._hash(data, i - dif)) return 0;
      var tl = 0,
          td = 0;
      var dlim = Math.min(0x7fff, i);

      while (dif <= dlim && --chain != 0 && pi != ci) {
        if (tl == 0 || data[i + tl] == data[i + tl - dif]) {
          var cl = UZIP.F._howLong(data, i, dif);

          if (cl > tl) {
            tl = cl;
            td = dif;
            if (tl >= nice) break;
            if (dif + 2 < cl) cl = dif + 2;
            var maxd = 0;

            for (var j = 0; j < cl - 2; j++) {
              var ei = i - dif + j + (1 << 15) & 0x7fff;
              var li = prev[ei];
              var curd = ei - li + (1 << 15) & 0x7fff;

              if (curd > maxd) {
                maxd = curd;
                pi = ei;
              }
            }
          }
        }

        ci = pi;
        pi = prev[ci];
        dif += ci - pi + (1 << 15) & 0x7fff;
      }

      return tl << 16 | td;
    };

    UZIP.F._howLong = function (data, i, dif) {
      if (data[i] != data[i - dif] || data[i + 1] != data[i + 1 - dif] || data[i + 2] != data[i + 2 - dif]) return 0;
      var oi = i,
          l = Math.min(data.length, i + 258);
      i += 3;

      while (i < l && data[i] == data[i - dif]) i++;

      return i - oi;
    };

    UZIP.F._hash = function (data, i) {
      return (data[i] << 8 | data[i + 1]) + (data[i + 2] << 4) & 0xffff;
    };

    UZIP.saved = 0;

    UZIP.F._writeBlock = function (BFINAL, lits, li, ebits, data, o0, l0, out, pos) {
      var U = UZIP.F.U,
          putsF = UZIP.F._putsF,
          putsE = UZIP.F._putsE;
      var T, ML, MD, MH, numl, numd, numh, lset, dset;
      U.lhst[256]++;
      T = UZIP.F.getTrees();
      ML = T[0];
      MD = T[1];
      MH = T[2];
      numl = T[3];
      numd = T[4];
      numh = T[5];
      lset = T[6];
      dset = T[7];
      var cstSize = ((pos + 3 & 7) == 0 ? 0 : 8 - (pos + 3 & 7)) + 32 + (l0 << 3);
      var fxdSize = ebits + UZIP.F.contSize(U.fltree, U.lhst) + UZIP.F.contSize(U.fdtree, U.dhst);
      var dynSize = ebits + UZIP.F.contSize(U.ltree, U.lhst) + UZIP.F.contSize(U.dtree, U.dhst);
      dynSize += 14 + 3 * numh + UZIP.F.contSize(U.itree, U.ihst) + (U.ihst[16] * 2 + U.ihst[17] * 3 + U.ihst[18] * 7);

      for (var j = 0; j < 286; j++) U.lhst[j] = 0;

      for (var j = 0; j < 30; j++) U.dhst[j] = 0;

      for (var j = 0; j < 19; j++) U.ihst[j] = 0;

      var BTYPE = cstSize < fxdSize && cstSize < dynSize ? 0 : fxdSize < dynSize ? 1 : 2;
      putsF(out, pos, BFINAL);
      putsF(out, pos + 1, BTYPE);
      pos += 3;

      if (BTYPE == 0) {
        while ((pos & 7) != 0) pos++;

        pos = UZIP.F._copyExact(data, o0, l0, out, pos);
      } else {
        var ltree, dtree;

        if (BTYPE == 1) {
          ltree = U.fltree;
          dtree = U.fdtree;
        }

        if (BTYPE == 2) {
          UZIP.F.makeCodes(U.ltree, ML);
          UZIP.F.revCodes(U.ltree, ML);
          UZIP.F.makeCodes(U.dtree, MD);
          UZIP.F.revCodes(U.dtree, MD);
          UZIP.F.makeCodes(U.itree, MH);
          UZIP.F.revCodes(U.itree, MH);
          ltree = U.ltree;
          dtree = U.dtree;
          putsE(out, pos, numl - 257);
          pos += 5;
          putsE(out, pos, numd - 1);
          pos += 5;
          putsE(out, pos, numh - 4);
          pos += 4;

          for (var i = 0; i < numh; i++) putsE(out, pos + i * 3, U.itree[(U.ordr[i] << 1) + 1]);

          pos += 3 * numh;
          pos = UZIP.F._codeTiny(lset, U.itree, out, pos);
          pos = UZIP.F._codeTiny(dset, U.itree, out, pos);
        }

        var off = o0;

        for (var si = 0; si < li; si += 2) {
          var qb = lits[si],
              len = qb >>> 23,
              end = off + (qb & (1 << 23) - 1);

          while (off < end) pos = UZIP.F._writeLit(data[off++], ltree, out, pos);

          if (len != 0) {
            var qc = lits[si + 1],
                dst = qc >> 16,
                lgi = qc >> 8 & 255,
                dgi = qc & 255;
            pos = UZIP.F._writeLit(257 + lgi, ltree, out, pos);
            putsE(out, pos, len - U.of0[lgi]);
            pos += U.exb[lgi];
            pos = UZIP.F._writeLit(dgi, dtree, out, pos);
            putsF(out, pos, dst - U.df0[dgi]);
            pos += U.dxb[dgi];
            off += len;
          }
        }

        pos = UZIP.F._writeLit(256, ltree, out, pos);
      }

      return pos;
    };

    UZIP.F._copyExact = function (data, off, len, out, pos) {
      var p8 = pos >>> 3;
      out[p8] = len;
      out[p8 + 1] = len >>> 8;
      out[p8 + 2] = 255 - out[p8];
      out[p8 + 3] = 255 - out[p8 + 1];
      p8 += 4;
      out.set(new Uint8Array(data.buffer, off, len), p8);
      return pos + (len + 4 << 3);
    };

    UZIP.F.getTrees = function () {
      var U = UZIP.F.U;

      var ML = UZIP.F._hufTree(U.lhst, U.ltree, 15);

      var MD = UZIP.F._hufTree(U.dhst, U.dtree, 15);

      var lset = [],
          numl = UZIP.F._lenCodes(U.ltree, lset);

      var dset = [],
          numd = UZIP.F._lenCodes(U.dtree, dset);

      for (var i = 0; i < lset.length; i += 2) U.ihst[lset[i]]++;

      for (var i = 0; i < dset.length; i += 2) U.ihst[dset[i]]++;

      var MH = UZIP.F._hufTree(U.ihst, U.itree, 7);

      var numh = 19;

      while (numh > 4 && U.itree[(U.ordr[numh - 1] << 1) + 1] == 0) numh--;

      return [ML, MD, MH, numl, numd, numh, lset, dset];
    };

    UZIP.F.getSecond = function (a) {
      var b = [];

      for (var i = 0; i < a.length; i += 2) b.push(a[i + 1]);

      return b;
    };

    UZIP.F.nonZero = function (a) {
      var b = "";

      for (var i = 0; i < a.length; i += 2) if (a[i + 1] != 0) b += (i >> 1) + ",";

      return b;
    };

    UZIP.F.contSize = function (tree, hst) {
      var s = 0;

      for (var i = 0; i < hst.length; i++) s += hst[i] * tree[(i << 1) + 1];

      return s;
    };

    UZIP.F._codeTiny = function (set, tree, out, pos) {
      for (var i = 0; i < set.length; i += 2) {
        var l = set[i],
            rst = set[i + 1];
        pos = UZIP.F._writeLit(l, tree, out, pos);
        var rsl = l == 16 ? 2 : l == 17 ? 3 : 7;

        if (l > 15) {
          UZIP.F._putsE(out, pos, rst, rsl);

          pos += rsl;
        }
      }

      return pos;
    };

    UZIP.F._lenCodes = function (tree, set) {
      var len = tree.length;

      while (len != 2 && tree[len - 1] == 0) len -= 2;

      for (var i = 0; i < len; i += 2) {
        var l = tree[i + 1],
            nxt = i + 3 < len ? tree[i + 3] : -1,
            nnxt = i + 5 < len ? tree[i + 5] : -1,
            prv = i == 0 ? -1 : tree[i - 1];

        if (l == 0 && nxt == l && nnxt == l) {
          var lz = i + 5;

          while (lz + 2 < len && tree[lz + 2] == l) lz += 2;

          var zc = Math.min(lz + 1 - i >>> 1, 138);
          if (zc < 11) set.push(17, zc - 3);else set.push(18, zc - 11);
          i += zc * 2 - 2;
        } else if (l == prv && nxt == l && nnxt == l) {
          var lz = i + 5;

          while (lz + 2 < len && tree[lz + 2] == l) lz += 2;

          var zc = Math.min(lz + 1 - i >>> 1, 6);
          set.push(16, zc - 3);
          i += zc * 2 - 2;
        } else set.push(l, 0);
      }

      return len >>> 1;
    };

    UZIP.F._hufTree = function (hst, tree, MAXL) {
      var list = [],
          hl = hst.length,
          tl = tree.length,
          i = 0;

      for (i = 0; i < tl; i += 2) {
        tree[i] = 0;
        tree[i + 1] = 0;
      }

      for (i = 0; i < hl; i++) if (hst[i] != 0) list.push({
        lit: i,
        f: hst[i]
      });

      var end = list.length,
          l2 = list.slice(0);
      if (end == 0) return 0;

      if (end == 1) {
        var lit = list[0].lit,
            l2 = lit == 0 ? 1 : 0;
        tree[(lit << 1) + 1] = 1;
        tree[(l2 << 1) + 1] = 1;
        return 1;
      }

      list.sort(function (a, b) {
        return a.f - b.f;
      });
      var a = list[0],
          b = list[1],
          i0 = 0,
          i1 = 1,
          i2 = 2;
      list[0] = {
        lit: -1,
        f: a.f + b.f,
        l: a,
        r: b,
        d: 0
      };

      while (i1 != end - 1) {
        if (i0 != i1 && (i2 == end || list[i0].f < list[i2].f)) {
          a = list[i0++];
        } else {
          a = list[i2++];
        }

        if (i0 != i1 && (i2 == end || list[i0].f < list[i2].f)) {
          b = list[i0++];
        } else {
          b = list[i2++];
        }

        list[i1++] = {
          lit: -1,
          f: a.f + b.f,
          l: a,
          r: b
        };
      }

      var maxl = UZIP.F.setDepth(list[i1 - 1], 0);

      if (maxl > MAXL) {
        UZIP.F.restrictDepth(l2, MAXL, maxl);
        maxl = MAXL;
      }

      for (i = 0; i < end; i++) tree[(l2[i].lit << 1) + 1] = l2[i].d;

      return maxl;
    };

    UZIP.F.setDepth = function (t, d) {
      if (t.lit != -1) {
        t.d = d;
        return d;
      }

      return Math.max(UZIP.F.setDepth(t.l, d + 1), UZIP.F.setDepth(t.r, d + 1));
    };

    UZIP.F.restrictDepth = function (dps, MD, maxl) {
      var i = 0,
          bCost = 1 << maxl - MD,
          dbt = 0;
      dps.sort(function (a, b) {
        return b.d == a.d ? a.f - b.f : b.d - a.d;
      });

      for (i = 0; i < dps.length; i++) if (dps[i].d > MD) {
        var od = dps[i].d;
        dps[i].d = MD;
        dbt += bCost - (1 << maxl - od);
      } else break;

      dbt = dbt >>> maxl - MD;

      while (dbt > 0) {
        var od = dps[i].d;

        if (od < MD) {
          dps[i].d++;
          dbt -= 1 << MD - od - 1;
        } else i++;
      }

      for (; i >= 0; i--) if (dps[i].d == MD && dbt < 0) {
        dps[i].d--;
        dbt++;
      }

      if (dbt != 0) console.log("debt left");
    };

    UZIP.F._goodIndex = function (v, arr) {
      var i = 0;
      if (arr[i | 16] <= v) i |= 16;
      if (arr[i | 8] <= v) i |= 8;
      if (arr[i | 4] <= v) i |= 4;
      if (arr[i | 2] <= v) i |= 2;
      if (arr[i | 1] <= v) i |= 1;
      return i;
    };

    UZIP.F._writeLit = function (ch, ltree, out, pos) {
      UZIP.F._putsF(out, pos, ltree[ch << 1]);

      return pos + ltree[(ch << 1) + 1];
    };

    UZIP.F.inflate = function (data, buf) {
      var u8 = Uint8Array;
      if (data[0] == 3 && data[1] == 0) return buf ? buf : new u8(0);
      var F = UZIP.F,
          bitsF = F._bitsF,
          bitsE = F._bitsE,
          decodeTiny = F._decodeTiny,
          makeCodes = F.makeCodes,
          codes2map = F.codes2map,
          get17 = F._get17;
      var U = F.U;
      var noBuf = buf == null;
      if (noBuf) buf = new u8(data.length >>> 2 << 3);
      var BFINAL = 0,
          BTYPE = 0,
          HLIT = 0,
          HDIST = 0,
          HCLEN = 0,
          ML = 0,
          MD = 0;
      var off = 0,
          pos = 0;
      var lmap, dmap;

      while (BFINAL == 0) {
        BFINAL = bitsF(data, pos, 1);
        BTYPE = bitsF(data, pos + 1, 2);
        pos += 3;

        if (BTYPE == 0) {
          if ((pos & 7) != 0) pos += 8 - (pos & 7);
          var p8 = (pos >>> 3) + 4,
              len = data[p8 - 4] | data[p8 - 3] << 8;
          if (noBuf) buf = UZIP.F._check(buf, off + len);
          buf.set(new u8(data.buffer, data.byteOffset + p8, len), off);
          pos = p8 + len << 3;
          off += len;
          continue;
        }

        if (noBuf) buf = UZIP.F._check(buf, off + (1 << 17));

        if (BTYPE == 1) {
          lmap = U.flmap;
          dmap = U.fdmap;
          ML = (1 << 9) - 1;
          MD = (1 << 5) - 1;
        }

        if (BTYPE == 2) {
          HLIT = bitsE(data, pos, 5) + 257;
          HDIST = bitsE(data, pos + 5, 5) + 1;
          HCLEN = bitsE(data, pos + 10, 4) + 4;
          pos += 14;

          for (var i = 0; i < 38; i += 2) {
            U.itree[i] = 0;
            U.itree[i + 1] = 0;
          }

          var tl = 1;

          for (var i = 0; i < HCLEN; i++) {
            var l = bitsE(data, pos + i * 3, 3);
            U.itree[(U.ordr[i] << 1) + 1] = l;
            if (l > tl) tl = l;
          }

          pos += 3 * HCLEN;
          makeCodes(U.itree, tl);
          codes2map(U.itree, tl, U.imap);
          lmap = U.lmap;
          dmap = U.dmap;
          pos = decodeTiny(U.imap, (1 << tl) - 1, HLIT + HDIST, data, pos, U.ttree);

          var mx0 = F._copyOut(U.ttree, 0, HLIT, U.ltree);

          ML = (1 << mx0) - 1;

          var mx1 = F._copyOut(U.ttree, HLIT, HDIST, U.dtree);

          MD = (1 << mx1) - 1;
          makeCodes(U.ltree, mx0);
          codes2map(U.ltree, mx0, lmap);
          makeCodes(U.dtree, mx1);
          codes2map(U.dtree, mx1, dmap);
        }

        while (true) {
          var code = lmap[get17(data, pos) & ML];
          pos += code & 15;
          var lit = code >>> 4;

          if (lit >>> 8 == 0) {
            buf[off++] = lit;
          } else if (lit == 256) {
            break;
          } else {
            var end = off + lit - 254;

            if (lit > 264) {
              var ebs = U.ldef[lit - 257];
              end = off + (ebs >>> 3) + bitsE(data, pos, ebs & 7);
              pos += ebs & 7;
            }

            var dcode = dmap[get17(data, pos) & MD];
            pos += dcode & 15;
            var dlit = dcode >>> 4;
            var dbs = U.ddef[dlit],
                dst = (dbs >>> 4) + bitsF(data, pos, dbs & 15);
            pos += dbs & 15;
            if (noBuf) buf = UZIP.F._check(buf, off + (1 << 17));

            while (off < end) {
              buf[off] = buf[off++ - dst];
              buf[off] = buf[off++ - dst];
              buf[off] = buf[off++ - dst];
              buf[off] = buf[off++ - dst];
            }

            off = end;
          }
        }
      }

      return buf.length == off ? buf : buf.slice(0, off);
    };

    UZIP.F._check = function (buf, len) {
      var bl = buf.length;
      if (len <= bl) return buf;
      var nbuf = new Uint8Array(Math.max(bl << 1, len));
      nbuf.set(buf, 0);
      return nbuf;
    };

    UZIP.F._decodeTiny = function (lmap, LL, len, data, pos, tree) {
      var bitsE = UZIP.F._bitsE,
          get17 = UZIP.F._get17;
      var i = 0;

      while (i < len) {
        var code = lmap[get17(data, pos) & LL];
        pos += code & 15;
        var lit = code >>> 4;

        if (lit <= 15) {
          tree[i] = lit;
          i++;
        } else {
          var ll = 0,
              n = 0;

          if (lit == 16) {
            n = 3 + bitsE(data, pos, 2);
            pos += 2;
            ll = tree[i - 1];
          } else if (lit == 17) {
            n = 3 + bitsE(data, pos, 3);
            pos += 3;
          } else if (lit == 18) {
            n = 11 + bitsE(data, pos, 7);
            pos += 7;
          }

          var ni = i + n;

          while (i < ni) {
            tree[i] = ll;
            i++;
          }
        }
      }

      return pos;
    };

    UZIP.F._copyOut = function (src, off, len, tree) {
      var mx = 0,
          i = 0,
          tl = tree.length >>> 1;

      while (i < len) {
        var v = src[i + off];
        tree[i << 1] = 0;
        tree[(i << 1) + 1] = v;
        if (v > mx) mx = v;
        i++;
      }

      while (i < tl) {
        tree[i << 1] = 0;
        tree[(i << 1) + 1] = 0;
        i++;
      }

      return mx;
    };

    UZIP.F.makeCodes = function (tree, MAX_BITS) {
      var U = UZIP.F.U;
      var max_code = tree.length;
      var code, bits, n, i, len;
      var bl_count = U.bl_count;

      for (var i = 0; i <= MAX_BITS; i++) bl_count[i] = 0;

      for (i = 1; i < max_code; i += 2) bl_count[tree[i]]++;

      var next_code = U.next_code;
      code = 0;
      bl_count[0] = 0;

      for (bits = 1; bits <= MAX_BITS; bits++) {
        code = code + bl_count[bits - 1] << 1;
        next_code[bits] = code;
      }

      for (n = 0; n < max_code; n += 2) {
        len = tree[n + 1];

        if (len != 0) {
          tree[n] = next_code[len];
          next_code[len]++;
        }
      }
    };

    UZIP.F.codes2map = function (tree, MAX_BITS, map) {
      var max_code = tree.length;
      var U = UZIP.F.U,
          r15 = U.rev15;

      for (var i = 0; i < max_code; i += 2) if (tree[i + 1] != 0) {
        var lit = i >> 1;
        var cl = tree[i + 1],
            val = lit << 4 | cl;
        var rest = MAX_BITS - cl,
            i0 = tree[i] << rest,
            i1 = i0 + (1 << rest);

        while (i0 != i1) {
          var p0 = r15[i0] >>> 15 - MAX_BITS;
          map[p0] = val;
          i0++;
        }
      }
    };

    UZIP.F.revCodes = function (tree, MAX_BITS) {
      var r15 = UZIP.F.U.rev15,
          imb = 15 - MAX_BITS;

      for (var i = 0; i < tree.length; i += 2) {
        var i0 = tree[i] << MAX_BITS - tree[i + 1];
        tree[i] = r15[i0] >>> imb;
      }
    };

    UZIP.F._putsE = function (dt, pos, val) {
      val = val << (pos & 7);
      var o = pos >>> 3;
      dt[o] |= val;
      dt[o + 1] |= val >>> 8;
    };

    UZIP.F._putsF = function (dt, pos, val) {
      val = val << (pos & 7);
      var o = pos >>> 3;
      dt[o] |= val;
      dt[o + 1] |= val >>> 8;
      dt[o + 2] |= val >>> 16;
    };

    UZIP.F._bitsE = function (dt, pos, length) {
      return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8) >>> (pos & 7) & (1 << length) - 1;
    };

    UZIP.F._bitsF = function (dt, pos, length) {
      return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7) & (1 << length) - 1;
    };

    UZIP.F._get17 = function (dt, pos) {
      return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7);
    };

    UZIP.F._get25 = function (dt, pos) {
      return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16 | dt[(pos >>> 3) + 3] << 24) >>> (pos & 7);
    };

    UZIP.F.U = function () {
      var u16 = Uint16Array,
          u32 = Uint32Array;
      return {
        next_code: new u16(16),
        bl_count: new u16(16),
        ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
        exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
        ldef: new u16(32),
        df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
        dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
        ddef: new u32(32),
        flmap: new u16(512),
        fltree: [],
        fdmap: new u16(32),
        fdtree: [],
        lmap: new u16(32768),
        ltree: [],
        ttree: [],
        dmap: new u16(32768),
        dtree: [],
        imap: new u16(512),
        itree: [],
        rev15: new u16(1 << 15),
        lhst: new u32(286),
        dhst: new u32(30),
        ihst: new u32(19),
        lits: new u32(15000),
        strt: new u16(1 << 16),
        prev: new u16(1 << 15)
      };
    }();

    (function () {
      var U = UZIP.F.U;
      var len = 1 << 15;

      for (var i = 0; i < len; i++) {
        var x = i;
        x = (x & 0xaaaaaaaa) >>> 1 | (x & 0x55555555) << 1;
        x = (x & 0xcccccccc) >>> 2 | (x & 0x33333333) << 2;
        x = (x & 0xf0f0f0f0) >>> 4 | (x & 0x0f0f0f0f) << 4;
        x = (x & 0xff00ff00) >>> 8 | (x & 0x00ff00ff) << 8;
        U.rev15[i] = (x >>> 16 | x << 16) >>> 17;
      }

      function pushV(tgt, n, sv) {
        while (n-- != 0) tgt.push(0, sv);
      }

      for (var i = 0; i < 32; i++) {
        U.ldef[i] = U.of0[i] << 3 | U.exb[i];
        U.ddef[i] = U.df0[i] << 4 | U.dxb[i];
      }

      pushV(U.fltree, 144, 8);
      pushV(U.fltree, 255 - 143, 9);
      pushV(U.fltree, 279 - 255, 7);
      pushV(U.fltree, 287 - 279, 8);
      UZIP.F.makeCodes(U.fltree, 9);
      UZIP.F.codes2map(U.fltree, 9, U.flmap);
      UZIP.F.revCodes(U.fltree, 9);
      pushV(U.fdtree, 32, 5);
      UZIP.F.makeCodes(U.fdtree, 5);
      UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
      UZIP.F.revCodes(U.fdtree, 5);
      pushV(U.itree, 19, 0);
      pushV(U.ltree, 286, 0);
      pushV(U.dtree, 30, 0);
      pushV(U.ttree, 320, 0);
    })();
  });

  var UZIP = /*#__PURE__*/Object.freeze(/*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    'default': UZIP_1
  }, [UZIP_1]));

  var UPNG = {};

  UPNG.toRGBA8 = function (out) {
    var w = out.width;
    var h = out.height;
    if (out.tabs.acTL == null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
    var frms = [];
    if (out.frames[0].data == null) out.frames[0].data = out.data;
    var len = w * h * 4;
    var img = new Uint8Array(len);
    var empty = new Uint8Array(len);
    var prev = new Uint8Array(len);

    for (var i = 0; i < out.frames.length; i++) {
      var frm = out.frames[i];
      var fx = frm.rect.x;
      var fy = frm.rect.y;
      var fw = frm.rect.width;
      var fh = frm.rect.height;
      var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw, fh, out);
      if (i != 0) for (var j = 0; j < len; j++) {
        prev[j] = img[j];
      }
      if (frm.blend == 0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);else if (frm.blend == 1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
      frms.push(img.buffer.slice(0));

      if (frm.dispose == 0) ; else if (frm.dispose == 1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);else if (frm.dispose == 2) for (var j = 0; j < len; j++) {
        img[j] = prev[j];
      }
    }

    return frms;
  };

  UPNG.toRGBA8.decodeImage = function (data, w, h, out) {
    var area = w * h;

    var bpp = UPNG.decode._getBPP(out);

    var bpl = Math.ceil(w * bpp / 8);
    var bf = new Uint8Array(area * 4);
    var bf32 = new Uint32Array(bf.buffer);
    var ctype = out.ctype;
    var depth = out.depth;
    var rs = UPNG._bin.readUshort;

    if (ctype == 6) {
      var qarea = area << 2;
      if (depth == 8) for (var i = 0; i < qarea; i += 4) {
        bf[i] = data[i];
        bf[i + 1] = data[i + 1];
        bf[i + 2] = data[i + 2];
        bf[i + 3] = data[i + 3];
      }
      if (depth == 16) for (var i = 0; i < qarea; i++) {
        bf[i] = data[i << 1];
      }
    } else if (ctype == 2) {
      var ts = out.tabs.tRNS;

      if (ts == null) {
        if (depth == 8) for (var i = 0; i < area; i++) {
          var ti = i * 3;
          bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
        }
        if (depth == 16) for (var i = 0; i < area; i++) {
          var ti = i * 6;
          bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
        }
      } else {
        var tr = ts[0];
        var tg = ts[1];
        var tb = ts[2];

        if (depth == 8) {
          for (var i = 0; i < area; i++) {
            var qi = i << 2;
            var ti = i * 3;
            bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
            if (data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb) bf[qi + 3] = 0;
          }
        }

        if (depth == 16) {
          for (var i = 0; i < area; i++) {
            var qi = i << 2;
            var ti = i * 6;
            bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
            if (rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb) bf[qi + 3] = 0;
          }
        }
      }
    } else if (ctype == 3) {
      var p = out.tabs.PLTE;
      var ap = out.tabs.tRNS;
      var tl = ap ? ap.length : 0;

      if (depth == 1) {
        for (var y = 0; y < h; y++) {
          var s0 = y * bpl;
          var t0 = y * w;

          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2;
            var j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1;
            var cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
      }

      if (depth == 2) {
        for (var y = 0; y < h; y++) {
          var s0 = y * bpl;
          var t0 = y * w;

          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2;
            var j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3;
            var cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
      }

      if (depth == 4) {
        for (var y = 0; y < h; y++) {
          var s0 = y * bpl;
          var t0 = y * w;

          for (var i = 0; i < w; i++) {
            var qi = t0 + i << 2;
            var j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15;
            var cj = 3 * j;
            bf[qi] = p[cj];
            bf[qi + 1] = p[cj + 1];
            bf[qi + 2] = p[cj + 2];
            bf[qi + 3] = j < tl ? ap[j] : 255;
          }
        }
      }

      if (depth == 8) {
        for (var i = 0; i < area; i++) {
          var qi = i << 2;
          var j = data[i];
          var cj = 3 * j;
          bf[qi] = p[cj];
          bf[qi + 1] = p[cj + 1];
          bf[qi + 2] = p[cj + 2];
          bf[qi + 3] = j < tl ? ap[j] : 255;
        }
      }
    } else if (ctype == 4) {
      if (depth == 8) {
        for (var i = 0; i < area; i++) {
          var qi = i << 2;
          var di = i << 1;
          var gr = data[di];
          bf[qi] = gr;
          bf[qi + 1] = gr;
          bf[qi + 2] = gr;
          bf[qi + 3] = data[di + 1];
        }
      }

      if (depth == 16) {
        for (var i = 0; i < area; i++) {
          var qi = i << 2;
          var di = i << 2;
          var gr = data[di];
          bf[qi] = gr;
          bf[qi + 1] = gr;
          bf[qi + 2] = gr;
          bf[qi + 3] = data[di + 2];
        }
      }
    } else if (ctype == 0) {
      var tr = out.tabs.tRNS ? out.tabs.tRNS : -1;

      for (var y = 0; y < h; y++) {
        var off = y * bpl;
        var to = y * w;

        if (depth == 1) {
          for (var x = 0; x < w; x++) {
            var gr = 255 * (data[off + (x >>> 3)] >>> 7 - (x & 7) & 1);
            var al = gr == tr * 255 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        } else if (depth == 2) {
          for (var x = 0; x < w; x++) {
            var gr = 85 * (data[off + (x >>> 2)] >>> 6 - ((x & 3) << 1) & 3);
            var al = gr == tr * 85 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        } else if (depth == 4) {
          for (var x = 0; x < w; x++) {
            var gr = 17 * (data[off + (x >>> 1)] >>> 4 - ((x & 1) << 2) & 15);
            var al = gr == tr * 17 ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        } else if (depth == 8) {
          for (var x = 0; x < w; x++) {
            var gr = data[off + x];
            var al = gr == tr ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        } else if (depth == 16) {
          for (var x = 0; x < w; x++) {
            var gr = data[off + (x << 1)];
            var al = rs(data, off + (x << i)) == tr ? 0 : 255;
            bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
          }
        }
      }
    }

    return bf;
  };

  UPNG.decode = function (buff) {
    var data = new Uint8Array(buff);
    var offset = 8;
    var bin = UPNG._bin;
    var rUs = bin.readUshort;
    var rUi = bin.readUint;
    var out = {
      tabs: {},
      frames: []
    };
    var dd = new Uint8Array(data.length);
    var doff = 0;
    var fd;
    var foff = 0;
    var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

    for (var i = 0; i < 8; i++) {
      if (data[i] != mgck[i]) throw 'The input is not a PNG file!';
    }

    while (offset < data.length) {
      var len = bin.readUint(data, offset);
      offset += 4;
      var type = bin.readASCII(data, offset, 4);
      offset += 4;

      if (type == 'IHDR') {
        UPNG.decode._IHDR(data, offset, out);
      } else if (type == 'CgBI') {
        out.tabs[type] = data.slice(offset, offset + 4);
      } else if (type == 'IDAT') {
        for (var i = 0; i < len; i++) {
          dd[doff + i] = data[offset + i];
        }

        doff += len;
      } else if (type == 'acTL') {
        out.tabs[type] = {
          num_frames: rUi(data, offset),
          num_plays: rUi(data, offset + 4)
        };
        fd = new Uint8Array(data.length);
      } else if (type == 'fcTL') {
        if (foff != 0) {
          var fr = out.frames[out.frames.length - 1];
          fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
          foff = 0;
        }

        var rct = {
          x: rUi(data, offset + 12),
          y: rUi(data, offset + 16),
          width: rUi(data, offset + 4),
          height: rUi(data, offset + 8)
        };
        var del = rUs(data, offset + 22);
        del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
        var frm = {
          rect: rct,
          delay: Math.round(del * 1000),
          dispose: data[offset + 24],
          blend: data[offset + 25]
        };
        out.frames.push(frm);
      } else if (type == 'fdAT') {
        for (var i = 0; i < len - 4; i++) {
          fd[foff + i] = data[offset + i + 4];
        }

        foff += len - 4;
      } else if (type == 'pHYs') {
        out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
      } else if (type == 'cHRM') {
        out.tabs[type] = [];

        for (var i = 0; i < 8; i++) {
          out.tabs[type].push(bin.readUint(data, offset + i * 4));
        }
      } else if (type == 'tEXt' || type == 'zTXt') {
        if (out.tabs[type] == null) out.tabs[type] = {};
        var nz = bin.nextZero(data, offset);
        var keyw = bin.readASCII(data, offset, nz - offset);
        var text;
        var tl = offset + len - nz - 1;
        if (type == 'tEXt') text = bin.readASCII(data, nz + 1, tl);else {
          var bfr = UPNG.decode._inflate(data.slice(nz + 2, nz + 2 + tl));

          text = bin.readUTF8(bfr, 0, bfr.length);
        }
        out.tabs[type][keyw] = text;
      } else if (type == 'iTXt') {
        if (out.tabs[type] == null) out.tabs[type] = {};
        var nz = 0;
        var off = offset;
        nz = bin.nextZero(data, off);
        var keyw = bin.readASCII(data, off, nz - off);
        off = nz + 1;
        var cflag = data[off];
        data[off + 1];
        off += 2;
        nz = bin.nextZero(data, off);
        bin.readASCII(data, off, nz - off);
        off = nz + 1;
        nz = bin.nextZero(data, off);
        bin.readUTF8(data, off, nz - off);
        off = nz + 1;
        var text;
        var tl = len - (off - offset);
        if (cflag == 0) text = bin.readUTF8(data, off, tl);else {
          var bfr = UPNG.decode._inflate(data.slice(off, off + tl));

          text = bin.readUTF8(bfr, 0, bfr.length);
        }
        out.tabs[type][keyw] = text;
      } else if (type == 'PLTE') {
        out.tabs[type] = bin.readBytes(data, offset, len);
      } else if (type == 'hIST') {
        var pl = out.tabs.PLTE.length / 3;
        out.tabs[type] = [];

        for (var i = 0; i < pl; i++) {
          out.tabs[type].push(rUs(data, offset + i * 2));
        }
      } else if (type == 'tRNS') {
        if (out.ctype == 3) out.tabs[type] = bin.readBytes(data, offset, len);else if (out.ctype == 0) out.tabs[type] = rUs(data, offset);else if (out.ctype == 2) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];
      } else if (type == 'gAMA') out.tabs[type] = bin.readUint(data, offset) / 100000;else if (type == 'sRGB') out.tabs[type] = data[offset];else if (type == 'bKGD') {
        if (out.ctype == 0 || out.ctype == 4) out.tabs[type] = [rUs(data, offset)];else if (out.ctype == 2 || out.ctype == 6) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];else if (out.ctype == 3) out.tabs[type] = data[offset];
      } else if (type == 'IEND') {
        break;
      }

      offset += len;
      bin.readUint(data, offset);
      offset += 4;
    }

    if (foff != 0) {
      var fr = out.frames[out.frames.length - 1];
      fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
      foff = 0;
    }

    out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
    delete out.compress;
    delete out.interlace;
    delete out.filter;
    return out;
  };

  UPNG.decode._decompress = function (out, dd, w, h) {

    var bpp = UPNG.decode._getBPP(out);

    var bpl = Math.ceil(w * bpp / 8);
    var buff = new Uint8Array((bpl + 1 + out.interlace) * h);
    if (out.tabs.CgBI) dd = UPNG.inflateRaw(dd, buff);else dd = UPNG.decode._inflate(dd, buff);
    if (out.interlace == 0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);else if (out.interlace == 1) dd = UPNG.decode._readInterlace(dd, out);
    return dd;
  };

  UPNG.decode._inflate = function (data, buff) {
    var out = UPNG.inflateRaw(new Uint8Array(data.buffer, 2, data.length - 6), buff);
    return out;
  };

  UPNG.inflateRaw = function () {
    var H = {};
    H.H = {};

    H.H.N = function (N, W) {
      var R = Uint8Array;
      var i = 0;
      var m = 0;
      var J = 0;
      var h = 0;
      var Q = 0;
      var X = 0;
      var u = 0;
      var w = 0;
      var d = 0;
      var v;
      var C;
      if (N[0] == 3 && N[1] == 0) return W || new R(0);
      var V = H.H;
      var n = V.b;
      var A = V.e;
      var l = V.R;
      var M = V.n;
      var I = V.A;
      var e = V.Z;
      var b = V.m;
      var Z = W == null;
      if (Z) W = new R(N.length >>> 2 << 5);

      while (i == 0) {
        i = n(N, d, 1);
        m = n(N, d + 1, 2);
        d += 3;

        if (m == 0) {
          if ((d & 7) != 0) d += 8 - (d & 7);
          var D = (d >>> 3) + 4;
          var q = N[D - 4] | N[D - 3] << 8;
          if (Z) W = H.H.W(W, w + q);
          W.set(new R(N.buffer, N.byteOffset + D, q), w);
          d = D + q << 3;
          w += q;
          continue;
        }

        if (Z) W = H.H.W(W, w + (1 << 17));

        if (m == 1) {
          v = b.J;
          C = b.h;
          X = (1 << 9) - 1;
          u = (1 << 5) - 1;
        }

        if (m == 2) {
          J = A(N, d, 5) + 257;
          h = A(N, d + 5, 5) + 1;
          Q = A(N, d + 10, 4) + 4;
          d += 14;
          var j = 1;

          for (var c = 0; c < 38; c += 2) {
            b.Q[c] = 0;
            b.Q[c + 1] = 0;
          }

          for (var c = 0; c < Q; c++) {
            var K = A(N, d + c * 3, 3);
            b.Q[(b.X[c] << 1) + 1] = K;
            if (K > j) j = K;
          }

          d += 3 * Q;
          M(b.Q, j);
          I(b.Q, j, b.u);
          v = b.w;
          C = b.d;
          d = l(b.u, (1 << j) - 1, J + h, N, d, b.v);
          var r = V.V(b.v, 0, J, b.C);
          X = (1 << r) - 1;
          var S = V.V(b.v, J, h, b.D);
          u = (1 << S) - 1;
          M(b.C, r);
          I(b.C, r, v);
          M(b.D, S);
          I(b.D, S, C);
        }

        while (!0) {
          var T = v[e(N, d) & X];
          d += T & 15;
          var p = T >>> 4;

          if (p >>> 8 == 0) {
            W[w++] = p;
          } else if (p == 256) {
            break;
          } else {
            var z = w + p - 254;

            if (p > 264) {
              var _ = b.q[p - 257];
              z = w + (_ >>> 3) + A(N, d, _ & 7);
              d += _ & 7;
            }

            var $ = C[e(N, d) & u];
            d += $ & 15;
            var s = $ >>> 4;
            var Y = b.c[s];
            var a = (Y >>> 4) + n(N, d, Y & 15);
            d += Y & 15;

            while (w < z) {
              W[w] = W[w++ - a];
              W[w] = W[w++ - a];
              W[w] = W[w++ - a];
              W[w] = W[w++ - a];
            }

            w = z;
          }
        }
      }

      return W.length == w ? W : W.slice(0, w);
    };

    H.H.W = function (N, W) {
      var R = N.length;
      if (W <= R) return N;
      var V = new Uint8Array(R << 1);
      V.set(N, 0);
      return V;
    };

    H.H.R = function (N, W, R, V, n, A) {
      var l = H.H.e;
      var M = H.H.Z;
      var I = 0;

      while (I < R) {
        var e = N[M(V, n) & W];
        n += e & 15;
        var b = e >>> 4;

        if (b <= 15) {
          A[I] = b;
          I++;
        } else {
          var Z = 0;
          var m = 0;

          if (b == 16) {
            m = 3 + l(V, n, 2);
            n += 2;
            Z = A[I - 1];
          } else if (b == 17) {
            m = 3 + l(V, n, 3);
            n += 3;
          } else if (b == 18) {
            m = 11 + l(V, n, 7);
            n += 7;
          }

          var J = I + m;

          while (I < J) {
            A[I] = Z;
            I++;
          }
        }
      }

      return n;
    };

    H.H.V = function (N, W, R, V) {
      var n = 0;
      var A = 0;
      var l = V.length >>> 1;

      while (A < R) {
        var M = N[A + W];
        V[A << 1] = 0;
        V[(A << 1) + 1] = M;
        if (M > n) n = M;
        A++;
      }

      while (A < l) {
        V[A << 1] = 0;
        V[(A << 1) + 1] = 0;
        A++;
      }

      return n;
    };

    H.H.n = function (N, W) {
      var R = H.H.m;
      var V = N.length;
      var n;
      var A;
      var l;
      var M;
      var I;
      var e = R.j;

      for (var M = 0; M <= W; M++) {
        e[M] = 0;
      }

      for (M = 1; M < V; M += 2) {
        e[N[M]]++;
      }

      var b = R.K;
      n = 0;
      e[0] = 0;

      for (A = 1; A <= W; A++) {
        n = n + e[A - 1] << 1;
        b[A] = n;
      }

      for (l = 0; l < V; l += 2) {
        I = N[l + 1];

        if (I != 0) {
          N[l] = b[I];
          b[I]++;
        }
      }
    };

    H.H.A = function (N, W, R) {
      var V = N.length;
      var n = H.H.m;
      var A = n.r;

      for (var l = 0; l < V; l += 2) {
        if (N[l + 1] != 0) {
          var M = l >> 1;
          var I = N[l + 1];
          var e = M << 4 | I;
          var b = W - I;
          var Z = N[l] << b;
          var m = Z + (1 << b);

          while (Z != m) {
            var J = A[Z] >>> 15 - W;
            R[J] = e;
            Z++;
          }
        }
      }
    };

    H.H.l = function (N, W) {
      var R = H.H.m.r;
      var V = 15 - W;

      for (var n = 0; n < N.length; n += 2) {
        var A = N[n] << W - N[n + 1];
        N[n] = R[A] >>> V;
      }
    };

    H.H.M = function (N, W, R) {
      R <<= W & 7;
      var V = W >>> 3;
      N[V] |= R;
      N[V + 1] |= R >>> 8;
    };

    H.H.I = function (N, W, R) {
      R <<= W & 7;
      var V = W >>> 3;
      N[V] |= R;
      N[V + 1] |= R >>> 8;
      N[V + 2] |= R >>> 16;
    };

    H.H.e = function (N, W, R) {
      return (N[W >>> 3] | N[(W >>> 3) + 1] << 8) >>> (W & 7) & (1 << R) - 1;
    };

    H.H.b = function (N, W, R) {
      return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7) & (1 << R) - 1;
    };

    H.H.Z = function (N, W) {
      return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7);
    };

    H.H.i = function (N, W) {
      return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16 | N[(W >>> 3) + 3] << 24) >>> (W & 7);
    };

    H.H.m = function () {
      var N = Uint16Array;
      var W = Uint32Array;
      return {
        K: new N(16),
        j: new N(16),
        X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
        T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
        q: new N(32),
        p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
        z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
        c: new W(32),
        J: new N(512),
        _: [],
        h: new N(32),
        $: [],
        w: new N(32768),
        C: [],
        v: [],
        d: new N(32768),
        D: [],
        u: new N(512),
        Q: [],
        r: new N(1 << 15),
        s: new W(286),
        Y: new W(30),
        a: new W(19),
        t: new W(15e3),
        k: new N(1 << 16),
        g: new N(1 << 15)
      };
    }();

    (function () {
      var N = H.H.m;
      var W = 1 << 15;

      for (var R = 0; R < W; R++) {
        var V = R;
        V = (V & 2863311530) >>> 1 | (V & 1431655765) << 1;
        V = (V & 3435973836) >>> 2 | (V & 858993459) << 2;
        V = (V & 4042322160) >>> 4 | (V & 252645135) << 4;
        V = (V & 4278255360) >>> 8 | (V & 16711935) << 8;
        N.r[R] = (V >>> 16 | V << 16) >>> 17;
      }

      function n(A, l, M) {
        while (l-- != 0) {
          A.push(0, M);
        }
      }

      for (var R = 0; R < 32; R++) {
        N.q[R] = N.S[R] << 3 | N.T[R];
        N.c[R] = N.p[R] << 4 | N.z[R];
      }

      n(N._, 144, 8);
      n(N._, 255 - 143, 9);
      n(N._, 279 - 255, 7);
      n(N._, 287 - 279, 8);
      H.H.n(N._, 9);
      H.H.A(N._, 9, N.J);
      H.H.l(N._, 9);
      n(N.$, 32, 5);
      H.H.n(N.$, 5);
      H.H.A(N.$, 5, N.h);
      H.H.l(N.$, 5);
      n(N.Q, 19, 0);
      n(N.C, 286, 0);
      n(N.D, 30, 0);
      n(N.v, 320, 0);
    })();

    return H.H.N;
  }();

  UPNG.decode._readInterlace = function (data, out) {
    var w = out.width;
    var h = out.height;

    var bpp = UPNG.decode._getBPP(out);

    var cbpp = bpp >> 3;
    var bpl = Math.ceil(w * bpp / 8);
    var img = new Uint8Array(h * bpl);
    var di = 0;
    var starting_row = [0, 0, 4, 0, 2, 0, 1];
    var starting_col = [0, 4, 0, 2, 0, 1, 0];
    var row_increment = [8, 8, 8, 4, 4, 2, 2];
    var col_increment = [8, 8, 4, 4, 2, 2, 1];
    var pass = 0;

    while (pass < 7) {
      var ri = row_increment[pass];
      var ci = col_increment[pass];
      var sw = 0;
      var sh = 0;
      var cr = starting_row[pass];

      while (cr < h) {
        cr += ri;
        sh++;
      }

      var cc = starting_col[pass];

      while (cc < w) {
        cc += ci;
        sw++;
      }

      var bpll = Math.ceil(sw * bpp / 8);

      UPNG.decode._filterZero(data, out, di, sw, sh);

      var y = 0;
      var row = starting_row[pass];

      while (row < h) {
        var col = starting_col[pass];
        var cdi = di + y * bpll << 3;

        while (col < w) {
          if (bpp == 1) {
            var val = data[cdi >> 3];
            val = val >> 7 - (cdi & 7) & 1;
            img[row * bpl + (col >> 3)] |= val << 7 - ((col & 7) << 0);
          }

          if (bpp == 2) {
            var val = data[cdi >> 3];
            val = val >> 6 - (cdi & 7) & 3;
            img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
          }

          if (bpp == 4) {
            var val = data[cdi >> 3];
            val = val >> 4 - (cdi & 7) & 15;
            img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
          }

          if (bpp >= 8) {
            var ii = row * bpl + col * cbpp;

            for (var j = 0; j < cbpp; j++) {
              img[ii + j] = data[(cdi >> 3) + j];
            }
          }

          cdi += bpp;
          col += ci;
        }

        y++;
        row += ri;
      }

      if (sw * sh != 0) di += sh * (1 + bpll);
      pass += 1;
    }

    return img;
  };

  UPNG.decode._getBPP = function (out) {
    var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
    return noc * out.depth;
  };

  UPNG.decode._filterZero = function (data, out, off, w, h) {
    var bpp = UPNG.decode._getBPP(out);

    var bpl = Math.ceil(w * bpp / 8);
    var paeth = UPNG.decode._paeth;
    bpp = Math.ceil(bpp / 8);
    var i = 0;
    var di = 1;
    var type = data[off];
    var x = 0;
    if (type > 1) data[off] = [0, 0, 1][type - 2];
    if (type == 3) for (x = bpp; x < bpl; x++) {
      data[x + 1] = data[x + 1] + (data[x + 1 - bpp] >>> 1) & 255;
    }

    for (var y = 0; y < h; y++) {
      i = off + y * bpl;
      di = i + y + 1;
      type = data[di - 1];
      x = 0;
      if (type == 0) for (; x < bpl; x++) {
        data[i + x] = data[di + x];
      } else if (type == 1) {
        for (; x < bpp; x++) {
          data[i + x] = data[di + x];
        }

        for (; x < bpl; x++) {
          data[i + x] = data[di + x] + data[i + x - bpp];
        }
      } else if (type == 2) {
        for (; x < bpl; x++) {
          data[i + x] = data[di + x] + data[i + x - bpl];
        }
      } else if (type == 3) {
        for (; x < bpp; x++) {
          data[i + x] = data[di + x] + (data[i + x - bpl] >>> 1);
        }

        for (; x < bpl; x++) {
          data[i + x] = data[di + x] + (data[i + x - bpl] + data[i + x - bpp] >>> 1);
        }
      } else {
        for (; x < bpp; x++) {
          data[i + x] = data[di + x] + paeth(0, data[i + x - bpl], 0);
        }

        for (; x < bpl; x++) {
          data[i + x] = data[di + x] + paeth(data[i + x - bpp], data[i + x - bpl], data[i + x - bpp - bpl]);
        }
      }
    }

    return data;
  };

  UPNG.decode._paeth = function (a, b, c) {
    var p = a + b - c;
    var pa = p - a;
    var pb = p - b;
    var pc = p - c;
    if (pa * pa <= pb * pb && pa * pa <= pc * pc) return a;
    if (pb * pb <= pc * pc) return b;
    return c;
  };

  UPNG.decode._IHDR = function (data, offset, out) {
    var bin = UPNG._bin;
    out.width = bin.readUint(data, offset);
    offset += 4;
    out.height = bin.readUint(data, offset);
    offset += 4;
    out.depth = data[offset];
    offset++;
    out.ctype = data[offset];
    offset++;
    out.compress = data[offset];
    offset++;
    out.filter = data[offset];
    offset++;
    out.interlace = data[offset];
    offset++;
  };

  UPNG._bin = {
    nextZero: function nextZero(data, p) {
      while (data[p] != 0) {
        p++;
      }

      return p;
    },
    readUshort: function readUshort(buff, p) {
      return buff[p] << 8 | buff[p + 1];
    },
    writeUshort: function writeUshort(buff, p, n) {
      buff[p] = n >> 8 & 255;
      buff[p + 1] = n & 255;
    },
    readUint: function readUint(buff, p) {
      return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
    },
    writeUint: function writeUint(buff, p, n) {
      buff[p] = n >> 24 & 255;
      buff[p + 1] = n >> 16 & 255;
      buff[p + 2] = n >> 8 & 255;
      buff[p + 3] = n & 255;
    },
    readASCII: function readASCII(buff, p, l) {
      var s = '';

      for (var i = 0; i < l; i++) {
        s += String.fromCharCode(buff[p + i]);
      }

      return s;
    },
    writeASCII: function writeASCII(data, p, s) {
      for (var i = 0; i < s.length; i++) {
        data[p + i] = s.charCodeAt(i);
      }
    },
    readBytes: function readBytes(buff, p, l) {
      var arr = [];

      for (var i = 0; i < l; i++) {
        arr.push(buff[p + i]);
      }

      return arr;
    },
    pad: function pad(n) {
      return n.length < 2 ? "0".concat(n) : n;
    },
    readUTF8: function readUTF8(buff, p, l) {
      var s = '';
      var ns;

      for (var i = 0; i < l; i++) {
        s += "%".concat(UPNG._bin.pad(buff[p + i].toString(16)));
      }

      try {
        ns = decodeURIComponent(s);
      } catch (e) {
        return UPNG._bin.readASCII(buff, p, l);
      }

      return ns;
    }
  };

  UPNG._copyTile = function (sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
    var w = Math.min(sw, tw);
    var h = Math.min(sh, th);
    var si = 0;
    var ti = 0;

    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        if (xoff >= 0 && yoff >= 0) {
          si = y * sw + x << 2;
          ti = (yoff + y) * tw + xoff + x << 2;
        } else {
          si = (-yoff + y) * sw - xoff + x << 2;
          ti = y * tw + x << 2;
        }

        if (mode == 0) {
          tb[ti] = sb[si];
          tb[ti + 1] = sb[si + 1];
          tb[ti + 2] = sb[si + 2];
          tb[ti + 3] = sb[si + 3];
        } else if (mode == 1) {
          var fa = sb[si + 3] * (1 / 255);
          var fr = sb[si] * fa;
          var fg = sb[si + 1] * fa;
          var fb = sb[si + 2] * fa;
          var ba = tb[ti + 3] * (1 / 255);
          var br = tb[ti] * ba;
          var bg = tb[ti + 1] * ba;
          var bb = tb[ti + 2] * ba;
          var ifa = 1 - fa;
          var oa = fa + ba * ifa;
          var ioa = oa == 0 ? 0 : 1 / oa;
          tb[ti + 3] = 255 * oa;
          tb[ti + 0] = (fr + br * ifa) * ioa;
          tb[ti + 1] = (fg + bg * ifa) * ioa;
          tb[ti + 2] = (fb + bb * ifa) * ioa;
        } else if (mode == 2) {
          var fa = sb[si + 3];
          var fr = sb[si];
          var fg = sb[si + 1];
          var fb = sb[si + 2];
          var ba = tb[ti + 3];
          var br = tb[ti];
          var bg = tb[ti + 1];
          var bb = tb[ti + 2];

          if (fa == ba && fr == br && fg == bg && fb == bb) {
            tb[ti] = 0;
            tb[ti + 1] = 0;
            tb[ti + 2] = 0;
            tb[ti + 3] = 0;
          } else {
            tb[ti] = fr;
            tb[ti + 1] = fg;
            tb[ti + 2] = fb;
            tb[ti + 3] = fa;
          }
        } else if (mode == 3) {
          var fa = sb[si + 3];
          var fr = sb[si];
          var fg = sb[si + 1];
          var fb = sb[si + 2];
          var ba = tb[ti + 3];
          var br = tb[ti];
          var bg = tb[ti + 1];
          var bb = tb[ti + 2];
          if (fa == ba && fr == br && fg == bg && fb == bb) continue;
          if (fa < 220 && ba > 20) return false;
        }
      }
    }

    return true;
  };

  UPNG.encode = function (bufs, w, h, ps, dels, tabs, forbidPlte) {
    if (ps == null) ps = 0;
    if (forbidPlte == null) forbidPlte = false;
    var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte]);
    UPNG.encode.compressPNG(nimg, -1);
    return UPNG.encode._main(nimg, w, h, dels, tabs);
  };

  UPNG.encodeLL = function (bufs, w, h, cc, ac, depth, dels, tabs) {
    var nimg = {
      ctype: 0 + (cc == 1 ? 0 : 2) + (ac == 0 ? 0 : 4),
      depth: depth,
      frames: []
    };
    var bipp = (cc + ac) * depth;
    var bipl = bipp * w;

    for (var i = 0; i < bufs.length; i++) {
      nimg.frames.push({
        rect: {
          x: 0,
          y: 0,
          width: w,
          height: h
        },
        img: new Uint8Array(bufs[i]),
        blend: 0,
        dispose: 1,
        bpp: Math.ceil(bipp / 8),
        bpl: Math.ceil(bipl / 8)
      });
    }

    UPNG.encode.compressPNG(nimg, 0, true);

    var out = UPNG.encode._main(nimg, w, h, dels, tabs);

    return out;
  };

  UPNG.encode._main = function (nimg, w, h, dels, tabs) {
    if (tabs == null) tabs = {};
    var crc = UPNG.crc.crc;
    var wUi = UPNG._bin.writeUint;
    var wUs = UPNG._bin.writeUshort;
    var wAs = UPNG._bin.writeASCII;
    var offset = 8;
    var anim = nimg.frames.length > 1;
    var pltAlpha = false;
    var leng = 8 + (16 + 5 + 4) + (anim ? 20 : 0);
    if (tabs.sRGB != null) leng += 8 + 1 + 4;
    if (tabs.pHYs != null) leng += 8 + 9 + 4;

    if (nimg.ctype == 3) {
      var dl = nimg.plte.length;

      for (var i = 0; i < dl; i++) {
        if (nimg.plte[i] >>> 24 != 255) pltAlpha = true;
      }

      leng += 8 + dl * 3 + 4 + (pltAlpha ? 8 + dl * 1 + 4 : 0);
    }

    for (var j = 0; j < nimg.frames.length; j++) {
      var fr = nimg.frames[j];
      if (anim) leng += 38;
      leng += fr.cimg.length + 12;
      if (j != 0) leng += 4;
    }

    leng += 12;
    var data = new Uint8Array(leng);
    var wr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

    for (var i = 0; i < 8; i++) {
      data[i] = wr[i];
    }

    wUi(data, offset, 13);
    offset += 4;
    wAs(data, offset, 'IHDR');
    offset += 4;
    wUi(data, offset, w);
    offset += 4;
    wUi(data, offset, h);
    offset += 4;
    data[offset] = nimg.depth;
    offset++;
    data[offset] = nimg.ctype;
    offset++;
    data[offset] = 0;
    offset++;
    data[offset] = 0;
    offset++;
    data[offset] = 0;
    offset++;
    wUi(data, offset, crc(data, offset - 17, 17));
    offset += 4;

    if (tabs.sRGB != null) {
      wUi(data, offset, 1);
      offset += 4;
      wAs(data, offset, 'sRGB');
      offset += 4;
      data[offset] = tabs.sRGB;
      offset++;
      wUi(data, offset, crc(data, offset - 5, 5));
      offset += 4;
    }

    if (tabs.pHYs != null) {
      wUi(data, offset, 9);
      offset += 4;
      wAs(data, offset, 'pHYs');
      offset += 4;
      wUi(data, offset, tabs.pHYs[0]);
      offset += 4;
      wUi(data, offset, tabs.pHYs[1]);
      offset += 4;
      data[offset] = tabs.pHYs[2];
      offset++;
      wUi(data, offset, crc(data, offset - 13, 13));
      offset += 4;
    }

    if (anim) {
      wUi(data, offset, 8);
      offset += 4;
      wAs(data, offset, 'acTL');
      offset += 4;
      wUi(data, offset, nimg.frames.length);
      offset += 4;
      wUi(data, offset, tabs.loop != null ? tabs.loop : 0);
      offset += 4;
      wUi(data, offset, crc(data, offset - 12, 12));
      offset += 4;
    }

    if (nimg.ctype == 3) {
      var dl = nimg.plte.length;
      wUi(data, offset, dl * 3);
      offset += 4;
      wAs(data, offset, 'PLTE');
      offset += 4;

      for (var i = 0; i < dl; i++) {
        var ti = i * 3;
        var c = nimg.plte[i];
        var r = c & 255;
        var g = c >>> 8 & 255;
        var b = c >>> 16 & 255;
        data[offset + ti + 0] = r;
        data[offset + ti + 1] = g;
        data[offset + ti + 2] = b;
      }

      offset += dl * 3;
      wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4));
      offset += 4;

      if (pltAlpha) {
        wUi(data, offset, dl);
        offset += 4;
        wAs(data, offset, 'tRNS');
        offset += 4;

        for (var i = 0; i < dl; i++) {
          data[offset + i] = nimg.plte[i] >>> 24 & 255;
        }

        offset += dl;
        wUi(data, offset, crc(data, offset - dl - 4, dl + 4));
        offset += 4;
      }
    }

    var fi = 0;

    for (var j = 0; j < nimg.frames.length; j++) {
      var fr = nimg.frames[j];

      if (anim) {
        wUi(data, offset, 26);
        offset += 4;
        wAs(data, offset, 'fcTL');
        offset += 4;
        wUi(data, offset, fi++);
        offset += 4;
        wUi(data, offset, fr.rect.width);
        offset += 4;
        wUi(data, offset, fr.rect.height);
        offset += 4;
        wUi(data, offset, fr.rect.x);
        offset += 4;
        wUi(data, offset, fr.rect.y);
        offset += 4;
        wUs(data, offset, dels[j]);
        offset += 2;
        wUs(data, offset, 1000);
        offset += 2;
        data[offset] = fr.dispose;
        offset++;
        data[offset] = fr.blend;
        offset++;
        wUi(data, offset, crc(data, offset - 30, 30));
        offset += 4;
      }

      var imgd = fr.cimg;
      var dl = imgd.length;
      wUi(data, offset, dl + (j == 0 ? 0 : 4));
      offset += 4;
      var ioff = offset;
      wAs(data, offset, j == 0 ? 'IDAT' : 'fdAT');
      offset += 4;

      if (j != 0) {
        wUi(data, offset, fi++);
        offset += 4;
      }

      data.set(imgd, offset);
      offset += dl;
      wUi(data, offset, crc(data, ioff, offset - ioff));
      offset += 4;
    }

    wUi(data, offset, 0);
    offset += 4;
    wAs(data, offset, 'IEND');
    offset += 4;
    wUi(data, offset, crc(data, offset - 4, 4));
    offset += 4;
    return data.buffer;
  };

  UPNG.encode.compressPNG = function (out, filter, levelZero) {
    for (var i = 0; i < out.frames.length; i++) {
      var frm = out.frames[i];
      frm.rect.width;
      var nh = frm.rect.height;
      var fdata = new Uint8Array(nh * frm.bpl + nh);
      frm.cimg = UPNG.encode._filterZero(frm.img, nh, frm.bpp, frm.bpl, fdata, filter, levelZero);
    }
  };

  UPNG.encode.compress = function (bufs, w, h, ps, prms) {
    var onlyBlend = prms[0];
    var evenCrd = prms[1];
    var forbidPrev = prms[2];
    var minBits = prms[3];
    var forbidPlte = prms[4];
    var ctype = 6;
    var depth = 8;
    var alphaAnd = 255;

    for (var j = 0; j < bufs.length; j++) {
      var img = new Uint8Array(bufs[j]);
      var ilen = img.length;

      for (var i = 0; i < ilen; i += 4) {
        alphaAnd &= img[i + 3];
      }
    }

    var gotAlpha = alphaAnd != 255;
    var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
    var cmap = {};
    var plte = [];
    var inds = [];

    if (ps != 0) {
      var nbufs = [];

      for (var i = 0; i < frms.length; i++) {
        nbufs.push(frms[i].img.buffer);
      }

      var abuf = UPNG.encode.concatRGBA(nbufs);
      var qres = UPNG.quantize(abuf, ps);
      var cof = 0;
      var bb = new Uint8Array(qres.abuf);

      for (var i = 0; i < frms.length; i++) {
        var ti = frms[i].img;
        var bln = ti.length;
        inds.push(new Uint8Array(qres.inds.buffer, cof >> 2, bln >> 2));

        for (var j = 0; j < bln; j += 4) {
          ti[j] = bb[cof + j];
          ti[j + 1] = bb[cof + j + 1];
          ti[j + 2] = bb[cof + j + 2];
          ti[j + 3] = bb[cof + j + 3];
        }

        cof += bln;
      }

      for (var i = 0; i < qres.plte.length; i++) {
        plte.push(qres.plte[i].est.rgba);
      }
    } else {
      for (var j = 0; j < frms.length; j++) {
        var frm = frms[j];
        var img32 = new Uint32Array(frm.img.buffer);
        var nw = frm.rect.width;
        var ilen = img32.length;
        var ind = new Uint8Array(ilen);
        inds.push(ind);

        for (var i = 0; i < ilen; i++) {
          var c = img32[i];
          if (i != 0 && c == img32[i - 1]) ind[i] = ind[i - 1];else if (i > nw && c == img32[i - nw]) ind[i] = ind[i - nw];else {
            var cmc = cmap[c];

            if (cmc == null) {
              cmap[c] = cmc = plte.length;
              plte.push(c);
              if (plte.length >= 300) break;
            }

            ind[i] = cmc;
          }
        }
      }
    }

    var cc = plte.length;

    if (cc <= 256 && forbidPlte == false) {
      if (cc <= 2) depth = 1;else if (cc <= 4) depth = 2;else if (cc <= 16) depth = 4;else depth = 8;
      depth = Math.max(depth, minBits);
    }

    for (var j = 0; j < frms.length; j++) {
      var frm = frms[j];
      frm.rect.x;
      frm.rect.y;
      var nw = frm.rect.width;
      var nh = frm.rect.height;
      var cimg = frm.img;
      new Uint32Array(cimg.buffer);
      var bpl = 4 * nw;
      var bpp = 4;

      if (cc <= 256 && forbidPlte == false) {
        bpl = Math.ceil(depth * nw / 8);
        var nimg = new Uint8Array(bpl * nh);
        var inj = inds[j];

        for (var y = 0; y < nh; y++) {
          var i = y * bpl;
          var ii = y * nw;
          if (depth == 8) for (var x = 0; x < nw; x++) {
            nimg[i + x] = inj[ii + x];
          } else if (depth == 4) for (var x = 0; x < nw; x++) {
            nimg[i + (x >> 1)] |= inj[ii + x] << 4 - (x & 1) * 4;
          } else if (depth == 2) for (var x = 0; x < nw; x++) {
            nimg[i + (x >> 2)] |= inj[ii + x] << 6 - (x & 3) * 2;
          } else if (depth == 1) for (var x = 0; x < nw; x++) {
            nimg[i + (x >> 3)] |= inj[ii + x] << 7 - (x & 7) * 1;
          }
        }

        cimg = nimg;
        ctype = 3;
        bpp = 1;
      } else if (gotAlpha == false && frms.length == 1) {
        var nimg = new Uint8Array(nw * nh * 3);
        var area = nw * nh;

        for (var i = 0; i < area; i++) {
          var ti = i * 3;
          var qi = i * 4;
          nimg[ti] = cimg[qi];
          nimg[ti + 1] = cimg[qi + 1];
          nimg[ti + 2] = cimg[qi + 2];
        }

        cimg = nimg;
        ctype = 2;
        bpp = 3;
        bpl = 3 * nw;
      }

      frm.img = cimg;
      frm.bpl = bpl;
      frm.bpp = bpp;
    }

    return {
      ctype: ctype,
      depth: depth,
      plte: plte,
      frames: frms
    };
  };

  UPNG.encode.framize = function (bufs, w, h, alwaysBlend, evenCrd, forbidPrev) {
    var frms = [];

    for (var j = 0; j < bufs.length; j++) {
      var cimg = new Uint8Array(bufs[j]);
      var cimg32 = new Uint32Array(cimg.buffer);
      var nimg;
      var nx = 0;
      var ny = 0;
      var nw = w;
      var nh = h;
      var blend = alwaysBlend ? 1 : 0;

      if (j != 0) {
        var tlim = forbidPrev || alwaysBlend || j == 1 || frms[j - 2].dispose != 0 ? 1 : 2;
        var tstp = 0;
        var tarea = 1e9;

        for (var it = 0; it < tlim; it++) {
          var pimg = new Uint8Array(bufs[j - 1 - it]);
          var p32 = new Uint32Array(bufs[j - 1 - it]);
          var mix = w;
          var miy = h;
          var max = -1;
          var may = -1;

          for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
              var i = y * w + x;

              if (cimg32[i] != p32[i]) {
                if (x < mix) mix = x;
                if (x > max) max = x;
                if (y < miy) miy = y;
                if (y > may) may = y;
              }
            }
          }

          if (max == -1) mix = miy = max = may = 0;

          if (evenCrd) {
            if ((mix & 1) == 1) mix--;
            if ((miy & 1) == 1) miy--;
          }

          var sarea = (max - mix + 1) * (may - miy + 1);

          if (sarea < tarea) {
            tarea = sarea;
            tstp = it;
            nx = mix;
            ny = miy;
            nw = max - mix + 1;
            nh = may - miy + 1;
          }
        }

        var pimg = new Uint8Array(bufs[j - 1 - tstp]);
        if (tstp == 1) frms[j - 1].dispose = 2;
        nimg = new Uint8Array(nw * nh * 4);

        UPNG._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0);

        blend = UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3) ? 1 : 0;

        if (blend == 1) {
          UPNG.encode._prepareDiff(cimg, w, h, nimg, {
            x: nx,
            y: ny,
            width: nw,
            height: nh
          });
        } else UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0);
      } else nimg = cimg.slice(0);

      frms.push({
        rect: {
          x: nx,
          y: ny,
          width: nw,
          height: nh
        },
        img: nimg,
        blend: blend,
        dispose: 0
      });
    }

    if (alwaysBlend) {
      for (var j = 0; j < frms.length; j++) {
        var frm = frms[j];
        if (frm.blend == 1) continue;
        var r0 = frm.rect;
        var r1 = frms[j - 1].rect;
        var miX = Math.min(r0.x, r1.x);
        var miY = Math.min(r0.y, r1.y);
        var maX = Math.max(r0.x + r0.width, r1.x + r1.width);
        var maY = Math.max(r0.y + r0.height, r1.y + r1.height);
        var r = {
          x: miX,
          y: miY,
          width: maX - miX,
          height: maY - miY
        };
        frms[j - 1].dispose = 1;

        if (j - 1 != 0) {
          UPNG.encode._updateFrame(bufs, w, h, frms, j - 1, r, evenCrd);
        }

        UPNG.encode._updateFrame(bufs, w, h, frms, j, r, evenCrd);
      }
    }

    var area = 0;

    if (bufs.length != 1) {
      for (var i = 0; i < frms.length; i++) {
        var frm = frms[i];
        area += frm.rect.width * frm.rect.height;
      }
    }

    return frms;
  };

  UPNG.encode._updateFrame = function (bufs, w, h, frms, i, r, evenCrd) {
    var U8 = Uint8Array;
    var U32 = Uint32Array;
    var pimg = new U8(bufs[i - 1]);
    var pimg32 = new U32(bufs[i - 1]);
    var nimg = i + 1 < bufs.length ? new U8(bufs[i + 1]) : null;
    var cimg = new U8(bufs[i]);
    var cimg32 = new U32(cimg.buffer);
    var mix = w;
    var miy = h;
    var max = -1;
    var may = -1;

    for (var y = 0; y < r.height; y++) {
      for (var x = 0; x < r.width; x++) {
        var cx = r.x + x;
        var cy = r.y + y;
        var j = cy * w + cx;
        var cc = cimg32[j];

        if (cc == 0 || frms[i - 1].dispose == 0 && pimg32[j] == cc && (nimg == null || nimg[j * 4 + 3] != 0)) ; else {
          if (cx < mix) mix = cx;
          if (cx > max) max = cx;
          if (cy < miy) miy = cy;
          if (cy > may) may = cy;
        }
      }
    }

    if (max == -1) mix = miy = max = may = 0;

    if (evenCrd) {
      if ((mix & 1) == 1) mix--;
      if ((miy & 1) == 1) miy--;
    }

    r = {
      x: mix,
      y: miy,
      width: max - mix + 1,
      height: may - miy + 1
    };
    var fr = frms[i];
    fr.rect = r;
    fr.blend = 1;
    fr.img = new Uint8Array(r.width * r.height * 4);

    if (frms[i - 1].dispose == 0) {
      UPNG._copyTile(pimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);

      UPNG.encode._prepareDiff(cimg, w, h, fr.img, r);
    } else {
      UPNG._copyTile(cimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
    }
  };

  UPNG.encode._prepareDiff = function (cimg, w, h, nimg, rec) {
    UPNG._copyTile(cimg, w, h, nimg, rec.width, rec.height, -rec.x, -rec.y, 2);
  };

  UPNG.encode._filterZero = function (img, h, bpp, bpl, data, filter, levelZero) {
    var fls = [];
    var ftry = [0, 1, 2, 3, 4];
    if (filter != -1) ftry = [filter];else if (h * bpl > 500000 || bpp == 1) ftry = [0];
    var opts;
    if (levelZero) opts = {
      level: 0
    };
    var CMPR = UZIP;

    for (var i = 0; i < ftry.length; i++) {
      for (var y = 0; y < h; y++) {
        UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
      }

      fls.push(CMPR.deflate(data, opts));
    }

    var ti;
    var tsize = 1e9;

    for (var i = 0; i < fls.length; i++) {
      if (fls[i].length < tsize) {
        ti = i;
        tsize = fls[i].length;
      }
    }

    return fls[ti];
  };

  UPNG.encode._filterLine = function (data, img, y, bpl, bpp, type) {
    var i = y * bpl;
    var di = i + y;
    var paeth = UPNG.decode._paeth;
    data[di] = type;
    di++;

    if (type == 0) {
      if (bpl < 500) for (var x = 0; x < bpl; x++) {
        data[di + x] = img[i + x];
      } else data.set(new Uint8Array(img.buffer, i, bpl), di);
    } else if (type == 1) {
      for (var x = 0; x < bpp; x++) {
        data[di + x] = img[i + x];
      }

      for (var x = bpp; x < bpl; x++) {
        data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;
      }
    } else if (y == 0) {
      for (var x = 0; x < bpp; x++) {
        data[di + x] = img[i + x];
      }

      if (type == 2) for (var x = bpp; x < bpl; x++) {
        data[di + x] = img[i + x];
      }
      if (type == 3) for (var x = bpp; x < bpl; x++) {
        data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;
      }
      if (type == 4) for (var x = bpp; x < bpl; x++) {
        data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;
      }
    } else {
      if (type == 2) {
        for (var x = 0; x < bpl; x++) {
          data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;
        }
      }

      if (type == 3) {
        for (var x = 0; x < bpp; x++) {
          data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;
        }

        for (var x = bpp; x < bpl; x++) {
          data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x - bpp] >> 1) & 255;
        }
      }

      if (type == 4) {
        for (var x = 0; x < bpp; x++) {
          data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;
        }

        for (var x = bpp; x < bpl; x++) {
          data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl]) & 255;
        }
      }
    }
  };

  UPNG.crc = {
    table: function () {
      var tab = new Uint32Array(256);

      for (var n = 0; n < 256; n++) {
        var c = n;

        for (var k = 0; k < 8; k++) {
          if (c & 1) c = 0xedb88320 ^ c >>> 1;else c >>>= 1;
        }

        tab[n] = c;
      }

      return tab;
    }(),
    update: function update(c, buf, off, len) {
      for (var i = 0; i < len; i++) {
        c = UPNG.crc.table[(c ^ buf[off + i]) & 0xff] ^ c >>> 8;
      }

      return c;
    },
    crc: function crc(b, o, l) {
      return UPNG.crc.update(0xffffffff, b, o, l) ^ 0xffffffff;
    }
  };

  UPNG.quantize = function (abuf, ps) {
    var oimg = new Uint8Array(abuf);
    var nimg = oimg.slice(0);
    var nimg32 = new Uint32Array(nimg.buffer);
    var KD = UPNG.quantize.getKDtree(nimg, ps);
    var root = KD[0];
    var leafs = KD[1];
    var planeDst = UPNG.quantize.planeDst;
    var sb = oimg;
    var tb = nimg32;
    var len = sb.length;
    var inds = new Uint8Array(oimg.length >> 2);
    var nd;

    if (oimg.length < 20e6) {
      for (var i = 0; i < len; i += 4) {
        var r = sb[i] * (1 / 255);
        var g = sb[i + 1] * (1 / 255);
        var b = sb[i + 2] * (1 / 255);
        var a = sb[i + 3] * (1 / 255);
        nd = UPNG.quantize.getNearest(root, r, g, b, a);
        inds[i >> 2] = nd.ind;
        tb[i >> 2] = nd.est.rgba;
      }
    } else {
      for (var i = 0; i < len; i += 4) {
        var r = sb[i] * (1 / 255);
        var g = sb[i + 1] * (1 / 255);
        var b = sb[i + 2] * (1 / 255);
        var a = sb[i + 3] * (1 / 255);
        nd = root;

        while (nd.left) {
          nd = planeDst(nd.est, r, g, b, a) <= 0 ? nd.left : nd.right;
        }

        inds[i >> 2] = nd.ind;
        tb[i >> 2] = nd.est.rgba;
      }
    }

    return {
      abuf: nimg.buffer,
      inds: inds,
      plte: leafs
    };
  };

  UPNG.quantize.getKDtree = function (nimg, ps, err) {
    if (err == null) err = 0.0001;
    var nimg32 = new Uint32Array(nimg.buffer);
    var root = {
      i0: 0,
      i1: nimg.length,
      bst: null,
      est: null,
      tdst: 0,
      left: null,
      right: null
    };
    root.bst = UPNG.quantize.stats(nimg, root.i0, root.i1);
    root.est = UPNG.quantize.estats(root.bst);
    var leafs = [root];

    while (leafs.length < ps) {
      var maxL = 0;
      var mi = 0;

      for (var i = 0; i < leafs.length; i++) {
        if (leafs[i].est.L > maxL) {
          maxL = leafs[i].est.L;
          mi = i;
        }
      }

      if (maxL < err) break;
      var node = leafs[mi];
      var s0 = UPNG.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
      var s0wrong = node.i0 >= s0 || node.i1 <= s0;

      if (s0wrong) {
        node.est.L = 0;
        continue;
      }

      var ln = {
        i0: node.i0,
        i1: s0,
        bst: null,
        est: null,
        tdst: 0,
        left: null,
        right: null
      };
      ln.bst = UPNG.quantize.stats(nimg, ln.i0, ln.i1);
      ln.est = UPNG.quantize.estats(ln.bst);
      var rn = {
        i0: s0,
        i1: node.i1,
        bst: null,
        est: null,
        tdst: 0,
        left: null,
        right: null
      };
      rn.bst = {
        R: [],
        m: [],
        N: node.bst.N - ln.bst.N
      };

      for (var i = 0; i < 16; i++) {
        rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];
      }

      for (var i = 0; i < 4; i++) {
        rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];
      }

      rn.est = UPNG.quantize.estats(rn.bst);
      node.left = ln;
      node.right = rn;
      leafs[mi] = ln;
      leafs.push(rn);
    }

    leafs.sort(function (a, b) {
      return b.bst.N - a.bst.N;
    });

    for (var i = 0; i < leafs.length; i++) {
      leafs[i].ind = i;
    }

    return [root, leafs];
  };

  UPNG.quantize.getNearest = function (nd, r, g, b, a) {
    if (nd.left == null) {
      nd.tdst = UPNG.quantize.dist(nd.est.q, r, g, b, a);
      return nd;
    }

    var planeDst = UPNG.quantize.planeDst(nd.est, r, g, b, a);
    var node0 = nd.left;
    var node1 = nd.right;

    if (planeDst > 0) {
      node0 = nd.right;
      node1 = nd.left;
    }

    var ln = UPNG.quantize.getNearest(node0, r, g, b, a);
    if (ln.tdst <= planeDst * planeDst) return ln;
    var rn = UPNG.quantize.getNearest(node1, r, g, b, a);
    return rn.tdst < ln.tdst ? rn : ln;
  };

  UPNG.quantize.planeDst = function (est, r, g, b, a) {
    var e = est.e;
    return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
  };

  UPNG.quantize.dist = function (q, r, g, b, a) {
    var d0 = r - q[0];
    var d1 = g - q[1];
    var d2 = b - q[2];
    var d3 = a - q[3];
    return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
  };

  UPNG.quantize.splitPixels = function (nimg, nimg32, i0, i1, e, eMq) {
    var vecDot = UPNG.quantize.vecDot;
    i1 -= 4;

    while (i0 < i1) {
      while (vecDot(nimg, i0, e) <= eMq) {
        i0 += 4;
      }

      while (vecDot(nimg, i1, e) > eMq) {
        i1 -= 4;
      }

      if (i0 >= i1) break;
      var t = nimg32[i0 >> 2];
      nimg32[i0 >> 2] = nimg32[i1 >> 2];
      nimg32[i1 >> 2] = t;
      i0 += 4;
      i1 -= 4;
    }

    while (vecDot(nimg, i0, e) > eMq) {
      i0 -= 4;
    }

    return i0 + 4;
  };

  UPNG.quantize.vecDot = function (nimg, i, e) {
    return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
  };

  UPNG.quantize.stats = function (nimg, i0, i1) {
    var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var m = [0, 0, 0, 0];
    var N = i1 - i0 >> 2;

    for (var i = i0; i < i1; i += 4) {
      var r = nimg[i] * (1 / 255);
      var g = nimg[i + 1] * (1 / 255);
      var b = nimg[i + 2] * (1 / 255);
      var a = nimg[i + 3] * (1 / 255);
      m[0] += r;
      m[1] += g;
      m[2] += b;
      m[3] += a;
      R[0] += r * r;
      R[1] += r * g;
      R[2] += r * b;
      R[3] += r * a;
      R[5] += g * g;
      R[6] += g * b;
      R[7] += g * a;
      R[10] += b * b;
      R[11] += b * a;
      R[15] += a * a;
    }

    R[4] = R[1];
    R[8] = R[2];
    R[9] = R[6];
    R[12] = R[3];
    R[13] = R[7];
    R[14] = R[11];
    return {
      R: R,
      m: m,
      N: N
    };
  };

  UPNG.quantize.estats = function (stats) {
    var R = stats.R;
    var m = stats.m;
    var N = stats.N;
    var m0 = m[0];
    var m1 = m[1];
    var m2 = m[2];
    var m3 = m[3];
    var iN = N == 0 ? 0 : 1 / N;
    var Rj = [R[0] - m0 * m0 * iN, R[1] - m0 * m1 * iN, R[2] - m0 * m2 * iN, R[3] - m0 * m3 * iN, R[4] - m1 * m0 * iN, R[5] - m1 * m1 * iN, R[6] - m1 * m2 * iN, R[7] - m1 * m3 * iN, R[8] - m2 * m0 * iN, R[9] - m2 * m1 * iN, R[10] - m2 * m2 * iN, R[11] - m2 * m3 * iN, R[12] - m3 * m0 * iN, R[13] - m3 * m1 * iN, R[14] - m3 * m2 * iN, R[15] - m3 * m3 * iN];
    var A = Rj;
    var M = UPNG.M4;
    var b = [Math.random(), Math.random(), Math.random(), Math.random()];
    var mi = 0;
    var tmi = 0;

    if (N != 0) {
      for (var i = 0; i < 16; i++) {
        b = M.multVec(A, b);
        tmi = Math.sqrt(M.dot(b, b));
        b = M.sml(1 / tmi, b);
        if (i != 0 && Math.abs(tmi - mi) < 1e-9) break;
        mi = tmi;
      }
    }

    var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
    var eMq255 = M.dot(M.sml(255, q), b);
    return {
      Cov: Rj,
      q: q,
      e: b,
      L: mi,
      eMq255: eMq255,
      eMq: M.dot(b, q),
      rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2]) << 16 | Math.round(255 * q[1]) << 8 | Math.round(255 * q[0]) << 0) >>> 0
    };
  };

  UPNG.M4 = {
    multVec: function multVec(m, v) {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3], m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3], m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3], m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];
    },
    dot: function dot(x, y) {
      return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
    },
    sml: function sml(a, y) {
      return [a * y[0], a * y[1], a * y[2], a * y[3]];
    }
  };

  UPNG.encode.concatRGBA = function (bufs) {
    var tlen = 0;

    for (var i = 0; i < bufs.length; i++) {
      tlen += bufs[i].byteLength;
    }

    var nimg = new Uint8Array(tlen);
    var noff = 0;

    for (var i = 0; i < bufs.length; i++) {
      var img = new Uint8Array(bufs[i]);
      var il = img.length;

      for (var j = 0; j < il; j += 4) {
        var r = img[j];
        var g = img[j + 1];
        var b = img[j + 2];
        var a = img[j + 3];
        if (a == 0) r = g = b = 0;
        nimg[noff + j] = r;
        nimg[noff + j + 1] = g;
        nimg[noff + j + 2] = b;
        nimg[noff + j + 3] = a;
      }

      noff += il;
    }

    return nimg.buffer;
  };

  var BROWSER_NAME = {
    CHROME: 'CHROME',
    FIREFOX: 'FIREFOX',
    DESKTOP_SAFARI: 'DESKTOP_SAFARI',
    IE: 'IE',
    MOBILE_SAFARI: 'MOBILE_SAFARI',
    ETC: 'ETC'
  };

  var _BROWSER_NAME$CHROME$;
  var MAX_CANVAS_SIZE = (_BROWSER_NAME$CHROME$ = {}, _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.CHROME, 16384), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.FIREFOX, 11180), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.DESKTOP_SAFARI, 16384), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.IE, 8192), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.MOBILE_SAFARI, 4096), _defineProperty(_BROWSER_NAME$CHROME$, BROWSER_NAME.ETC, 8192), _BROWSER_NAME$CHROME$);

  var isBrowser = typeof window !== 'undefined';

  var moduleMapper = isBrowser && window.cordova && window.cordova.require && window.cordova.require('cordova/modulemapper');

  var CustomFile = isBrowser && (moduleMapper && moduleMapper.getOriginalSymbol(window, 'File') || typeof window.File !== 'undefined' && File);
  var CustomFileReader = isBrowser && (moduleMapper && moduleMapper.getOriginalSymbol(window, 'FileReader') || typeof window.FileReader !== 'undefined' && FileReader);
  function getFilefromDataUrl(dataUrl, filename) {
    var lastModified = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Date.now();
    return new Promise(function (resolve) {
      var arr = dataUrl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = globalThis.atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      var file = new Blob([u8arr], {
        type: mime
      });
      file.name = filename;
      file.lastModified = lastModified;
      resolve(file);
    });
  }
  function getDataUrlFromFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new CustomFileReader();

      reader.onload = function () {
        return resolve(reader.result);
      };

      reader.onerror = function (e) {
        return reject(e);
      };

      reader.readAsDataURL(file);
    });
  }
  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();

      img.onload = function () {
        return resolve(img);
      };

      img.onerror = function (e) {
        return reject(e);
      };

      img.src = src;
    });
  }
  function getBrowserName() {
    if (getBrowserName.cachedResult !== undefined) {
      return getBrowserName.cachedResult;
    }

    var browserName = BROWSER_NAME.ETC;
    var _navigator = navigator,
        userAgent = _navigator.userAgent;

    if (/Chrom(e|ium)/i.test(userAgent)) {
      browserName = BROWSER_NAME.CHROME;
    } else if (/iP(ad|od|hone)/i.test(userAgent) && /WebKit/i.test(userAgent) && !/(CriOS|FxiOS|OPiOS|mercury)/i.test(userAgent)) {
      browserName = BROWSER_NAME.MOBILE_SAFARI;
    } else if (/Safari/i.test(userAgent)) {
      browserName = BROWSER_NAME.DESKTOP_SAFARI;
    } else if (/Firefox/i.test(userAgent)) {
      browserName = BROWSER_NAME.FIREFOX;
    } else if (/MSIE/i.test(userAgent) || !!document.documentMode === true) {
      browserName = BROWSER_NAME.IE;
    }

    getBrowserName.cachedResult = browserName;
    return getBrowserName.cachedResult;
  }
  function approximateBelowMaximumCanvasSizeOfBrowser(initWidth, initHeight) {
    var browserName = getBrowserName();
    var maximumCanvasSize = MAX_CANVAS_SIZE[browserName];
    var width = initWidth;
    var height = initHeight;
    var size = width * height;
    var ratio = width > height ? height / width : width / height;

    while (size > maximumCanvasSize * maximumCanvasSize) {
      var halfSizeWidth = (maximumCanvasSize + width) / 2;
      var halfSizeHeight = (maximumCanvasSize + height) / 2;

      if (halfSizeWidth < halfSizeHeight) {
        height = halfSizeHeight;
        width = halfSizeHeight * ratio;
      } else {
        height = halfSizeWidth * ratio;
        width = halfSizeWidth;
      }

      size = width * height;
    }

    return {
      width: width,
      height: height
    };
  }
  function getNewCanvasAndCtx(width, height) {
    var canvas;
    var ctx;

    try {
      canvas = new OffscreenCanvas(width, height);
      ctx = canvas.getContext('2d');

      if (ctx === null) {
        throw new Error('getContext of OffscreenCanvas returns null');
      }
    } catch (e) {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
    }

    canvas.width = width;
    canvas.height = height;
    return [canvas, ctx];
  }
  function drawImageInCanvas(img) {
    var fileType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    var _approximateBelowMaxi = approximateBelowMaximumCanvasSizeOfBrowser(img.width, img.height),
        width = _approximateBelowMaxi.width,
        height = _approximateBelowMaxi.height;

    var _getNewCanvasAndCtx = getNewCanvasAndCtx(width, height),
        _getNewCanvasAndCtx2 = _slicedToArray(_getNewCanvasAndCtx, 2),
        canvas = _getNewCanvasAndCtx2[0],
        ctx = _getNewCanvasAndCtx2[1];

    if (fileType && /jpe?g/.test(fileType)) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  function isIOS() {
    if (isIOS.cachedResult !== undefined) {
      return isIOS.cachedResult;
    }

    isIOS.cachedResult = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes('Mac') && typeof document !== 'undefined' && 'ontouchend' in document;
    return isIOS.cachedResult;
  }
  function drawFileInCanvas(file) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function ($return, $error) {
      var img, canvas;

      var $Try_2_Post = function $Try_2_Post() {
        try {
          canvas = drawImageInCanvas(img, options.fileType || file.type);
          return $return([img, canvas]);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };

      var $Try_2_Catch = function $Try_2_Catch(e) {
        try {
          if ("development" === 'development') {
            console.error(e);
          }

          var $Try_3_Post = function $Try_3_Post() {
            try {
              return $Try_2_Post();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };

          var $Try_3_Catch = function $Try_3_Catch(e2) {
            try {
              if ("development" === 'development') {
                console.error(e2);
              }

              throw e2;
            } catch ($boundEx) {
              return $error($boundEx);
            }
          };

          try {
            var dataUrl;
            return getDataUrlFromFile(file).then(function ($await_6) {
              try {
                dataUrl = $await_6;
                return loadImage(dataUrl).then(function ($await_7) {
                  try {
                    img = $await_7;
                    return $Try_3_Post();
                  } catch ($boundEx) {
                    return $Try_3_Catch($boundEx);
                  }
                }, $Try_3_Catch);
              } catch ($boundEx) {
                return $Try_3_Catch($boundEx);
              }
            }, $Try_3_Catch);
          } catch (e2) {
            $Try_3_Catch(e2);
          }
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };

      try {
        if (isIOS() || [BROWSER_NAME.DESKTOP_SAFARI, BROWSER_NAME.MOBILE_SAFARI].includes(getBrowserName())) {
          throw new Error('Skip createImageBitmap on IOS and Safari');
        }

        return createImageBitmap(file).then(function ($await_8) {
          try {
            img = $await_8;
            return $Try_2_Post();
          } catch ($boundEx) {
            return $Try_2_Catch($boundEx);
          }
        }, $Try_2_Catch);
      } catch (e) {
        $Try_2_Catch(e);
      }
    });
  }
  function canvasToFile(canvas, fileType, fileName, fileLastModified) {
    var quality = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    return new Promise(function ($return, $error) {
      var file;

      if (fileType === 'image/png') {
        var ctx;
        ctx = canvas.getContext('2d');
        var data;

        var _ctx$getImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        data = _ctx$getImageData.data;
        var png;
        png = UPNG.encode([data], canvas.width, canvas.height, 256 * quality);
        file = new Blob([png], {
          type: fileType
        });
        file.name = fileName;
        file.lastModified = fileLastModified;
        return $If_4.call(this);
      } else {
        if (typeof OffscreenCanvas === 'function' && canvas instanceof OffscreenCanvas) {
          return canvas.convertToBlob({
            type: fileType,
            quality: quality
          }).then(function ($await_9) {
            try {
              file = $await_9;
              file.name = fileName;
              file.lastModified = fileLastModified;
              return $If_5.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        } else {
          var dataUrl;
          dataUrl = canvas.toDataURL(fileType, quality);
          return getFilefromDataUrl(dataUrl, fileName, fileLastModified).then(function ($await_10) {
            try {
              file = $await_10;
              return $If_5.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_5() {
          return $If_4.call(this);
        }
      }

      function $If_4() {
        return $return(file);
      }
    });
  }
  function cleanupCanvasMemory(canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
  function isAutoOrientationInBrowser() {
    return new Promise(function ($return, $error) {
      var testImageURL, testImageFile, testImageCanvas, testImageFile2, img;
      if (isAutoOrientationInBrowser.cachedResult !== undefined) return $return(isAutoOrientationInBrowser.cachedResult);
      testImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' + 'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' + 'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' + 'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' + 'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' + 'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
      return getFilefromDataUrl(testImageURL, 'test.jpg', Date.now()).then(function ($await_11) {
        try {
          testImageFile = $await_11;
          return drawFileInCanvas(testImageFile).then(function ($await_12) {
            try {
              testImageCanvas = $await_12[1];
              return canvasToFile(testImageCanvas, testImageFile.type, testImageFile.name, testImageFile.lastModified).then(function ($await_13) {
                try {
                  testImageFile2 = $await_13;
                  cleanupCanvasMemory(testImageCanvas);
                  return drawFileInCanvas(testImageFile2).then(function ($await_14) {
                    try {
                      img = $await_14[0];
                      isAutoOrientationInBrowser.cachedResult = img.width === 1 && img.height === 2;
                      return $return(isAutoOrientationInBrowser.cachedResult);
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }, $error);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  }
  function getExifOrientation(file) {
    return new Promise(function (resolve, reject) {
      var reader = new CustomFileReader();

      reader.onload = function (e) {
        var view = new DataView(e.target.result);

        if (view.getUint16(0, false) != 0xFFD8) {
          return resolve(-2);
        }

        var length = view.byteLength;
        var offset = 2;

        while (offset < length) {
          if (view.getUint16(offset + 2, false) <= 8) return resolve(-1);
          var marker = view.getUint16(offset, false);
          offset += 2;

          if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
              return resolve(-1);
            }

            var little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;

            for (var i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) == 0x0112) {
                return resolve(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 0xFF00) != 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }

        return resolve(-1);
      };

      reader.onerror = function (e) {
        return reject(e);
      };

      reader.readAsArrayBuffer(file);
    });
  }
  function handleMaxWidthOrHeight(canvas, options) {
    var width = canvas.width;
    var height = canvas.height;
    var maxWidthOrHeight = options.maxWidthOrHeight;
    var needToHandle = isFinite(maxWidthOrHeight) && (width > maxWidthOrHeight || height > maxWidthOrHeight);
    var newCanvas = canvas;
    var ctx;

    if (needToHandle) {
      var _getNewCanvasAndCtx3 = getNewCanvasAndCtx(width, height);

      var _getNewCanvasAndCtx4 = _slicedToArray(_getNewCanvasAndCtx3, 2);

      newCanvas = _getNewCanvasAndCtx4[0];
      ctx = _getNewCanvasAndCtx4[1];

      if (width > height) {
        newCanvas.width = maxWidthOrHeight;
        newCanvas.height = height / width * maxWidthOrHeight;
      } else {
        newCanvas.width = width / height * maxWidthOrHeight;
        newCanvas.height = maxWidthOrHeight;
      }

      ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      cleanupCanvasMemory(canvas);
    }

    return newCanvas;
  }
  function followExifOrientation(canvas, exifOrientation) {
    var width = canvas.width;
    var height = canvas.height;

    var _getNewCanvasAndCtx5 = getNewCanvasAndCtx(width, height),
        _getNewCanvasAndCtx6 = _slicedToArray(_getNewCanvasAndCtx5, 2),
        newCanvas = _getNewCanvasAndCtx6[0],
        ctx = _getNewCanvasAndCtx6[1];

    if (exifOrientation > 4 && exifOrientation < 9) {
      newCanvas.width = height;
      newCanvas.height = width;
    } else {
      newCanvas.width = width;
      newCanvas.height = height;
    }

    switch (exifOrientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0);
        break;

      case 3:
        ctx.transform(-1, 0, 0, -1, width, height);
        break;

      case 4:
        ctx.transform(1, 0, 0, -1, 0, height);
        break;

      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;

      case 6:
        ctx.transform(0, 1, -1, 0, height, 0);
        break;

      case 7:
        ctx.transform(0, -1, -1, 0, height, width);
        break;

      case 8:
        ctx.transform(0, -1, 1, 0, 0, width);
        break;
    }

    ctx.drawImage(canvas, 0, 0, width, height);
    cleanupCanvasMemory(canvas);
    return newCanvas;
  }

  function compress(file, options) {
    var previousProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return new Promise(function ($return, $error) {
      var progress, remainingTrials, maxSizeByte, origCanvas, maxWidthOrHeightFixedCanvas, exifOrientation, orientationFixedCanvas, quality, outputFileType, tempFile, origExceedMaxSize, sizeBecomeLarger, sourceSize, renderedSize, currentSize, compressedFile, newCanvas, ctx, canvas, shouldReduceResolution;

      function incProgress() {
        var inc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

        if (options.signal && options.signal.aborted) {
          throw options.signal.reason;
        }

        progress += inc;
        options.onProgress(Math.min(progress, 100));
      }

      function setProgress(p) {
        if (options.signal && options.signal.aborted) {
          throw options.signal.reason;
        }

        progress = Math.min(Math.max(p, progress), 100);
        options.onProgress(progress);
      }

      progress = previousProgress;
      remainingTrials = options.maxIteration || 10;
      maxSizeByte = options.maxSizeMB * 1024 * 1024;
      incProgress();
      return drawFileInCanvas(file, options).then(function ($await_5) {
        try {
          var _$await_ = _slicedToArray($await_5, 2);

          origCanvas = _$await_[1];
          incProgress();
          maxWidthOrHeightFixedCanvas = handleMaxWidthOrHeight(origCanvas, options);
          incProgress();
          return new Promise(function ($return, $error) {
            var $logicalOr_1;

            if (!($logicalOr_1 = options.exifOrientation)) {
              return getExifOrientation(file).then(function ($await_6) {
                try {
                  $logicalOr_1 = $await_6;
                  return $If_2.call(this);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }.bind(this), $error);
            }

            function $If_2() {
              return $return($logicalOr_1);
            }

            return $If_2.call(this);
          }).then(function ($await_7) {
            try {
              exifOrientation = $await_7;
              incProgress();
              return isAutoOrientationInBrowser().then(function ($await_8) {
                try {
                  orientationFixedCanvas = $await_8 ? maxWidthOrHeightFixedCanvas : followExifOrientation(maxWidthOrHeightFixedCanvas, exifOrientation);
                  incProgress();
                  quality = options.initialQuality || 1.0;
                  outputFileType = options.fileType || file.type;
                  return canvasToFile(orientationFixedCanvas, outputFileType, file.name, file.lastModified, quality).then(function ($await_9) {
                    try {
                      {
                        tempFile = $await_9;
                        incProgress();
                        origExceedMaxSize = tempFile.size > maxSizeByte;
                        sizeBecomeLarger = tempFile.size > file.size;

                        if ("development" === 'development') {
                          console.log('original file size', file.size);
                          console.log('current file size', tempFile.size);
                        }

                        if (!origExceedMaxSize && !sizeBecomeLarger) {
                          if ("development" === 'development') {
                            console.log('no need to compress');
                          }

                          setProgress(100);
                          return $return(tempFile);
                        }

                        sourceSize = file.size;
                        renderedSize = tempFile.size;
                        currentSize = renderedSize;
                        canvas = orientationFixedCanvas;
                        shouldReduceResolution = !options.alwaysKeepResolution && origExceedMaxSize;
                        var $Loop_3_trampoline;

                        function $Loop_3() {
                          if (remainingTrials-- && (currentSize > maxSizeByte || currentSize > sourceSize)) {
                            var newWidth, newHeight;
                            newWidth = shouldReduceResolution ? canvas.width * 0.95 : canvas.width;
                            newHeight = shouldReduceResolution ? canvas.height * 0.95 : canvas.height;

                            if ("development" === 'development') {
                              console.log('current width', newWidth);
                              console.log('current height', newHeight);
                              console.log('current quality', quality);
                            }

                            var _getNewCanvasAndCtx = getNewCanvasAndCtx(newWidth, newHeight);

                            var _getNewCanvasAndCtx2 = _slicedToArray(_getNewCanvasAndCtx, 2);

                            newCanvas = _getNewCanvasAndCtx2[0];
                            ctx = _getNewCanvasAndCtx2[1];
                            ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
                            quality *= 0.95;
                            return canvasToFile(newCanvas, outputFileType, file.name, file.lastModified, quality).then(function ($await_10) {
                              try {
                                compressedFile = $await_10;
                                cleanupCanvasMemory(canvas);
                                canvas = newCanvas;
                                currentSize = compressedFile.size;
                                setProgress(Math.min(99, Math.floor((renderedSize - currentSize) / (renderedSize - maxSizeByte) * 100)));
                                return $Loop_3;
                              } catch ($boundEx) {
                                return $error($boundEx);
                              }
                            }, $error);
                          } else return [1];
                        }

                        return ($Loop_3_trampoline = function (q) {
                          while (q) {
                            if (q.then) return void q.then($Loop_3_trampoline, $error);

                            try {
                              if (q.pop) {
                                if (q.length) return q.pop() ? $Loop_3_exit.call(this) : q;else q = $Loop_3;
                              } else q = q.call(this);
                            } catch (_exception) {
                              return $error(_exception);
                            }
                          }
                        }.bind(this))($Loop_3);

                        function $Loop_3_exit() {
                          cleanupCanvasMemory(canvas);
                          cleanupCanvasMemory(newCanvas);
                          cleanupCanvasMemory(maxWidthOrHeightFixedCanvas);
                          cleanupCanvasMemory(orientationFixedCanvas);
                          cleanupCanvasMemory(origCanvas);
                          setProgress(100);
                          return $return(compressedFile);
                        }
                      }
                    } catch ($boundEx) {
                      return $error($boundEx);
                    }
                  }.bind(this), $error);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }.bind(this), $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    });
  }

  var cnt = 0;
  var imageCompressionLibUrl;
  var worker;

  function createWorker(script) {
    var blobArgs = [];

    if (typeof script === 'function') {
      blobArgs.push("(".concat(script, ")()"));
    } else {
      blobArgs.push(script);
    }

    return new Worker(URL.createObjectURL(new Blob(blobArgs)));
  }

  function createSourceObject(str) {
    return URL.createObjectURL(new Blob([str], {
      type: 'application/javascript'
    }));
  }

  function stringify(o) {
    return JSON.stringify(o, function (key, value) {
      return typeof value === 'function' ? "BIC_FN:::(function () { return ".concat(value.toString(), " })()") : value;
    });
  }

  function parse(o) {
    if (typeof o === 'string') return o;
    var result = {};
    Object.entries(o).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (typeof value === 'string' && value.startsWith('BIC_FN:::')) {
        try {
          result[key] = eval(value.replace(/^BIC_FN:::/, ''));
        } catch (e) {
          {
            console.error(key, e);
          }

          throw e;
        }
      } else {
        result[key] = parse(value);
      }
    });
    return result;
  }

  function generateLib() {
    return createSourceObject("\n    // reconstruct library\n    function imageCompression (){return (".concat(imageCompression, ").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile, "\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl, "\n    imageCompression.loadImage = ").concat(imageCompression.loadImage, "\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas, "\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas, "\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile, "\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation, "\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight, "\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation, "\n    imageCompression.cleanupCanvasMemory = ").concat(imageCompression.cleanupCanvasMemory, "\n    imageCompression.isAutoOrientationInBrowser = ").concat(imageCompression.isAutoOrientationInBrowser, "\n    imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = ").concat(imageCompression.approximateBelowMaximumCanvasSizeOfBrowser, "\n    imageCompression.getBrowserName = ").concat(imageCompression.getBrowserName, "\n\n    // functions / objects\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n    cleanupCanvasMemory = imageCompression.cleanupCanvasMemory\n    isAutoOrientationInBrowser = imageCompression.isAutoOrientationInBrowser\n    approximateBelowMaximumCanvasSizeOfBrowser = imageCompression.approximateBelowMaximumCanvasSizeOfBrowser\n    getBrowserName = imageCompression.getBrowserName\n    isIOS = ").concat(isIOS, "\n    \n    getNewCanvasAndCtx = ").concat(getNewCanvasAndCtx, "\n    CustomFileReader = FileReader\n    CustomFile = File\n    MAX_CANVAS_SIZE = ").concat(JSON.stringify(MAX_CANVAS_SIZE), "\n    BROWSER_NAME = ").concat(JSON.stringify(BROWSER_NAME), "\n    function compress (){return (").concat(compress, ").apply(null, arguments)}\n\n    // core-js\n    function _slicedToArray(arr, n) { return arr }\n    function _typeof(a) { return typeof a }\n    function _objectSpread2(target) {\n      for (var i = 1; i < arguments.length; i++) {\n        var source = arguments[i] != null ? arguments[i] : {};\n  \n        Object.assign(target, source)\n      }\n  \n      return target;\n    }\n\n    // Libraries\n    const parse = ").concat(parse, "\n    const UPNG = {}\n    UPNG.toRGBA8 = ").concat(UPNG.toRGBA8, "\n    UPNG.toRGBA8.decodeImage = ").concat(UPNG.toRGBA8.decodeImage, "\n    UPNG.decode = ").concat(UPNG.decode, "\n    UPNG.decode._decompress = ").concat(UPNG.decode._decompress, "\n    UPNG.decode._inflate = ").concat(UPNG.decode._inflate, "\n    UPNG.decode._readInterlace = ").concat(UPNG.decode._readInterlace, "\n    UPNG.decode._getBPP = ").concat(UPNG.decode._getBPP, " \n    UPNG.decode._filterZero = ").concat(UPNG.decode._filterZero, "\n    UPNG.decode._paeth = ").concat(UPNG.decode._paeth, "\n    UPNG.decode._IHDR = ").concat(UPNG.decode._IHDR, "\n    UPNG._bin = parse(").concat(stringify(UPNG._bin), ")\n    UPNG._copyTile = ").concat(UPNG._copyTile, "\n    UPNG.encode = ").concat(UPNG.encode, "\n    UPNG.encodeLL = ").concat(UPNG.encodeLL, " \n    UPNG.encode._main = ").concat(UPNG.encode._main, "\n    UPNG.encode.compressPNG = ").concat(UPNG.encode.compressPNG, " \n    UPNG.encode.compress = ").concat(UPNG.encode.compress, "\n    UPNG.encode.framize = ").concat(UPNG.encode.framize, " \n    UPNG.encode._updateFrame = ").concat(UPNG.encode._updateFrame, " \n    UPNG.encode._prepareDiff = ").concat(UPNG.encode._prepareDiff, " \n    UPNG.encode._filterZero = ").concat(UPNG.encode._filterZero, " \n    UPNG.encode._filterLine = ").concat(UPNG.encode._filterLine, "\n    UPNG.encode.concatRGBA = ").concat(UPNG.encode.concatRGBA, "\n    UPNG.crc = parse(").concat(stringify(UPNG.crc), ")\n    UPNG.crc.table = ( function() {\n    var tab = new Uint32Array(256);\n    for (var n=0; n<256; n++) {\n      var c = n;\n      for (var k=0; k<8; k++) {\n        if (c & 1)  c = 0xedb88320 ^ (c >>> 1);\n        else        c = c >>> 1;\n      }\n      tab[n] = c;  }\n    return tab;  })()\n    UPNG.quantize = ").concat(UPNG.quantize, " \n    UPNG.quantize.getKDtree = ").concat(UPNG.quantize.getKDtree, " \n    UPNG.quantize.getNearest = ").concat(UPNG.quantize.getNearest, " \n    UPNG.quantize.planeDst = ").concat(UPNG.quantize.planeDst, " \n    UPNG.quantize.dist = ").concat(UPNG.quantize.dist, "     \n    UPNG.quantize.splitPixels = ").concat(UPNG.quantize.splitPixels, " \n    UPNG.quantize.vecDot = ").concat(UPNG.quantize.vecDot, " \n    UPNG.quantize.stats = ").concat(UPNG.quantize.stats, " \n    UPNG.quantize.estats = ").concat(UPNG.quantize.estats, "\n    UPNG.M4 = parse(").concat(stringify(UPNG.M4), ")\n    UPNG.encode.concatRGBA = ").concat(UPNG.encode.concatRGBA, "\n    UPNG.inflateRaw=function(){\n    var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;\n      if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;\n      if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);\n        var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;\n        w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;\n        h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;\n                                                                                                        c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;\n        d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);\n        I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;\n        if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);\n        d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};\n      H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};\n      H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;\n        if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);\n          n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;\n        while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};\n      H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;\n        var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];\n          b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);\n        while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;\n                                                                                                 n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};\n      H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};\n      H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};\n      H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;\n        return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();\n      (function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;\n        V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;\n        N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];\n        N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);\n        H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);\n        n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()\n    \n    const UZIP = {}\n    UZIP[\"parse\"] = ").concat(UZIP_1.parse, "\n    UZIP._readLocal = ").concat(UZIP_1._readLocal, "\n    UZIP.inflateRaw = ").concat(UZIP_1.inflateRaw, "\n    UZIP.inflate = ").concat(UZIP_1.inflate, "\n    UZIP.deflate = ").concat(UZIP_1.deflate, "\n    UZIP.deflateRaw = ").concat(UZIP_1.deflateRaw, "\n    UZIP.encode = ").concat(UZIP_1.encode, "\n    UZIP._noNeed = ").concat(UZIP_1._noNeed, "\n    UZIP._writeHeader = ").concat(UZIP_1._writeHeader, "\n    UZIP.crc = parse(").concat(stringify(UZIP_1.crc), ")\n    UZIP.crc.table = ( function() {\n      var tab = new Uint32Array(256);\n      for (var n=0; n<256; n++) {\n        var c = n;\n        for (var k=0; k<8; k++) {\n          if (c & 1)  c = 0xedb88320 ^ (c >>> 1);\n          else        c = c >>> 1;\n        }\n        tab[n] = c;  }\n      return tab;  })()\n    \n    UZIP.adler = ").concat(UZIP_1.adler, "\n    UZIP.bin = parse(").concat(stringify(UZIP_1.bin), ")\n    UZIP.F = {}\n    UZIP.F.deflateRaw = ").concat(UZIP_1.F.deflateRaw, "\n    UZIP.F._bestMatch = ").concat(UZIP_1.F._bestMatch, "\n    UZIP.F._howLong = ").concat(UZIP_1.F._howLong, "\n    UZIP.F._hash = ").concat(UZIP_1.F._hash, "\n    UZIP.saved = ").concat(UZIP_1.saved, "\n    UZIP.F._writeBlock = ").concat(UZIP_1.F._writeBlock, "\n    UZIP.F._copyExact = ").concat(UZIP_1.F._copyExact, "\n    UZIP.F.getTrees = ").concat(UZIP_1.F.getTrees, "\n    UZIP.F.getSecond = ").concat(UZIP_1.F.getSecond, "\n    UZIP.F.nonZero = ").concat(UZIP_1.F.nonZero, "\n    UZIP.F.contSize = ").concat(UZIP_1.F.contSize, "\n    UZIP.F._codeTiny = ").concat(UZIP_1.F._codeTiny, " \n    UZIP.F._lenCodes = ").concat(UZIP_1.F._lenCodes, " \n    UZIP.F._hufTree = ").concat(UZIP_1.F._hufTree, " \n    UZIP.F.setDepth = ").concat(UZIP_1.F.setDepth, " \n    UZIP.F.restrictDepth = ").concat(UZIP_1.F.restrictDepth, "\n    UZIP.F._goodIndex = ").concat(UZIP_1.F._goodIndex, " \n    UZIP.F._writeLit = ").concat(UZIP_1.F._writeLit, " \n    UZIP.F.inflate = ").concat(UZIP_1.F.inflate, " \n    UZIP.F._check = ").concat(UZIP_1.F._check, " \n    UZIP.F._decodeTiny = ").concat(UZIP_1.F._decodeTiny, " \n    UZIP.F._copyOut = ").concat(UZIP_1.F._copyOut, " \n    UZIP.F.makeCodes = ").concat(UZIP_1.F.makeCodes, " \n    UZIP.F.codes2map = ").concat(UZIP_1.F.codes2map, " \n    UZIP.F.revCodes = ").concat(UZIP_1.F.revCodes, " \n\n    // used only in deflate\n    UZIP.F._putsE = ").concat(UZIP_1.F._putsE, "\n    UZIP.F._putsF = ").concat(UZIP_1.F._putsF, "\n  \n    UZIP.F._bitsE = ").concat(UZIP_1.F._bitsE, "\n    UZIP.F._bitsF = ").concat(UZIP_1.F._bitsF, "\n\n    UZIP.F._get17 = ").concat(UZIP_1.F._get17, "\n    UZIP.F._get25 = ").concat(UZIP_1.F._get25, "\n    UZIP.F.U = function(){\n      var u16=Uint16Array, u32=Uint32Array;\n      return {\n        next_code : new u16(16),\n        bl_count  : new u16(16),\n        ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],\n        of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],\n        exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],\n        ldef : new u16(32),\n        df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],\n        dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],\n        ddef : new u32(32),\n        flmap: new u16(  512),  fltree: [],\n        fdmap: new u16(   32),  fdtree: [],\n        lmap : new u16(32768),  ltree : [],  ttree:[],\n        dmap : new u16(32768),  dtree : [],\n        imap : new u16(  512),  itree : [],\n        //rev9 : new u16(  512)\n        rev15: new u16(1<<15),\n        lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),\n        lits : new u32(15000),\n        strt : new u16(1<<16),\n        prev : new u16(1<<15)\n      };\n    } ();\n\n    (function(){\n      var U = UZIP.F.U;\n      var len = 1<<15;\n      for(var i=0; i<len; i++) {\n        var x = i;\n        x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));\n        x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));\n        x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));\n        x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));\n        U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;\n      }\n  \n      function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }\n  \n      for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }\n  \n      pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);\n      /*\n        var i = 0;\n        for(; i<=143; i++) U.fltree.push(0,8);\n        for(; i<=255; i++) U.fltree.push(0,9);\n        for(; i<=279; i++) U.fltree.push(0,7);\n        for(; i<=287; i++) U.fltree.push(0,8);\n        */\n      UZIP.F.makeCodes(U.fltree, 9);\n      UZIP.F.codes2map(U.fltree, 9, U.flmap);\n      UZIP.F.revCodes (U.fltree, 9)\n  \n      pushV(U.fdtree,32,5);\n      //for(i=0;i<32; i++) U.fdtree.push(0,5);\n      UZIP.F.makeCodes(U.fdtree, 5);\n      UZIP.F.codes2map(U.fdtree, 5, U.fdmap);\n      UZIP.F.revCodes (U.fdtree, 5)\n  \n      pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);\n      /*\n        for(var i=0; i< 19; i++) U.itree.push(0,0);\n        for(var i=0; i<286; i++) U.ltree.push(0,0);\n        for(var i=0; i< 30; i++) U.dtree.push(0,0);\n        for(var i=0; i<320; i++) U.ttree.push(0,0);\n        */\n    })()\n    "));
  }

  function generateWorkerScript() {
    return createWorker("\n    let scriptImported = false\n    self.addEventListener('message', async (e) => {\n      const { file, id, imageCompressionLibUrl, options } = e.data\n      options.onProgress = (progress) => self.postMessage({ progress, id })\n      try {\n        if (!scriptImported) {\n          // console.log('[worker] importScripts', imageCompressionLibUrl)\n          self.importScripts(imageCompressionLibUrl)\n          scriptImported = true\n        }\n        // console.log('[worker] self', self)\n        const compressedFile = await imageCompression(file, options)\n        self.postMessage({ file: compressedFile, id })\n      } catch (e) {\n        // console.error('[worker] error', e)\n        self.postMessage({ error: e.message + '\\n' + e.stack, id })\n      }\n    })\n  ");
  }

  function compressOnWebWorker(file, options) {
    return new Promise(function (resolve, reject) {
      cnt += 1;
      var id = cnt;

      if (!imageCompressionLibUrl) {
        imageCompressionLibUrl = generateLib();
      }

      if (!worker) {
        worker = generateWorkerScript();
      }

      function handler(e) {
        if (e.data.id === id) {
          if (options.signal && options.signal.aborted) {
            return;
          }

          if (e.data.progress !== undefined) {
            options.onProgress(e.data.progress);
            return;
          }

          worker.removeEventListener('message', handler);

          if (e.data.error) {
            reject(new Error(e.data.error));
          }

          resolve(e.data.file);
        }
      }

      worker.addEventListener('message', handler);
      worker.addEventListener('error', reject);

      if (options.signal) {
        options.signal.addEventListener('abort', function () {
          worker.terminate();
          reject(options.signal.reason);
        });
      }

      worker.postMessage({
        file: file,
        id: id,
        imageCompressionLibUrl: imageCompressionLibUrl,
        options: _objectSpread2(_objectSpread2({}, options), {}, {
          onProgress: undefined,
          signal: undefined
        })
      });
    });
  }

  function imageCompression(files, options) {
    return new Promise(function ($return, $error) {
      var opts, compressedFile, progress, onProgress, useWebWorker, inWebWorker;
      opts = _objectSpread2({}, options);
      progress = 0;
      var _opts = opts;
      onProgress = _opts.onProgress;
      opts.maxSizeMB = opts.maxSizeMB || Number.POSITIVE_INFINITY;
      useWebWorker = typeof opts.useWebWorker === "boolean" ? opts.useWebWorker : true;
      delete opts.useWebWorker;

      opts.onProgress = function (aProgress) {
        progress = aProgress;

        if (typeof onProgress === "function") {
          onProgress(progress);
        }
      };

      if (!(file instanceof Blob || file instanceof CustomFile)) {
        return $error(new Error("The file given is not an instance of Blob or File"));
      } else if (!/^image/.test(file.type)) {
        return $error(new Error("The file given is not an image"));
      }

      inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;

      {
        if (useWebWorker && typeof Worker === "function" || inWebWorker) {
          console.log("run compression in web worker");
        } else {
          console.log("run compression in main thread");
        }
      }

      if (useWebWorker && typeof Worker === "function" && !inWebWorker) {
        var $Try_1_Post = function () {
          try {
            return $If_3.call(this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this);

        var $Try_1_Catch = function $Try_1_Catch(e) {
          try {
            if ("development" === "development") {
              console.warn("Run compression in web worker failed:", e, ", fall back to main thread");
            }

            return Promise.all(files.map(function (file) {
              return compress(file, opts);
            })).then(function (res) {
              return res;
            }).then(function ($await_4) {
              try {
                compressedFile = $await_4;
                return $Try_1_Post();
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }, $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        };

        try {
          return Promise.all(files.map(function (file) {
            return compressOnWebWorker(file, opts);
          })).then(function (res) {
            return res;
          }).then(function ($await_5) {
            try {
              compressedFile = $await_5;
              return $Try_1_Post();
            } catch ($boundEx) {
              return $Try_1_Catch($boundEx);
            }
          }, $Try_1_Catch);
        } catch (e) {
          $Try_1_Catch(e);
        }
      } else {
        return Promise.all(files.map(function (file) {
          return compress(file, opts);
        })).then(function (res) {
          return res;
        }).then(function ($await_6) {
          try {
            compressedFile = $await_6;
            return $If_3.call(this);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      }

      function $If_3() {
        try {
          compressedFile.name = file.name;
          compressedFile.lastModified = file.lastModified;
        } catch (e) {
          {
            console.error(e);
          }
        }

        return $return(compressedFile);
      }
    });
  }

  imageCompression.getDataUrlFromFile = getDataUrlFromFile;
  imageCompression.getFilefromDataUrl = getFilefromDataUrl;
  imageCompression.loadImage = loadImage;
  imageCompression.drawImageInCanvas = drawImageInCanvas;
  imageCompression.drawFileInCanvas = drawFileInCanvas;
  imageCompression.canvasToFile = canvasToFile;
  imageCompression.getExifOrientation = getExifOrientation;
  imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight;
  imageCompression.followExifOrientation = followExifOrientation;
  imageCompression.cleanupCanvasMemory = cleanupCanvasMemory;
  imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser;
  imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = approximateBelowMaximumCanvasSizeOfBrowser;
  imageCompression.getBrowserName = getBrowserName;
  imageCompression.version = "2.0.0";

  return imageCompression;

}));
//# sourceMappingURL=browser-image-compression.js.map
