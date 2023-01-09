# Chalet Manager

GNOME Shell extension to manage [Chalet](https://github.com/jeansaad/chalet) development servers,
which is a more current fork of the original [Hotel](https://github.com/typicode/hotel) development
server.

**Chalet Manager** is a fork / copy of Hardpixel's
[Hotel Manager](https://github.com/hardpixel/hotel-manager) intended to work with the
Chalet development server.

![Screenshot](https://raw.githubusercontent.com/kematzy/chalet-manager/main/chalet-manager-screenshot.png)

## About

Chalet Manager is a [Gnome](https://www.gnome.org/) Shell extension which allows to start and stop
the Chalet daemon and your development servers via a menu in the status area.

![Screenshot](https://raw.githubusercontent.com/kematzy/chalet-manager/master/screenshot.png)

## Install

Make sure you have installed [Chalet](https://github.com/jeansaad/chalet) and then copy folder
`chalet-manager@kematzy.com` into `~/.local/share/gnome-shell/extensions`.

Then run the following command to enable the extension

```bash
gnome-extensions enable chalet-manager@kematzy.com
```

If Chalet is not globally installed, add a `.chaletrc` file in your home directory containing
the path to Chalet's executable.

Use `which chalet` to establish the full path.

Example of the `.chaletrc` file:

```shell
/full/path/2/your/installation/of/chalet
```

### Gnome Shell Extensions

The easiest way to install this extension is via the official
[Gnome Shell Extensions](https://extensions.gnome.org) resource page
[here](#).

### Packages


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/kematzy/chalet-manager.

## License

Chalet Manager is available as open source under the terms of the
[GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html)

## Credits

The majority of the code was copied from Hardpixel's extension
[Hotel Manager](https://github.com/hardpixel/hotel-manager),
which in turn was inspired by the
[Services Systemd](https://github.com/petres/gnome-shell-extension-services-systemd/)
Gnome Shell extension.
