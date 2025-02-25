import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
  const content = `# PROGRAMYZER

NETWORK_PASSPHRASE="Public Global Stellar Network ; September 2015"

SIGNING_KEY="GCR3GN73U3G4CHAHPINTWZGH2ZIRTVZ4WNHWYSB3FZOU63W22IGRINAT"

ACCOUNTS=[
"GCR3GN73U3G4CHAHPINTWZGH2ZIRTVZ4WNHWYSB3FZOU63W22IGRINAT",
]

VERSION="2.1.0"

[DOCUMENTATION]
ORG_URL="https://programyzer.com"
ORG_DBA="PROGRAMYZER"
ORG_NAME="PROGRAMYZER"
ORG_OFFICIAL_EMAIL="contact@programyzer.com"
ORG_GITHUB="programyzer"
ORG_LOGO="https://programyzer.com/favicon.png"
ORG_DESCRIPTION="Programyzer offers mobile development services"

[[CURRENCIES]]
code="RINAT"
issuer="GCR3GN73U3G4CHAHPINTWZGH2ZIRTVZ4WNHWYSB3FZOU63W22IGRINAT"
status="live"
display_decimals=0
is_asset_anchored=false
name="RINAT"
desc="RINAT - a personal token fixes the issuer's obligations to provide their service provider within 1 hour of working time for 1 token in the field of his professional competencies and capabilities: mobile application developmen and business consulting. You can find me in Telegram @programyzer"
image="https://programyzer.com/favicon.png"
`

  return new Response(content, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/toml",
    },
  })
}
