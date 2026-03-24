import type {
  ExternalGroupData,
  GroupSyncProvider,
} from "@server/utils/GroupSyncProvider";
import type { AuthenticationProviderSettings } from "@shared/types";
import env from "../env";
import { DiscordRoleSyncError } from "../errors";
import { API as DiscordAPI } from "@discordjs/core";
import { REST } from "@discordjs/rest";

class DiscordGroupSyncProvider implements GroupSyncProvider {
  async fetchUserGroups(
    accessToken: string,
    settings: AuthenticationProviderSettings
  ): Promise<ExternalGroupData[]> {
    if (!env.DISCORD_BOT_TOKEN || !env.DISCORD_SERVER_ID) {
      throw DiscordRoleSyncError("Discord role sync not configured correctly.");
    }

    /** The user's API Client */
    const userDiscordClient = new DiscordAPI(
      new REST({ version: "10", authPrefix: "Bearer" }).setToken(accessToken)
    );

    /** The user within the server (includes role ids) */
    const currentGuildUser = await userDiscordClient.users.getGuildMember(
      env.DISCORD_SERVER_ID
    );

    /** The bot's API Client (used to access role metadata) */
    const discordBotClient = new DiscordAPI(
      new REST({ authPrefix: "Bot" }).setToken(env.DISCORD_BOT_TOKEN)
    );

    /** The Discord server's role list */
    const guildRoles = await discordBotClient.guilds.getRoles(
      env.DISCORD_SERVER_ID
    );

    /** The roles that the user has with server metadata like name (and colour) */
    const overlappingRoles = guildRoles.filter((guildRole) =>
      currentGuildUser.roles.includes(guildRole.id)
    );

    /** Outline compatible group objects */
    const externalRoles: ExternalGroupData[] = overlappingRoles.map(
      (overlappingRole) => ({
        name: overlappingRole.name,
        id: overlappingRole.id,
      })
    );

    return externalRoles;
  }

  useGroupClaim: boolean = false;
}

const groupSyncProvider = new DiscordGroupSyncProvider();

export default groupSyncProvider;
