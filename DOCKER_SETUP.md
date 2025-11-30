# Docker Setup Instructions

## Fix Docker Permission Issues

If you encounter "Permission denied" errors when running Docker commands, you need to add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Then either:
- **Log out and log back in**, or
- Run `newgrp docker` to activate the group in your current session

Verify it worked:
```bash
groups
# You should see 'docker' in the list
```

## Alternative: Use sudo (not recommended)

If you can't add yourself to the docker group, you can use sudo, but this is not recommended:

```bash
sudo docker-compose down && sudo docker-compose build --no-cache && sudo docker-compose up -d
```

However, files created by containers will be owned by root, which can cause issues.

