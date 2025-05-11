
export OPENAI_API_KEY="your-openai-api-key-here"
export TELEGRAM_BOT_TOKEN="your-telegram-bot-token-here"
export POSTGRES_DB="your-postgres-db-name-here"
export POSTGRES_USER="your-postgres-username-here"
export POSTGRES_PASSWORD="your-postgres-password-here"
export DATABASE_URL="your-postgres-url-here"


echo -n "$OPENAI_API_KEY" | oasis rofl secret set OPENAI_API_KEY -
echo -n "$TELEGRAM_BOT_TOKEN" | oasis rofl secret set TELEGRAM_BOT_TOKEN -
echo -n "$POSTGRES_DB" | oasis rofl secret set POSTGRES_DB -
echo -n "$POSTGRES_USER" | oasis rofl secret set POSTGRES_USER -
echo -n "$POSTGRES_PASSWORD" | oasis rofl secret set POSTGRES_PASSWORD -
echo -n "$DATABASE_URL" | oasis rofl secret set POSTGRES_URL -