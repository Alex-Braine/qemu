#!/bin/sh

export BuildDir=${HOME}/BuildCairo
rm -rf ${BuildDir}
mkdir ${BuildDir}
cd ${BuildDir}

curl http://pkgconfig.freedesktop.org/releases/pkg-config-0.23.tar.gz -o pkgconfig.tgz
curl ftp://ftp.simplesystems.org/pub/libpng/png/src/libpng-1.2.40.tar.gz -o libpng.tgz
curl http://www.cairographics.org/releases/pixman-0.16.2.tar.gz -o pixman.tgz
curl http://www.cairographics.org/releases/cairo-1.8.8.tar.gz -o cairo.tgz
tar -xzf pkgconfig.tgz
tar -xzf libpng.tgz
tar -xzf pixman.tgz
tar -xzf cairo.tgz
mv pkg-config-* pkgconfig
mv libpng-* libpng
mv pixman-* pixman
mv cairo-* cairo

cd ${BuildDir}/pkgconfig
./configure --prefix=${BuildDir}
make
make install

export PKG_CONFIG=${BuildDir}/bin/pkg-config
export PKG_CONFIG_PATH=${BuildDir}/lib/pkgconfig




