FROM jekyll/jekyll:latest

MAINTAINER rhanna@rhanna.com

RUN gem install s3_website

#RUN sed -i "s/--watch/--watch --force_polling/g" /usr/bin/default

RUN sed -i "s/^chpst.*/chpst -u jekyll:jekyll:vboxsf jekyll s --watch --force_polling/g" /usr/bin/default

# Workaround for an issue with permission when using docker-machine to mount volumes
RUN bash -c "groupadd -g 109 vboxsf && usermod -a -G vboxsf jekyll"
