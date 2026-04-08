import "./chunk-5WRI5ZAA.js";

// node_modules/@thumbmarkjs/thumbmarkjs/dist/thumbmark.esm.js
var e = "https://api.thumbmarkjs.com";
var t = { exclude: [], include: [], stabilize: ["private", "iframe"], logging: true, timeout: 5e3, cache_api_call: true, performance: false, experimental: false };
var n = { ...t };
function o(e2, t2) {
  n[e2] = t2;
}
var r = { private: [{ exclude: ["canvas"], browsers: ["firefox", "safari>=17", "brave"] }, { exclude: ["audio"], browsers: ["samsungbrowser", "safari"] }, { exclude: ["fonts"], browsers: ["firefox"] }, { exclude: ["audio.sampleHash", "hardware.deviceMemory", "header.acceptLanguage.q", "system.hardwareConcurrency", "plugins"], browsers: ["brave"] }, { exclude: ["tls.extensions"], browsers: ["firefox", "chrome", "safari"] }, { exclude: ["header.acceptLanguage"], browsers: ["edge", "chrome"] }], iframe: [{ exclude: ["permissions.camera", "permission.geolocation", "permissions.microphone", "system.applePayVersion", "system.cookieEnabled"], browsers: ["safari"] }, { exclude: ["permissions.background-fetch", "permissions.storage-access"], browsers: ["chrome", "brave", "edge", "opera"] }], vpn: [{ exclude: ["ip"] }] };
function i(e2) {
  let t2 = 0;
  for (let n2 = 0; n2 < e2.length; ++n2) t2 += Math.abs(e2[n2]);
  return t2;
}
function a(e2, t2, n2) {
  let o2 = [];
  for (let t3 = 0; t3 < e2[0].data.length; t3++) {
    let n3 = [];
    for (let o3 = 0; o3 < e2.length; o3++) n3.push(e2[o3].data[t3]);
    o2.push(s(n3));
  }
  const r2 = new Uint8ClampedArray(o2);
  return new ImageData(r2, t2, n2);
}
function s(e2) {
  if (0 === e2.length) return 0;
  const t2 = {};
  for (const n3 of e2) t2[n3] = (t2[n3] || 0) + 1;
  let n2 = e2[0];
  for (const e3 in t2) t2[e3] > t2[n2] && (n2 = parseInt(e3, 10));
  return n2;
}
function c(e2) {
  return e2 ^= e2 >>> 16, e2 = Math.imul(e2, 2246822507), e2 ^= e2 >>> 13, e2 = Math.imul(e2, 3266489909), (e2 ^= e2 >>> 16) >>> 0;
}
var l = new Uint32Array([597399067, 2869860233, 951274213, 2716044179]);
function u(e2, t2) {
  return e2 << t2 | e2 >>> 32 - t2;
}
function m(e2, t2 = 0) {
  var n2;
  if (t2 = t2 ? 0 | t2 : 0, "string" == typeof e2 && (n2 = e2, e2 = new TextEncoder().encode(n2).buffer), !(e2 instanceof ArrayBuffer)) throw new TypeError("Expected key to be ArrayBuffer or string");
  const o2 = new Uint32Array([t2, t2, t2, t2]);
  !(function(e3, t3) {
    const n3 = e3.byteLength / 16 | 0, o3 = new Uint32Array(e3, 0, 4 * n3);
    for (let e4 = 0; e4 < n3; e4++) {
      const n4 = o3.subarray(4 * e4, 4 * (e4 + 1));
      n4[0] = Math.imul(n4[0], l[0]), n4[0] = u(n4[0], 15), n4[0] = Math.imul(n4[0], l[1]), t3[0] = t3[0] ^ n4[0], t3[0] = u(t3[0], 19), t3[0] = t3[0] + t3[1], t3[0] = Math.imul(t3[0], 5) + 1444728091, n4[1] = Math.imul(n4[1], l[1]), n4[1] = u(n4[1], 16), n4[1] = Math.imul(n4[1], l[2]), t3[1] = t3[1] ^ n4[1], t3[1] = u(t3[1], 17), t3[1] = t3[1] + t3[2], t3[1] = Math.imul(t3[1], 5) + 197830471, n4[2] = Math.imul(n4[2], l[2]), n4[2] = u(n4[2], 17), n4[2] = Math.imul(n4[2], l[3]), t3[2] = t3[2] ^ n4[2], t3[2] = u(t3[2], 15), t3[2] = t3[2] + t3[3], t3[2] = Math.imul(t3[2], 5) + 2530024501, n4[3] = Math.imul(n4[3], l[3]), n4[3] = u(n4[3], 18), n4[3] = Math.imul(n4[3], l[0]), t3[3] = t3[3] ^ n4[3], t3[3] = u(t3[3], 13), t3[3] = t3[3] + t3[0], t3[3] = Math.imul(t3[3], 5) + 850148119;
    }
  })(e2, o2), (function(e3, t3) {
    const n3 = e3.byteLength / 16 | 0, o3 = e3.byteLength % 16, r3 = new Uint32Array(4), i2 = new Uint8Array(e3, 16 * n3, o3);
    switch (o3) {
      case 15:
        r3[3] = r3[3] ^ i2[14] << 16;
      case 14:
        r3[3] = r3[3] ^ i2[13] << 8;
      case 13:
        r3[3] = r3[3] ^ i2[12], r3[3] = Math.imul(r3[3], l[3]), r3[3] = u(r3[3], 18), r3[3] = Math.imul(r3[3], l[0]), t3[3] = t3[3] ^ r3[3];
      case 12:
        r3[2] = r3[2] ^ i2[11] << 24;
      case 11:
        r3[2] = r3[2] ^ i2[10] << 16;
      case 10:
        r3[2] = r3[2] ^ i2[9] << 8;
      case 9:
        r3[2] = r3[2] ^ i2[8], r3[2] = Math.imul(r3[2], l[2]), r3[2] = u(r3[2], 17), r3[2] = Math.imul(r3[2], l[3]), t3[2] = t3[2] ^ r3[2];
      case 8:
        r3[1] = r3[1] ^ i2[7] << 24;
      case 7:
        r3[1] = r3[1] ^ i2[6] << 16;
      case 6:
        r3[1] = r3[1] ^ i2[5] << 8;
      case 5:
        r3[1] = r3[1] ^ i2[4], r3[1] = Math.imul(r3[1], l[1]), r3[1] = u(r3[1], 16), r3[1] = Math.imul(r3[1], l[2]), t3[1] = t3[1] ^ r3[1];
      case 4:
        r3[0] = r3[0] ^ i2[3] << 24;
      case 3:
        r3[0] = r3[0] ^ i2[2] << 16;
      case 2:
        r3[0] = r3[0] ^ i2[1] << 8;
      case 1:
        r3[0] = r3[0] ^ i2[0], r3[0] = Math.imul(r3[0], l[0]), r3[0] = u(r3[0], 15), r3[0] = Math.imul(r3[0], l[1]), t3[0] = t3[0] ^ r3[0];
    }
  })(e2, o2), (function(e3, t3) {
    t3[0] = t3[0] ^ e3.byteLength, t3[1] = t3[1] ^ e3.byteLength, t3[2] = t3[2] ^ e3.byteLength, t3[3] = t3[3] ^ e3.byteLength, t3[0] = t3[0] + t3[1] | 0, t3[0] = t3[0] + t3[2] | 0, t3[0] = t3[0] + t3[3] | 0, t3[1] = t3[1] + t3[0] | 0, t3[2] = t3[2] + t3[0] | 0, t3[3] = t3[3] + t3[0] | 0, t3[0] = c(t3[0]), t3[1] = c(t3[1]), t3[2] = c(t3[2]), t3[3] = c(t3[3]), t3[0] = t3[0] + t3[1] | 0, t3[0] = t3[0] + t3[2] | 0, t3[0] = t3[0] + t3[3] | 0, t3[1] = t3[1] + t3[0] | 0, t3[2] = t3[2] + t3[0] | 0, t3[3] = t3[3] + t3[0] | 0;
  })(e2, o2);
  const r2 = new Uint8Array(o2.buffer);
  return Array.from(r2).map(((e3) => e3.toString(16).padStart(2, "0"))).join("");
}
var d = 280;
function h(e2, t2) {
  return new Promise(((n2) => setTimeout(n2, e2, t2)));
}
var f = ["Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT", "Arimo", "Archivo", "Barlow", "Bebas Neue", "Bitter", "Bookman", "Calibri", "Cabin", "Candara", "Century", "Century Gothic", "Comic Sans MS", "Constantia", "Courier", "Courier New", "Crimson Text", "DM Mono", "DM Sans", "DM Serif Display", "DM Serif Text", "Dosis", "Droid Sans", "Exo", "Fira Code", "Fira Sans", "Franklin Gothic Medium", "Garamond", "Geneva", "Georgia", "Gill Sans", "Helvetica", "Impact", "Inconsolata", "Indie Flower", "Inter", "Josefin Sans", "Karla", "Lato", "Lexend", "Lucida Bright", "Lucida Console", "Lucida Sans Unicode", "Manrope", "Merriweather", "Merriweather Sans", "Montserrat", "Myriad", "Noto Sans", "Nunito", "Nunito Sans", "Open Sans", "Optima", "Orbitron", "Oswald", "Pacifico", "Palatino", "Perpetua", "PT Sans", "PT Serif", "Poppins", "Prompt", "Public Sans", "Quicksand", "Rajdhani", "Recursive", "Roboto", "Roboto Condensed", "Rockwell", "Rubik", "Segoe Print", "Segoe Script", "Segoe UI", "Sora", "Source Sans Pro", "Space Mono", "Tahoma", "Taviraj", "Times", "Times New Roman", "Titillium Web", "Trebuchet MS", "Ubuntu", "Varela Round", "Verdana", "Work Sans"];
var p = ["monospace", "sans-serif", "serif"];
function g(e2, t2) {
  if (!e2) throw new Error("Canvas context not supported");
  return e2.font = `72px ${t2}`, e2.measureText("WwMmLli0Oo").width;
}
function w() {
  var e2;
  const t2 = document.createElement("canvas"), n2 = null !== (e2 = t2.getContext("webgl")) && void 0 !== e2 ? e2 : t2.getContext("experimental-webgl");
  if (n2 && "getParameter" in n2) try {
    const e3 = (n2.getParameter(n2.VENDOR) || "").toString(), t3 = (n2.getParameter(n2.RENDERER) || "").toString();
    let o2 = { vendor: e3, renderer: t3, version: (n2.getParameter(n2.VERSION) || "").toString(), shadingLanguageVersion: (n2.getParameter(n2.SHADING_LANGUAGE_VERSION) || "").toString() };
    if (!t3.length || !e3.length) {
      const e4 = n2.getExtension("WEBGL_debug_renderer_info");
      if (e4) {
        const t4 = (n2.getParameter(e4.UNMASKED_VENDOR_WEBGL) || "").toString(), r2 = (n2.getParameter(e4.UNMASKED_RENDERER_WEBGL) || "").toString();
        t4 && (o2.vendorUnmasked = t4), r2 && (o2.rendererUnmasked = r2);
      }
    }
    return o2;
  } catch (e3) {
  }
  return "undefined";
}
function v() {
  const e2 = new Float32Array(1), t2 = new Uint8Array(e2.buffer);
  return e2[0] = 1 / 0, e2[0] = e2[0] - e2[0], t2[3];
}
var y = (e2, t2, n2, o2) => {
  const r2 = (n2 - t2) / o2;
  let i2 = 0;
  for (let n3 = 0; n3 < o2; n3++) {
    i2 += e2(t2 + (n3 + 0.5) * r2);
  }
  return i2 * r2;
};
function b(e2, t2) {
  const n2 = {};
  return t2.forEach(((t3) => {
    const o2 = (function(e3) {
      if (0 === e3.length) return null;
      const t4 = {};
      e3.forEach(((e4) => {
        const n4 = String(e4);
        t4[n4] = (t4[n4] || 0) + 1;
      }));
      let n3 = e3[0], o3 = 1;
      return Object.keys(t4).forEach(((e4) => {
        t4[e4] > o3 && (n3 = e4, o3 = t4[e4]);
      })), n3;
    })(e2.map(((e3) => t3 in e3 ? e3[t3] : void 0)).filter(((e3) => void 0 !== e3)));
    o2 && (n2[t3] = o2);
  })), n2;
}
var S = ["accelerometer", "accessibility", "accessibility-events", "ambient-light-sensor", "background-fetch", "background-sync", "bluetooth", "camera", "clipboard-read", "clipboard-write", "device-info", "display-capture", "gyroscope", "geolocation", "local-fonts", "magnetometer", "microphone", "midi", "nfc", "notifications", "payment-handler", "persistent-storage", "push", "speaker", "storage-access", "top-level-storage-access", "window-management", "query"];
function M() {
  var e2, t2, n2, o2, r2, i2;
  if ("undefined" == typeof navigator) return { name: "unknown", version: "unknown" };
  const a2 = navigator.userAgent, s2 = [/(?<name>SamsungBrowser)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>EdgA|EdgiOS|Edg)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>OPR|OPX)\/(?<version>\d+(?:\.\d+)+)/, /Opera[\s\/](?<version>\d+(?:\.\d+)+)/, /Opera Mini\/(?<version>\d+(?:\.\d+)+)/, /Opera Mobi\/(?<version>\d+(?:\.\d+)+)/, /(?<name>Vivaldi)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>Brave)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>CriOS)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>FxiOS)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>Chrome|Chromium)\/(?<version>\d+(?:\.\d+)+)/, /(?<name>Firefox|Waterfox|Iceweasel|IceCat)\/(?<version>\d+(?:\.\d+)+)/, /Version\/(?<version1>[\d.]+).*Safari\/[\d.]+|(?<name>Safari)\/(?<version2>[\d.]+)/, /(?<name>MSIE|Trident|IEMobile).+?(?<version>\d+(?:\.\d+)+)/, /(?<name>[A-Za-z]+)\/(?<version>\d+(?:\.\d+)+)/], c2 = { edg: "Edge", edga: "Edge", edgios: "Edge", opr: "Opera", opx: "Opera", crios: "Chrome", fxios: "Firefox", samsung: "SamsungBrowser", vivaldi: "Vivaldi", brave: "Brave" };
  for (const l2 of s2) {
    const s3 = a2.match(l2);
    if (s3) {
      let a3 = null === (e2 = s3.groups) || void 0 === e2 ? void 0 : e2.name, u2 = (null === (t2 = s3.groups) || void 0 === t2 ? void 0 : t2.version) || (null === (n2 = s3.groups) || void 0 === n2 ? void 0 : n2.version1) || (null === (o2 = s3.groups) || void 0 === o2 ? void 0 : o2.version2);
      if (a3 || !(null === (r2 = s3.groups) || void 0 === r2 ? void 0 : r2.version1) && !(null === (i2 = s3.groups) || void 0 === i2 ? void 0 : i2.version2) || (a3 = "Safari"), !a3 && l2.source.includes("Opera Mini") && (a3 = "Opera Mini"), !a3 && l2.source.includes("Opera Mobi") && (a3 = "Opera Mobi"), !a3 && l2.source.includes("Opera") && (a3 = "Opera"), !a3 && s3[1] && (a3 = s3[1]), !u2 && s3[2] && (u2 = s3[2]), a3) {
        return { name: c2[a3.toLowerCase()] || a3, version: u2 || "unknown" };
      }
    }
  }
  return { name: "unknown", version: "unknown" };
}
function P() {
  if ("undefined" == typeof navigator || !navigator.userAgent) return false;
  const e2 = navigator.userAgent;
  return /Mobi|Android|iPhone|iPod|IEMobile|Opera Mini|Opera Mobi|webOS|BlackBerry|Windows Phone/i.test(e2) && !/iPad/i.test(e2);
}
function E() {
  let e2 = [];
  const t2 = { "prefers-contrast": ["high", "more", "low", "less", "forced", "no-preference"], "any-hover": ["hover", "none"], "any-pointer": ["none", "coarse", "fine"], pointer: ["none", "coarse", "fine"], hover: ["hover", "none"], update: ["fast", "slow"], "inverted-colors": ["inverted", "none"], "prefers-reduced-motion": ["reduce", "no-preference"], "prefers-reduced-transparency": ["reduce", "no-preference"], scripting: ["none", "initial-only", "enabled"], "forced-colors": ["active", "none"] };
  return Object.keys(t2).forEach(((n2) => {
    t2[n2].forEach(((t3) => {
      matchMedia(`(${n2}: ${t3})`).matches && e2.push(`${n2}: ${t3}`);
    }));
  })), e2;
}
function x() {
  if ("https:" === window.location.protocol && "function" == typeof window.ApplePaySession) try {
    const e2 = window.ApplePaySession.supportsVersion;
    for (let t2 = 15; t2 > 0; t2--) if (e2(t2)) return t2;
  } catch (e2) {
    return 0;
  }
  return 0;
}
var C = "SamsungBrowser" !== M().name ? 1 : 3;
var A;
var T = null;
var I = ["𝔄", "𝔅", "ℭ", "𝔇", "𝔈", "𝔉", "𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽"];
var k = ["β", "ψ", "λ", "ε", "ζ", "α", "ξ", "μ", "ρ", "φ", "κ", "τ", "η", "σ", "ι", "ω", "γ", "ν", "χ", "δ", "θ", "π", "υ", "ο"];
function R(e2, t2) {
  return `<math><mrow>${t2}</mrow></math>`;
}
function O() {
  let e2 = "<mo>∏</mo>";
  return I.forEach(((t2, n2) => {
    const o2 = 2 * n2, r2 = k.slice(o2, o2 + 2);
    2 === r2.length && (e2 += `<mmultiscripts><mi>${t2}</mi><none/><mi>${r2[1]}</mi><mprescripts></mprescripts><mi>${r2[0]}</mi><none/></mmultiscripts>`);
  })), R(0, `<munderover><mmultiscripts>${e2}</mmultiscripts></munderover>`);
}
function L() {
  const e2 = [];
  return I.forEach(((t2, n2) => {
    const o2 = 2 * n2, r2 = k.slice(o2, o2 + 2);
    2 === r2.length && e2.push(R(0, `<mmultiscripts><mi>${t2}</mi><none/><mi>${r2[1]}</mi><mprescripts></mprescripts><mi>${r2[0]}</mi><none/></mmultiscripts>`));
  })), e2;
}
var _ = { audio: async function() {
  return (async function() {
    return new Promise(((e2, t2) => {
      try {
        const t3 = 44100, n2 = 5e3, o2 = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, n2, t3), r2 = o2.createBufferSource(), a2 = o2.createOscillator();
        a2.frequency.value = 1e3;
        const s2 = o2.createDynamicsCompressor();
        let c2;
        s2.threshold.value = -50, s2.knee.value = 40, s2.ratio.value = 12, s2.attack.value = 0, s2.release.value = 0.2, a2.connect(s2), s2.connect(o2.destination), a2.start(), o2.oncomplete = (t4) => {
          c2 = t4.renderedBuffer.getChannelData(0), e2({ sampleHash: i(c2), maxChannels: o2.destination.maxChannelCount, channelCountMode: r2.channelCountMode });
        }, o2.startRendering();
      } catch (e3) {
        console.error("Error creating audio fingerprint:", e3), t2(e3);
      }
    }));
  })();
}, canvas: async function() {
  return new Promise(((e2) => {
    const t2 = Array.from({ length: 3 }, (() => (function() {
      const e3 = document.createElement("canvas"), t3 = e3.getContext("2d");
      if (!t3) return new ImageData(1, 1);
      e3.width = d, e3.height = 20;
      const n2 = t3.createLinearGradient(0, 0, e3.width, e3.height);
      n2.addColorStop(0, "red"), n2.addColorStop(1 / 6, "orange"), n2.addColorStop(2 / 6, "yellow"), n2.addColorStop(0.5, "green"), n2.addColorStop(4 / 6, "blue"), n2.addColorStop(5 / 6, "indigo"), n2.addColorStop(1, "violet"), t3.fillStyle = n2, t3.fillRect(0, 0, e3.width, e3.height);
      const o2 = "Random Text WMwmil10Oo";
      t3.font = "23.123px Arial", t3.fillStyle = "black", t3.fillText(o2, -5, 15), t3.fillStyle = "rgba(0, 0, 255, 0.5)", t3.fillText(o2, -3.3, 17.7), t3.beginPath(), t3.moveTo(0, 0), t3.lineTo(2 * e3.width / 7, e3.height), t3.strokeStyle = "white", t3.lineWidth = 2, t3.stroke();
      const r2 = t3.getImageData(0, 0, e3.width, e3.height);
      return r2;
    })()));
    e2({ commonPixelsHash: m(a(t2, d, 20).data.toString()).toString() });
  }));
}, fonts: async function(e2) {
  return new Promise(((e3, t2) => {
    try {
      !(async function(e4) {
        for (var t3; !document.body; ) await h(50);
        const n2 = document.createElement("iframe");
        n2.setAttribute("frameBorder", "0");
        const o2 = n2.style;
        o2.setProperty("position", "fixed"), o2.setProperty("display", "block", "important"), o2.setProperty("visibility", "visible"), o2.setProperty("border", "0"), o2.setProperty("opacity", "0"), n2.src = "about:blank", document.body.appendChild(n2);
        const r2 = n2.contentDocument || (null === (t3 = n2.contentWindow) || void 0 === t3 ? void 0 : t3.document);
        if (!r2) throw new Error("Iframe document is not accessible");
        e4({ iframe: r2 }), setTimeout((() => {
          document.body.removeChild(n2);
        }), 0);
      })((async ({ iframe: t3 }) => {
        const n2 = t3.createElement("canvas").getContext("2d"), o2 = p.map(((e4) => g(n2, e4)));
        let r2 = {};
        f.forEach(((e4) => {
          const t4 = g(n2, e4);
          o2.includes(t4) || (r2[e4] = t4);
        })), e3(r2);
      }));
    } catch (e4) {
      t2({ error: "unsupported" });
    }
  }));
}, hardware: function() {
  return new Promise(((e2, t2) => {
    const n2 = void 0 !== navigator.deviceMemory ? navigator.deviceMemory : 0, o2 = window.performance && window.performance.memory ? window.performance.memory : 0;
    e2({ videocard: w(), architecture: v(), deviceMemory: n2.toString() || "undefined", jsHeapSizeLimit: o2.jsHeapSizeLimit || 0 });
  }));
}, locales: function() {
  return new Promise(((e2) => {
    e2({ languages: navigator.language, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }));
}, math: function() {
  return new Promise(((e2) => {
    e2({ acos: Math.acos(0.5), asin: y(Math.asin, -1, 1, 97), cos: y(Math.cos, 0, Math.PI, 97), largeCos: Math.cos(1e20), largeSin: Math.sin(1e20), largeTan: Math.tan(1e20), sin: y(Math.sin, -Math.PI, Math.PI, 97), tan: y(Math.tan, 0, 2 * Math.PI, 97) });
  }));
}, permissions: async function(e2) {
  let t2 = (null == e2 ? void 0 : e2.permissions_to_check) || S;
  const n2 = Array.from({ length: 3 }, (() => (async function(e3) {
    const t3 = {};
    for (const n3 of e3) try {
      const e4 = await navigator.permissions.query({ name: n3 });
      t3[n3] = e4.state.toString();
    } catch (e4) {
    }
    return t3;
  })(t2)));
  return Promise.all(n2).then(((e3) => b(e3, t2)));
}, plugins: async function() {
  const e2 = [];
  if (navigator.plugins) for (let t2 = 0; t2 < navigator.plugins.length; t2++) {
    const n2 = navigator.plugins[t2];
    e2.push([n2.name, n2.filename, n2.description].join("|"));
  }
  return new Promise(((t2) => {
    t2({ plugins: e2 });
  }));
}, screen: function() {
  return new Promise(((e2) => {
    const t2 = { is_touchscreen: navigator.maxTouchPoints > 0, maxTouchPoints: navigator.maxTouchPoints, colorDepth: screen.colorDepth, mediaMatches: E() };
    P() && navigator.maxTouchPoints > 0 && (t2.resolution = (function() {
      const e3 = window.screen.width, t3 = window.screen.height, n2 = Math.max(e3, t3).toString(), o2 = Math.min(e3, t3).toString();
      return `${n2}x${o2}`;
    })()), e2(t2);
  }));
}, system: function() {
  return new Promise(((e2) => {
    const t2 = M();
    e2({ platform: window.navigator.platform, productSub: navigator.productSub, product: navigator.product, useragent: navigator.userAgent, hardwareConcurrency: navigator.hardwareConcurrency, browser: { name: t2.name, version: t2.version }, mobile: P(), applePayVersion: x(), cookieEnabled: window.navigator.cookieEnabled });
  }));
}, webgl: async function() {
  "undefined" != typeof document && (A = document.createElement("canvas"), A.width = 200, A.height = 100, T = A.getContext("webgl"));
  try {
    if (!T) throw new Error("WebGL not supported");
    const e2 = Array.from({ length: C }, (() => (function() {
      try {
        if (!T) throw new Error("WebGL not supported");
        const e3 = "\n          attribute vec2 position;\n          void main() {\n              gl_Position = vec4(position, 0.0, 1.0);\n          }\n      ", t2 = "\n          precision mediump float;\n          void main() {\n              gl_FragColor = vec4(0.812, 0.195, 0.553, 0.921); // Set line color\n          }\n      ", n2 = T.createShader(T.VERTEX_SHADER), o2 = T.createShader(T.FRAGMENT_SHADER);
        if (!n2 || !o2) throw new Error("Failed to create shaders");
        if (T.shaderSource(n2, e3), T.shaderSource(o2, t2), T.compileShader(n2), !T.getShaderParameter(n2, T.COMPILE_STATUS)) throw new Error("Vertex shader compilation failed: " + T.getShaderInfoLog(n2));
        if (T.compileShader(o2), !T.getShaderParameter(o2, T.COMPILE_STATUS)) throw new Error("Fragment shader compilation failed: " + T.getShaderInfoLog(o2));
        const r2 = T.createProgram();
        if (!r2) throw new Error("Failed to create shader program");
        if (T.attachShader(r2, n2), T.attachShader(r2, o2), T.linkProgram(r2), !T.getProgramParameter(r2, T.LINK_STATUS)) throw new Error("Shader program linking failed: " + T.getProgramInfoLog(r2));
        T.useProgram(r2);
        const i2 = 137, a2 = new Float32Array(4 * i2), s2 = 2 * Math.PI / i2;
        for (let e4 = 0; e4 < i2; e4++) {
          const t3 = e4 * s2;
          a2[4 * e4] = 0, a2[4 * e4 + 1] = 0, a2[4 * e4 + 2] = Math.cos(t3) * (A.width / 2), a2[4 * e4 + 3] = Math.sin(t3) * (A.height / 2);
        }
        const c2 = T.createBuffer();
        T.bindBuffer(T.ARRAY_BUFFER, c2), T.bufferData(T.ARRAY_BUFFER, a2, T.STATIC_DRAW);
        const l2 = T.getAttribLocation(r2, "position");
        T.enableVertexAttribArray(l2), T.vertexAttribPointer(l2, 2, T.FLOAT, false, 0, 0), T.viewport(0, 0, A.width, A.height), T.clearColor(0, 0, 0, 1), T.clear(T.COLOR_BUFFER_BIT), T.drawArrays(T.LINES, 0, 2 * i2);
        const u2 = new Uint8ClampedArray(A.width * A.height * 4);
        T.readPixels(0, 0, A.width, A.height, T.RGBA, T.UNSIGNED_BYTE, u2);
        return new ImageData(u2, A.width, A.height);
      } catch (e3) {
        return new ImageData(1, 1);
      } finally {
        T && (T.bindBuffer(T.ARRAY_BUFFER, null), T.useProgram(null), T.viewport(0, 0, T.drawingBufferWidth, T.drawingBufferHeight), T.clearColor(0, 0, 0, 0));
      }
    })()));
    return { commonPixelsHash: m(a(e2, A.width, A.height).data.toString()).toString() };
  } catch (e2) {
    return { webgl: "unsupported" };
  }
} };
var B = { webrtc: async function() {
  return new Promise(((e2) => {
    try {
      const t2 = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
      if (!t2) return void e2({ supported: false, error: "WebRTC not supported" });
      const n2 = new t2({ iceCandidatePoolSize: 1, iceServers: [] });
      n2.createDataChannel("");
      (async () => {
        try {
          const t3 = { offerToReceiveAudio: true, offerToReceiveVideo: true }, o2 = await n2.createOffer(t3);
          await n2.setLocalDescription(o2);
          const r2 = o2.sdp || "", i2 = [...new Set((r2.match(/extmap:\d+ [^\n\r]+/g) || []).map(((e3) => e3.replace(/extmap:\d+ /, ""))))].sort(), a2 = (e3) => {
            const t4 = r2.match(new RegExp(`m=${e3} [^\\s]+ [^\\s]+ ([^\\n\\r]+)`));
            return t4 ? t4[1].split(" ") : [];
          }, s2 = (e3, t4) => t4.map(((t5) => {
            const n3 = new RegExp(`(rtpmap|fmtp|rtcp-fb):${t5} (.+)`, "g"), o3 = [...r2.matchAll(n3)];
            if (!o3.length) return null;
            const i3 = {};
            return o3.forEach(((t6) => {
              const [n4, o4, r3] = t6, a3 = r3.split("/");
              "rtpmap" === o4 ? (i3.mimeType = `${e3}/${a3[0]}`, i3.clockRate = +a3[1], "audio" === e3 && (i3.channels = +a3[2] || 1)) : "rtcp-fb" === o4 ? (i3.feedbackSupport = i3.feedbackSupport || [], i3.feedbackSupport.push(r3)) : "fmtp" === o4 && (i3.sdpFmtpLine = r3);
            })), i3;
          })).filter(Boolean), c2 = { audio: s2("audio", a2("audio")), video: s2("video", a2("video")) }, l2 = await new Promise(((e3) => {
            const t4 = setTimeout((() => {
              n2.removeEventListener("icecandidate", o3), n2.close(), e3({ supported: true, codecsSdp: c2, extensions: i2, timeout: true });
            }), 3e3), o3 = (r3) => {
              const a3 = r3.candidate;
              a3 && a3.candidate && (clearTimeout(t4), n2.removeEventListener("icecandidate", o3), n2.close(), e3({ supported: true, codecsSdp: c2, extensions: i2, candidateType: a3.type || "" }));
            };
            n2.addEventListener("icecandidate", o3);
          }));
          e2({ hash: m(JSON.stringify(l2)) });
        } catch (t3) {
          n2.close(), e2({ supported: true, error: `WebRTC offer failed: ${t3.message}` });
        }
      })();
    } catch (t2) {
      e2({ supported: false, error: `WebRTC error: ${t2.message}` });
    }
  }));
}, mathml: async function() {
  return new Promise(((e2) => {
    try {
      if (!(function() {
        try {
          const e3 = document.createElement("math");
          e3.innerHTML = "<mrow><mi>x</mi></mrow>", e3.style.position = "absolute", e3.style.visibility = "hidden", document.body.appendChild(e3);
          const t3 = e3.getBoundingClientRect();
          return document.body.removeChild(e3), t3.width > 0 && t3.height > 0;
        } catch (e3) {
          return false;
        }
      })()) return void e2({ supported: false, error: "MathML not supported" });
      const t2 = [R("integral", "<msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mfrac><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mrow><mi>g</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mfrac><mi>dx</mi>"), R("fraction", "<mfrac><mrow><mi>π</mi><mo>×</mo><msup><mi>r</mi><mn>2</mn></msup></mrow><mrow><mn>2</mn><mi>σ</mi></mrow></mfrac>"), R("matrix", "<mo>[</mo><mtable><mtr><mtd><mi>α</mi></mtd><mtd><mi>β</mi></mtd></mtr><mtr><mtd><mi>γ</mi></mtd><mtd><mi>δ</mi></mtd></mtr></mtable><mo>]</mo>"), O(), ...L()], n2 = {};
      t2.forEach(((e3, t3) => {
        n2[`struct_${t3}`] = (function(e4) {
          try {
            const t4 = document.createElement("math");
            t4.innerHTML = e4.replace(/<\/?math>/g, ""), t4.style.whiteSpace = "nowrap", t4.style.position = "absolute", t4.style.visibility = "hidden", t4.style.top = "-9999px", document.body.appendChild(t4);
            const n3 = t4.getBoundingClientRect(), o2 = window.getComputedStyle(t4), r2 = { dimensions: { width: n3.width, height: n3.height }, fontInfo: { fontFamily: o2.fontFamily, fontSize: o2.fontSize, fontWeight: o2.fontWeight, fontStyle: o2.fontStyle, lineHeight: o2.lineHeight, fontVariant: o2.fontVariant || "normal", fontStretch: o2.fontStretch || "normal", fontSizeAdjust: o2.fontSizeAdjust || "none", textRendering: o2.textRendering || "auto", fontFeatureSettings: o2.fontFeatureSettings || "normal", fontVariantNumeric: o2.fontVariantNumeric || "normal", fontKerning: o2.fontKerning || "auto" } };
            return document.body.removeChild(t4), r2;
          } catch (e5) {
            return { error: e5.message };
          }
        })(e3);
      })), e2({ hash: m(JSON.stringify(n2)) });
    } catch (t2) {
      e2({ supported: false, error: `MathML error: ${t2.message}` });
    }
  }));
} };
var D = {};
var N = { timeout: "true" };
var F = (e2, t2, n2) => {
  D[e2] = t2;
};
function $() {
  return "1.3.3";
}
function U(e2, t2) {
  var n2;
  let o2 = M();
  if ("unknown" === o2.name && e2.system && "object" == typeof e2.system && !Array.isArray(e2.system)) {
    const t3 = e2.system.browser;
    if (t3 && "object" == typeof t3 && !Array.isArray(t3)) {
      const e3 = t3;
      o2 = { name: e3.name || "unknown", version: e3.version || "unknown" };
    }
  }
  const i2 = o2.name.toLowerCase(), a2 = o2.version.split(".")[0] || "0", s2 = parseInt(a2, 10), c2 = [...(null == t2 ? void 0 : t2.exclude) || []], l2 = (null == t2 ? void 0 : t2.stabilize) || [], u2 = (null == t2 ? void 0 : t2.include) || [];
  for (const e3 of l2) {
    const t3 = r[e3];
    if (t3) for (const e4 of t3) {
      const t4 = !("browsers" in e4), o3 = !t4 && (null === (n2 = e4.browsers) || void 0 === n2 ? void 0 : n2.some(((e5) => {
        const t5 = e5.match(/(.+?)(>=)(\d+)/);
        if (t5) {
          const [, e6, , n3] = t5, o4 = parseInt(n3, 10);
          return i2 === e6 && s2 >= o4;
        }
        return i2 === e5;
      })));
      (t4 || o3) && c2.push(...e4.exclude);
    }
  }
  return (function e3(t3, n3 = "") {
    const o3 = {};
    for (const [r2, i3] of Object.entries(t3)) {
      const t4 = n3 ? `${n3}.${r2}` : r2;
      if ("object" != typeof i3 || Array.isArray(i3) || null === i3) {
        const e4 = c2.some(((e5) => t4.startsWith(e5))), n4 = u2.some(((e5) => t4.startsWith(e5)));
        e4 && !n4 || (o3[r2] = i3);
      } else {
        const n4 = e3(i3, t4);
        Object.keys(n4).length > 0 && (o3[r2] = n4);
      }
    }
    return o3;
  })(e2);
}
var V = "thumbmark_visitor_id";
var j = null;
var W = null;
var G = (t2, n2) => {
  if (t2.cache_api_call && W) return Promise.resolve(W);
  if (j) return j;
  const o2 = `${e}/thumbmark`, r2 = (function() {
    try {
      return localStorage.getItem(V);
    } catch (e2) {
      return null;
    }
  })(), i2 = { components: n2, options: t2, clientHash: m(JSON.stringify(n2)), version: "1.3.3" };
  r2 && (i2.visitorId = r2);
  const a2 = fetch(o2, { method: "POST", headers: { "x-api-key": t2.api_key, Authorization: "custom-authorized", "Content-Type": "application/json" }, body: JSON.stringify(i2) }).then(((e2) => {
    if (!e2.ok) {
      if (403 === e2.status) throw new Error("INVALID_API_KEY");
      throw new Error(`HTTP error! status: ${e2.status}`);
    }
    return e2.json();
  })).then(((e2) => (e2.visitorId && e2.visitorId !== r2 && (function(e3) {
    try {
      localStorage.setItem(V, e3);
    } catch (e4) {
    }
  })(e2.visitorId), W = e2, j = null, e2))).catch(((e2) => {
    if (console.error("Error fetching pro data", e2), j = null, "INVALID_API_KEY" === e2.message) throw e2;
    return null;
  })), s2 = t2.timeout || 5e3, c2 = new Promise(((e2) => {
    setTimeout((() => {
      e2({ info: { timed_out: true }, version: "1.3.3" });
    }), s2);
  }));
  return j = Promise.race([a2, c2]), j;
};
async function H(n2) {
  const o2 = { ...t, ...n2 }, r2 = o2.logging && !sessionStorage.getItem("_tmjs_l") && Math.random() < 1e-4, i2 = { ..._, ...D }, { elapsed: a2, resolvedComponents: s2 } = await z(i2, o2);
  let c2 = {};
  if (r2 || o2.experimental) {
    const { resolvedComponents: e2 } = await z(B, o2);
    c2 = e2;
  }
  const l2 = o2.api_key ? G(o2, s2) : null;
  let u2 = null;
  if (l2) try {
    u2 = await l2;
  } catch (e2) {
    if (e2 instanceof Error && "INVALID_API_KEY" === e2.message) return { error: "Invalid API key or quota exceeded", components: {}, info: {}, version: "1.3.3", thumbmark: "" };
    throw e2;
  }
  const d2 = o2.performance ? { elapsed: a2 } : {}, h2 = U((null == u2 ? void 0 : u2.components) || {}, o2), f2 = { ...s2, ...h2 }, p2 = (null == u2 ? void 0 : u2.info) || { uniqueness: { score: "api only" } }, g2 = m(JSON.stringify(f2));
  r2 && (async function(t2, n3, o3, r3 = {}) {
    var i3;
    const a3 = `${e}/log`, s3 = { thumbmark: t2, components: n3, experimental: r3, version: "1.3.3", options: o3, path: null === (i3 = null === window || void 0 === window ? void 0 : window.location) || void 0 === i3 ? void 0 : i3.pathname };
    sessionStorage.setItem("_tmjs_l", "1");
    try {
      await fetch(a3, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s3) });
    } catch (e2) {
    }
  })(g2, f2, o2, c2).catch((() => {
  }));
  return { ...(null == u2 ? void 0 : u2.visitorId) && { visitorId: u2.visitorId }, thumbmark: g2, components: f2, info: p2, version: "1.3.3", ...d2, ...Object.keys(c2).length > 0 && o2.experimental && { experimental: c2 } };
}
async function z(e2, n2) {
  const o2 = { ...t, ...n2 }, r2 = Object.entries(e2).filter((([e3]) => {
    var t2;
    return !(null === (t2 = null == o2 ? void 0 : o2.exclude) || void 0 === t2 ? void 0 : t2.includes(e3));
  })).filter((([e3]) => {
    var t2, n3, r3, i3;
    return (null === (t2 = null == o2 ? void 0 : o2.include) || void 0 === t2 ? void 0 : t2.some(((e4) => e4.includes(".")))) ? null === (n3 = null == o2 ? void 0 : o2.include) || void 0 === n3 ? void 0 : n3.some(((t3) => t3.startsWith(e3))) : 0 === (null === (r3 = null == o2 ? void 0 : o2.include) || void 0 === r3 ? void 0 : r3.length) || (null === (i3 = null == o2 ? void 0 : o2.include) || void 0 === i3 ? void 0 : i3.includes(e3));
  })), i2 = r2.map((([e3]) => e3)), a2 = r2.map((([e3, t2]) => t2(n2))), s2 = await (function(e3, t2, n3) {
    return Promise.all(e3.map(((e4) => {
      const o3 = performance.now();
      return Promise.race([e4.then(((e5) => ({ value: e5, elapsed: performance.now() - o3 }))), (r3 = t2, i3 = n3, new Promise(((e5) => {
        setTimeout((() => e5(i3)), r3);
      }))).then(((e5) => ({ value: e5, elapsed: performance.now() - o3 })))]);
      var r3, i3;
    })));
  })(a2, (null == o2 ? void 0 : o2.timeout) || 5e3, N), c2 = {}, l2 = {};
  s2.forEach(((e3, t2) => {
    var n3;
    null != e3.value && (l2[i2[t2]] = e3.value, c2[i2[t2]] = null !== (n3 = e3.elapsed) && void 0 !== n3 ? n3 : 0);
  }));
  const u2 = U(l2, o2);
  return { elapsed: c2, resolvedComponents: u2 };
}
async function K() {
  return (await H(n)).components;
}
async function J(e2) {
  try {
    const t2 = await H(n);
    return e2 ? { hash: t2.thumbmark.toString(), data: t2.components } : t2.thumbmark.toString();
  } catch (e3) {
    throw e3;
  }
}
async function Y() {
  try {
    const { elapsed: e2, resolvedComponents: t2 } = await z(_, n);
    return { ...t2, elapsed: e2 };
  } catch (e2) {
    throw e2;
  }
}
var q = class {
  constructor(e2) {
    this.options = { ...t, ...e2 };
  }
  async get(e2) {
    return H({ ...this.options, ...e2 });
  }
  getVersion() {
    return "1.3.3";
  }
  includeComponent(e2, t2) {
    F(e2, t2);
  }
};
export {
  q as Thumbmark,
  U as filterThumbmarkData,
  J as getFingerprint,
  K as getFingerprintData,
  Y as getFingerprintPerformance,
  H as getThumbmark,
  $ as getVersion,
  F as includeComponent,
  o as setOption,
  r as stabilizationExclusionRules
};
//# sourceMappingURL=@thumbmarkjs_thumbmarkjs.js.map
