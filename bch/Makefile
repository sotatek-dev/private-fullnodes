deploy-204:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				. stt@192.168.1.204:/home/stt/blockchain/bch
deploy-main-aisx:
	rsync -avhzL --delete \
	-O \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--filter=":- .gitignore" \
				. ubuntu@52.78.97.122:/home/ubuntu/bch			