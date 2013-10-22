After having quite the time setting up a PHP environment on Mountain Lion that would reliably access a SQL Server database, I figured I would post my experience.
I found a couple of blog posts that just wouldn't work for me out of the box.  The following post is based mostly on http://bit.ly/127e2xo and http://bit.ly/127e1tc with a few modifications.

##### Install Xcode

Get it for free on the Mac App Store

##### Install Xcode Command Line Tools
Open Xcode and go to Preferences (⌘,).  Select the Downloads tab and make sure that the Command Line Tools are installed.

##### Install Homebrew

This can be done using Terminal.app by typing the following command.

```bash
ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew.go)"
```

##### Setup the dependencies

This will install the required packages

```bash
brew install wget autoconf automake gawk libtool libjpg libpng freetype
```

##### Install freetds

Run the following commands in Terminal.app

```bash
mkdir ~/Desktop/setup
wget http://freetds.cvs.sourceforge.net/viewvc/freetds/?view=tar -O ~/Desktop/setup/freetds.tar.gz
cd ~/Desktop/setup
tar zxf freetds.tar.gz -C freetds
cd freetds/freetds/freetds
./configure --prefix=/usr/local/freetds \
    --sysconfdir=/usr/local/freetds/conf/freetds \
    --disable-libiconv \
    --disable-odbc
make
make install
```

Provided the install is successful, edit the freetds config file (replace with your server information)

  *Add the following to /usr/local/freetds/conf/freetds*

      [SQL_SERVER_NAME]
        host = MY-SQL-SERVER
        port = 1433
        tds version = 8.0

##### Install imap-2007f

Again, run the following in Terminal.app

```bash
cd ~/Desktop/setup
wget http://mirrors.azc.uam.mx/mirrors/imap/imap-2007f.tar.gz -O ~/Desktop/setup/imap.tar.gz
mkdir -p ~/Desktop/setup/imap
tar zxf imap.tar.gz -C imap
cd imap/imap-2007f
mkdir -p /usr/local/imap-2007f/lib
mkdir -p /usr/local/imap-2007f/include
make osx
cp c-client/*.h /usr/local/imap-2007f/include/
cp c-client/c-client.a /usr/local/imap-2007f/lib/libc-client.a
```

##### Install icu

Once again....Termainl.app

```bash
cd ~/Desktop/setup
wget http://download.icu-project.org/files/icu4c/4.8.1.1/icu4c-4_8_1_1-src.tgz -O ~/Desktop/setup/icu.tgz
mkdir -p ~/Desktop/setup/icu
tar zxf icu.tgz -C icu
cd icu/icu/source
./runConfigureICU MacOSX
make
make install
```

##### Install php

- Terminal.app again

```bash
cd ~/Desktop/setup
wget http://us1.php.net/distributions/php-5.4.9.tar.gz -O ~/Desktop/setup/php.tar.gz
mkdir -p ~/Desktop/setup/php
tar zxf php.tar.gz -C php
cd php/php-5.4.9
./configure --prefix=/usr \
    --mandir=/usr/share/man \
    --infodir=/usr/share/info \
    --sysconfdir=/private/etc \
    --with-apxs2=/usr/sbin/apxs \
    --enable-cli \
    --with-config-file-path=/etc  \
    --with-libxml-dir=/usr  \
    --with-openssl=/usr \
    --with-kerberos=/usr \
    --with-zlib=/usr \
    --enable-bcmath \
    --with-bz2=/usr  \
    --enable-calendar \
    --with-curl=/usr \
    --enable-dba \
    --enable-exif \
    --enable-ftp \
    --with-gd \
    --enable-gd-native-ttf \
    --with-icu-dir=/usr/local  \
    --with-iodbc=/usr \
    --with-ldap=/usr \
    --with-ldap-sasl=/usr \
    --with-libedit=/usr \
    --enable-mbstring \
    --enable-mbregex \
    --with-mysql=mysqlnd \
    --with-mysqli=mysqlnd \
    --without-pear \
    --with-pdo-mysql=mysqlnd \
    --with-mysql-sock=/tmp/mysql.sock \
    --with-readline=/usr \
    --enable-shmop \
    --with-snmp=/usr \
    --enable-soap \
    --enable-sockets \
    --enable-sysvmsg \
    --enable-sysvsem \
    --enable-sysvshm \
    --with-tidy \
    --enable-wddx \
    --with-xmlrpc \
    --with-iconv-dir=/usr \
    --with-xsl=/usr \
    --enable-zip \
    --with-imap=/usr/local/imap-2007f \
    --with-kerberos \
    --with-imap-ssl \
    --enable-intl \
    --with-pcre-regex \
    --with-pgsql=/usr \
    --with-pdo-pgsql=/usr \
    --with-freetype-dir=/usr/X11 \
    --with-jpeg-dir=/usr \
    --with-png-dir=/usr/X11

make
sudo make install
```

At this point, if you already have configured your current php.ini, make a backup

```bash
sudo cp /etc/php.ini ~/Desktop/php.ini
```

Otherwise,

```bash
sudo cp /etc/php.ini.default /etc/php.ini
```

##### Now compile the MSSQL extension

In Terminal.app

```bash
cd ~/Desktop/setup/php/php-5.4.9/ext/mssql
phpize
./configure --with-mssql=/usr/local/freetds
make
sudo mkdir -p /usr/lib/php/extensions/no-debug-non-zts-20100525
sudo make install
sudo sh -c 'echo "extension=mssql.so" >> /etc/php.ini'
```

##### Done

If you are currently running apache and you **ARE NOT** using OSX Server, restart it as follows

```bash
sudo apachectl restart
```

If you **ARE** using OSX Server, restart it using:

```bash
sudo serveradmin stop web
sudo serveradmin start web
```

You should now be able to connect to a SQL Server using the mssql library


