import jsdom from "jsdom";
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const deps =
  "at-spi2-atk at-spi2-core dbus expat glib2 gettext gettext-runtime libiconv gettext-tools-libs libtextstyle ncurses libffi pcre bzip2 libedit zlib python39 openssl openssl3 python3_select python_select sqlite3 xz gobject-introspection cairo fontconfig freetype brotli libpng ossp-uuid perl5.28 db48 gdbm readline pkgconfig libpixman xorg-libXext xorg-libX11 xorg-libXau xorg-xorgproto xorg-libXdmcp xorg-libxcb xorg-libpthread-stubs xorg-xcb-proto libxml2 icu xorg-xcb-util xrender libtool py39-mako py39-beaker py39-setuptools py39-markupsafe py39-markdown xorg-libXi xorg-libXfixes xorg-libXtst atk gdk-pixbuf2 jasper libjpeg-turbo shared-mime-info tiff zstd lz4 hicolor-icon-theme libepoxy mesa xorg-libXdamage xorg-libXmu xorg-libXt xorg-libsm xorg-libice xorg-libXxf86vm pango Xft2 fribidi harfbuzz graphite2 xorg-libXcomposite xorg-libXcursor xorg-libXinerama xorg-libXrandr gtk3-devel".split(
    " "
  );
const url = 'https://packages.macports.org';
const addedDeps = [];
const archs = ['arm64', 'noarch'];
for (let dep of deps) {
    const response = await fetch(`${url}/${dep}/?C=M;O=D`);
    const body = await response.text();
    const dom = new JSDOM(body);
    const links = dom.window.document.querySelectorAll('a');
    for (let arch of archs) {
      for (let link of links) {
          if(link.href.match(new RegExp("darwin_20."+arch+".tbz2$", 'gi'))) {
              console.log(`wget ${url}/${dep}/${link.href}\ntar -xzf ${link.href}`);
              addedDeps.push(dep);
              break;
          }
        }
        if (addedDeps.find((x) => x === dep)) {
            break;
        }
    }
}
