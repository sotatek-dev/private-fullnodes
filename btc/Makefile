deploy-204:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--filter=":- .gitignore" \
				. stt@192.168.1.204:/home/stt/blockchain/btc