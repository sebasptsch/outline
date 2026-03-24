import httpErrors from "http-errors";

export function DiscordGuildError(
  message = "User is not a member of the required Discord server"
) {
  return httpErrors(400, message, {
    id: "discord_guild_error",
    isReportable: false,
  });
}

export function DiscordGuildRoleError(
  message = "User does not have the required role from the Discord server"
) {
  return httpErrors(400, message, {
    id: "discord_guild_role_error",
    isReportable: false,
  });
}

export function DiscordRoleSyncError(
  message = "User belongs to a guild that doesn't contain the Outline bot."
) {
  return httpErrors(400, message, {
    id: "discord_role_sync_error",
    isReportable: false
  })
}
