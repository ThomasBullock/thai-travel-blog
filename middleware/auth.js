export default function(context) {
  console.log(`[ middleware ] auth | client = ${process.client} auth = ${context.store.getters.isAuthenticated}`)
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}