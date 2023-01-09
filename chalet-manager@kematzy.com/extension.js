// Source code copied from [hardpixel/hotel-manager](https://github.com/hardpixel/hotel-manager)
// released as open source under the terms of the [GPL v3](http://www.gnu.org/licenses/gpl-3.0.en.html)

const GObject          = imports.gi.GObject
const St               = imports.gi.St
const Main             = imports.ui.main
const PanelMenu        = imports.ui.panelMenu
const PopupMenu        = imports.ui.popupMenu
const Me               = imports.misc.extensionUtils.getCurrentExtension()
const ChaletService    = Me.imports.service.ChaletService
const ChaletServerItem = Me.imports.widgets.ChaletServerItem

var ChaletManager = GObject.registerClass(
  class ChaletManager extends PanelMenu.Button {
    _init() {
      const icon_name   = 'network-server-symbolic'
      const style_class = 'system-status-icon'

      this.service = new ChaletService()
      super._init(0.2, null, false)

      this.icon = new St.Icon({ icon_name, style_class })
      this.add_actor(this.icon)

      this.menu.connect('open-state-changed', () => {
        this._refresh()
      })

      this._refresh()
    }

    _addChaletItem() {
      const item = new ChaletServerItem(this.service)
      item.connect('close', () => this.menu.close())

      this.menu.addMenuItem(item)
    }

    _addServerItems() {
      const servers = this.service.servers
      if (!servers.length) return

      const separator = new PopupMenu.PopupSeparatorMenuItem()
      this.menu.addMenuItem(separator)

      servers.forEach((server) => {
        const item = new ChaletServerItem(server)
        item.connect('close', () => this.menu.close())

        this.menu.addMenuItem(item)
      })
    }

    _refresh() {
      this.menu.removeAll()

      this._addChaletItem()
      this._addServerItems()
    }
  }
)

let chaletManager

function enable() {
  chaletManager = new ChaletManager()
  Main.panel.addToStatusArea('chaletManager', chaletManager)
}

function disable() {
  chaletManager.destroy()
  chaletManager = null
}
