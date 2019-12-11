import Layout from 'component/layout/index';
import plugin from 'framework/plugin';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

export default function(Vue) {
  Vue.use(MintUI)
  Vue.use(plugin);
  Vue.component(Layout.name, Layout);
}
