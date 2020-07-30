omni:
	./omnicored -datadir=./regtest_omni

deploy-204:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--filter=":- .gitignore" \
				. stt@192.168.1.204:/home/stt/blockchain/omni

deploy-main-bitcastle:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .git \
				--filter=":- .gitignore" \
				. ubuntu@3.1.189.222:/home/ubuntu/omni