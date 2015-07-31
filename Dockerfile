FROM jekyll/jekyll:latest

MAINTAINER rhanna@rhanna.com

RUN gem install s3_website

RUN sed -i "s/--watch/--watch --force_polling/g" /usr/bin/default
