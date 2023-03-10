// Source code copied from [hardpixel/hotel-manager](https://github.com/hardpixel/hotel-manager)
// released as open source under the terms of the [GPL v3](http://www.gnu.org/licenses/gpl-3.0.en.html)

const GLib      = imports.gi.GLib
const GObject   = imports.gi.GObject
const St        = imports.gi.St
const PopupMenu = imports.ui.popupMenu

var ChaletServerItem = GObject.registerClass({
  Signals: { close: {} }
}, class ChaletServerItem extends PopupMenu.PopupSwitchMenuItem {
    _init(server) {
      this.server = server
      super._init(server.name, server.running, { style_class: 'chalet-manager-item' })

      this._addButton('restart', {
        icon_name: 'view-refresh-symbolic',
        callback:  this._onRestart
      })

      this._addButton('launch', {
        icon_name: 'web-browser-symbolic',
        callback:  this._onLaunch
      })
    }

    toggle() {
      this.server.toggle()
      this.syncToggleState()
    }

    syncToggleState() {
      this.setToggleState(this.server.running)
    }

    _addButton(button_name, { icon_name, callback }) {
      const button = new St.Button({
        x_align:         1,
        reactive:        true,
        can_focus:       true,
        track_hover:     true,
        accessible_name: button_name,
        style_class:     'system-menu-action chalet-manager-button'
      })

      button.child = new St.Icon({ icon_name, style_class: 'popup-menu-icon' })

      button.connect('clicked', () => {
        callback.call(this)
        this.emit('close')
      })

      this.add_child(button)
    }

    _onRestart() {
      this.server.stop()

      GLib.timeout_add(0, 1000, () => {
        this.server.start()
        return false
      })
    }

    _onLaunch() {
      this.server.open()
    }
  }
)
