import Echo from "laravel-echo";
import Pusher from "pusher-js";
import appConfig from "./configs/app-config";

// Attach Pusher to the window for Echo to find
if (typeof window !== "undefined") {
  window.Pusher = Pusher;
}

export const echo =
  typeof window !== "undefined"
    ? new Echo({
        broadcaster: "reverb",
        key: appConfig.reverb.key,
        wsHost: appConfig.reverb.host,
        wsPort: appConfig.reverb.port,
        wssPort: 443,
        forceTLS: false,
        enabledTransports: ["ws", "wss"],
      })
    : null;
