FROM node:7.10
MAINTAINER kerker <yes-reply@linux.com>

EXPOSE 80
RUN apt-get update \
    && apt-get -y install apache2 vim\

# clean ...
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/www/html/* \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && sed -i "s/AllowOverride None/AllowOverride All/g" /etc/apache2/apache2.conf \
    # enable rewrite mod:https://stackoverflow.com/questions/18740419/how-to-set-allowoverride-all
    && a2enmod rewrite



ADD package.json /tmp/
WORKDIR /tmp/
RUN npm config set registry http://nexus.daocloud.io/repository/daocloud-npm
RUN npm install
ADD . /tmp/


RUN npm run build \
    && cp -r ./dist/* /var/www/html/ \
    && cp /tmp/.htaccess /var/www/html/ \
    && rm -rf /tmp/*



CMD ["apache2ctl", "-D", "FOREGROUND"]

#usage:
#docker build -t <REPO_NAME> .
#docker run -d -p <PORT>:80 <REPO_NAME>
