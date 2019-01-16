export default function(context) {
  console.log(`[ middleware ] check-auth | client = ${process.client}`)
  // console.log(context)
  context.store.dispatch('initAuth', context.req);
}