import { IsOptional } from "class-validator";
import { Environment } from "@server/env";
import environment from "@server/utils/environment";
import { CannotUseWithout } from "@server/utils/validators";

class DiscordPluginEnvironment extends Environment {
  /**
   * Discord OAuth2 client credentials. To enable authentication with Discord.
   */
  @IsOptional()
  @CannotUseWithout("DISCORD_CLIENT_ID")
  public DISCORD_CLIENT_ID = this.toOptionalString(
    environment.DISCORD_CLIENT_ID
  );

  @IsOptional()
  @CannotUseWithout("DISCORD_CLIENT_SECRET")
  public DISCORD_CLIENT_SECRET = this.toOptionalString(
    environment.DISCORD_CLIENT_SECRET
  );

  @IsOptional()
  public DISCORD_SERVER_ID = this.toOptionalString(
    environment.DISCORD_SERVER_ID
  );
}

export default new DiscordPluginEnvironment();