import { PluginManager, Hook } from "@server/utils/PluginManager";
import config from "../plugin.json";
import router from "./auth/discord";
import env from "./env";
import groupSyncProvider from "./auth/provider";

const enabled = !!env.DISCORD_CLIENT_ID && !!env.DISCORD_CLIENT_SECRET;

const groupSyncEnabled = !!env.DISCORD_SERVER_ID && !!env.DISCORD_BOT_TOKEN

if (enabled) {
  PluginManager.add({
    ...config,
    type: Hook.AuthProvider,
    value: { router, id: config.id },
  });
}

if (groupSyncEnabled) {
  PluginManager.add({
    type: Hook.GroupSyncProvider,
    value: { provider: groupSyncProvider, id: config.id }
  })
}
