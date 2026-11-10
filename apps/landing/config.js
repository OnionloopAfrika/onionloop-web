/**
 * Where each card sends the visitor.
 *
 * - On localhost  -> the dev servers (crew :3001, mega :3002, aggregator :3003)
 * - Anywhere else -> <service>.<your-root-domain>, derived from the current
 *   hostname (www.onionloop.com -> crew.onionloop.com). No config to edit
 *   when you change domain or deploy a staging copy.
 *
 * To override a destination, set it explicitly in OVERRIDES.
 */
(function () {
  var OVERRIDES = {
    // crew: "https://crew.example.com",
  };

  var DEV_PORTS = { crew: 3001, mega: 3002, aggregator: 3003 };

  var host = location.hostname;
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  var root = host.replace(/^www\./, "");

  function resolve(key) {
    if (OVERRIDES[key]) return OVERRIDES[key];
    if (isLocal) return "http://" + host + ":" + DEV_PORTS[key];
    return location.protocol + "//" + key + "." + root;
  }

  document.querySelectorAll("[data-service]").forEach(function (el) {
    var url = resolve(el.getAttribute("data-service"));
    el.setAttribute("href", url);
    var label = el.querySelector("[data-host]");
    if (label) label.textContent = url.replace(/^https?:\/\//, "");
  });
})();
