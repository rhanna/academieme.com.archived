NAME=rhanna/jekyll
CFG_VOL=-v $(PWD):/srv/jekyll
PORT=4040

build:
	docker build -t rhanna/jekyll .

new:
	docker run --rm -ti ${CFG_VOL} ${NAME} sh -c "cd /srv/jekyll && jekyll new ."

run:
	#docker run --rm -ti ${CFG_VOL} -p ${PORT}:4000 ${NAME}
	docker run --rm -ti ${CFG_VOL} -p ${PORT}:4000 jekyll/jekyll

run-bash:
	docker run --rm -ti ${CFG_VOL} ${NAME} /bin/bash

open:
	open http://$(shell boot2docker ip):${PORT}
