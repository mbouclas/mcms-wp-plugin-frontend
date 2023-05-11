import './app.css'
import App from './App.svelte'
const target = document.getElementById('mcms-app');
const props = {
  url: target.getAttribute('data-url'),
  client: target.getAttribute('data-client'),
  key: target.getAttribute('data-key'),
}
const app = new App({
  target,
    props
})

export default app
