#!/usr/bin/env bash
# Uploads the static site + reservation API to the VPS.
# Usage: ./deploy.sh user@your-server-ip
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 user@server-ip" >&2
  exit 1
fi

TARGET="$1"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== Syncing static site to /var/www/rokoshots =="
rsync -avz --delete \
  --exclude 'server/' \
  --exclude 'deploy/' \
  --exclude '.claude/' \
  --exclude '.git/' \
  "$REPO_DIR/" "$TARGET:/var/www/rokoshots/"

echo "== Syncing reservation API to /opt/rokoshots/server =="
ssh "$TARGET" "sudo mkdir -p /opt/rokoshots/server && sudo chown \$(whoami) /opt/rokoshots/server"
rsync -avz \
  --exclude 'venv/' \
  --exclude 'bookings.db' \
  --exclude 'rokoshots-api.service' \
  "$REPO_DIR/server/" "$TARGET:/opt/rokoshots/server/"

echo "== Done. On the server (first time only), run: =="
cat <<'EOF'
  sudo apt update && sudo apt install -y python3-venv nginx
  cd /opt/rokoshots/server
  python3 -m venv venv
  ./venv/bin/pip install -r requirements.txt
  cp .env.example .env && nano .env   # fill in SMTP_USER / SMTP_PASSWORD (Gmail App Password)
  sudo cp rokoshots-api.service /etc/systemd/system/
  sudo chown -R www-data:www-data /opt/rokoshots/server
  sudo systemctl daemon-reload
  sudo systemctl enable --now rokoshots-api

  sudo cp /var/www/rokoshots/../deploy/nginx-rokoshots.conf /etc/nginx/sites-available/rokoshots.conf   # or copy manually
  sudo ln -s /etc/nginx/sites-available/rokoshots.conf /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
EOF
