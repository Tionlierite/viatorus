FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

RUN pecl install xdebug && docker-php-ext-enable xdebug
COPY ./docker/php-fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

COPY ./ /var/www
WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
#RUN composer install --no-interaction

CMD php-fpm

EXPOSE 9000